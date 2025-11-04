export const isValidTemp = (tempValue: string | number | undefined | null): boolean => {
  if (tempValue === null || tempValue === undefined || tempValue === "") return false;

  const tempStr = String(tempValue).toUpperCase();
  if (tempStr.includes("TEMP_ERROR") || tempStr.includes("INVALID")) return false;

  const tempNumber = Number(tempValue);
  if (isNaN(tempNumber)) return false;

  return true;
};