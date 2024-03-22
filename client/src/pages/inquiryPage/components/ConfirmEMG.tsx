import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { EMG } from "../../../types/Patient";
import { EMG as typeEMG } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmEMG = () => {
  const [EMGscore] = useState<typeEMG>({
    testDate: "",
    imgPath: "",
    RNS: [
      {
        musclePart: "",
        preActivation: [],
        postActivation: [],
      },
    ],
  });
  const [tableName] = React.useState<string[]>([]);
  const getEMGNames = (EMG: EMG) => {
    const EMGNames: string[] = [];
    for (const [key, value] of Object.entries(EMG)) {
      EMGNames.push(`${key}: ${value}`);
    }
    return EMGNames;
  };

  const EMGNames = getEMGNames(EMGscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>EMG</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="EMG" />}
        >
          {EMGNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmEMG;
