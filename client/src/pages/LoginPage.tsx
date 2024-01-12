import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Grid,
  OutlinedInput,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import fjuicon from "../assets/fju.png";
import { useState } from "react";
import "../style/LoginPage.css";

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

const ColorButton = styled(Button)(() => ({
  backgroundColor: "#00CACA",
  "&:hover": {
    backgroundColor: "	#008888",
  },
  borderRadius: "10px",
}));

const LoginPage = () => {
  //PreLoading Animation
  // const [loading, setloading] = useState(false);
  // const router = router();
  // useEffect(() => {
  //   setloading(true);
  //   setTimeout(() => {
  //     setloading(false);
  //   }, 600);
  // }, []);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const [form, setForm] = useState({
    account: "",
    password: "",
  });

  const loginInput = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  function onSubmit() {
    console.log([form, setForm]);
  }

  return (
    <>
      <div className="background">
        <div className="spinnerwapper">
          <div className="spinner"></div>
        </div>

        <div className="loginbox">
          <div className="loginconcext">
            <div>
              <img src={fjuicon} width={"60rem"}></img>
              <p />
            </div>
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
              size="small"
              name="account"
              value={form.account}
              onChange={loginInput}
            />
            <p />

            <ThemeProvider theme={fromControltheme}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ ...inputLabelcolor }}
                >
                  密碼
                </InputLabel>
                <OutlinedInput
                  name="password"
                  value={form.password}
                  onChange={loginInput}
                  inputProps={{
                    sx: { ...inputTextColor },
                  }}
                  type={showPassword ? "text" : "password"}
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
              </FormControl>
              <p />
            </ThemeProvider>

            <p />
            <ColorButton onClick={onSubmit} fullWidth variant="contained">
              登入
            </ColorButton>
            <p />

            <Grid
              sx={{ flexGrow: 1, display: "flex" }}
              container
              spacing={0}
              columns={2}
            >
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "1vh",
                  justifyContent: "left",
                }}
              >
                <p className="text">忘記密碼</p>
              </Grid>

              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "1vh",
                  justifyContent: "right",
                }}
              >
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <p className="text">註冊</p>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};
// }

export default LoginPage;
