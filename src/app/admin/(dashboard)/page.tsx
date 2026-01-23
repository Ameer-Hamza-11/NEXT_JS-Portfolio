import React from 'react'
import AdminDashoard from '../../../features/admin/components/AdminDashoard'
import { getDataLengthAction } from '@/features/admin/server/admin.action'

const page = async () => {
  const dataLength = await getDataLengthAction()
  return (
    <div>
      <AdminDashoard result={dataLength}/>
    </div>
  )
}

export default page
