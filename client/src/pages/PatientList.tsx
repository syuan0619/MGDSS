import { useState } from "react";
import { useEffect } from "react";

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

import Patient from "../types/Schema";
import api from "../api";
import { info } from "sass";

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
          marginLeft: "2.5rem",
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
          sx={{ p: "10px", cursor: "pointer" }}
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
            cursor: "pointer",
          }}
        />
      </IconButton>
    </Paper>
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
              borderBottom: "0.1rem solid white",
            },
          }}
        />
      </form>
    </Box>
  );
}

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([
    // 不用初始值也可以跑 看妳們要不要留著
    // {
    //     info: {
    //         "ID#": "",
    //         name: "",
    //         DOB: "2023-11-29",
    //         sex: "",
    //         age: 0,
    //         height: 0,
    //         weight: 0,
    //         status: "候診",
    //         other: "unknown",
    //         attackDate: "2023-11-29",
    //         beginSymptom: "beginSymptom",
    //         otherHospitalRecord: {
    //             recentlyDate: "2023-11-29",
    //             totalTimes: 0,
    //         },
    //         otherDisease: ["diseaseOne"],
    //         otherMedicine: ["medicineOne"],
    //     },
    //     thymus: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             thymusStatus: 0,
    //             thymusDescription: "thymusDescription",
    //         },
    //     ],
    //     bloodTest: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             ACHR: 0,
    //             TSH: 0,
    //             freeThyroxine: 0,
    //             ANA: 0,
    //             uricAcid: 0,
    //         },
    //     ],
    //     QOL: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             frustration: 0,
    //             eyeUsing: 0,
    //             eating: 0,
    //             social: 0,
    //             entertainment: 0,
    //             fullfillFamilyNeeds: 0,
    //             plansNecessity: 0,
    //             jobState: 0,
    //             speaking: 0,
    //             driving: 0,
    //             depression: 0,
    //             walking: 0,
    //             beingInPublicPlaces: 0,
    //             overwhelm: 0,
    //             freshenUp: 0,
    //             sum: 0,
    //         },
    //     ],
    //     QMG: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             doubleVision: 0,
    //             ptosis: 0,
    //             facialMuscle: 0,
    //             swallowing: 0,
    //             speakFluency: 0,
    //             rightArmHeight: 0,
    //             leftArmHeight: 0,
    //             vitalCapacity: 0,
    //             rightHandGrid: 0,
    //             leftHandGrid: 0,
    //             headLift: 0,
    //             rightLegHeight: 0,
    //             leftLegHeight: 0,
    //             sum: 0,
    //         },
    //     ],
    //     MG: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             ptosis: 0,
    //             doubleVision: 0,
    //             eyeClosure: 0,
    //             talking: 0,
    //             chewing: 0,
    //             swallowing: 0,
    //             breathing: 0,
    //             neckFlexion: 0,
    //             shoulderAbduction: 0,
    //             hipFlexion: 0,
    //             sum: 0,
    //         },
    //     ],
    //     ADL: [
    //         {
    //             number: 0,
    //             testDate: "2023-11-29",
    //             talking: 0,
    //             chewing: 0,
    //             swallowing: 0,
    //             breathing: 0,
    //             brushTeethOrCombHair: 0,
    //             ariseFromChair: 0,
    //             eyelid: 0,
    //             sum: 0,
    //         },
    //     ],
    //     visit: [
    //         {
    //             number: 0,
    //             date: "2023-11-29",
    //             treat: 0,
    //             SBP: 0,
    //             DBP: 0,
    //             examination: {
    //                 ptosis: 0,
    //                 diplopia: 0,
    //                 dysphagia: 0,
    //                 dysarthria: 0,
    //                 dyspnea: 0,
    //                 limpWeakness: 0,
    //                 MGFAclassification: 0,
    //             },
    //             Prescription: {
    //                 pyridostigmine: 0,
    //                 compesolone: 0,
    //                 cellcept: 0,
    //                 imuran: 0,
    //                 prograf: 0,
    //             },
    //             selfAssessment: 0,
    //             note: "note",
    //         },
    //     ],
    // }
  ]);

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
      <ToHome />
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "0",
        }}
      >
        <Box sx={{ width: "90vw", height: "100vh", marginTop: "0.7rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1.5rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MedicalServicesIcon sx={{ color: "#3081D0" }} />
              </Box>
              <Box
                sx={{
                  marginLeft: "0.3rem",
                  fontSize: "0.95rem",
                }}
              >
                <p>醫生姓名</p>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2>病患清單</h2>
              <Box
                sx={{
                  display: "flex",
                  height: "4rem",
                  alignItems: "center",
                  paddindLeft: "1.5rem",
                  backgroundColor: "",
                  borderRadius: "1.8rem",
                  justifyContent: "flex-end",
                }}
              >
                <ForDateChoose />
                <Box
                  sx={{
                    marginTop: "1.7rem",
                    display: "flex",
                  }}
                >
                  <SearchPatientBar />
                </Box>
              </Box>
            </Box>
          </Box>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
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
                  其他註記
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: "pointer" }}>
              {patients.map((patient, index) => (
                <TableRow key={index} hover={true}>
                  <TableCell align="center">
                    <ButtonBase
                      focusRipple
                      style={{
                        width: "auto",
                        minWidth: "5rem",
                        paddingInline: "1.2rem",
                        height: "4vh",
                        backgroundColor: "#D6E6F2",
                        textAlign: "center",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {patient["info"]["status"]}
                      <Typography
                        variant="button"
                        style={{
                          lineHeight: "50px",
                          color: "#333",
                        }}
                      ></Typography>
                    </ButtonBase>
                  </TableCell>
                  <TableCell align="center">
                    {patient["info"]["name"]}
                  </TableCell>
                  <TableCell align="center">{patient["info"]["sex"]}</TableCell>
                  <TableCell align="center">{patient["info"]["age"]}</TableCell>
                  <TableCell align="center">{patient["info"]["ID#"]}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <ButtonBase
                      focusRipple
                      style={{
                        width: "auto",
                        minWidth: "5rem",
                        paddingInline: "1.2rem",
                        height: "4vh",
                        backgroundColor: "#FFE2E2",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        variant="button"
                        style={{
                          lineHeight: "50px",
                          color: "#333",
                        }}
                      >
                        {patient["info"]["other"]}
                      </Typography>
                    </ButtonBase>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>{" "}
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}
export default PatientList;
