import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiCheck } from "react-icons/hi2";

const UserItem = ({ info, uid }) => {
  let [friendid, setFriendId] = useState([]);
  let data = useSelector((state) => state.user.value);
  const [friendRequestId, setFriendRequestId] = useState([]);
  const db = getDatabase();

  let heandelFriendRequst = (item) => {
    set(push(ref(db, "FriendRequest/")), {
      sendername: data.displayName,
      senderemail: data.email,
      senderid: data.uid,
      recivername: item.name,
      reciveremail: item.email,
      reciverid: item.id,
    }).then(() => {});
  };
  useEffect(() => {
    const userRef = ref(db, "FriendRequest/");
    onValue(userRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);
      });
      setFriendRequestId(array);
    });
  }, [db]);

  useEffect(() => {
    const userRef = ref(db, "FriendList/");
    onValue(userRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);
      });
      setFriendId(array);
    });
  }, [db]);

  return (
    <div className="mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
      <div className="flex items-center gap-2">
        <img
          className="w-15 h-15 rounded-full border border-gray-300"
          src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/"
          alt=""
        />
        <div className=" ">
          <h2 className="font-bold text-gray-800">{info?.name}</h2>
          <h2 className="font-medium text-gray-600">{info?.email}</h2>
        </div>
      </div>
      <div className="">
        {friendid.includes(uid + data.uid) ||
        friendid.includes(data.uid + uid) ? (
          <button className="flex items-center cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-gray-200/50 text-black">
            {" "}
            <HiCheck />
            Friend
          </button>
        ) : friendRequestId.includes(uid + data.uid) ||
          friendRequestId.includes(data.uid + uid) ? (
          <button className=" cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-gray-200 text-black">
            Pending...
          </button>
        ) : (
          <button
            onClick={() => heandelFriendRequst(info)}
            className=" cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-emerald-800 text-white"
          >
            Friend Request
          </button>
        )}
      </div>
    </div>
  );
};

export default UserItem;
