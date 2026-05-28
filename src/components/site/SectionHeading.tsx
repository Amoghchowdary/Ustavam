type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, description, center = false }: Props) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl md:text-5xl leading-tight">{title}</h2>
      {description && (
        <p className="mt-5 text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
