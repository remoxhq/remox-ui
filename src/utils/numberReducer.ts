interface IProps {
  value: number | string;
}

function NR({ value }: IProps) {
  if (value !== undefined && typeof value !== "undefined" && (typeof value === "number" || typeof Number(value) === "number")) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      currency: "USD",
      style: "currency",
      maximumFractionDigits: 2,
      minimumFractionDigits: 1,
    }).format(Number(value)) ;
  } else {
    return "N/A";
  }
}

export default NR;
