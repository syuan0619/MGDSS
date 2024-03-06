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

import { Button, IconButton } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Patient, Info } from "../../types/Patient";
import api from "../../api";
import * as React from "react";
import SearchName from "./components/SearchName";
import PatientStatus from "./components/PatientStatus";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

    // Timer
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    //新增病患dialog
    const [addPatient, setAddPatient] = useState<Info>({} as Info);
    const [addPatientStatus, setAddPatientStatus] = useState(false);
    const addPatientDialogOpen = () => {
        setAddPatientStatus(true);
    };
    const addPatientDialogHide = () => {
        setAddPatientStatus(false);
    };
    const changeAddPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPatient({ ...addPatient!, [e.target.name]: e.target.value });
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
                <Box sx={{ width: "90vw", height: "100vh", marginTop: "2rem" }}>
                    <Box
                        sx={{
                            marginLeft: "0.3rem",
                            marginTop: "1rem",
                            fontSize: "0.95rem",
                        }}
                    ></Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "2rem",
                            }}
                        >
                            <h2>病患清單</h2>
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
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "1rem",
                                        marginRight: "2rem",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginRight: "0.3rem",
                                        }}
                                    >
                                        <MedicalServicesIcon
                                            sx={{ color: "#3081D0" }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        <p>醫生姓名</p>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        marginRight: "2.5rem",
                                        marginTop: "1rem",
                                    }}
                                >
                                    {`現在時間：${time.toLocaleDateString()} ${time.getHours()}時${time.getMinutes()}分`}
                                </Box>
                                <Button
                                    sx={{
                                        width: "6rem",
                                        marginTop: "1rem",
                                        marginRight: "1.5rem",
                                        backgroundColor: "#4E3636",
                                        color: "white",
                                        borderRadius: "0.7rem",
                                        "&:hover": {
                                            color: "#4E3636",
                                        },
                                    }}
                                >
                                    建立模型
                                </Button>
                                <Button
                                    sx={{
                                        width: "6rem",
                                        marginTop: "1rem",
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
                                        marginTop: "1.7rem",
                                        display: "flex",
                                    }}
                                >
                                    <SearchName />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    看診狀態
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    姓名
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    性別
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    年齡&nbsp;(歲)
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    病歷號
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{ color: "#9E9FA5" }}
                                >
                                    其他註記
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ cursor: "pointer" }}>
                            {patients.map((patient, index) => (
                                <TableRow key={index} hover={true}>
                                    <TableCell align="center">
                                        <PatientStatus />
                                    </TableCell>
                                    <TableCell align="center">
                                        {patient["info"]["name"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {patient["info"]["sex"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {"用生日算"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {patient["info"]["ID#"]}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                            height: "3rem",
                                        }}
                                    >
                                        <ButtonBase
                                            focusRipple
                                            style={{
                                                width: "auto",
                                                minWidth: "5rem",
                                                paddingInline: "1em",
                                                height: "6vh",
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
                    "&:hover .MuiSvgIcon-root": {
                        backgroundColor: "transparent",
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
        </>
    );
}
export default PatientList;
