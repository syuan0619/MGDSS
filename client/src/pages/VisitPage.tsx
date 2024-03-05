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
import {
  ArrowBackRounded,
  AssessmentRounded,
  CloseFullscreenRounded,
  OpenInFullRounded,
  TuneRounded,
} from "@mui/icons-material";
import * as React from "react";

// import PropTypes from "prop-types";
import { PATIENT } from "../types/Schema";
import { QOL } from "../types/Schema";
import { useState } from "react";
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

  const [patient, setPatient] = useState<PATIENT>();

  //Dialog open & close
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //enlargeButton
  const onEnlarge = (tableName: string) => {
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxWidth", "100%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxHeight", "100%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--overflow-tablebox", "auto");
    document
      .getElementById("rightinnercontext")
      ?.style.setProperty("--rightinner-overflow", "hidden");
    document
      .getElementById(tableName)
      ?.style.setProperty("--z-index-tablebox", "9999");
    document.getElementById("buttonOpen")!.style.visibility = "hidden";
    document.getElementById("buttonOnLesson")!.style.visibility = "visible";
    document.getElementById("buttonRotate")!.style.visibility = "hidden";
  };

  ////lessonButton
  const onLessen = (tableName: string) => {
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxWidth", "50%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxHeight", "50%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--overflow-tablebox", "hidden");
    document
      .getElementById("rightinnercontext")
      ?.style.setProperty("--rightinner-overflow", "hidden");
    document
      .getElementById(tableName)
      ?.style.setProperty("--z-index-tablebox", "0");
    document.getElementById("buttonOpen")!.style.visibility = "visible";
    document.getElementById("buttonOnLesson")!.style.visibility = "hidden";
    document.getElementById("buttonRotate")!.style.visibility = "visible";
  };

  //cardRotateButton
  const cardRotate = (tableName: string) => {
    document
      .getElementById(tableName)
      ?.style.setProperty("--rotate-y", "180deg");
    document.getElementById(tableName)?.style.setProperty("--rotate-back", "0");
  };

  //cardUnRotateButton
  const cardUnRotate = (tableName: string) => {
    document.getElementById(tableName)?.style.setProperty("--rotate-y", "0");
    document
      .getElementById(tableName)
      ?.style.setProperty("--rotate-back", "-180deg");
  };

  //QOLComponent
  const qol = () => {
    //QOLScore
    const [qolScore, setQolScore] = useState<QOL>({
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

    const scoreQolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQolScore({ ...qolScore, [e.target.name]: e.target.value });
    };

    let qolSum = 0;
    Object.values(qolScore)
      .slice(0, -1)
      .map((item) => (qolSum += item));
    qolScore["sum"] = qolSum / 50;

    const onSubmitQolScore = () => {
      console.log(qolScore);
    };

    //QOLscale
    const qolScale = Object.keys(qolScore)
      .slice(0, -1)
      .map((item) => (
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
              onChange={scoreQolInput}
            />
          </Grid>
        </>
      ));

    const qolExp = (
      <div className="tablebox" id="qolTable">
        <div className="tableboxFront">
          <div className="tableboxtop">
            <OpenInFullRounded
              onClick={() => onEnlarge("qolTable")}
              id="buttonOpen"
            ></OpenInFullRounded>

            <CloseFullscreenRounded
              onClick={() => onLessen("qolTable")}
              id="buttonOnLesson"
              visibility="hidden"
            ></CloseFullscreenRounded>
            <AssessmentRounded
              onClick={() => cardRotate("qolTable")}
              id="buttonRotate"
            ></AssessmentRounded>
          </div>
          <div className="tableboxinner">
            <h1>QOL</h1>
            <Grid container spacing={4} alignItems="center">
              {qolScale}總分:
              {qolScore["sum"]}
              <button className="button" onClick={onSubmitQolScore}>
                確定
              </button>
            </Grid>
          </div>
        </div>
      </div>
    );

    return qolExp;
  };

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
        <div className="header">
          <div className="headinner">
            <div className="headerinnerleft">
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
            <div className="headerinnerright">
              <button className="addNewScaleButton">新增量表</button>
              <button className="addRNSButton" onClick={handleClickOpen}>
                新增電生理訊號量表
              </button>
              <button className="predictButton">病情預測</button>
              <button className="finishButton">結束看診</button>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="leftblock">
            <div className="context">
              <h1>病患資料</h1>

              <>
                <div className="basicdata">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      姓名:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.name}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      生日:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.DOB}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      性別:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.sex}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      年齡:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.age}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      身高:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.height}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      體重:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.weight}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      狀態:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.status}
                        size="small"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      其他:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.other}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      發病日期:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
                        defaultValue={patient?.info.attackDate}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      初始症狀:
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        disabled
                        variant="filled"
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
          <div className="rightblock">
            <div className="rightcontext" id="rightinnercontext">
              {qol()}
            </div>
          </div>
        </div>
      </div>
    </>
    //   )}
    // </>
  );
};

export default VisitPage;
