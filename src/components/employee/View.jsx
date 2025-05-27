import React from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect} from 'react';



const Views=()=>{
    const {id}=useParams()
    const[employee,setEmployee]=useState([])
    const[loading,setLoading]=useState(true)


    useEffect(()=>{
                const fetchEmployees=async()=>{
                    try{
                        const token=localStorage.getItem("token")
                        const response=await axios.get(`http://localhost:3000/api/v1/employee/${id}`,{
                            headers:{
                                "Authorization":`Bearer ${token}`
                                
                            }
                        })
                        console.log(response)
                        if(response.data.success){
                            setEmployee(response.data.employee)
        
                        }
                    }
                    catch(error){
                        console.log("API Eror",error)
                        if(error.response && !error.response.data.success){
                            alert(error.response.data.error);
                        }
                        
                        
                    }
                    finally{
                            setLoading(false)
                        }
                }
                fetchEmployees();
            },[id]);

            if (loading) return <p>Loading...</p>;

            if (!employee || !employee.userId) return <p>Employee not found or incomplete data</p>;

            const imageUrl = employee.userId.profileImage
                ? `http://localhost:3000/${employee.userId.profileImage}`
                : '/default-profile.png';
    return(
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
                Employee Details
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <img src={imageUrl} 
                    className='rounded-full border w-72'/>
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name:</p>
                        <p className='font-medium'>{employee.userId.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>EmployeeID:</p>
                        <p className='font-medium'>{employee.employeeId}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Date of Birth:</p>
                        <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Gender:</p>
                        <p className='font-medium'>{employee.gender}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Department:</p>
                        <p className='font-medium'>{employee.department.dept_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Martial status:</p>
                        <p className='font-medium'>{employee.martialStatus}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Views;