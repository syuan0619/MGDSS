import {
  Box,
  Button,
  Grid,
  makeStyles,
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
import { Link } from "react-router-dom";

const Records = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  // const data = async () => {
  //   const response = await api.get("/readAllPatient");
  //   setPatients(response.data);
  // };

  // let p1;
  // patients.map((p, index) =>
  //   // console.log(p["info"]["name"], p["bloodTest"][0])
  //   index == 0 ? (p1 = p["info"]) : console.log("error");
  //   console.log(p1);
  // );

  // useEffect(() => {
  //   const getData = async () => {
  //     await data();
  //     patients.map((p1) => console.log(p1["info"]["name"], p1["bloodTest"][0]));
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <div className="container">
        <div className="top">
          <div className="topcontext">
            <div className="topinnercontext">
              <div className="topinnercontextleft">
                <Link to="/patient">
                  <Button>
                    <ArrowBackRounded
                      sx={{ fontSize: "3rem", color: "#0080FF" }}
                    ></ArrowBackRounded>
                  </Button>
                </Link>
                <div className="numbox"></div>
              </div>

              <Link to="/OCR">
                <Button variant="contained" sx={{ backgroundColor: "#FF8000" }}>
                  新增電生理訊號量表
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="context">
            <div className="innercontext">
              <h1>病患資料</h1>
              {/* {patients.map((p1) => ( */}
              <>
                <div className="basicdata">
                  <p>
                    ID:
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue="003217310F"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>

                  <p>
                    姓名:
                    <TextField
                      defaultValue="盧林春雪"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    生日:
                    <TextField
                      defaultValue="2023-11-29"
                      size="small"
                      label="生日:"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    性別:
                    <TextField
                      defaultValue="女"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    年齡:
                    <TextField
                      defaultValue="56"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    身高:
                    <TextField
                      defaultValue="150"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    體重:
                    <TextField
                      defaultValue="50"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    狀態:
                    <TextField
                      defaultValue="候診"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    其他:
                    <TextField
                      defaultValue=""
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    初診日期:
                    <TextField
                      defaultValue="2023-11-29"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    初始症狀:
                    <TextField
                      defaultValue="beginSymptom"
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    其他醫院病歷:
                    <TextField
                      defaultValue=""
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    其他疾病:
                    <TextField
                      defaultValue=""
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                  <p>
                    其他藥物:
                    <TextField
                      defaultValue=""
                      size="small"
                      sx={{ width: "40%" }}
                    />
                  </p>
                </div>
              </>
              {/* ))} */}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="context">
            {/* {patients.map((patient) => ( */}

            <h1>Bloodtest</h1>
            <TextField
              label="測試日期:"
              defaultValue="2023-11-29"
              sx={{ width: "20rem" }}
            />
            <p />
            <TextField label="ACHR:" defaultValue="" sx={{ width: "20rem" }} />
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
            {/* ))} */}
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
};
export default Records;
