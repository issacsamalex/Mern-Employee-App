import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from "react-hot-toast";


const Unauthorized = () => {

    const [alert, setAlert] = useState('')

    useEffect(()=>{
        const alertmsg = toast.error('Access denied', {id: 'Unauthorized', position: 'bottom-right'})
        setAlert(alertmsg)
    }, [])
  return (
    <div>
        <p>{alert}</p>
    </div>
  )
    
  
}

export default Unauthorized