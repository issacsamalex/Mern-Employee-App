import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const EmployeesListUser = () => {
  const [employees, setEmployees] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  
  const EMPLOYEE_URL = '/dash/employees';

  useEffect(()=> {
    if(!localStorage.getItem('accessToken')){
      navigate('/')
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get(EMPLOYEE_URL);
      setEmployees(response.data);
    };
    fetchData();
  }, []);

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
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesListUser;
