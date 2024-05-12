import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
//import { IoReturnUpBack } from "react-icons/io5";
import "./AI.css";
import ADLsum from "./ADLsum";
import MGsum from "./MGsum";
import { useEffect, useState } from "react";
import { tablePatient } from "../../../types/Patient";
import api from "../../../api";
import Predict from "../../../types/Predict";

const AIDialog = ({
  open,
  handleClose,
  patients,
}: {
  open: boolean;
  handleClose: () => void;
  patients: tablePatient | undefined;
}) => {
  const [predictResult, setPredictResult] = useState<Predict>();
  const getPredictData = async () => {
    if (patients) {
      const res = await api.post("/prediction/predict", patients);
      console.log(res.data);
      setPredictResult(res.data);
    }
  };
  useEffect(() => {
    getPredictData();
  }, []);

  return (
    predictResult && (
      <Dialog className="AIDialog" open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>AI病情預測</DialogTitle>
        <DialogContent className="AIDialog-content">
          <ADLsum predictResult={predictResult} />
          <MGsum predictResult={predictResult} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default AIDialog;

{
  /* <IconButton
          name="return"
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "1.3rem",
            top: "1.3rem",
            width: "3.5rem",
            height: "3.5rem",
          }}
        >
          <IoReturnUpBack />
        </IconButton> */
}
