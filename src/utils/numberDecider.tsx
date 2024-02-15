import { cn } from "@/lib/utils";

interface IProps {
  newValue: number | string;
  oldValue: number | string;
  short?: boolean;
  className?: string;
}

function isValidValue(value: number | string | undefined): boolean {
  return value !== undefined && typeof value !== "undefined" && (typeof value === "number" || typeof Number(value) === "number");
}

function ND({ newValue, oldValue, short = true, className }: IProps) {
  if (isValidValue(newValue) && isValidValue(oldValue)) {
    const diff = Number(newValue) - Number(oldValue);
    if (short) {
      return (
        <span className={cn(`${diff > 0 ? "text-[#6CA76C]" : diff === 0 ? "text-foreground" : "text-[#E12F2F]"}`, className)}>
          {`${diff > 0 ? "+" : diff === 0 ? "" : "-"}`}
          {Intl.NumberFormat("en-US", {
            notation: "compact",
            currency: "USD",
            style: "currency",
            maximumFractionDigits: 2,
            minimumFractionDigits: 1,
          }).format(Number(Math.abs(diff)))}
        </span>
      );
    } else {
      return (
        <span className={cn(`${diff > 0 ? "text-[#6CA76C]" : diff === 0 ? "text-foreground" : "text-[#E12F2F]"}`, className)}>
          {`${diff > 0 ? "+" : diff === 0 ? "" : "-"}`}
          {"$"}
          {Number(Math.abs(diff)).toLocaleString()}
        </span>
      );
    }
  } else {
    return <span className={cn("text-foreground", className)}>N/A</span>;
  }
}

export default ND;
