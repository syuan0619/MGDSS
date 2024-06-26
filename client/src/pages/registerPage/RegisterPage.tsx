"use client";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Box,
  OutlinedInput,
  styled,
  createTheme,
  ThemeProvider,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import "./RegisterPage.css";
import fjuicon from "../../assets/fju.png";
import { useState } from "react";
import api from "../../api";
import { Account } from "../../types/Account";

const StyledTabs = styled(
  (
    props: {
      children?: React.ReactNode;
      value: number;
      onChange: (event: React.SyntheticEvent, newValue: number) => void;
    } //TabDashCSS
  ) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  )
)({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 50,
    width: "100%",
    backgroundColor: "	white",
  },
});

const StyledTab = styled((props: { label: string }) => (
  <Tab disableRipple {...props} />
))(
  //TabCSS
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    color: "	#D2E9FF",
    "&.Mui-selected": {
      color: "white",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

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

function CustomTabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  //Tab
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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

const RegisterPage = () => {
  const [value, setValue] = React.useState(0); //Tab

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [showPassword, setShowPassword] = React.useState(false); //PasswordEye
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const [form, setForm] = useState<Account>({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    authCode: "",
    isVerified: false,
  });

  const loginInput = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const selectRole = (text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      role: text,
    }));
  };
  const onSubmit = () => {
    console.log(form);
    api.post("/account/register", form).then((res) => {
      console.log(res.data);
    });
    alert("註冊成功，請等待管理員審核");
  };
  return (
    <>
      <div className="background">
        <div className="registerbox">
          <div>
            <img src={fjuicon} width={"60rem"}></img>
          </div>
          <div className="registertext">註冊</div>
          <div>
            <StyledTabs value={value} onChange={handleChange}>
              <StyledTab
                icon={<InventoryRoundedIcon />}
                iconPosition="start"
                label="醫師"
                onClick={() => selectRole("doctor")}
              />
              <StyledTab
                icon={<LocalHospitalRoundedIcon />}
                iconPosition="start"
                label="護理師"
                onClick={() => selectRole("nurse")}
              />
            </StyledTabs>
          </div>

          <CustomTabPanel value={value} index={0}>
            <form>
              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                label="姓名"
                variant="outlined"
                name="name"
                size="small"
                value={form.name}
                onChange={loginInput}
                sx={{ marginBottom: "1rem" }}
              />
              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                type="email"
                label="電子郵件"
                variant="outlined"
                size="small"
                name="email"
                value={form.email}
                onChange={loginInput}
                sx={{ marginBottom: "1rem" }} //這個CustomTabPanel的間距很難改所以用sx硬寫比較快
              />
              <ThemeProvider theme={fromControltheme}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: "1rem" }}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ color: "white" }}
                  >
                    密碼
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={form.password}
                    onChange={loginInput}
                    autoComplete="new-password"
                    aria-hidden="true"
                    inputProps={{
                      sx: { color: "white" },
                    }}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            color: "white",
                          }}
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
              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                label="醫師授權碼"
                variant="outlined"
                name="authCode"
                size="small"
                value={form.authCode}
                onChange={loginInput}
                sx={{ marginBottom: "2rem" }}
              />
              <Link to="/">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    backgroundColor: "#73cfff",
                    "&:hover": {
                      backgroundColor: "#99DBFF",
                    },
                    borderRadius: "10px",
                  }}
                >
                  以醫師身分註冊
                </Button>
              </Link>{" "}
            </form>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <form>
              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                label="姓名"
                variant="outlined"
                size="small"
                name="name"
                value={form.name}
                onChange={loginInput}
                sx={{ marginBottom: "1rem" }}
              />
              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                label="電子郵件"
                type="email"
                variant="outlined"
                size="small"
                name="email"
                value={form.email}
                onChange={loginInput}
                sx={{ marginBottom: "1rem" }}
              />

              <ThemeProvider theme={fromControltheme}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: "1rem" }}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ color: "white" }}
                  >
                    密碼
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={form.password}
                    onChange={loginInput}
                    autoComplete="new-password"
                    aria-hidden="true"
                    inputProps={{
                      sx: { color: "white" },
                    }}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            color: "white",
                          }}
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

              <CssTextField
                inputProps={{
                  sx: { color: "white" },
                }}
                InputLabelProps={{
                  sx: { color: "white" },
                }}
                fullWidth
                label="護理師授權碼"
                variant="outlined"
                name="authCode"
                size="small"
                value={form.authCode}
                onChange={loginInput}
                sx={{ marginBottom: "2rem" }}
              />

              <Link to="/">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    backgroundColor: "#73cfff",
                    "&:hover": {
                      backgroundColor: "#99DBFF",
                    },
                    borderRadius: "10px",
                  }}
                >
                  以護理師身分註冊
                </Button>
              </Link>
            </form>
          </CustomTabPanel>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="registerboxbottom">返回登入</div>
          </Link>
        </div>
      </div>
    </>
  );
};
// }

export default RegisterPage;
