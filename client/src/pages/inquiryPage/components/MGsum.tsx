import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Predict from "../../../types/Predict";

const MGsum = ({ predictResult }: { predictResult: Predict }) => {
  const result = [
    "MG_sum_KNN : " + predictResult.MG_sum_KNN,
    "MG_sum_LR : " + predictResult.MG_sum_LR,
    "MG_sum_RF : " + predictResult.MG_sum_RF,
    "MG_sum_SVR : " + predictResult.MG_sum_SVR,
  ];

  return (
    <div className="AI-panel-option">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          MG一年後總分預測
        </AccordionSummary>
        <AccordionDetails>
          {result.map((each, index) => (
            <h3 key={index}>{each}</h3>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MGsum;
