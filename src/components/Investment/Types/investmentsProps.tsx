import { AuthUser } from '../../../model/AuthUser';
import { Investment } from '../../../model/Investment';

export type InvestmentsProps = {
  addInvestment: (
    investment: Investment,
    currentUserInvestAmount: number
  ) => void;
  authUser: AuthUser
};
