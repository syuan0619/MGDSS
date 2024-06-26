import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./menu.css";
import PredictDialog from "./PredictDialog";
import { ChangeEvent, useState } from "react";
import api from "../../../api";
import { tablePatient } from "../../../types/Patient";

const Menu = ({
  selectedDate,
  setSelectedDate,
  finishInquiry,
  finishOrNot,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  finishInquiry: () => void;
  finishOrNot: boolean;
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

  const today = new Date().toISOString().slice(0, 10);

  //get patient data by date
  const [patients, setPatients] = useState<tablePatient>();
  const routeParams = useParams();
  const getData = async () => {
    const response = await api.get(
      `/inquiry/${routeParams.id}/${selectedDate}`
    );
    if (response.data.tables.visit !== undefined) {
      setPatients(response.data.tables);
      predictDialogOpen();
    } else if (response.data.tables.visit === undefined) {
      alert("今日尚無資料，請先填寫資料再進行預測");
      return null;
    }
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
        <button
          className="inquiry-menu-button"
          onClick={() => {
            if (!finishOrNot && selectedDate === today) {
              alert("欲使用今日資料進行AI預測\n請先填寫資料並結束看診!");
            } else {
              getData();
            }
          }}
        >
          AI病情預測
        </button>
        <PredictDialog
          predictStatus={predictStatus}
          predictDialogHide={predictDialogHide}
          patients={patients}
        />
        <button
          style={{
            backgroundColor:
              !finishOrNot && selectedDate === today ? "#e74646" : "#grey",
          }}
          className="inquiry-menu-button"
          onClick={finishInquiry}
        >
          {selectedDate === today ? "結束看診" : "修改資料"}
        </button>
      </div>
    </div>
  );
};
export default Menu;
