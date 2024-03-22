import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Visit } from "../../../types/Patient";
import { Visit as typeVisit } from "../../../types/Patient";
import { useState } from "react";
import "./Confirm.css";

const ConfirmVisit = () => {
  const [Visitscore] = useState<typeVisit>({
    date: "",
    treat: 0,
    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
    prescription: {
      pyridostigmine: 0,
      compesolone: 0,
      cellcept: 0,
      imuran: 0,
      prograf: 0,
    },
    examination: {
      ptosis: 0,
      diplopia: 0,
      dysphagia: 0,
      dysarthria: 0,
      dyspnea: 0,
      limpWeakness: 0,
      MGFAclassification: 0,
    },
  });
  const [tableName] = React.useState<string[]>([]);
  const getVisitNames = (Visit: Visit) => {
    const VisitNames: string[] = [];
    for (const [key, value] of Object.entries(Visit)) {
      VisitNames.push(`${key}: ${value}`);
    }
    return VisitNames;
  };

  const VisitNames = getVisitNames(Visitscore);
  const handleChange = () => {};

  return (
    <div className="readLable">
      <FormControl sx={{ m: 1, width: "18vw" }}>
        <InputLabel>Visit</InputLabel>
        <Select
          multiple
          value={tableName}
          onChange={handleChange}
          input={<OutlinedInput label="Visit" />}
        >
          {VisitNames.map((name) => (
            <MenuItem className="predictMenu" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ConfirmVisit;
