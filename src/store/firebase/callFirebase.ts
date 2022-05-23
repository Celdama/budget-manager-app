/* eslint-disable no-promise-executor-return */
/* eslint-disable prefer-promise-reject-errors */
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { User } from '../../model/User';

// export const getTodosFromFirebase = async (): Promise<Todo[]> => {
//   const todosCollectionRef = collection(db, 'todos');
//   const data = await getDocs(todosCollectionRef);
//   const res: Todo[] = data.docs.map((doc) => doc.data() as Todo);
//   return res;
// };

export const addUserToFirebase = async (user: User): Promise<User> => {
  const { uid } = user;
  try {
    await setDoc(doc(db, 'users', uid), {
      ...user,
    });
    return user;
  } catch (err) {
    return Promise.reject(new Error('fail'));
  }
};
