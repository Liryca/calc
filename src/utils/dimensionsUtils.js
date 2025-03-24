export const validateStep = (value, step = 0.2) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return false;

  const remainder = Math.abs((num / step) % 1);
  return remainder < 0.00001 || remainder > 0.99999;
};

export const formatToStep = (value, step = 0.2) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return step;

  const rounded = Math.round(num / step) * step;
  return parseFloat(rounded.toFixed(2));
};

export const hasOneDecimal = (value) => {
  if (value === "") return true;
  const str = value.toString();
  const decimalIndex = str.indexOf(".");
  return decimalIndex === -1 || str.length - decimalIndex - 1 <= 1;
};
