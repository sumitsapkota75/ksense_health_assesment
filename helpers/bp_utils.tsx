export const isValidBP = (bpString: string | undefined | null): boolean => {
  // 1. Check for null, undefined, and non-string types
  if (!bpString || typeof bpString !== "string") {
    return false;
  }
  
  // 2. Check for invalid string keywords
  const trimmedBp = bpString.trim();
  if (trimmedBp === "" || trimmedBp.toUpperCase() === "N/A" || trimmedBp.toUpperCase().includes("INVALID")) {
    return false;
  }
  
  // 3. Check for format "A/B"
  const parts = trimmedBp.split("/");
  if (parts.length !== 2) {
    return false;
  }

  const sPart = parts[0].trim();
  const dPart = parts[1].trim();

  // 4. Check for empty parts (e.g., "/90" or "150/")
  if (sPart === "" || dPart === "") {
    return false;
  }
  
  // 5. Check if parts are truly numeric
  const systolic = parseInt(sPart, 10);
  const diastolic = parseInt(dPart, 10);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return false;
  }
  
  // 6. *** NEW CHECK ***
  //    This ensures "120a" (which parseInt reads as 120) is caught.
  if (String(systolic) !== sPart || String(diastolic) !== dPart) {
    return false;
  }

  // If all checks pass, the data is valid
  return true;
};