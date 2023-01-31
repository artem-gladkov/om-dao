

export interface IReferralProject {
  symbol: string;
  amount: string;
}

export interface IProjectTransaction {
  blockNumber: number
  transactionHash: string
  timestamp: number
  args: IProjectTransactionArgs
}

export interface IProjectTransactionArgs {
  to: string
  amount: number
  symbol: string
  price: number
  referalCode: string
}

export interface ILastScannedBlock{
  lastScannedBlock: number
}