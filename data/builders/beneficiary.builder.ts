export interface BeneficiaryData {
  name: string;
  accountNumber: string;
  bank: "Chase Bank" | "Bank of America" | "Wells Fargo" | "Citigroup";
}

export function createBeneficiaryData(): BeneficiaryData {
  const suffix = Date.now().toString().slice(-6);

  return {
    name: `QA Beneficiary ${suffix}`,
    accountNumber: `9876${suffix}`,
    bank: "Chase Bank",
  };
}
