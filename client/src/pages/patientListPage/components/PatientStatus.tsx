import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { doctorInList } from "../../../types/Account";
import api from "../../../api";

interface PatientStatusProps {
    role: "doctor" | "nurse";
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    patientId: string;
    isChecked: boolean;
    doctorId?: string | undefined;
    nurseId?: string | undefined;
    doctorList?: doctorInList[] | [];
}

function PatientStatus({
    role,
    setSelectedDate,
    patientId,
    isChecked,
    doctorId = undefined,
    nurseId = undefined,
    doctorList = [],
}: PatientStatusProps) {
    const [currentStatus, setCurrentStatus] = useState<string>("無");

    useEffect(() => {
        if (isChecked) {
            setCurrentStatus("已看診");
        } else {
            if (doctorId === "") {
                setCurrentStatus("無");
            } else {
                for (let i = 0; i < doctorList.length; i++) {
                    if (doctorList[i]._id === doctorId) {
                        setCurrentStatus(doctorList[i].name);
                        break;
                    }
                }
            }
        }
    }, []);

    const handleStatusChange = (
        event: React.ChangeEvent<{ value: string | unknown }>
    ) => {
        const newStatus = event.target.value as string;
        setCurrentStatus(newStatus);
    };

    return (
        <Box>
            <FormControl
                sx={{
                    width: "6rem",
                    height: "5vh",
                    "& .MuiOutlinedInput-root": {
                        height: "5vh",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            border: "none",
                        },
                }}
            >
                <InputLabel htmlFor="status-native-simple"></InputLabel>
                <Select
                    value={currentStatus}
                    onChange={handleStatusChange}
                    sx={{
                        border: "none",
                        "&:before, &:after": { border: "none" },
                    }}
                >
                    <MenuItem value="無">無</MenuItem>
                    {doctorList &&
                        doctorList.map((doctor) => {
                            return (
                                <MenuItem key={doctor._id} value={doctor.name}>
                                    {doctor.name}
                                </MenuItem>
                            );
                        })}
                    <MenuItem value="已看診">已看診</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default PatientStatus;
