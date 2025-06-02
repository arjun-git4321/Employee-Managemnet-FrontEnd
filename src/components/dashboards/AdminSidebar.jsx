import react from 'react';
import {NavLink} from 'react-router-dom';
import { AiFillDashboard} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { FcLeave } from "react-icons/fc";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


const AdminSidebar=()=>{
    return(
        <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
            </div>
            <div className='px-4'>
                <NavLink to="/admin-dashboard"
                className={({isActive})=>`${isActive ? "bg-teal-500":""} flex items-center sapce-x-4 py-2.5 px-4 rounded`}
                end
                >
                <AiFillDashboard />
                <span>DashBoard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees"
                
                className={({isActive})=>`${isActive ? "bg-teal-500":""} flex items-center sapce-x-4 py-2.5 px-4 rounded`}>
                <FaUsers />
                <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments"
                className={({isActive})=>`${isActive ? "bg-teal-500":""} flex items-center sapce-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FcDepartment />
                <span>Departments</span>
                </NavLink>
                <NavLink to="/admin-dashboard"
                className='flex items-center sapce-x-4 py-2.5 px-4 rounded'>
                <FcLeave />
                <span>Leave</span>
                </NavLink>
                <NavLink to="/admin-dashboard/salary/add"
                className={({isActive})=>`${isActive ? "bg-teal-500":""} flex items-center sapce-x-4 py-2.5 px-4 rounded`}
                end
                
                >
                <FaMoneyBill />
                <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard"
                className='flex items-center sapce-x-4 py-2.5 px-4 rounded'>
                <IoIosSettings />
                <span>Settings</span>
                </NavLink>
            </div>

        </div>
    )
}

export default AdminSidebar;