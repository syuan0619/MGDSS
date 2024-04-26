import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./menu.css";
import PredictDialog from "./PredictDialog";
import { ChangeEvent, useState } from "react";

const Menu = ({
  selectedDate,
  setSelectedDate,
  finishInquiry,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  finishInquiry: () => void;
}) => {
  //handle date
  const handleSelectedDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

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
        <div>
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
        </div>
        {/* <div className="inquiry-menu-numbox">001</div> */}
      </div>
      <div className="inquiry-menu-right">
        <input
          type="date"
          className="inquiry-menu-input"
          value={selectedDate}
          onChange={handleSelectedDate}
        />
        <button className="inquiry-menu-button" onClick={predictDialogOpen}>
          病情預測
        </button>
        <PredictDialog
          open={predictStatus}
          handleClose={predictDialogHide}
          selectedDate={selectedDate}
        />
        <button className="inquiry-menu-button" onClick={finishInquiry}>
          結束看診
        </button>
      </div>
    </div>
  );
};
export default Menu;
