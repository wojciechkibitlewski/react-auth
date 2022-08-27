import React from 'react'
import { useState, useRef, useEffect } from 'react'

import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { polish as lang } from '../../lang/language';

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


const LostPassword = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect( () => {
    emailRef.current.focus();
  },[])
  useEffect(() => {
    setErrMsg("");
  }, [email]);
  

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const v3 = EMAIL_REGEX.test(email);
        if (!v3) {
          setEmailError(lang.emailErrorText)
          
          return;
        }
        setEmailError(false);


        const data = new FormData(e.currentTarget);
        console.log({
            email: data.get('email'),
        });
        setEmailError(false);

    };
  return (
    <Container component="main" maxWidth="xs" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <BoxMain>
            <Typography component="h1" variant="h5" >
                {lang.forgotHeader}
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
                
                <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="contained"
                >
                {lang.forgotSubmitBtn}
                </Button>
            </Box>
            
            <Grid container >
              <Grid item xs sx={{textAlign:'left'}}>
                <Link href="login" variant="body2">
                  {lang.loginLnk}
                </Link>
              </Grid>
              <Grid item sx={{textAlign:'right'}}>
                <Link href="register" variant="body2">
                  {lang.registerLnk}
                </Link>
              </Grid>
            </Grid>

        </BoxMain>
    </Container>
  )
}

export default LostPassword