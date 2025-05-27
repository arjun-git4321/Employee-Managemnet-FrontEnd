import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect} from 'react';
import { columns,EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List=()=>{
    const[employees,setEmployees]=useState([])
    const[EmpLoading,setEmpLoading]=useState(false)
    const[filtered,setFiltered]=useState([])



    useEffect(()=>{
            const fetchEmployees=async()=>{
                setEmpLoading(true)
                try{
                    const token=localStorage.getItem("token")
                    const response=await axios.get('http://localhost:3000/api/v1/employee/',{
                        headers:{
                            "Authorization":`Bearer ${token}`
                            
                        }
                    })
                    console.log(response.data)
                    if(response.data.success && Array.isArray(response.data.employees)){
                        let sNo=1;
                        const data=response.data.employees.map((emp)=>(
                            {
                                _id:emp._id,
                                sno:sNo++,
                                dept_name:emp.department.dept_name,
                                name:emp.userId.name,
                                dob:new Date(emp.dob).toLocaleDateString(),
                                profileImage:<img width={40} className='rounded-full' src={`http://localhost:3000/${emp.userId.profileImage}`}/>,
                                action: (<EmployeeButtons Id={emp._id}/>),
                            }
                        ))
                        // console.log("Mapped employee data:", data);

                        setEmployees(data)
                        setFiltered(data)
    
                    }

                }
    
                catch(error){
                    console.log("API Eror",error)
                    if(error.response && !error.response.data.success){
                        alert(error.response.data.error);
                    }
    
                }finally{
                    setEmpLoading(false)
                }
            }
            fetchEmployees();
        },[])

        const handleFiltered=(e)=>{
            const records=employees.filter((emp)=>(
                emp.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
            setFiltered(records)
        }



    return(
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Employees</h3>
            </div>
            <div className='flex justify-between items-center px-5'>
                <input type='text' placeholder='search by department' className='px-4 py-0.5 border'
                onChange={handleFiltered}></input>
                <Link to='/admin-dashboard/add-employee' className='px-4 py-1 bg-blue-500 rounded text-white'>Add Employees</Link>
            </div>
            <div className='mt-6'>
                {EmpLoading ? <p>Loading...</p> : <DataTable columns={columns} data={filtered} pagination/>}
            </div>
        </div>
    )
}

export default List;