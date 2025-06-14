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
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import AddSalary from './components/salary/Add'
import Views from './components/salary/Views'
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
            <Route path="/admin-dashboard/employees" element={<List/>}></Route>
            <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<Views/>}></Route>
            <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>





          </Route>
          {/* <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route> */}

        

        <Route path="/employee-dashboard" element={<EmployeeDashBoard />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
