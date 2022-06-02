import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, useState } from 'react';

import useStore from '../../store/useStore';

const Investment = ({ addInvestment, authUser }): JSX.Element => {
  const [formInvestment, setFormInvestment] = useState({
    name: '',
    amount: 0,
    category: '',
  });

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
    }
  };

  return (<p>invest</p>);
};

export const InvestmentStore = (): JSX.Element => {
  const addInvestment = useStore((state) => state.addInvestment);
  const authUser = useStore((state) => state.authUser);
  return (<Investment addInvestment={addInvestment} authUser={authUser} />);
};
