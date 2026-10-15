// The tutor's one endpoint. The browser sends the conversation and a small,
// validated summary of the learner (src/lib/tutor/context.ts); the reply
// streams back as UI message parts. Nothing is stored here: the conversation
// and the learner's progress stay on their device.

import { createAgentUIStreamResponse, safeValidateUIMessages } from "ai";
import { z } from "zod";
import { protectionAge } from "@/lib/age";
import { resolve, tutorAgent } from "@/lib/tutor/agent";
import { MINORS_ALLOWED, tutorContextSchema } from "@/lib/tutor/context";
import { tutorTools, type TutorUIMessage } from "@/lib/tutor/tools";

export const maxDuration = 60;

const MAX_BODY = 400_000;    // bytes
const MAX_MESSAGES = 40;     // the learner's notes travel in the instructions, so older turns can go
const MAX_TEXT = 2_000;      // characters in one learner message

const bodySchema = z.object({ messages: z.array(z.unknown()).min(1).max(400), context: tutorContextSchema });

const fail = (status: number, error: string) => Response.json({ error }, { status });

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) return fail(413, "too-large");
  const raw = await req.text();
  if (raw.length > MAX_BODY) return fail(413, "too-large");
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return fail(400, "bad-json"); }
  const body = bodySchema.safeParse(json);
  if (!body.success) return fail(400, "bad-request");
  const ctx = body.data.context;
  // Closed to under-18s unless this deployment allows it (src/lib/age.ts tutorAccess); the browser checks first, this is the backstop.
  if (!MINORS_ALLOWED && protectionAge({ age: ctx.learner.age, track: ctx.learner.track, bdStage: ctx.learner.bdStage }) < 18) return fail(403, "minors-closed");

  const checked = await safeValidateUIMessages<TutorUIMessage>({ messages: body.data.messages.slice(-MAX_MESSAGES), tools: tutorTools });
  if (!checked.success) return fail(400, "bad-messages");
  const messages = checked.data;
  while (messages.length > 1 && messages[0].role === "assistant") messages.shift(); // a trimmed history starts with the learner
  if (messages.some((m) => m.role === "system")) return fail(400, "bad-messages");
  if (messages.some((m) => m.role === "user" && m.parts.some((p) => p.type === "text" && p.text.length > MAX_TEXT))) return fail(400, "too-long");

  // A conversation the learner has just opened: the tutor greets them (and, for a newcomer, starts getting to know them).
  const last = messages.at(-1);
  const opening = last?.role === "user" && last.metadata?.kickoff ? { first: messages.length === 1 && ctx.memory.learned === 0 && !ctx.learner.seeWays.length } : null;

  const scripted = process.env.DOJOLOM_TUTOR_SCRIPT === "1";
  const model = scripted ? (await import("@/lib/tutor/script-model")).scriptedModel(ctx) : undefined;
  return createAgentUIStreamResponse({
    agent: tutorAgent(ctx, await resolve(ctx), opening, model),
    uiMessages: messages,
    abortSignal: req.signal,
  });
}
