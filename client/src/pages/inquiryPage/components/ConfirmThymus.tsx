import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Thymus } from "../../../types/Patient";
import { Thymus as typeThymus } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmThymus = () => {
  const [Thymusscore] = useState<typeThymus>({
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  });
  const [tableName] = React.useState<string[]>([]);
  const getThymusNames = (Thymus: Thymus) => {
    const ThymusNames: string[] = [];
    for (const [key, value] of Object.entries(Thymus)) {
      ThymusNames.push(`${key}: ${value}`);
    }
    return ThymusNames;
  };

  const ThymusNames = getThymusNames(Thymusscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>Thymus</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="Thymus" />}
        >
          {ThymusNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmThymus;
