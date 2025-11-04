export const getAgeScore = (ageValue:string | number | null | undefined):number =>{
    if (ageValue === null || ageValue === undefined || ageValue === "") return 0;
    const age = Number(ageValue);
    if (isNaN(age)) return 0;
    // check for negative number
    if (age <= 0) return 0;
    if (age >= 65) return 2;
    if (age >= 40 && age <= 65) return 1;
    if (age < 40) return 0;
    return 0;
}