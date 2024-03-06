import { Box, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

function ForDateChoose() {
  const dateChooseRef = useRef<string>(""); // 初始值為空字串

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dateChooseRef.current = e.target.value;
    dateSubmit();
  };

  const dateSubmit = () => {
    console.log({ dateChoose: dateChooseRef.current });
  };

  useEffect(() => {
    if (dateChooseRef.current !== "") {
      dateSubmit();
    }
  }, []);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <form noValidate>
        <TextField
          id="date"
          type="date"
          variant="standard"
          onChange={dateChange}
          sx={{
            width: "10rem",
            marginRight: "2rem",

            "& .MuiInputBase-root": {
              borderBottom: "none",
            },
            "& .MuiInputBase-root:before": {
              borderBottom: "none",
            },
            "& .MuiInputBase-root:after": {
              borderBottom: "none",
            },
          }}
        />
      </form>
    </Box>
  );
}

export default ForDateChoose;
