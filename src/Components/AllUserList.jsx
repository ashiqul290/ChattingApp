import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaSearch } from "react-icons/fa";
import UserItem from "./UserItem";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import RequestList from "./RequestList";

const AllUserList = () => {
  const details = useSelector((state) => state.user.value);
  // const [friendRequestId, setFriendRequestId] = useState([]);
  const [userList, setUserlist] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key !== details.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(array);
    });
  }, [db, details.uid]);

  // useEffect(() => {
  //   const userRef = ref(db, "FriendRequest/");
  //   onValue(userRef, (snapshot) => {
  //     const array = [];
  //     snapshot.forEach((item) => {
  //       array.push(item.val().senderid + item.val().reciverid);
  //     });
  //     setFriendRequestId(array);
  //   });
  // }, [db]);

// let requestSee = friendRequestId.includes(
//   userList.map((item)=>{item.id + details.uid
//  }) ||   userList.map((item)=>{ details.uid + item.id 
//  })
// )

 
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="grid grid-cols-2 w-full">
          <div className="w-[100] h-[99vh] ">
            <div className="mt-3 px-2">
              <h2 className="text-2xl font-bold text-gray-800">ChattingApp</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Friends...."
                  className="border w-[80%] font-medium mt-2 ml-1 px-3 border-gray-400 py-2 rounded-full text-[18px] focus:border-gray-400 focus:border outline-none focus:shadow-gray-500 focus:shadow-[0_0_2px]"
                />
                <FaSearch className="ml-[-30px] mt-2 text-gray-500" />
              </div>
              <div>
                <h4 className="ml-1 mt-1 text-[18px] font-bold text-gray-700">
                  All Users
                </h4>
              </div>

              <div className="w-full h-125 p-2 overflow-y-scroll">
                {/* User list */}
                {userList.map((item) => (
                  <UserItem key={item.id} info={item} uid={item.id}/>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[99vh]">
            <div>
              <h4 className="ml-2 mt-2 font-bold text-2xl mb-5 text-gray-700">
                Request User
              </h4>
            </div>
            <div className="w-full h-145 p-2 overflow-y-scroll">
              {/* Friend request list */}
              <RequestList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUserList;
