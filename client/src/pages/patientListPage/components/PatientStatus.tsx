import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { doctorInList } from "../../../types/Account";
import api from "../../../api";
import { string } from "prop-types";
import * as React from "react";

interface PatientStatusProps {
    role: "doctor" | "nurse";
    selectedDate: string;
    data: (date: string) => Promise<void>;
    patientId: string;
    isChecked: boolean;
    doctorId?: string | undefined;
    nurseId?: string | undefined;
    doctorList?: doctorInList[] | [];
}

function PatientStatus({
    role,
    selectedDate,
    data,
    patientId,
    isChecked,
    doctorId = undefined,
    nurseId = undefined,
    doctorList = [],
}: PatientStatusProps) {
    const [currentStatus, setCurrentStatus] = useState<string>("");

    useEffect(() => {
        if (role === "nurse") {
            if (isChecked) {
                setCurrentStatus("已看診");
            } else {
                setCurrentStatus(doctorId || "無");
            }
        } else if (role === "doctor") {
            if (isChecked) {
                setCurrentStatus("已看診");
            } else {
                setCurrentStatus("候診");
            }
        }
        console.log("status", currentStatus);
    }, [patientId]);

    const handleStatusChange = async (
        event: React.ChangeEvent<{ value: string | unknown }>
    ) => {
        const newStatus = event.target.value as string;
        setCurrentStatus(newStatus);
        if (event.target.value === "無") {
            const res = await api.delete(
                `/patients/waitinglist/${selectedDate}/${patientId}`
            );
            console.log(res.data);
        } else {
            const res = await api.put(
                `/patients/waitinglist/${selectedDate}/${patientId}`,
                {
                    doctorId: event.target.value,
                    nurseId: nurseId,
                    isChecked: false,
                }
            );
            console.log(res.data);
        }
        data(selectedDate);
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
                {role && role === "nurse" ? (
                    <Select
                        value={currentStatus || "無"}
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
                                    <MenuItem
                                        key={doctor._id}
                                        value={doctor._id}
                                    >
                                        {doctor.name}
                                    </MenuItem>
                                );
                            })}
                        <MenuItem value="已看診">已看診</MenuItem>
                    </Select>
                ) : (
                    <Select
                        disabled={true}
                        value={currentStatus}
                        sx={{
                            border: "none",
                            "&:before, &:after": { border: "none" },
                        }}
                    >
                        <MenuItem value="候診">候診</MenuItem>
                        <MenuItem value="已看診">已看診</MenuItem>
                    </Select>
                )}
            </FormControl>
        </Box>
    );
}

export default PatientStatus;
