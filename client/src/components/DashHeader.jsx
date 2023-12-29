import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import React from 'react'
import { Button } from '@mui/material'
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const DashHeader = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        await axios.get('http://localhost:3001/auth/logout')
        .then((response) => {
            toast.success(response.data.message, {position:"top-right"})
            setAuth({});
            navigate('/');
        }).catch(error => console.log(error))
        
    }

  return (
    <header className='dash-header'>
        <div className='dash-header__container'>
            <h1>Employee Dashboard</h1>
            <nav className='dash-header__nav'>
                <Button id='ctaprimary' variant='contained'><Link to={'/dash/employees/add'} style={{ textDecoration: "none", color:"white" }} >Employee Form</Link></Button>
                <Button onClick={logout}><Link style={{ textDecoration: "none", color:"white" }}>Log out</Link></Button>
            </nav>
        </div>
    </header>
  )
}

export default DashHeader