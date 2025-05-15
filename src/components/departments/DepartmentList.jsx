import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { colums, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';




const DepartmentList=()=>{
    const[department,setDepartment]=useState([])
    const[loading,setDepLoading]=useState(false)
    const[filteredDepartments,setFilteredDepartments]=useState([])
    const onDepartmentDelete=async(id)=>{
        const data=department.filter(dep => dep._id !== id)
        setDepartment(data)
    }

    useEffect(()=>{
        const fetchDepartments=async()=>{
            setDepLoading(true)
            try{
                const token=localStorage.getItem("token")
                const response=await axios.get('http://localhost:3000/api/v1/departments/',{
                    headers:{
                        "Authorization":`Bearer ${token}`
                        
                    }
                })
                console.log(response.data)
                if(response.data.success){
                    let sNo=1;
                    const data=response.data.departments.map((dep)=>(
                        {
                            _id:dep._id,
                            sno:sNo++,
                            dept_name:dep.dept_name,
                            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
                        }
                    ))
                    setDepartment(data)
                    setFilteredDepartments(data)

                }
            }

            catch(error){
                console.log("API Eror",error)
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error);
                }

            }finally{
                setDepLoading(false)
            }
        }
        fetchDepartments();
    },[])

    const filterDepartments=(e)=>{
        const data=department.filter((dep)=>
        dep.dept_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(data)

    }

    return(
        <>{loading ? <div>Loading....</div> : 
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center px-5'>
                <input type='text' placeholder='search by department' className='px-4 py-0.5 border' 
                onChange={filterDepartments}></input>
                <Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-blue-500 rounded text-white'>Add Department</Link>
            </div>
            <div className='mt-5'>
                <DataTable columns={colums} data={filteredDepartments} pagination/>
            </div>
        </div>
        }</>
    )
}


export default DepartmentList;