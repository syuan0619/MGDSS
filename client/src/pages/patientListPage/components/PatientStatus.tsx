import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function PatientStatus({
    patientId,
    status,
}: {
    patientId: string;
    status: string;
}) {
    const [currentStatus, setCurrentStatus] = useState<string>(status);
    //   const [isChange, setIsChange] = useState<boolean>(false);

    const handleStatusChange = (
        event: React.ChangeEvent<{ value: string | unknown }>
    ) => {
        const newStatus = event.target.value as string;
        setCurrentStatus(newStatus);
        console.log("PatientId: ", patientId);
        console.log("New Status: ", newStatus);
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
                    <MenuItem value="候診">候診</MenuItem>
                    <MenuItem value="無">
                        {currentStatus === "候診" ? "取消候診" : "無"}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default PatientStatus;
