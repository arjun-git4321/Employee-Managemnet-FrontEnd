import React from 'react';
import {Link} from 'react-router-dom'



const DepartmentList=()=>{
    return(
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center px-5'>
                <input type='text' placeholder='search by department' className='px-4 py-0.5 border' ></input>
                <Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-blue-500 rounded text-white'>Add Department</Link>
            </div>
        </div>
    )
}

export default DepartmentList;