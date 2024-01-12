"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import * as React from "react";

// import PropTypes from "prop-types";
import { PATIENT } from "../types/Schema";
import { QOL } from "../types/Schema";
import api from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Records.css";
import { TransitionProps } from "@mui/material/transitions";

//mui slider
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "1",
  },
  {
    value: 100,
    label: "2",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value);
}

const VisitPage = () => {
  //upload img
  const [file, setFile] = useState();
  function handleChange(e: { target: { files: (Blob | MediaSource)[] } }) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  //score
  const [score, setScore] = useState<QOL>({
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 0,
    sum: 0,
  });

  const scoreInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore({ ...score, [e.target.name]: e.target.value });
  };

  const [patient, setPatient] = useState<PATIENT>();

  //Dialog open & close
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //patient
  // useEffect(() => {
  //   const id = new URLSearchParams(window.location.search).get("id");
  //   console.log(id);

  //   api.get(`/patient/visit?id=${id}`).then((res) => {
  //     setPatient(() => ({ ...res.data.patient }));
  //   });
  // }, []);

  const qolKeys = Object.keys(score).slice(0, -1);
  const qolValue = Object.values(score).slice(0, -1);
  let sum = 0;
  qolValue.map((item) => (sum += item));
  let qolTotal = sum / 50;
  score["sum"] = qolTotal;
  const onSubmit = () => {
    console.log(score);
  };

  //QOLscale
  const qolScale = qolKeys.map((item) => (
    <>
      <Grid item xs={6}>
        <Typography gutterBottom>{item}</Typography>
        <Slider
          name={item}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          sx={{ width: "60%" }}
          onChange={scoreInput}
        />
      </Grid>
    </>
  ));

  // useEffect(() => {
  //   console.log(score);
  // }, [score]);
  return (
    <>
      {/* {patient && (
        <> */}
      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            新增電生理訊號量表
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper sx={{ width: "100vh", height: "50vh" }} elevation={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="file"
                    onChange={handleChange}
                    sx={{ display: "cloum", justifyContent: "center" }}
                  />
                  <img src={file} />
                </Box>
              </Paper>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ margin: "3%" }}>
            <Button onClick={handleClose}>取消</Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="contained"
              sx={{
                backgroundColor: "#FF8000",
                marginLeft: "-3rem",
                borderRadius: "10px",
              }}
            >
              上傳
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <div className="container">
        <div className="top">
          <div className="topcontext">
            <div className="topinnercontext">
              <div className="topinnercontextleft">
                <Link to="/patient">
                  <Button>
                    <ArrowBackRounded
                      sx={{
                        fontSize: "3rem",
                        color: "#0080FF",
                      }}
                    ></ArrowBackRounded>
                  </Button>
                </Link>
                <div className="numbox">001</div>
                {`${patient?.info.name}/${patient?.info.sex}/${patient?.info["ID#"]}`}
              </div>

              <Button
                variant="contained"
                sx={{ backgroundColor: "#FF8000" }}
                onClick={handleClickOpen}
              >
                新增電生理訊號量表
              </Button>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="context">
            <div className="innercontext">
              <h1>病患資料</h1>

              <>
                <div className="basicdata">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      ID:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        defaultValue={patient?.info["ID#"]}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      姓名:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.name}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      生日:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.DOB}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      性別:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.sex}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      年齡:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.age}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      身高:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.height}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      體重:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.weight}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      狀態:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.status}
                        size="small"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      其他:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.other}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      發病日期:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.attackDate}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      初始症狀:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        defaultValue={patient?.info.beginSymptom}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="context">
            <div className="innercontext">
              <h1>QOL</h1>
              <Grid container spacing={4} alignItems="center">
                {/* <Grid item xs={6}>
      <TextField
        name="testDate"
        id="testDate"
        label="測試日期:"
        // defaultValue={patient?.QOL[0]["testDate"]}
        sx={{ width: "60%" }}
        value={}
        onChange={scoreInput}
      />
    </Grid> */}

                {qolScale}
              </Grid>
              總分:{qolTotal}
              <button className="button" onClick={onSubmit}>
                確定
              </button>
              <div className="tablebox"></div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>
    </>
    //   )}
    // </>
  );
};

export default VisitPage;
