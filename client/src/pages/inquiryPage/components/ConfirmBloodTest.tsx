import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BloodTest } from "../../../types/Patient";
import { BloodTest as typeBloodTest } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmBloodTest = () => {
  const [BloodTestscore] = useState<typeBloodTest>({
    testDate: "",
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  });
  const [tableName] = React.useState<string[]>([]);
  const getBloodTestNames = (BloodTest: BloodTest) => {
    const BloodTestNames: string[] = [];
    for (const [key, value] of Object.entries(BloodTest)) {
      BloodTestNames.push(`${key}: ${value}`);
    }
    return BloodTestNames;
  };

  const BloodTestNames = getBloodTestNames(BloodTestscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>BloodTest</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="BloodTest" />}
        >
          {BloodTestNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmBloodTest;
