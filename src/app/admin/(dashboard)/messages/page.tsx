import ContactMessages from '@/features/admin/components/ContactMessages'
import { getAllUserContactsAction } from '@/features/users/server/user.contact.action'
import React from 'react'

const page = async () => {
    const res = await getAllUserContactsAction()
    if(res.status === "ERROR"){
        return <div className='text-center text-red-500 mt-10'>{res.message}</div>
    }
  return (
    <div>
      <ContactMessages messages={res.data}/>
    </div>
  )
}

export default page
