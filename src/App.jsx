import {Routes,Route,Navigate, BrowserRouter} from 'react-router-dom';
import AdminDashBoard from './pages/AdminDashboard';
import EmployeeDashBoard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import  './App.css';
import PrivateRoute from './utils/PrivateRoute';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboards/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to ='/admin-dashboard'/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoute>
            <RoleBaseRoutes requiredRole={["Admin"]}>
              <AdminDashBoard />
            </RoleBaseRoutes>
          </PrivateRoute>
          
          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>

           


          </Route>
          {/* <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route> */}

        

        <Route path="/employee-dashboard" element={<EmployeeDashBoard />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
