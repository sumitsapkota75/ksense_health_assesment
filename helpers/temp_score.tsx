export const getTemperatureScore = (
  tempValue: string | number | undefined | null
): number => {
  if (tempValue === null || tempValue === undefined || tempValue === "") return 0;
  if (
    typeof tempValue === "string" &&
    (tempValue.includes("TEMP_ERROR") || tempValue.includes("INVALID"))
  ) {
    return 0;
  }
  const temp = Number(tempValue);
  if (isNaN(temp)) return 0;
  if (temp <= 99.5) return 0;
  if (temp >= 99.6 && temp <= 100.9) return 1;
  if (temp >= 101.0) return 2;
  return 0; 
};