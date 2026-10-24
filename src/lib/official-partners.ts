export const officialPartnerNames = [
  "Israel Embassy in Rwanda",
  "RBC",
  "University of Rwanda",
  "FIRAT",
  "Solid Minds Counseling Clinic",
] as const;

export function partnerNameKey(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}
