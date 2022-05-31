import { AuthUser } from './AuthUser';

export interface User extends AuthUser {
  amount: number,
  investAmount: number,
  totalAmount: number,
  transactionsId: string[]
}
