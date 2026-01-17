import UserProfile from '@/features/users/components/Dashboard/UserProfile'
import { userProfile } from '@/features/users/server/user.profile.queries';
import React from 'react'

const page = async () => {

    const profile = await userProfile();
  return (
    <div>
      <UserProfile profile={profile}/>
    </div>
  )
}

export default page
