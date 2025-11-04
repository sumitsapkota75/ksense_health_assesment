import { isValidBP } from "./bp_utils";

export const getBPScore = (bpString: string): number => {
  if (!isValidBP(bpString)) return 0;
  const [systolicStr, diastolicStr] = bpString.trim().split("/");
  const systolic = parseInt(systolicStr, 10);
  const diastolic = parseInt(diastolicStr, 10);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return 0;
  }
  // Apply scoring rules (highest risk first to handle the "higher risk" note)
  if (systolic >= 140 || diastolic >= 90) return 3;
  if (
    (systolic >= 130 && systolic <= 139) ||
    (diastolic >= 80 && diastolic <= 89)
  )
    return 2;
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 1;
  if (systolic < 120 && diastolic < 80) return 0;
  return 0;
};
