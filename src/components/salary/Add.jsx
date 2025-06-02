import React, { useState,useEffect } from 'react'
import {fetchDepartments, fetchEmployees} from '../../utils/EmployeeHelper'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'


const AddSalary=()=>{
    const[employee,setEmployee]=useState({
        employeeId:null,
        basicSalary:0,
        allowances:0,
        deductions:0,
        payDate:null
    })
    const[departments,setDepartments]=useState([])
    const[employees,setEmployees]=useState([])
    // const[loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const {id}=useParams()





    useEffect(()=>{
            const getDepartments=async ()=>{
                const departments=await fetchDepartments();
                setDepartments(departments)
            }
            getDepartments();
    
        },[])


    // useEffect(()=>{
    //     const fetchEmployees=async()=>{
    //                 try{
    //                     const token=localStorage.getItem("token")
    //                     const response=await axios.get(`http://localhost:3000/api/v1/employee/${id}`,{
    //                         headers:{
    //                             "Authorization":`Bearer ${token}`
                                
    //                         }
    //                     })
    //                     // console.log(response)
    //                     if(response.data.success){
    //                         const employee=response.data.employee
    //                         setEmployee((prev)=>({...prev,name:employee.userId.name,
    //                             martialStatus:employee.martialStatus,
    //                             designation:employee.designation,
    //                             salary:employee.salary,
    //                             department:employee.department
    //                         }))
        
    //                     }
    //                 }
    //                 catch(error){
    //                     console.log("API Eror",error)
    //                     if(error.response && !error.response.data.success){
    //                         alert(error.response.data.error);
    //                     }
                        
                        
    //                 }
    //                 finally{
    //                         setLoading(false)
    //                     }
    //             }
    //             fetchEmployees();

    // },[])

    const handleChange=(e)=>{
        const {name,value}=e.target;
            setEmployee((prevData)=>({...prevData, [name]:value}))
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()

        try{
            const token=localStorage.getItem("token");
            const response=await axios.post(`http://localhost:3000/api/v1/salary/add`,employee,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            console.log(response);

            if(response.data.success){
                navigate('/admin-dashboard/employees')
            }

        }
        catch(error){
            if(error.response && error.response.data.error){
                alert(error.response.data.error)
            }

        }

    }

    const handleDepartment=async(e)=>{
        const emps=await fetchEmployees(e.target.value)
        setEmployees(emps)
    }



    return (
  <>
    {departments  ? (
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Edit employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Department</label>
              <select
                name='department'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleDepartment}
                required
              >
                <option value=''>Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dept_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Employee</label>
              <select
                name='employeeId'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                
                required
              >
                <option value=''>Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Basic salary</label>
              <input
                type='number'
                name='basicSalary'
                placeholder='Basic Salary'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Allowances</label>
              <input
                type='number'
                name='allowances'
                placeholder='allowances'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Deductions</label>
              <input
                type='number'
                name='deductions'
                placeholder='deductions'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Pay Date</label>
              <input
                type='date'
                name='payDate'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type='submit'
            className='w-full mt-6 bg-blue-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-2xl'
          >
            Add Salary
          </button>
        </form>
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </>
);

}

export default AddSalary