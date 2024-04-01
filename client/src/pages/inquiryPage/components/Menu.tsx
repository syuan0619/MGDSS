import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./menu.css";
import PredictDialog from "./PredictDialog";
import { useState } from "react";

const Menu = ({ patient_id }: { patient_id: string | undefined }) => {
  //病情預測dialog
  const [predictStatus, setPredictStatus] = useState(false);

  const predictDialogOpen = () => {
    setPredictStatus(true);
  };
  const predictDialogHide = () => {
    setPredictStatus(false);
  };
  return (
    <div className="inquiry-menu-all">
      <div className="inquiry-menu-left">
        <Link to="/patient">
          <Button>
            <ArrowBackRounded
              sx={{
                fontSize: "3rem",
                color: "#0080FF",
              }}
            />
          </Button>
        </Link>
        <div className="inquiry-menu-numbox">001</div>
      </div>
      <div className="inquiry-menu-right">
        <button className="inquiry-menu-button">新增量表</button>
        <button className="inquiry-menu-button">新增電生理訊號量表</button>
        <button className="inquiry-menu-button" onClick={predictDialogOpen}>
          病情預測
        </button>
        <PredictDialog
          open={predictStatus}
          handleClose={predictDialogHide}
          patient_id={patient_id}
        />
        <button className="inquiry-menu-button">結束看診</button>
      </div>
    </div>
  );
};
export default Menu;
