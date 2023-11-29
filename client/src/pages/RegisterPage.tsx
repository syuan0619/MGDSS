import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Input,
    InputLabel,
    FormControl,
    Box,
    Grid,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
    backdropClasses,
    styled,
    createTheme,
    ThemeProvider,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import background from "../assets/bgim2.png";

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
        backgroundColor: "#FFD306",
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    //TabCSS
    ({ theme }) => ({
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(18),
        marginRight: theme.spacing(1),
        color: "rgba(255, 255, 255, 0.7)",
        "&.Mui-selected": {
            color: "#A6FFFF",
        },
        "&.Mui-focusVisible": {
            backgroundColor: "rgba(100, 95, 228, 0.32)",
        },
    })
);

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
    //TextFieldCSS
    color: "#A6FFFF",
};

const inputLabelcolor = {
    //TextFieldCSS
    color: "white",
};

const ColorButton = styled(Button)(({ theme }) => ({
    //ButtonCSS
    backgroundColor: "#00CACA",
    "&:hover": {
        backgroundColor: "#D9B300",
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

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

const RegisterPage = () => {
    const [value, setValue] = React.useState(0); //Tab

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPassword, setShowPassword] = React.useState(false); //PasswordEye
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
                            width: "100%",
                            height: "100%",
                            marginTop: "2rem",
                        }}
                    >
                        <h1>
                            <b>註冊</b>
                        </h1>
                        <p />
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example"
                            centered
                        >
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
                            <StyledTab
                                icon={<RecentActorsRoundedIcon />}
                                iconPosition="start"
                                label="備用"
                            />
                        </StyledTabs>
                        <Box
                            sx={{
                                marginLeft: "1rem",
                                marginRight: "1rem",
                                color: "white",
                            }}
                        >
                            <CustomTabPanel value={value} index={0}>
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            ...inputLabelcolor,
                                                        }}
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
                                />
                                <p />

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
                                />
                                <p />

                                <ColorButton fullWidth variant="contained">
                                    以醫生身分註冊
                                </ColorButton>
                                <p />
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            ...inputLabelcolor,
                                                        }}
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
                                />
                                <p />

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
                                />
                                <p />

                                <ColorButton fullWidth variant="contained">
                                    以護士身分註冊
                                </ColorButton>
                                <p />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            ...inputLabelcolor,
                                                        }}
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

                                <CssTextField
                                    inputProps={{
                                        sx: { ...inputTextColor },
                                    }}
                                    InputLabelProps={{
                                        sx: { ...inputLabelcolor },
                                    }}
                                    fullWidth
                                    label="編號"
                                    variant="outlined"
                                    id="account"
                                    size="small"
                                />
                                <p />

                                <CssTextField
                                    inputProps={{
                                        sx: { ...inputTextColor },
                                    }}
                                    InputLabelProps={{
                                        sx: { ...inputLabelcolor },
                                    }}
                                    fullWidth
                                    label="授權碼"
                                    variant="outlined"
                                    id="account"
                                    size="small"
                                />
                                <p />

                                <ColorButton fullWidth variant="contained">
                                    預留欄位
                                </ColorButton>
                                <p />
                            </CustomTabPanel>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};
// }

export default RegisterPage;
