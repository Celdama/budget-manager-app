import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { Investment } from '../../model/Investment';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface InvestmentSlice {
  investments: [];
  addInvestment: (
    investment: Investment,
    currentUserInvestAmount: number
  ) => void;
}

const createInvestmentSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  investments: [],
  addInvestment: (investment: Investment, currentUserInvestAmount: number) => {
    const { uid, userId, amount, category } = investment;
    const investementsDoc = doc(db, 'users', userId);
    setDoc(doc(db, 'investments', uid), {
      ...investment,
    })
      .then(() => {
        updateDoc(investementsDoc, {
          investmentsId: arrayUnion(uid),
          investAmount: currentUserInvestAmount + amount,
        });
      })
      .then(() => {
        set(
          (state) => ({
            ...state,
            currentUser: {
              ...state.currentUser,
              investAmount: currentUserInvestAmount + amount,
            },
            investments: [...state.investments, investment],
          }),
          false,
          'investmentSlice.addInvestment',
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

export default createInvestmentSlice;
