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
import PropTypes from "prop-types";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import "./RegisterPage.css";
import fjuicon from "../../assets/fju.png";
import { useState } from "react";
import { Margin } from "@mui/icons-material";

const StyledTabs = styled(
  (
    props //TabDashCSS
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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
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

const inputTextColor = {
  //TextFieldCSS
  color: "white",
};

const inputLabelcolor = {
  //TextFieldCSS
  color: "	white",
};

const ColorButton = styled(Button)(() => ({
  //ButtonCSS
  backgroundColor: "#73cfff",
  "&:hover": {
    backgroundColor: "#99DBFF",
  },
  borderRadius: "10px",
}));

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
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  //TAB
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
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

const RegisterPage = () => {
  const [value, setValue] = React.useState(0); //Tab

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const [showPassword, setShowPassword] = React.useState(false); //PasswordEye
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
        <div className="registerbox">
          <div>
            <img src={fjuicon} width={"60rem"}></img>
          </div>
          <p className="registertext">註冊</p>
          <div>
            <StyledTabs value={value} onChange={handleChange} centered>
              <StyledTab
                icon={<InventoryRoundedIcon />}
                iconPosition="start"
                label="醫生"
              />
              <StyledTab
                icon={<LocalHospitalRoundedIcon />}
                iconPosition="start"
                label="護士"
              />
            </StyledTabs>
          </div>

          <CustomTabPanel value={value} index={0} sx={{}}>
            {" "}
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
                        sx={{
                          ...inputLabelcolor,
                        }}
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
            <CssTextField
              inputProps={{
                sx: { ...inputTextColor },
              }}
              InputLabelProps={{
                sx: { ...inputLabelcolor },
              }}
              fullWidth
              label="醫師編號"
              variant="outlined"
              id="account"
              size="small"
              sx={{ marginBottom: "1rem" }}
            />
            <CssTextField
              inputProps={{
                sx: { ...inputTextColor },
              }}
              InputLabelProps={{
                sx: { ...inputLabelcolor },
              }}
              fullWidth
              label="醫師授權碼"
              variant="outlined"
              id="account"
              size="small"
              sx={{ marginBottom: "2rem" }}
            />
            <Link to="/">
              <ColorButton fullWidth variant="contained" onClick={onSubmit}>
                以醫生身分註冊
              </ColorButton>
            </Link>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
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
                        sx={{
                          ...inputLabelcolor,
                        }}
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

            <CssTextField
              inputProps={{
                sx: { ...inputTextColor },
              }}
              InputLabelProps={{
                sx: { ...inputLabelcolor },
              }}
              fullWidth
              label="護士編號"
              variant="outlined"
              id="account"
              size="small"
              sx={{ marginBottom: "1rem" }}
            />

            <CssTextField
              inputProps={{
                sx: { ...inputTextColor },
              }}
              InputLabelProps={{
                sx: { ...inputLabelcolor },
              }}
              fullWidth
              label="護士授權碼"
              variant="outlined"
              id="account"
              size="small"
              sx={{ marginBottom: "2rem" }}
            />

            <Link to="/">
              <ColorButton fullWidth variant="contained" onClick={onSubmit}>
                以護士身分註冊
              </ColorButton>
            </Link>
          </CustomTabPanel>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="registerboxbottom">返回登入</p>
          </Link>
        </div>
      </div>
    </>
  );
};
// }

export default RegisterPage;
