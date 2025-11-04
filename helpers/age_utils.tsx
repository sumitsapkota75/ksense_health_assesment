export const isValidAge = (age: number | string | undefined | null): boolean => {
  if (age === undefined || age === null) return false;

  const ageNumber = Number(age);
  if (isNaN(ageNumber)) return false;

  return true;
};