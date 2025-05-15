import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

const EditDepartment=()=>{
    const {id}=useParams()
    const [department,setDepartment]=useState([])
    const [depLoading,setDepLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
            const fetchDepartments=async()=>{
                setDepLoading(true)
                try{
                    const token=localStorage.getItem("token")
                    const response=await axios.get(`http://localhost:3000/api/v1/departments/${id}`,{
                        headers:{
                            "Authorization":`Bearer ${token}`
                            
                        }
                    })
                    console.log(response.data)
                    if(response.data.success){
                        setDepartment(response.data.department)
    
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
        },[]);

        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                const token=localStorage.getItem("token");
                const response=await axios.put(`http://localhost:3000/api/v1/departments/${id}`,department,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                console.log(response);
    
                if(response.data.success){
                    navigate('/admin-dashboard/departments')
                }
    
            }
            catch(error){
                if(error.response && error.response.data.error){
                    alert(error.response.data.error)
                }
    
            }
    
        }

        const handleChange=(e)=>{
            const {name,value}=e.target;
            setDepartment({...department,[name]:value})
        }


    return(
        <>{depLoading ? <div>Loading...</div> :
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold b-6">Edit Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <label htmlFor="dept_name" className="text-sm font-medium text-gray-700">Department</label>
                    <input type="text" name="dept_name" value={department.dept_name}  placeholder="Enter dep name" className="mt-1 w-full p-2 border-ray-300 border rounded-md"
                    onChange={handleChange}
                    required
                    />
                
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" value={department.description} placeholder="description" className="mt-1 w-full p-2 border-ray-300 border rounded-md" rows="4"
                    onChange={handleChange}
                    />
                </div>
                <button type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                
                >Edit Department</button>
            </form>

        </div>
        }</>
    )
}

export default EditDepartment;