import { cn } from "@/lib/utils";

/* Every section opens the same way: a heading, a one-line lede, and an
   optional action on the right. Consistency here is most of what reads as polish. */
export function SectionHeading({
  title,
  lede,
  action,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-14 flex flex-col gap-6",
        action && "md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="max-w-2xl flex flex-col gap-4">
        <Tag className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{title}</Tag>
        {lede && <p className="lede max-w-xl">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
