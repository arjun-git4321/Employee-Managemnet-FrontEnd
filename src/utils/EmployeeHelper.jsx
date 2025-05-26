import axios from 'axios'
import { useNavigate } from 'react-router-dom'



 export const columns=[
    {
        name:"S No",
        selector:(row)=>row.sno,
        width:"70px"
        
    },
    {
        name:" Name",
        selector:(row)=>row.name,
        sortable:true,
        width:"130px"
    },
    {
        name:"Image",
        selector:(row)=>row.profileImage,
        width:"100px"
    },
    {
        name:"Department",
        selector:(row)=>row.dept_name,
        width:"120px"
    },
    {
        name:"DOB",
        selector:(row)=>row.dob,
        sortable:true,
        width:"130px"

    },
    {
        name:"Action",
        selector:(row)=>row.action,
        center:"true"
    }

]

export const fetchDepartments=async()=>{
    let departments
    try{
        const token=localStorage.getItem("token")
        const response=await axios.get('http://localhost:3000/api/v1/departments/',{
            headers:{
                "Authorization":`Bearer ${token}`
                
            }
        })
        console.log(response.data)
        if(response.data.success){
            departments=response.data.departments
            

        }
    }

    catch(error){
        console.log("API Eror",error)
        if(error.response && !error.response.data.success){
            alert(error.response.data.error);
        }

    }
    return departments
}


 export const EmployeeButtons=({Id})=>{
    const navigate=useNavigate();
    return(
        <div className='flex space-x-3 w-70px'>
            <button className='px-4 py-1 bg-blue-300 rounded'
                onClick={()=> navigate(`/admin-dashboard/employees/${Id}`)}
            
            >View</button>
            <button className='px-4 py-1 bg-red-600 text-white rounded' 
            
            >Edit</button>
            <button className='px-4 py-1 bg-red-600 text-white rounded' 
            
            >Salary</button>
            <button className='px-4 py-1 bg-yellow-600 text-white rounded'
                // onClick={()=>handleDelete(Id)}
            
            >Leave</button>

        </div>
    )
}




// export default EmployeeButtons;