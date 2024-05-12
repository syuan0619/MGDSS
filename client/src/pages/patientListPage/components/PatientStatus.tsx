import { Box, FormControl, InputLabel, Select } from "@mui/material";

function PatientStatus({ status }: { status: string }) {
    //   const [status, setStatus] = useState<string>(status);
    //   const [isChange, setIsChange] = useState<boolean>(false);

    //   const statusChange = (
    //     event: React.ChangeEvent<{ value: string | unknown }>
    //   ) => {
    //     setIsChange(true);
    //     setStatus(event.target.value as string);
    //   };

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
                    native
                    value={status!}
                    //   onChange={statusChange}
                    sx={{
                        border: "none",
                        "&:before, &:after": { border: "none" },
                    }}
                >
                    <>
                        <option value="候診">候診</option>
                        <option value="取消">取消</option>
                    </>
                </Select>
            </FormControl>
        </Box>
    );
}

export default PatientStatus;
