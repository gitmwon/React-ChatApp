import React from 'react'
import Header from './Header'
import MessageContainer from './MessageContainer'
import ImagePreview from './ImagePreview'
import { useMessagestore } from '@/store/useMessagestore'
import Footer from './Footer'

function ContentSec() {
  const currentUser = useMessagestore((state)=>state.currentUser);
  const showPreview = useMessagestore((state)=>state.showPreview);

  if(!currentUser){
    return(
      <>
        <div className='flex justify-center items-center flex-col w-full h-full'>
          <div>
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="" srcset="" 
          className='w-96'/>
          </div>
          <p className='font-bold'>
            Select a user to start Chatting.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
    <Header/>
    <MessageContainer/>
    {(showPreview) == true ? <ImagePreview/> : ""}
    <Footer/>
    </>
  )
}

export default ContentSec