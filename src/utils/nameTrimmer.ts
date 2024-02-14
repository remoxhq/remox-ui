interface IProps {
  name: string;
}

function NT({ name }: IProps) {
  const trimmed = name && name.length > 10 ? `${name.substring(0, 10)}...` : name;
  return trimmed;
}

export default NT;
