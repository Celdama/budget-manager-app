import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, useState } from 'react';

import useStore from '../../store/useStore';
import { InvestmentsProps } from './Types/investmentsProps';

const Investment = ({
  addInvestment,
  authUser,
}: InvestmentsProps): JSX.Element => {
  const [formInvestment, setFormInvestment] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  const { investAmount } = currentUser;

  const handleChange = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target as HTMLInputElement;
    setFormInvestment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlaAddInvestment = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (formInvestment.name.length) {
      const newInvestment = {
        ...formInvestment,
        uid: nanoid(),
        userId: authUser.uid,
        date: new Date().toString(),
      };
      addInvestment(newInvestment);
    }
  };

  return <p>invest</p>;
};

export const InvestmentStore = (): JSX.Element => {
  const addInvestment = useStore((state) => state.addInvestment);
  const authUser = useStore((state) => state.authUser);
  const currentUser = useStore((state) => state.currentUser);
  return (
    <Investment
      addInvestment={addInvestment}
      authUser={authUser}
      currentUser={currentUser}
    />
  );
};
