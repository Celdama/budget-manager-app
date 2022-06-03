/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { Investment } from '../../model/Investment';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface InvestmentSlice {
  investments: Investment[];
  getInvestments: (authUserId: string) => void;
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
  getInvestments: (authUserId: string) => {
    const investmentsCollectionRef = collection(db, 'investments');
    const authUserInvestmentsList: Investment[] = [];
    getDocs(investmentsCollectionRef)
      .then((docs) => {
        docs.forEach((doc) => {
          const { name, amount, uid, date, category, userId } = doc.data();
          if (userId === authUserId) {
            authUserInvestmentsList.push({
              name,
              amount,
              uid,
              date,
              category,
              userId,
            });
          }
        });
      }).then(() => {
        set(
          { investments: [...authUserInvestmentsList] },
          false,
          'investmentSlice.getInvestments',
        );
      })
      .catch((error) => {
        console.log('from investmentSlice.getInvestments ', error);
      });
  },
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
  deleteInvestment: (investment: Investment, currentUserInvestAmount: number) => {

  },
});

export default createInvestmentSlice;
