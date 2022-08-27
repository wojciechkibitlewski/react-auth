import React from 'react'
import { useRef, useState, useEffect } from "react";

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

const NAME_REGEX = /^([a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]\s*)+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameError, setNameError] = useState(false)
  
    const [surname, setSurname] = useState("");
    const [validSurname, setValidSurname] = useState(false);
    const [surnameError, setSurnameError] = useState(false)

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailError, setEmailError] = useState(false)

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdError, setPwdError] = useState(false);


    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchPwdError, setMatchPwdError] = useState(false);


    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
  
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      setValidName(NAME_REGEX.test(name));
    }, [name]);
  
    useEffect(() => {
      setValidSurname(NAME_REGEX.test(surname));
    }, [surname]);
  
    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);
  
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);
  
    useEffect(() => {
      setErrMsg("");
    }, [name, surname, email, pwd, matchPwd]);
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();

        const v1 = NAME_REGEX.test(name);
        if (!v1) {
          setNameError(lang.nameErrorText);
          return;
        }
        setNameError(false)

        const v2 = NAME_REGEX.test(surname);
        if (!v2) {
          setSurnameError(lang.surnameErrorText);
          return;
        }
        setNameError(false)

        const v3 = EMAIL_REGEX.test(email);
        if (!v3) {
          setEmailError(lang.emailErrorText);
          return;
        }
        setEmailError(false)

        const v4 = PWD_REGEX.test(pwd);
        if (!v4) {
          setPwdError(lang.pwdErrorText);
          return;
        }
        setPwdError(false)

        if (pwd !== matchPwd) {
          setMatchPwdError(lang.mathErrorText);
          return;
        }
        setMatchPwdError(false)
        

        const data = new FormData(e.currentTarget);
        console.log({
            name: data.get('name'),
            surname: data.get('surname'),
            email: data.get('email'),
            password: data.get('pwd'),
            math: data.get('math'),
            
        });
        setSuccess(true);
        setName("");
        setSurname("");
        setEmail("");
        setPwd("");
        setMatchPwd("");
    };

  return (
    <Container component="main" maxWidth="xs" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <BoxMain>
        {success ? (
            <Alert sx={{ width: "100%", mt: 2 }} severity="success">
              {lang.registerSuccess}  
              <Link href="login" variant="body2" ml={1}>
                  {lang.loginLnk}
              </Link>
              
            </Alert>
          ) : (
          <>
          <Typography component="h1" variant="h5" >
              {lang.registerHeader}
          </Typography>
          {errMsg ? (
            <Alert sx={{ width: "100%", mt: 2 }} severity="error">
              {errMsg}
            </Alert>
          ) : (
            ""
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
              autoFocus
              aria-invalid={validName ? "false" : "true"}
              error = {nameError ? true : false}
              helperText= {nameError ? nameError : ''}
              fullWidth
              id="name"
              label={lang.nameLabel}
              margin="normal"
              name="name"
              onChange={(e) => setName(e.target.value)}
              ref={userRef}
              required
              value={name}
              
              />
              <TextField
              aria-invalid={validSurname ? "false" : "true"}
              error = {surnameError ? true : false}
              helperText= {surnameError ? surnameError : ''}
              fullWidth
              id="surname"
              label={lang.surnameLabel}
              margin="normal"
              name="surname"
              onChange={(e) => setSurname(e.target.value)}
              ref={userRef}
              required
              value={surname}
              
              />
              <TextField
              autoComplete="email"
              aria-invalid={validEmail ? "false" : "true"}
              error = {emailError ? true : false}
              helperText= {emailError ? emailError : ''}
              fullWidth
              id="email"
              label={lang.emailLabel}
              margin="normal"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              ref={userRef}
              required
              value={email}
              />
              <FormControl sx={{ width: "100%", mt:2 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                  {lang.pwdLabel}
                  </InputLabel>
                  <OutlinedInput
                  aria-describedby="pwdnote"
                  aria-invalid={validPwd ? "false" : "true"}
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
                  <FormHelperText sx={{color: "red"}}>{lang.pwdErrorText}</FormHelperText>
                  : 
                  <FormHelperText id="pwdnote">{lang.pwdErrorText}</FormHelperText>
                  }
              </FormControl>
              <FormControl sx={{ width: "100%", marginTop:"20px" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-match">
                  {lang.mathLabel}
                  </InputLabel>
                  <OutlinedInput
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="pwdnote"
                  error = {matchPwdError ? true : false}
                  id="outlined-adornment-match"
                  label={lang.mathLabel}
                  name="matchPwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  value={matchPwd}
                  />
                  {matchPwdError ? 
                  <FormHelperText sx={{color: "red"}}>{lang.mathErrorText}</FormHelperText>
                  : 
                  ''
                  }
              </FormControl>
              <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
              >
              {lang.registerSubmitBtn }
              </Button>
          </Box>
          <Grid container >
              <Grid item xs sx={{textAlign:'left'}}>
              <Link href="lostpassword" variant="body2">
                  {lang.forgotLnk}
              </Link>
              </Grid>
              <Grid item sx={{textAlign:'right'}}>
              <Link href="login" variant="body2">
                  {lang.loginLnk}
              </Link>
              </Grid>
          </Grid>
          </>
          )}
        </BoxMain>
    </Container>
  )
}

export default Register