export const calculateSwapDestinationAmount = (sourceAmount: string, isRearranged: boolean): string => {
  return isRearranged ? String(+sourceAmount * 0.9) : sourceAmount
}
