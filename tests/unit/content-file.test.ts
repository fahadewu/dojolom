import { describe, expect, it } from "vitest";
import path from "node:path";
import { validateUnit } from "@/content/validate";

/* Validate one unit file while authoring:
   UNIT_FILE=src/content/math/unit-1.ts npx vitest run tests/unit/content-file.test.ts */
const file = process.env.UNIT_FILE;

describe.skipIf(!file)("content file", () => {
  it(`${file} is valid`, async () => {
    const mod = await import(path.resolve(process.cwd(), file!));
    const unit = mod.default ?? mod.unit;
    expect(unit, "file must `export default unit`").toBeTruthy();
    const errors = validateUnit(unit);
    expect(errors, errors.join("\n")).toEqual([]);
  });
});
