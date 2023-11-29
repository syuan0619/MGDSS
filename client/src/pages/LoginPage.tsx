
import { Link } from "react-router-dom";

import { TextField, Button, IconButton, InputAdornment, Input, InputLabel, FormControl, Box, Grid, OutlinedInput, FormControlLabel, Checkbox, backdropClasses, styled, createTheme, ThemeProvider, } from '@mui/material';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import background from "../assets/bgim2.png";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A6FFFF", //輸入時上面的字
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", //原本的框
    },
    "&:hover fieldset": {
      borderColor: "#A6FFFF", //滑鼠移到上面的效果
    },
    "&.Mui-focused fieldset": {
      borderColor: "#A6FFFF", //輸入時的框
    },
  },
});

const inputTextColor = {
  color: "#A6FFFF",
};

const inputLabelcolor = {
  color: "white",
};

const fromControltheme = createTheme({
  //fromControl的CSS
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#A6FFFF", //輸入時上面的字
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "blue",
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", //原本的框
            },
            "&:hover fieldset": {
              borderColor: "#A6FFFF", //滑鼠移到上面的效果
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A6FFFF", //輸入時的框
            },
          },
        },
      },
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00CACA",
  "&:hover": {
    backgroundColor: "#D9B300",
  },
  borderRadius: "10px",
}));

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
        <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          display: "flex",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Link to="/">回到Home</Link>
        <h1>肌無力症病病例管理系統</h1>

        <Box
          sx={{
            width: "36%",
            height: "60%",
            textAlign: "center",
            borderRadius: "20px",
            position: "absolute",
            left: "32%",
            top: "25%",
            display: "flex",
            border: "2px solid white",
            background: "transparent",
            color: "white",
            backdropFilter: "blur(30px)",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
              height: "100%",
              marginLeft: "1rem",
              marginRight: "1rem",
              color: "white",
              marginTop: "3.5rem",
            }}
          >
            <h1>
              <b>登入</b>
            </h1>
            <CssTextField
              inputProps={{
                sx: { ...inputTextColor },
              }}
              InputLabelProps={{
                sx: { ...inputLabelcolor },
              }}
              fullWidth
              label="帳號"
              variant="outlined"
              id="account"
              size="small"
            />
            <p />

            <ThemeProvider theme={fromControltheme}>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ ...inputLabelcolor }}
                >
                  密碼
                </InputLabel>
                <OutlinedInput
                  inputProps={{
                    sx: { ...inputTextColor },
                  }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ ...inputLabelcolor }}
                        aria-label="toggle password visibility"
                        onClick={
                          handleClickShowPassword
                        }
                        onMouseDown={
                          handleMouseDownPassword
                        }
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
                  label="Password"
                />
              </FormControl>
              <p />
            </ThemeProvider>

            return (
            <>
              <div style={{ backgroundImage: `url(${background})`, display: 'flex', backgroundSize: 'cover', width: "100%", height: "100vh", backgroundRepeat: 'no-repeat', alignItems: 'center', justifyContent: 'center' }}>

                <Box sx={{
                  width: '36%',
                  height: '60%',
                  textAlign: 'center',
                  borderRadius: '20px',
                  display: "flex",
                  border: '2px solid white',
                  background: 'transparent',
                  color: 'white',
                  backdropFilter: 'blur(30px)',

                        < ColorButton fullWidth variant="contained">
                  登入
                </ColorButton>
                <p />

                <Box sx={{
                  textAlign: 'center',
                  width: '100%',
                  height: "100%",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  color: 'white',
                  marginTop: '3.5rem'

                }}>


                  <h1><b>登入</b></h1>
                  <CssTextField
                    inputProps={{
                      sx: { ...inputTextColor }
                    }}
                    InputLabelProps={{
                      sx: { ...inputLabelcolor }
                    }}
                    fullWidth label="帳號" variant="outlined" id="account" size="small" /><p />


                  <ThemeProvider theme={fromControltheme}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel htmlFor="outlined-adornment-password" sx={{ ...inputLabelcolor }}>密碼</InputLabel>
                      <OutlinedInput
                        inputProps={{
                          sx: { ...inputTextColor }
                        }}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              sx={{ ...inputLabelcolor }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl><p />
                  </ThemeProvider>


                  <Grid sx={{ flexGrow: 1, display: "flex" }} container spacing={1} columns={2} >
                    <Grid item xs={1}>
                      <CssTextField
                        inputProps={{
                          sx: { ...inputTextColor }
                        }}
                        InputLabelProps={{
                          sx: { ...inputLabelcolor }
                        }}
                        fullWidth label="醫師編號" variant="outlined" id="account" size="small" /><p />
                    </Grid>


                    <Grid item xs={1}>
                      <ThemeProvider theme={fromControltheme}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel htmlFor="outlined-adornment-password" sx={{ ...inputLabelcolor }}>醫師授權碼</InputLabel>
                          <OutlinedInput
                            inputProps={{
                              sx: { ...inputTextColor }
                            }}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  sx={{ ...inputLabelcolor }}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl><p />
                      </ThemeProvider>
                    </Grid>
                  </Grid>


                  <FormControlLabel control={<Checkbox sx={{
                    color: '#A6FFFF',
                    '&.Mui-checked': {
                      color: '#A6FFFF',
                    },
                  }} />} label="醫事卡"
                  /><p />


                  <ColorButton onClick={() => { window.location.href = "./Patient" }} fullWidth variant="contained" >登入</ColorButton><p />


                  <Grid sx={{ flexGrow: 1, display: "flex" }} container spacing={0} columns={4} >
                    <Grid item xs={1} sx={{ alignItems: "center" }}>
                      忘記密碼<p />
                    </Grid>
                    <Grid item xs={2}>


                    </Grid>
                    <Grid item xs={1}>
                      <Link to="/regiest" >註冊</Link>
                    </Grid>
                  </Grid>


                </Box>
              </Box>
            </div>
          </>
          );
};
          // }

          export default LoginPage;
