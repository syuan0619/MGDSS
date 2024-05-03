import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import fjuicon from "../../assets/fju.png";
import { useState } from "react";
import "./LoginPage.css";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white", //輸入時上面的字
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", //原本的框
    },
    "&:hover fieldset": {
      borderColor: "white", //滑鼠移到上面的效果
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", //輸入時的框
    },
  },
});

const inputTextColor = {
  color: "white",
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
            color: "white", //輸入時上面的字
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "blue",
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", //原本的框
            },
            "&:hover fieldset": {
              borderColor: "white", //滑鼠移到上面的效果
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", //輸入時的框
            },
          },
        },
      },
    },
  },
});

const ColorButton = styled(Button)(() => ({
  backgroundColor: "#73cfff",
  "&:hover": {
    backgroundColor: "#99DBFF",
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

  const loginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await api.post("/account/login", null, {
        params: {
          email: form.account,
          password: form.password,
        },
      });
      sessionStorage.setItem("userData", JSON.stringify(response.data.account));
      const userDataString = sessionStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const isVerified = userData ? userData.isVerified : null;

      if (isVerified == false) {
        alert("帳號未驗證，請與管理者聯絡!");
      } else {
        if (
          response.data.account.role === "doctor" ||
          response.data.account.role === "nurse"
        ) {
          navigate(`/patient`, { state: { data: response.data } });
        } else if (response.data.account.role === "admin") {
          navigate(`../backstage`, { state: { data: response.data } });
        } else {
          alert("帳號或密碼錯誤!");
        }
      }
    } catch (error) {
      alert("帳號或密碼錯誤!");
    }
  };
  return (
    <>
      <div className="background">
        <div className="spinnerwapper">
          <div className="spinner"></div>
        </div>

        <div className="loginbox">
          <div>
            <img src={fjuicon} width={"60rem"}></img>
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
            label="電子郵件"
            type="email"
            variant="outlined"
            size="small"
            name="account"
            value={form.account}
            onChange={loginInput}
          />
          <form>
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
                  autoComplete="new-password"
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
            </ThemeProvider>
          </form>
          <ColorButton onClick={onSubmit} fullWidth variant="contained">
            登入
          </ColorButton>

          <div className="loginboxbottom">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <h3 className="text">註冊</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
// }

export default LoginPage;
