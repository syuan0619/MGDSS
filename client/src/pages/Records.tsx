import {
  Box,
  Button,
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
      <div className="container">
        <div className="top">
          <div className="context">
            <div className="topinnercontext">
              <ArrowBackRounded
                sx={{ fontSize: "3rem", color: "#0080FF" }}
              ></ArrowBackRounded>

              {/* <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#FF8000" }}
              >
                新增電生理訊號量表
              </Button> */}
            </div>
          </div>
        </div>

        <div className="left">
          <div className="context">
            <div className="innercontext">
              <h1>病患資料</h1>
              <p />
              <p>
                <TextField
                  label="ID:"
                  id="ID#"
                  defaultValue="#ID"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="姓名:"
                  id="name"
                  defaultValue="name"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  id="DOB"
                  defaultValue="2000/01/01"
                  size="small"
                  label="生日:"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="性別:"
                  id="sex"
                  defaultValue=" "
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="年齡:"
                  id="age"
                  defaultValue="10"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="身高:"
                  id="height"
                  defaultValue="170"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="體重:"
                  id="weight"
                  defaultValue="50"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="狀態:"
                  id="status"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="其他:"
                  id="other"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="初診日期:"
                  id="attackDate"
                  defaultValue="2020/01/01"
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="初始症狀:"
                  id="beginSymptom"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="其他醫院病歷:"
                  id="otherHospitalRecord"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="其他疾病:"
                  id="otherDisease"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
              <p>
                <TextField
                  label="其他藥物:"
                  id="otherMedicine"
                  defaultValue=""
                  size="small"
                  sx={{ width: "10rem" }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="context">
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ width: "100%", height: "100%", borderRadius: "10px" }}
            >
              <h1>Bloodtest</h1>
              <TextField
                label="測試日期:"
                id="testDate"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField
                label="ACHR:"
                id="ACHR"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField
                label="TSH:"
                id="TSH"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField
                label="Free Thyroxine:"
                id="freeThyroxine"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField
                label="ANA:"
                id="ANA"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />

              <TextField
                label="UricAcid:"
                id="uricAcid"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
            </Paper>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
};
export default Records;
