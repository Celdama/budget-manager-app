import { AuthUser } from '../../../model/AuthUser';
import { Investment } from '../../../model/Investment';
import { User } from '../../../model/User';

export type InvestmentsProps = {
  investments: Investment[];
  authUser: AuthUser;
  currentUser: User;
  getInvestments: (authUserId: string) => void;
  addInvestment: (
    investment: Investment,
    currentUserInvestAmount: number
  ) => void;
  deleteInvestment: (
    investment: Investment,
    currentUserInvestAmount: number
  ) => void;
};
