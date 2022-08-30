import React from 'react'
import { useState, useRef, useEffect } from 'react'

import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from '@mui/material/styles';

import { polish as lang } from '../../lang/language';
import { display } from '@mui/system';

const BoxMain = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'100%',
    paddingTop: '20px',
  }));
  
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;


const Login = () => {
  const emailRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);


  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [errMsg, setErrMsg] = useState("");


  useEffect( () => {
    emailRef.current.focus();
  },[])
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  

  ////////
  const handleSubmit =  async (event) => {
    event.preventDefault();

    const v3 = EMAIL_REGEX.test(email);
    if (!v3) {
      setEmailError(lang.emailErrorText)
      
      return;
    }
    setEmailError(false);
    const v4 = PWD_REGEX.test(pwd);
    if (!v4) {
      setPwdError(lang.pwdErrorText);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3500/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email, pwd})
      });
      if(!response.ok) {
        if(response.status === 401) {
          return await sendRefreshToken();
        }
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return await response.json();

    } catch (error) {
      console.log(error.stack());
      displayErr();
    }


    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('pwd'),
    });
    setEmailError(false);
    setPwdError(false)
    
  };

    
  return (
    <Container component="main" maxWidth="xs" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <BoxMain>
            <Typography component="h1" variant="h5" >
                {lang.loginHeader}
            </Typography>   
            {errMsg ? (
              <Alert sx={{ width: "100%", mt: 2 }} severity="error" aria-live="assertive">
                {errMsg}
              </Alert>
            ) : (
              ""
            )} 
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                autoFocus
                autoComplete="true"
                error = {emailError ? true : false}
                helperText= {emailError ? emailError : ''}
                fullWidth
                id="email"
                label={lang.emailLabel}
                margin="normal"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
                required
                value={email}
                />
                <FormControl sx={{ width: "100%", mt:2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                    {lang.pwdLabel}
                    </InputLabel>
                    <OutlinedInput
                    aria-describedby="pwdnote"
                    error = {pwdError ? true : false}
                    id="outlined-adornment-password"
                    name="pwd"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? (
                            <VisibilityOff />
                            ) : (
                            <Visibility />
                            )}
                        </IconButton>
                        </InputAdornment>
                    }
                    value={pwd}
                    />
                    {pwdError ? 
                    <FormHelperText id="pwdnote">{lang.pwdErrorText}</FormHelperText>
                    : ''}
                    
                </FormControl>
                <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="contained"
                >
                {lang.loginSubmitBtn}
                </Button>
            </Box>
            
            <Grid container >
              <Grid item xs={6} sx={{textAlign:'left'}}>
                <Link href="lostpassword" variant="body2">
                  {lang.forgotLnk}
                </Link>
              </Grid>
              <Grid item xs={6} sx={{textAlign:'right'}}>
                <Link href="register" variant="body2">
                  {lang.registerLnk}
                </Link>
              </Grid>
            </Grid>

        </BoxMain>
    </Container>
  )
}

export default Login