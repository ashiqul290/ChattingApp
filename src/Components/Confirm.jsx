import { getDatabase, push, ref, remove, set } from 'firebase/database'
import React from 'react'

const Confirm = ({detail}) => {
 
 const db = getDatabase();
  let heandeleConfirm = (item)=>{
     
     set(push(ref(db, 'FriendList/')), {
     ...item
     }).then(()=>{
      remove(ref(db, 'FriendRequest/' + item.id))
     })
  }
  let heandeleDelete = (item)=>{
   remove(ref(db, 'FriendRequest/' + item.id))
  }

    

  return (
    <>

  <div className="mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img
                    className="w-15 h-15 rounded-full border border-gray-300"
                    src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/"
                    alt=""
                  />
                  <div className=" ">
                    <h2 className="font-bold text-gray-800">{detail.sendername}</h2>
                    <h2 className="font-medium text-gray-600">
                      {detail.senderemail}
                    </h2>
                  </div>
                </div>
                <div className="">
                  <button onClick={()=>heandeleConfirm(detail)} className="cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-emerald-700 text-white">
                    Confirm
                  </button>
                  <button onClick={()=>heandeleDelete(detail)} className="cursor-pointer px-5 ml-5 py-2 rounded-[10px] font-bold bg-white shadow-[0_0_3px] shadow-gray-500 text-gray-700 ">
                    Delete
                  </button>
                </div>
              </div>

    </>
  )
}

export default Confirm