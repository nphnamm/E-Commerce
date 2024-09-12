import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx';

function AdminSideBar({active}) {
  return (
    <div className='w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
        {/* single item  */}
        <div className='w-full flex items-center p-4'>
            <Link to="/admin/dashboard" className='w-full flex items-center'>
                <RxDashboard
                    size={30}
                
                />
            </Link>


        </div>
      
    </div>
  )
}

export default AdminSideBar
