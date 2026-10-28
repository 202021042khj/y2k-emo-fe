import { cn } from "@/lib/utils";

type Level = "h1" | "h2" | "h3" | "p";

/** Display type in liquid chrome with a cyan/pink split. */
export default function ChromeTitle({
  as: Tag = "h2",
  id,
  className,
  children,
}: {
  as?: Level;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className={cn("love-chrome font-display font-bold tracking-[-0.03em]", className)}>
      {children}
    </Tag>
  );
}
