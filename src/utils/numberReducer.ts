interface IProps {
  value: number | string;
  short?: boolean;
}

function NR({ value, short = true }: IProps) {
  if (value !== undefined && typeof value !== "undefined" && (typeof value === "number" || typeof Number(value) === "number")) {
    if (short) {
      return Intl.NumberFormat("en-US", {
        notation: "compact",
        currency: "USD",
        style: "currency",
        maximumFractionDigits: 2,
        minimumFractionDigits: 1,
      }).format(Number(value));
    } else {
      return "$" + Number(value).toLocaleString();
    }
  } else {
    return "N/A";
  }
}

export default NR;
