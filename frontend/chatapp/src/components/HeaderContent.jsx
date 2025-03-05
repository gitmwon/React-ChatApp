import React from 'react'
import { EllipsisVertical,Search } from 'lucide-react';

function HeaderContent() {
  return (
    <div className="main w-96">
        <div className="holder1 flex justify-between mt-2 ">
            <span className="block font-semibold">ChatKaro</span>
            <span className="block">
                <button><EllipsisVertical/></button>
            </span>
        </div>
        <div className="holder2 mt-3 flex justify-center relative items-center">
            <input type="text" className='w-full h-8 rounded-md'/>
               <span className='absolute left-0 ml-2'><Search size={16} /></span>
               <button className="absolute left-0 ml-8">Search</button>
        </div>
    </div>
  )
}

export default HeaderContent