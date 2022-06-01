import { AuthUser } from './AuthUser';

export interface User extends AuthUser {
  amount: number,
  investAmount: number,
  transactionsId: string[]
}
