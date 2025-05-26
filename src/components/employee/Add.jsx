import React, { useState,useEffect } from 'react'
import {fetchDepartments} from '../../utils/EmployeeHelper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Add=()=>{
    const[departments,setDepartments]=useState([])
    const [formData,setFormData]=useState({})
    const navigate=useNavigate()


    useEffect(()=>{
        const getDepartments=async ()=>{
            const departments=await fetchDepartments();
            setDepartments(departments)
        }
        getDepartments();

    },[])

    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name==='profileImage'){
            setFormData((prevData)=>({...prevData, [name]:files[0]}))
        }
        else{
            setFormData((prevData)=>({...prevData, [name]:value}))
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()


        const fromDataObj=new FormData()
        Object.keys(formData).forEach((key)=>{
            fromDataObj.append(key,formData[key])

        })
        console.log(fromDataObj)
        try{
            const token=localStorage.getItem("token");
            const response=await axios.post('http://localhost:3000/api/v1/employee/add',fromDataObj,{
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



    return(
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New employee</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input type='text' name='name' placeholder='Enter your name'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type='text' name='email' placeholder='Enter your email'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required/>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Employee Id</label>
                    <input type='text' name='employeeId' placeholder='employeId'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange} 
                    required
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Date Of Birth</label>
                    <input type='date' name='dob' placeholder='date of birth'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required/>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Gender</label>
                    <select name='gender'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required

                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='others'>Others</option>
                    </select>

                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Designation</label>
                    <input 
                    type='text' name='designation' placeholder='Designation' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Department</label>
                    <select
                    name='department'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required
                    >
                        <option>Select Department</option>
                        {departments.map((dep)=>(
                            <option key={dep._id} value={dep._id}>{dep.dept_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Martial Status</label>
                    <select name='martialStatus'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required>
                        <option>Select Status</option>
                        <option>Single</option>
                        <option>Married</option>
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Salary</label>
                    <input type='number' name='salary' placeholder='salary'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required
                     />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type='password' name='password' placeholder='*********'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required

                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select 
                    name='role'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required>
                        <option value=''>Select Role</option>
                        <option value='Admin'>Admin</option>
                        <option value='Employee'>Employee</option>

                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Upload Image</label>
                    <input type='file' name='profileImage' placeholder='upload image'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    onChange={handleChange}
                    accept='image/*' />
                </div>

            </div>
            <button type='submit'
            className='w-full mt-6 bg-blue-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-2xl'
            
            >Add Employee</button>
            </form>
        </div>
    )
}

export default Add