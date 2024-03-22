import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { QMG } from "../../../types/Patient";
import { QMG as typeQMG } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmQMG = () => {
  const [QMGscore] = useState<typeQMG>({
    testDate: "",
    doubleVision: 0,
    ptosis: 0,
    facialMuscle: 0,
    swallowing: 0,
    speakFluency: 0,
    rightArmHeight: 0,
    leftArmHeight: 0,
    vitalCapacity: 0,
    rightHandGrid: 0,
    leftHandGrid: 0,
    headLift: 0,
    rightLegHeight: 0,
    leftLegHeight: 0,
    sum: 0,
  });
  const [tableName] = React.useState<string[]>([]);
  const getQMGNames = (QMG: QMG) => {
    const QMGNames: string[] = [];
    for (const [key, value] of Object.entries(QMG)) {
      QMGNames.push(`${key}: ${value}`);
    }
    return QMGNames;
  };

  const QMGNames = getQMGNames(QMGscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>QMG</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="QMG" />}
        >
          {QMGNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmQMG;
