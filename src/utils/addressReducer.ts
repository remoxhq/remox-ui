export const AddressReducer = ({
  address,
  dots = 3,
  left = 5,
  right = 4,
}: {
  address: string;
  dots?: number;
  left?: number;
  right?: number;
}): string => {
  return address.split("").reduce((a, c, i, arr) => {
    return i < left || arr.length - i < right ? a + c : a.split(".").length - 1 < dots ? a + "." : a;
  }, "");
};
