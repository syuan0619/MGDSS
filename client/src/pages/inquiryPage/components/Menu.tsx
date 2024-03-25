import { ArrowBackRounded } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./menu.css";
import { Dialog } from "@mui/material";
import { useState } from "react";
import ConfirmADL from "./ConfirmADL";
import ConfirmBloodTest from "./ConfirmBloodTest";
import ConfirmEMG from "./ConfirmEMG";
import ConfirmMG from "./ConfirmMG";
import ConfirmQMG from "./ConfirmQMG";
import ConfirmQOL from "./ConfirmQOL";
import ConfirmThymus from "./ConfirmThymus";
import ConfirmVisit from "./ConfirmVisit";

const Menu = () => {
  //病情預測dialog
  const [predictStatus, setPredictStatus] = useState(false);
  const predictDialogOpen = () => {
    setPredictStatus(true);
  };
  const predictDialogHide = () => {
    setPredictStatus(false);
  };
  // const changePredict = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPredict({ ...predict!, [e.target.name]: e.target.value });
  // };
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
        <Dialog
          className="predictDialog"
          open={predictStatus}
          onClose={predictDialogHide}
        >
          <DialogTitle sx={{ fontSize: "1.5rem" }}>確認病患資訊</DialogTitle>
          <DialogContent className="predictDialog-content">
            <div className="row-for-confirm">
              <ConfirmADL />
              <ConfirmBloodTest />
              <ConfirmEMG />
              <ConfirmMG />
            </div>
            <div className="row-for-confirm">
              <ConfirmQMG />
              <ConfirmQOL />
              <ConfirmThymus />
              <ConfirmVisit />
            </div>
          </DialogContent>
          <DialogActions>
            <IconButton
              className="deleteIcon-predict"
              aria-label="close"
              onClick={predictDialogHide}
              sx={{
                position: "absolute",
                right: "1.3rem",
                top: "1.3rem",
                width: "3.5rem",
                height: "3.5rem",
              }}
            >
              <CloseIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton>
            <Button variant="contained" color="primary">
              進入AI病情預測
            </Button>
          </DialogActions>
        </Dialog>
        <button className="inquiry-menu-button">結束看診</button>
      </div>
    </div>
  );
};
export default Menu;
