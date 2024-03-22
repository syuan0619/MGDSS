import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ADL } from "../../../types/Patient";
import { ADL as typeADL } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmADL = () => {
  const [ADLscore] = useState<typeADL>({
    testDate: "",
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    eyelid: 0,
    sum: 0,
  });
  const [tableName] = React.useState<string[]>([]);
  // 將 ADLscore 轉換格式
  const getADLNames = (adl: ADL) => {
    const adlNames: string[] = [];
    for (const [key, value] of Object.entries(adl)) {
      adlNames.push(`${key}: ${value}`);
    }
    return adlNames;
  };

  // 在渲染時獲取 ADLscore 的名稱和值
  const adlNames = getADLNames(ADLscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>ADL</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="ADL" />}
        >
          {adlNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ConfirmADL;
