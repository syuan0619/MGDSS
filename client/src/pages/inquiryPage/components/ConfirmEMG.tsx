import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { noImageType } from "../../../types/Patient";
import "./Confirm.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ConfirmEMG = ({
  title,
  initialData,
}: {
  title: string;
  initialData: noImageType;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    initialData && (
      <div className="readLable">
        <Accordion
          expanded={expanded}
          onChange={(e, isExpanded) => handleChange(isExpanded)}
          sx={{ width: "10vw" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {/* {Object.entries(initialData).map(([name, value], index) => (
                <div key={index} style={{ marginBottom: "0.6rem" }}>
                  <Typography>
                    {name}: {value}
                  </Typography>
                </div>
              ))} */}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
};
export default ConfirmEMG;
