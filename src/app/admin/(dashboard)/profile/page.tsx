import UserProfile from '@/features/users/components/Dashboard/UserProfile'
import { userProfile } from '@/features/users/server/user.profile.queries';
import React from 'react'

const page = async () => {

    const profile = await userProfile();
  return (
    <div className='flex items-center justify-center mt-10 w-full border-red-600'>
    <UserProfile profile={profile} isOwner />

    </div>
  )
}

export default page
