import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import EmployeesList from "./features/getEmployees/EmployeesList";
import AddEmployee from "./features/addEmployee/AddEmployee";
import UpdateEmployee from "./features/updateEmployee/UpdateEmployee";
import Unauthorized from "./components/Unauthorized";
import AdminAuth from "./components/AdminAuth";
import EmployeesListUser from "./features/getEmployees/EmployeesListUser";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route element={<AdminAuth allowedRoles={["Admin", "User"]} />}>
        <Route path="/dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route element={<AdminAuth allowedRoles={["Admin"]} />}>
            <Route path="/dash/employees" element={<EmployeesList />}></Route>
          </Route>

          <Route element={<AdminAuth allowedRoles={["User"]} />}>
            <Route
              path="/dash/employees/userview"
              element={<EmployeesListUser/>}
            ></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/dash/employees/add" element={<AddEmployee />}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route
              path="/dash/employees/update/:id"
              element={<UpdateEmployee />}
            ></Route>
          </Route>

          <Route
            path="/dash/employees/unauthorized"
            element={<Unauthorized />}
          ></Route>

        </Route>
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
