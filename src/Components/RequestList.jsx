import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Confirm from './Confirm';

const RequestList = () => {
  const [confirmList, setConfirmList] = useState([]);
  const db = getDatabase();
  const details = useSelector((state) => state.user.value);

  useEffect(() => {
    const userRef = ref(db, 'FriendRequest/');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const array = [];
      snapshot.forEach((item) => {
        if (details.uid === item.val().reciverid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setConfirmList(array);
    });
  }, [db, details.uid]);

  return (
    <>
      {confirmList.map((item) => (
        <Confirm key={item.id} detail={item} />
      ))}
    </>
  );
};

export default RequestList;
