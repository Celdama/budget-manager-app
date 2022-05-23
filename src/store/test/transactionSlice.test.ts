import '@testing-library/jest-dom';

import useStore from '../useStore';

// console.log(originalStore);

// describe('create new transaction', () => {
//   // const { addTransaction } = useStore();
//   const { addTransaction } = originalStore;

//   const newTransaction = {
//     amount: 400,
//     category: 'expenses',
//     date: 'today',
//     name: 'test',
//     uid: 'fddsfdqsdsqfd',
//     userId: 'OEcO44NJyZPqSaH52IpL',
//   };

//   it('add correct transaction', () => {
//     addTransaction(newTransaction);
//     console.log(originalStore);
//     // expect(result).toStrictEqual(1);
//   });
// });

test('add one', () => {
  const originalStore = useStore.getState();

  // const { addTransaction, transactions } = originalStore;

  const newTransaction = {
    amount: 400,
    category: 'expenses',
    date: 'today',
    name: 'test',
    uid: 'fddsfdqsdsqfd',
    userId: 'OEcO44NJyZPqSaH52IpL',
  };

  originalStore.addTransaction(newTransaction);
  console.log(originalStore);
});
