import React, { useEffect } from 'react'
import './addEmployee.css'
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useForm } from './useForm';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddEmployee = () => {


    const [value, handleChange] = useForm({
        name: "",
        position: "",
        location: "",
        salary: ""
    })

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    useEffect(()=> {
      if(!localStorage.getItem('accessToken')){
        navigate('/')
      }
    },[])


    const submitHandler = async () => {
        await axiosPrivate.post('/api/v1/dash/employees', value)
        .then((response) => {
            toast.success(response.data.message, {position:"top-right"})
            navigate('/dash/employees')
        }).catch(error => console.log(error))
    }


  return (
    <>
     <div className="outer">
        <Grid item xs={12} className="header">
          <Typography variant="h4">New Employee Form</Typography>
        </Grid>
        <Grid item xs={12} className="header1">
          <Typography variant="caption">Please enter your details below</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" required label="Name" name='name' value={value.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" required label="Designation" name='position' value={value.position} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Location" name='location' value={value.location} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField variant="outlined" label="Salary" name='salary' value={value.salary} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button id="ctaprimary" variant="contained" onClick={submitHandler}>Submit</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default AddEmployee