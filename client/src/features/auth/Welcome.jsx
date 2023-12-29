import { Link } from 'react-router-dom'
import React from 'react'
import { Button, Typography } from '@mui/material'

const Welcome = () => {
  return (
    <section className='welcome'>
        <Typography variant='h4'>Welcome to Dashboard</Typography>
        <Button id='ctaprimary' variant="contained"><Link to={'/dash/employees'} style={{ textDecoration: "none", color:"white" }} >View Employee List</Link></Button>
    </section>
  )
}

export default Welcome