type Props = {
  label?: string;
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
};

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function Photo({ label = "Add photo", className = "", ratio = "landscape" }: Props) {
  return (
    <div className={`photo-placeholder ${ratios[ratio]} ${className}`}>
      <span className="opacity-70">— {label} —</span>
    </div>
  );
}
