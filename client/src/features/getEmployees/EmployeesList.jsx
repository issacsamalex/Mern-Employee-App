import Button from "@mui/material/Button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./employeeList.css";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(()=> {
    if(!localStorage.getItem('accessToken')){
      navigate('/')
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get("http://localhost:3001/dash/employees");
      setEmployees(response.data);
    };
    fetchData();
  }, []);

  const deleteEmployee = async (employeeId) => {
    await axiosPrivate.delete(`http://localhost:3001/dash/employees/delete/${employeeId}`)
    .then((response)=>{
      setEmployees((prevEmployee)=> prevEmployee.filter((user)=> user._id !== employeeId))
      toast.success(response.data.message, {position:'top-right'})
    }).catch((error)=> console.log(error))
  }

  return (
    <>
      <h1 className="employee_header">EmployeesList</h1>
      <div className="employeeTable">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((value, index) => {
              return (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.position}</td>
                  <td>{value.location}</td>
                  <td>{value.salary}</td>
                  <td className="actionButtons">
                    <Button>
                      <Link
                        to={`/dash/employees/update/`+ value._id}
                        style={{ textDecoration: "none", color: "orange" }}
                      >
                        Edit
                      </Link>
                    </Button> 
                    <Button variant="contained" color="error" onClick={()=> deleteEmployee(value._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesList;
