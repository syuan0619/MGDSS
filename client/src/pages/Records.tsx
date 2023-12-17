import {
  Box,
  Grid,
  Paper,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import "../style/Records.css";
import PropTypes from "prop-types";
import { ArrowBackRounded } from "@mui/icons-material";

function CustomTabPanel(props) {
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

const Records = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <div className="Sideheader">hello</div>
      <div className="wrapper">
        <div className="Sideleft">
          <h1>病患資料</h1>
          <p />
          <p>ID:</p>
          <p>姓名:</p>
          <p>生日:</p>
          <p>性別:</p>
          <p>年齡:</p>
          <p>身高:</p>
          <p>體重:</p>
          <p>狀態:</p>
          <p>其他:</p>
          <p>初診日期:</p>
          <p>初始症狀:</p>
          <p>其他醫院病歷:</p>
          <p>其他疾病:</p>
          <p>其他藥物:</p>

        </div>
        <div className="Sideright">
          <div className="card">1</div>
        </div>
      </div>
      <div className="claerfix"></div> */}
      <div className="container">
        <div className="top">
          <div className="context">
            <div className="topinnercontext">
              <ArrowBackRounded
                sx={{ fontSize: "3rem", color: "#0080FF" }}
              ></ArrowBackRounded>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="context">
            <div className="innercontext">
              <h1>病患資料</h1>
              <p />
              <p>
                ID:
                <TextField
                  required
                  id="id"
                  defaultValue="#ID"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                姓名:
                <TextField
                  required
                  id="id"
                  defaultValue="name"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                生日:
                <TextField
                  required
                  id="id"
                  defaultValue="2000/01/01"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                性別:
                <TextField
                  required
                  id="id"
                  defaultValue="不方便透漏"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                年齡:
                <TextField
                  required
                  id="id"
                  defaultValue="10"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                身高:
                <TextField
                  required
                  id="id"
                  defaultValue="170"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                體重:
                <TextField
                  required
                  id="id"
                  defaultValue="50"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                狀態:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                其他:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                初診日期:
                <TextField
                  required
                  id="id"
                  defaultValue="2020/01/01"
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                初始症狀:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                其他醫院病歷:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                其他疾病:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
              <p>
                其他藥物:
                <TextField
                  required
                  id="id"
                  defaultValue=""
                  size="small"
                  sx={{ width: "5rem" }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="context"></div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
};
export default Records;
