import React from 'react'
import { Grid, TextField, Button, Typography } from "@mui/material";
import './updateEmployee.css'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UpdateEmployee = () => {
    const initialValue = {
        name: "",
        position: "",
        location: "",
        salary: ""
    }
    const {id} = useParams();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(initialValue);
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEmployees({...employees, [name]:value})
    }

    useEffect(()=>{
        axiosPrivate.get(`http://localhost:3001/dash/employees/update/${id}`)
        .then((response)=>{
            setEmployees(response.data)
        }).catch((error) => console.log(error))
    }, [id, axiosPrivate])

    const submitHandler = async () => {
        await axiosPrivate.put(`http://localhost:3001/dash/employees/update/${id}`, employees)
        .then((response) => {
            toast.success(response.data.message, {position:"top-right"})
            navigate('/dash/employees')
        })
    }

  return (
    <>
    <div className="outer">
        <Grid item xs={12} className="header">
          <Typography variant="h4">Update Employee Details</Typography>
        </Grid>
        <Grid item xs={12} className="header1">
          <Typography variant="caption">Please update your details below</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Name" name='name' value={employees.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Designation" name='position' value={employees.position} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Location" name='location' value={employees.location} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Salary" name='salary' value={employees.salary} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button id="ctaprimary" variant="contained" onClick={submitHandler}>Update</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default UpdateEmployee