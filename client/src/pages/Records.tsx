import {
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Tab,
  TableCell,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import "../style/Records.css";
// import PropTypes from "prop-types";
import { ArrowBackRounded } from "@mui/icons-material";
import Patient from "../types/Schema";
import api from "../api";
import { useEffect, useState } from "react";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const Records = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [patients, setPatients] = useState<Patient[]>([]);
  const data = async () => {
    const response = await api.get("/readAllPatient");
    setPatients(response.data);
  };

  console.log(patients);
  patients.map((patient) => console.log(patient["info"]));

  useEffect(() => {
    data();
  }, []);
  return (
    <>
      <div className="container">
        <div className="top">
          <div className="topcontext">
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
              {patients.map((patient) => (
                <>
                  <p>
                    ID:
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={patient["info"]["ID#"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>

                  <p>
                    姓名:
                    <TextField
                      defaultValue={patient["info"]["name"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    生日:
                    <TextField
                      defaultValue={patient["info"]["DOB"]}
                      size="small"
                      label="生日:"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    性別:
                    <TextField
                      defaultValue={patient["info"]["sex"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    年齡:
                    <TextField
                      defaultValue={patient["info"]["age"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    身高:
                    <TextField
                      defaultValue={patient["info"]["height"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    體重:
                    <TextField
                      defaultValue={patient["info"]["weight"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    狀態:
                    <TextField
                      defaultValue={patient["info"]["status"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    其他:
                    <TextField
                      defaultValue={patient["info"]["other"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    初診日期:
                    <TextField
                      defaultValue={patient["info"]["attackDate"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    初始症狀:
                    <TextField
                      defaultValue={patient["info"]["beginSymptom"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    其他醫院病歷:
                    <TextField
                      defaultValue={patient["info"]["otherHospitalRecord"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    其他疾病:
                    <TextField
                      defaultValue={patient["info"]["otherDisease"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                  <p>
                    其他藥物:
                    <TextField
                      defaultValue={patient["info"]["otherMedicine"]}
                      size="small"
                      sx={{ width: "10rem" }}
                    />
                  </p>
                </>
              ))}
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
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField
                label="ACHR:"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField label="TSH:" defaultValue="" sx={{ width: "20rem" }} />
              <p />
              <TextField
                label="Free Thyroxine:"
                defaultValue=""
                sx={{ width: "20rem" }}
              />
              <p />
              <TextField label="ANA:" defaultValue="" sx={{ width: "20rem" }} />
              <p />

              <TextField
                label="UricAcid:"
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
