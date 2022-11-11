export function formatAddress(address: string) {
  const start = address.slice(0, 5);
  const end = address.slice(-4, address.length);
  return `${start}...${end}`.toLowerCase();
}
