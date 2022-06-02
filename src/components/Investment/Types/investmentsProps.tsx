import { AuthUser } from '../../../model/AuthUser';
import { Investment } from '../../../model/Investment';
import { User } from '../../../model/User';

export type InvestmentsProps = {
  authUser: AuthUser;
  currentUser: User;
  addInvestment: (
    investment: Investment,
    currentUserInvestAmount: number
  ) => void;
};
