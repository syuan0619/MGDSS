"use client";
import { Button } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";

// import PropTypes from "prop-types";
import { PATIENT } from "../../types/Schema";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Visit.css";

import BasicInfo from "./components/BasicInfo";
import QOLSchema from "./components/QOL";

const VisitPage = () => {
  const [patient, setPatient] = useState<PATIENT>();

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="headinner">
            <div className="headerinnerleft">
              <Link to="/patient">
                <Button>
                  <ArrowBackRounded
                    sx={{
                      fontSize: "3rem",
                      color: "#0080FF",
                    }}
                  ></ArrowBackRounded>
                </Button>
              </Link>
              <div className="numbox">001</div>
              {`${patient?.info.name}/${patient?.info.sex}/${patient?.info["ID#"]}`}
            </div>
            <div className="headerinnerright">
              <button className="addNewScaleButton">新增量表</button>
              <button className="addRNSButton">新增電生理訊號量表</button>
              <button className="predictButton">病情預測</button>
              <button className="finishButton">結束看診</button>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="leftblock">
            <div className="context">
              <h2>病患資料</h2>

              <BasicInfo />
            </div>
          </div>
          <div className="rightblock">
            <div className="rightcontext" id="rightcontext">
              <QOLSchema />
            </div>
          </div>
        </div>
      </div>
    </>
    //   )}
    // </>
  );
};

export default VisitPage;
