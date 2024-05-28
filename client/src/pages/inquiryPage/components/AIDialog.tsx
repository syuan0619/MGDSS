import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import "./AI.css";
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

  const ADLsum = patients ? patients.ADL.sum : 0;
  const MGsum = patients ? patients.MG.sum : 0;

  return (
    predictResult && (
      <Dialog className="AIDialog" open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          AI預測一年後量表分數
        </DialogTitle>
        <DialogContent className="AIDialog-content">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>原始總分</th>
                <th></th>
                <th>最高</th>
                <th>*平均</th>
                <th>最低</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ADL</td>
                <td>{ADLsum}</td>
                <td>
                  <EastIcon sx={{ color: "#40a2d8", fontSize: "3rem" }} />
                </td>
                <td style={{ color: "red" }}>
                  {ADLsum + predictResult.ADL_max}
                </td>
                <td>{ADLsum + predictResult.ADL_mean}</td>
                <td style={{ color: "green" }}>
                  {ADLsum + predictResult.ADL_min}
                </td>
              </tr>
              <tr>
                <td>MG</td>
                <td>{MGsum}</td>
                <td>
                  <EastIcon sx={{ color: "#40a2d8", fontSize: "3rem" }} />
                </td>
                <td style={{ color: "red" }}>{MGsum + predictResult.MG_max}</td>
                <td>{MGsum + predictResult.MG_mean}</td>
                <td style={{ color: "green" }}>
                  {MGsum + predictResult.MG_min}
                </td>
              </tr>
            </tbody>
          </table>
          <h3
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "gray",
            }}
          >
            *多個模型預測結果之平均
          </h3>
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
