import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { QOL } from "../../../types/Patient";
import { QOL as typeQOL } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmQOL = () => {
  const [QOLscore] = useState<typeQOL>({
    testDate: "",
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 0,
    sum: 0,
  });
  const [tableName] = React.useState<string[]>([]);
  const getQOLNames = (QOL: QOL) => {
    const QOLNames: string[] = [];
    for (const [key, value] of Object.entries(QOL)) {
      QOLNames.push(`${key}: ${value}`);
    }
    return QOLNames;
  };

  const QOLNames = getQOLNames(QOLscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>QOL</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="QOL" />}
        >
          {QOLNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmQOL;
