import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Button } from '@mui/material'
import toast from 'react-hot-toast';

const DashHeader = () => {

    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        toast.success('logged out successfully', {position:"top-right"})
        navigate('/');
    }

  return (
    <header className='dash-header'>
        <div className='dash-header__container'>
            <h1>Employee Dashboard</h1>
            <nav className='dash-header__nav'>
                <Button id='ctaprimary' variant='contained'><Link to={'/dash/employees/add'} style={{ textDecoration: "none", color:"white" }} >Employee Form</Link></Button>
                <Button onClick={logout} ><Link style={{ textDecoration: "none", color:"white" }}>Log out</Link></Button>
            </nav>
        </div>
    </header>
  )
}

export default DashHeader