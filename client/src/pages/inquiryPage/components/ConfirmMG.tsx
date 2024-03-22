import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MG } from "../../../types/Patient";
import { MG as typeMG } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmMG = () => {
  const [MGscore] = useState<typeMG>({
    testDate: "",
    ptosis: 0,
    doubleVision: 0,
    eyeClosure: 0,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    neckFlexion: 0,
    shoulderAbduction: 0,
    hipFlexion: 0,
    sum: 0,
  });
  const [tableName] = React.useState<string[]>([]);
  const getMGNames = (MG: MG) => {
    const MGNames: string[] = [];
    for (const [key, value] of Object.entries(MG)) {
      MGNames.push(`${key}: ${value}`);
    }
    return MGNames;
  };

  const MGNames = getMGNames(MGscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>MG</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="MG" />}
        >
          {MGNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmMG;
