export const calculateSwapDestinationAmount = (
    sourceAmount: string,
    isRearranged: boolean
): string => {
    return isRearranged ? String(+sourceAmount * 1) : sourceAmount;
};
