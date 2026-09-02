export function parseCurrency(value: string): number {
  return Number(value.replace(/[$,]/g, ""));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
