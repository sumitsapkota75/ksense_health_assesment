
export const getBPScore = (bpString: string):number => {
  if (typeof bpString !== "string") {
    return 0;
  }
  const trimmedBp = bpString.trim()

    //   Handle empty or common invalid strings
  if (trimmedBp === "" || trimmedBp.toUpperCase() === "N/A" || trimmedBp.toUpperCase().includes("INVALID")) {
    return 0;
  }

  // makes sure that there are numeric value in systolic and diastolic
  const parts = trimmedBp.split('/');
  if (parts.length !== 2 || parts[0].trim() == "" || parts[1].trim() == ""){
    return 0
  }

  const systolic = parseInt(parts[0], 10);
  const diastolic = parseInt(parts[1], 10);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return 0;
  }
//   Apply scoring rules (highest risk first to handle the "higher risk" note)

if(systolic >= 140 || diastolic >= 90) return 3;
if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return 2
if ((systolic >= 120 && systolic <= 129) && diastolic < 80) return 1
if (systolic < 120 && diastolic < 80) return 0
return 0;
};
