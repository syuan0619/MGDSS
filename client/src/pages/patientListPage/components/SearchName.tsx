import { InputBase, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

function SearchName() {
  const searchPatientRef = useRef<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchPatientRef.current = e.target.value;
  };

  const SearchName = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchPatient: searchPatientRef.current });
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
          onChange={handleSearch}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", cursor: "pointer" }}
          aria-label="search"
          onClick={SearchName}
          onSubmit={SearchName}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchName;
