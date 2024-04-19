import { ChangeEvent, useState } from "react";
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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Button } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Info } from "../../types/Patient";
import api from "../../api";
import * as React from "react";
import SearchName from "./components/SearchName";
import PatientStatus from "./components/PatientStatus";
import EMG from "../../pages/inquiryPage/table/EMG";
import BloodTest from "../../pages/inquiryPage/table/BloodTest";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./PatientList.css";

function PatientList() {
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    console.log(userData);
    if (!userData) {
      alert("請先登入!");
      navigate("/");
    }
  });
  const userDataString = sessionStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const Name = userData ? userData.name : null;
  const role = userData ? userData.role : null;

  const navigate = useNavigate();
  const [patients, setPatients] = useState<{ _id: string; info: Info }[]>();
  const data = async () => {
    const response = await api.get("/patients");
    setPatients(response.data);
  };

  useEffect(() => {
    data();
  }, []);

  //handle date
  const newDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(newDate);
  const handleSelectedDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  //新增病患dialog
  const [addPatient, setAddPatient] = useState<Info>({} as Info);
  const [addPatientStatus, setAddPatientStatus] = useState(false);
  const [emgDialogOpen, setEMGDialogOpen] = useState(false);
  const [BloodTestDialogOpen, setBloodTestDialogOpen] = useState(false);

  const addPatientDialogOpen = () => {
    setAddPatientStatus(true);
  };
  const addPatientDialogHide = () => {
    setAddPatientStatus(false);
  };
  const changeAddPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPatient({ ...addPatient!, [e.target.name]: e.target.value });
  };

  //修改病患dialog
  const [updatePatient, setUpdatePatient] = useState<Info>({} as Info);
  const [updatePatientStatus, setUpdatePatientStatus] = useState(false);
  const updatePatientDialogOpen = (patientData: Info) => {
    setUpdatePatient(patientData);
    setUpdatePatientStatus(true);
  };
  const updatePatientDialogHide = () => {
    setUpdatePatientStatus(false);
  };
  const changeUpdatePatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePatient({
      ...updatePatient!,
      [e.target.name]: e.target.value,
    });
  };

  //登出
  const onclickLogout = () => {
    const confirmLogout = window.confirm("確定要登出嗎?");
    if (confirmLogout) {
      sessionStorage.removeItem("userData");
      console.log("userData", userData);
      navigate(`/`);
    }
  };

  //nav to patient's inquiry page.
  const nav = useNavigate();
  const navToInquiryPage = (id: string) => {
    if (role == "doctor") {
      nav(`/inquiry/${id}`);
    }
  };

  //EMG
  const handleEMGDialogOpen = () => {
    setEMGDialogOpen(true);
  };

  const handleEMGDialogClose = () => {
    setEMGDialogOpen(false);
  };

  //BloodTest
  const handleBloodTestDialogOpen = () => {
    setBloodTestDialogOpen(true);
  };

  const handleBloodTestDialogClose = () => {
    setBloodTestDialogOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "0",
        }}
      >
        <Box sx={{ width: "90vw", height: "100vh", marginTop: "3rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h2>病患清單</h2>
              </div>
              <Box
                sx={{
                  display: "flex",
                  height: "4rem",
                  alignItems: "center",
                  paddindLeft: "1.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  <input
                    type="date"
                    className="inquiry-menu-input"
                    value={selectedDate}
                    onChange={handleSelectedDate}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: "1.7rem",
                    display: "flex",
                  }}
                >
                  <SearchName />
                </Box>

                <Button
                  sx={{
                    width: "6rem",
                    marginTop: "1rem",
                    marginLeft: "2rem",
                    backgroundColor: "#0081C9",
                    color: "white",
                    borderRadius: "0.7rem",
                    "&:hover": {
                      color: "#0081C9",
                    },
                  }}
                  onClick={addPatientDialogOpen}
                >
                  新增病患
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    fontSize: "1.25rem",
                    marginTop: "1rem",
                    marginLeft: "2rem",
                  }}
                >
                  <MedicalServicesIcon sx={{ color: "#3081D0" }} />
                  <p>{Name}</p>
                </Box>

                <Box>
                  <ExitToAppIcon
                    fontSize="large"
                    aria-label="close"
                    onClick={onclickLogout}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  ></ExitToAppIcon>
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
                {role === "nurse" ? (
                  <>
                    <TableCell
                      align="center"
                      sx={{ color: "#9E9FA5" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#9E9FA5" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#9E9FA5" }}
                    ></TableCell>
                  </>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: "pointer" }}>
              {patients &&
                patients.map((patient, index) => (
                  <TableRow
                    className="patient-table-row"
                    key={index}
                    hover={true}
                  >
                    <TableCell align="center">
                      <PatientStatus />
                    </TableCell>
                    <TableCell
                      onClick={() => navToInquiryPage(patient._id)}
                      align="center"
                    >
                      {patient.info.name}
                    </TableCell>
                    <TableCell
                      onClick={() => navToInquiryPage(patient._id)}
                      align="center"
                    >
                      {patient.info.sex}
                    </TableCell>
                    <TableCell
                      onClick={() => navToInquiryPage(patient._id)}
                      align="center"
                    >
                      {new Date().getFullYear() -
                        new Date(patient.info.DOB).getFullYear()}
                    </TableCell>
                    <TableCell
                      onClick={() => navToInquiryPage(patient._id)}
                      align="center"
                    >
                      {patient.info["ID#"]}
                    </TableCell>
                    <TableCell
                      className="table-cell-other"
                      align="center"
                      onClick={() => navToInquiryPage(patient._id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonBase
                        focusRipple
                        style={{
                          width: "auto",
                          minWidth: "5rem",
                          height: "5vh",
                          backgroundColor: "#FFE2E2",
                          textAlign: "center",
                          borderRadius: "0.6rem",
                        }}
                      >
                        <Typography
                          variant="button"
                          style={{
                            color: "#333",
                          }}
                        >
                          {patient.info.other}
                        </Typography>
                      </ButtonBase>
                    </TableCell>
                    {role === "nurse" ? (
                      <>
                        <TableCell align="center">
                          <Box>
                            <IconButton
                              onClick={() =>
                                updatePatientDialogOpen(patient.info)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Box>
                        </TableCell>

                        <TableCell align="center">
                          <Box>
                            <ElectricBoltIcon onClick={handleEMGDialogOpen}>
                              <EditIcon />
                            </ElectricBoltIcon>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box>
                            <WaterDropIcon onClick={handleBloodTestDialogOpen}>
                              <EditIcon />
                            </WaterDropIcon>
                          </Box>
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <Dialog
        open={addPatientStatus}
        onClose={addPatientDialogHide}
        aria-labelledby="新增病患"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1rem",
            width: "31vh",
            height: "70vh",
            paddingTop: "2vh",
            paddingBottom: "1vh",
            paddingLeft: "5vh",
            paddingRight: "5vh",
          },
          "& .MuiSvgIcon-root": {
            fill: "white",
          },
          " .MuiSvgIcon-root:hover": {
            backgroundColor: "transparent",
            fill: " rgba(41, 71, 118, 0.976)",
          },
          "& .MuiButtonBase-root": {
            borderRadius: "0.7rem",
            backgroundColor: "#40A2D8",
          },
        }}
      >
        <DialogTitle sx={{}}>新增病患</DialogTitle>
        <DialogContent sx={{ margingTop: "5vh" }}>
          <TextField
            label="病歷號"
            variant="outlined"
            name="ID#"
            value={addPatient!["ID#"]}
            onChange={changeAddPatient}
            required
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            label="姓名"
            variant="outlined"
            name="name"
            value={addPatient!.name}
            onChange={changeAddPatient}
            required
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            type="date"
            label="生日"
            variant="outlined"
            name="DOB"
            value={addPatient!.DOB}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
            required
            onChange={changeAddPatient}
          />
          <p />
          <TextField
            label="性別"
            variant="outlined"
            name="sex"
            value={addPatient!.sex}
            required
            select
            onChange={changeAddPatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
          >
            <MenuItem value="男">男</MenuItem>
            <MenuItem value="女">女</MenuItem>
          </TextField>
          <p />
          <TextField
            label="身高(cm)"
            variant="outlined"
            name="height"
            value={addPatient!.height}
            required
            onChange={changeAddPatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            label="體重(kg)"
            variant="outlined"
            name="weight"
            value={addPatient!.weight}
            required
            onChange={changeAddPatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />

          <p />
          <TextField
            type="date"
            label="初診日期"
            variant="outlined"
            name="attackDate"
            defaultValue={new Date().toLocaleDateString("en-CA")}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
            onChange={changeAddPatient}
          />
          <p />
          <TextField
            label="初始症狀"
            variant="outlined"
            name="beginSymptom"
            value={addPatient!.beginSymptom}
            onChange={changeAddPatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />

          <TextField
            label="其他註記"
            variant="outlined"
            name="other"
            value={addPatient!.other}
            onChange={changeAddPatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={addPatientDialogHide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary">
            新增
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={updatePatientStatus}
        onClose={updatePatientDialogHide}
        aria-labelledby="新增病患"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1rem",
            width: "31vh",
            height: "70vh",
            paddingTop: "2vh",
            paddingBottom: "1vh",
            paddingLeft: "5vh",
            paddingRight: "5vh",
          },
          "& .MuiSvgIcon-root": {
            fill: "white",
          },
          " .MuiSvgIcon-root:hover": {
            backgroundColor: "transparent",
            fill: " rgba(41, 71, 118, 0.976)",
          },
          "& .MuiButtonBase-root": {
            borderRadius: "0.7rem",
            backgroundColor: "#40A2D8",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            修改基本資料
            <IconButton onClick={updatePatientDialogHide}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "5vh" }}>
          <TextField
            label="姓名"
            variant="outlined"
            name="name"
            defaultValue={updatePatient.name}
            onChange={changeUpdatePatient}
            required
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            type="date"
            label="生日"
            variant="outlined"
            name="DOB"
            defaultValue={updatePatient.DOB}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
            required
            onChange={changeUpdatePatient}
          />
          <p />
          <TextField
            label="性別"
            variant="outlined"
            name="sex"
            defaultValue={updatePatient.sex}
            required
            select
            onChange={changeUpdatePatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
          >
            <MenuItem value="男">男</MenuItem>
            <MenuItem value="女">女</MenuItem>
          </TextField>
          <p />
          <TextField
            label="身高(cm)"
            variant="outlined"
            name="height"
            defaultValue={updatePatient.height}
            required
            onChange={changeUpdatePatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            label="體重(kg)"
            variant="outlined"
            name="weight"
            defaultValue={updatePatient.weight}
            required
            onChange={changeUpdatePatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            type="date"
            label="初診日期"
            variant="outlined"
            name="attackDate"
            defaultValue={updatePatient.attackDate}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
              width: "100%",
            }}
            onChange={changeUpdatePatient}
          />
          <p />
          <TextField
            label="初始症狀"
            variant="outlined"
            name="beginSymptom"
            defaultValue={updatePatient.beginSymptom}
            onChange={changeUpdatePatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
          <p />
          <TextField
            label="其他註記"
            variant="outlined"
            name="other"
            defaultValue={updatePatient.other}
            onChange={changeUpdatePatient}
            sx={{
              "& .MuiOutlinedInput-input": {
                background: "#E0F4FF",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updatePatientDialogHide();
              console.log("修改後的病患信息：", updatePatient);
            }}
            variant="contained"
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={emgDialogOpen}
        onClose={handleEMGDialogClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1rem",
            maxWidth: "100vw",
            height: "85vh",
            paddingTop: "2vh",
            paddingBottom: "1vh",
            paddingLeft: "5vh",
            paddingRight: "5vh",
            marginTop: 5,
          },
          "& .MuiSvgIcon-root": {
            fill: "white",
          },
          " .MuiSvgIcon-root:hover": {
            backgroundColor: "transparent",
            fill: " rgba(41, 71, 118, 0.976)",
          },
          "& .MuiButtonBase-root": {
            borderRadius: "0.7rem",
            backgroundColor: "#40A2D8",
          },
        }}
      >
        <EMG setReplaceComponent={() => {}} />
        <DialogActions>
          <IconButton
            className="deleteIcon-predict"
            aria-label="close"
            onClick={handleEMGDialogClose}
            sx={{
              position: "absolute",
              right: "1.3rem",
              top: "1.3rem",
              width: "3rem",
              height: "3.5rem",
            }}
          >
            <CloseIcon sx={{ fontSize: "1.4rem" }} />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={BloodTestDialogOpen}
        onClose={handleBloodTestDialogClose}
        aria-labelledby="新增病患抽血資訊"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1rem",
            maxWidth: "80vw",
            maxHeight: "100vh",
            paddingTop: "2vh",
            paddingBottom: "1vh",
            paddingLeft: "5vh",
            paddingRight: "5vh",
            marginTop: 5,
          },
          "& .MuiSvgIcon-root": {
            fill: "white",
          },
          ".MuiSvgIcon-root:hover": {
            backgroundColor: "transparent",
            fill: "rgba(41, 71, 118, 0.976)",
          },
          "& .MuiButtonBase-root": {
            borderRadius: "0.7rem",
            backgroundColor: "#40A2D8",
          },
        }}
      >
        <DialogContent>
          <BloodTest setReplaceComponent={() => {}} />
        </DialogContent>
        <DialogActions>
          <IconButton
            className="deleteIcon-predict"
            aria-label="close"
            onClick={handleBloodTestDialogClose}
            sx={{
              position: "absolute",
              right: "1.3rem",
              top: "1.3rem",
              width: "3rem",
              height: "3.5rem",
            }}
          >
            <CloseIcon sx={{ fontSize: "1.4rem" }} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default PatientList;
