import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Predict from "../../../types/Predict";

const ADLsum = ({ predictResult }: { predictResult: Predict }) => {
  const result = [
    "ADL_sum_KNN : " + predictResult.ADL_sum_KNN,
    "ADL_sum_LR : " + predictResult.ADL_sum_LR,
    "ADL_sum_RF : " + predictResult.ADL_sum_RF,
    "ADL_sum_SVR : " + predictResult.ADL_sum_SVR,
  ];

  return (
    <div className="AI-panel-option">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          ADL一年後總分預測
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

export default ADLsum;
