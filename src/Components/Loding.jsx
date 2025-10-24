import React from 'react'
import logoImg from "../assets/img/da_costa_and_asociadors_ca_logo.svg";

const Loding = () => {
  return (
    <>
   <div className=" absolute z-111 top-0 left-0 w-full h-[100vh] backdrop-blur bg-white/50 flex items-center justify-center">
    <div className="flex items-center">
    <img className='w-18' src={logoImg} alt="" />
    <div className="flex text-4xl font-bold">
        <p className='span1'>C</p>
        <p className='span2'>h</p>
        <p className='span3'>a</p>
        <p className='span4'>t</p>
        <p className='span5'>t</p>
        <p className='span6'>i</p>
        <p className='span7'>n</p>
        <p className='span8'>g</p>
        <p className='span9'>A</p>
        <p className='span10'>p</p>
        <p className='span11'>p</p>

    </div>
    </div>
   </div>
    
    </>
  )
}

export default Loding