import { AuthUser } from './AuthUser';

export interface User extends AuthUser {
  // uid: string,
  // photoURL: string | null,
  // displayName: string | null,
  // email: string | null,
  amount: number,
  investAmount: number,
  totalAmount: number,
  transactionsId: string[]
}
