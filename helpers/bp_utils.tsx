/**
 * Checks whether the given blood pressure string is valid.
 * A valid BP is in the format "systolic/diastolic" with numeric values.
 */
export const isValidBP = (bpString: string | undefined | null): boolean => {
  if (!bpString || typeof bpString !== "string") return false;

  const trimmedBp = bpString.trim();
  if (trimmedBp === "" || trimmedBp.toUpperCase() === "N/A" || trimmedBp.toUpperCase().includes("INVALID")) {
    return false;
  }

  const parts = trimmedBp.split("/");
  if (parts.length !== 2 || parts[0].trim() === "" || parts[1].trim() === "") return false;

  const systolic = parseInt(parts[0], 10);
  const diastolic = parseInt(parts[1], 10);

  if (isNaN(systolic) || isNaN(diastolic)) return false;

  return true;
};
