import React from 'react'
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboards/AdminSidebar';
import Navbar from '../components/dashboards/Navbar';
// import AdminSummary from '../components/dashboards/AdminSummary';
// import SummaryCard from '../components/dashboards/SummaryCard';
import { Outlet } from 'react-router-dom';

const AdminDashBoard=()=>{
    const {user}=useAuth()
    
    return(
        <div className='flex'>
            <AdminSidebar/>
            <div className='flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar/>
                {/* <AdminSummary/> */}
                <Outlet/>
            </div>

        </div>
    )
}

export default AdminDashBoard;