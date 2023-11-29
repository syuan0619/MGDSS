"use client";
import { useState } from "react";
import { useEffect } from "react";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { TextField } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

function createData(
  registerNum: number,
  medicalRecordStatus: string,
  patientName: string,
  patientSex: string,
  patientAge: number,
  medicalRecordNum: string,
  identityId: string,
  otherMark: string
) {
  return {
    registerNum,
    medicalRecordStatus,
    patientName,
    patientSex,
    patientAge,
    medicalRecordNum,
    identityId,
    otherMark,
  };
}
const samples = [
  createData(1, "待診", "王大明", "男", 23, "123456789A", "P228490820", "北"),
  createData(2, "待診", "林美環", "女", 37, "123456789B", "F228123420", "中"),
  createData(3, "待診", "黃阿美", "女", 55, "123456789C", "F222589420", "中"),
  createData(4, "待診", "朱小弟", "男", 14, "123456789D", "F221938920", "新莊"),
];

function SearchPatientBar() {
  const [searchPatient, setSearchPatient] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPatient(e.target.value);
  };
  const SearchName = () => {
    console.log({ searchPatient });
  };
  return (
    <>
      <Paper
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "13rem",
          height: "2.5rem",
          borderRadius: "0.7rem",
          "&:hover": {
            backgroundColor: "#DDDDDD",
          },
          marginLeft: "36rem",
          marginTop: "-0.6rem",
          backgroundColor: "#F3F3F3",
          boxShadow: "0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜尋病患"
          inputProps={{ "aria-label": "搜尋病患" }}
          value={searchPatient}
          onChange={handleSearch}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={SearchName}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
function ToHome() {
  return (
    <Link to="/Home.tsx">
      <Paper sx={{ borderRadius: "0rem" }}>
        <IconButton color="primary" sx={{ marginLeft: "0.5rem" }}>
          <HomeIcon
            sx={{
              fontSize: "2.3rem",
              backgroundColor: "#569DAA",
              border: "solid 0.17rem #577D86",
              color: "white",
              borderRadius: "0.4rem",
              width: "3rem",
              height: "2.4rem",
              position: "fixed",
              top: "0.7rem",
              left: "0.7rem",
            }}
          />
        </IconButton>
      </Paper>
    </Link>
  );
}
function ForDateChoose() {
  const [dateChoose, setDateChoose] = useState("");
  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateChoose(e.target.value);
  };
  const dateSubmit = () => {};
  useEffect(() => {
    console.log({ dateChoose });
  }, [dateChoose]);

  return (
    <Box sx={{ marginLeft: "2rem", marginTop: "1rem" }}>
      <form noValidate>
        <TextField
          id="date"
          type="date"
          variant="standard"
          value={dateChoose}
          onChange={dateChange}
          onClick={dateSubmit}
          sx={{ width: "10rem" }}
          InputProps={{
            sx: {
              color: "white",
              borderBottom: "0.1rem solid white",
            },
          }}
        />
      </form>
    </Box>
  );
}

function PatientList() {
  const data = useState("");
  const [formData, setFormData] = useState({
    //之後連資料庫的欄位
    registerNum: "",
    medicalRecordStatus: "",
    patientName: "",
    patientSex: "",
    patientAge: "",
    medicalRecordNum: "",
    identityId: "",
    otherMark: "",
  });
  const Transition = React.forwardRef(function Transition( //dialog needed start
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; //dialog needed end
  return (
    <>
      <ToHome />
      <TableContainer
        component={Paper}
        sx={{ display: "flex", justifyContent: "center", boxShadow: "0" }}
      >
        <Box sx={{ width: "90vw", height: "100vh", marginTop: "0.7rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                height: "4rem",
                alignItems: "center",
                marginBottom: "2rem",
                paddindLeft: "1.5rem",
                backgroundColor: "#07689F",
                borderRadius: "1.8rem",
              }}
            >
              <ForDateChoose />
              <Box
                sx={{
                  marginTop: "1.7rem",
                  display: "flex",
                }}
              >
                <Box>
                  <MedicalServicesIcon sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    marginLeft: "0.3rem",
                    fontSize: "0.95rem",
                    color: "white",
                  }}
                >
                  <p>醫生姓名</p>
                </Box>
                <SearchPatientBar />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <h3>病患清單</h3>
            </Box>
          </Box>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  報到號碼
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  看診狀態
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  姓名
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  性別
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  年齡&nbsp;(歲)
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  病歷號
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  身分證字號
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  其他註記
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samples.map((sample) => (
                <React.Fragment>
                  <TableRow
                    key={sample.registerNum}
                    hover={true}
                    onClick={handleClickOpen}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {sample.registerNum}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonBase
                        focusRipple
                        style={{
                          width: "5vw",
                          height: "4vh",
                          backgroundColor: "#D6E6F2",
                          textAlign: "center",
                          borderRadius: "5px",
                        }}
                      >
                        <Typography
                          variant="button"
                          style={{ lineHeight: "50px", color: "#333" }}
                        >
                          {sample.medicalRecordStatus}
                        </Typography>
                      </ButtonBase>
                    </TableCell>
                    <TableCell align="center">{sample.patientName}</TableCell>
                    <TableCell align="center">{sample.patientSex}</TableCell>
                    <TableCell align="center">{sample.patientAge}</TableCell>
                    <TableCell align="center">
                      {sample.medicalRecordNum}
                    </TableCell>
                    <TableCell align="center">{sample.identityId}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <ButtonBase
                        focusRipple
                        style={{
                          width: "5vw",
                          height: "4vh",
                          backgroundColor: "#FFE2E2",
                          textAlign: "center",
                          borderRadius: "5px",
                        }}
                      >
                        <Typography
                          variant="button"
                          style={{ lineHeight: "50px", color: "#333" }}
                        >
                          {sample.otherMark}
                        </Typography>
                      </ButtonBase>
                    </TableCell>
                  </TableRow>
                  <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative", backgroundColor: "#222831" }}
                    >
                      <Toolbar>
                        <Typography
                          sx={{ ml: 2, flex: 1 }}
                          variant="h6"
                          component="div"
                        >
                          病人資訊{sample.patientName}
                        </Typography>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                          <CloseIcon sx={{ fontSize: "2.5rem" }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                  </Dialog>
                </React.Fragment>
              ))}
            </TableBody>{" "}
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}
export default PatientList;
