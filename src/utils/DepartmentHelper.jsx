import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const colums=[
    {
        name:"S No",
        selector:(row)=>row.sno,
    },
    {
        name:"Department Name",
        selector:(row)=>row.dept_name,
    },
    {
        name:"Action",
        cell:(row)=>row.action
    }

]

export const DepartmentButtons=({Id,onDepartmentDelete})=>{
    const navigate=useNavigate();

    const handleDelete=async(id)=>{
        const confirm=window.confirm("Do you want to delete")
        if(confirm){
            try{
                const token=localStorage.getItem("token")
                const response=await axios.delete(`http://localhost:3000/api/v1/departments/${id}`,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                        
                    }
                })
                console.log(response.data)
                if(response.data.success){
                    onDepartmentDelete(id)
    
                }
            }
            catch(error){
                console.log("API Eror",error)
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error);
                }
    
            }
        }
    }
    return(
        <div className='flex space-x-3'>
            <button className='px-4 py-1 bg-blue-300 rounded'
                onClick={()=> navigate(`/admin-dashboard/departments/${Id}`)}
            
            >Edit</button>
            <button className='px-4 py-1 bg-red-600 text-white rounded' 
                onClick={()=>handleDelete(Id)}
            
            >delete</button>

        </div>
    )
}

