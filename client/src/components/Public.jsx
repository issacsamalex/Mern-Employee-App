import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  FormGroup,
  FormControl,
} from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { axiosPrivate } from "../api/axios";



const Public = () => {

  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async () => {
    try {
        const response = await axios.post('/auth', {username, password})
            if(response){
              const accessToken = response?.data?.token
              const refreshToken = response?.data?.refreshToken
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('refreshToken', refreshToken)
              
              
              const roles = response?.data?.user?.roles;
              setAuth({ username, password, roles, accessToken});
              setUserName('');
              setPassword('');
              navigate('/dash')
            }
            
            
    } catch (error) {
        if(!error?.response){
            setErrMsg('No Server Response');
        }else if (error.response?.status === 400){
            setErrMsg('Missing Username or Password');
        }else if (error.response?.status === 401){
            setErrMsg('Unauthorized');
        }else {
            setErrMsg('Login Failed');
        }
    }
  };

  return (
    <section className="public">
      <Typography variant="h3">Welcome to Employee Dashboard</Typography>
      <div className="outercontainer">
        <Container className="outerbox">
          <Typography variant="h4">Please Log In</Typography>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <FormGroup>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    variant="outlined"
                    label="username"
                    name="username"
                    fullWidth
                    ref={userRef}
                    onChange={(event) => setUserName(event.target.value)}
                    value={username}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    variant="outlined"
                    label="password"
                    name="password"
                    fullWidth
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                  />
                </Grid>
                <Grid className="buttoncontainer" item xs={12} sm={12} md={12}>
                  <Button onClick={handleSubmit} id="ctaprimary" variant="contained">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Log in
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </FormGroup>
        </Container>
      </div>
    </section>
  );
};

export default Public;
