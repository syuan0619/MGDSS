import "./inquiryPage.css";
import Menu from "./components/Menu";
import Left from "./components/Left";
import Right from "./components/Right";
import ADL from "./table/ADL";
import BloodTest from "./table/BloodTest";
import EMG from "./table/EMG";
import MG from "./table/MG";
import QMG from "./table/QMG";
import QOL from "./table/QOL";
import Thymus from "./table/Thymus";
import Visit from "./table/Visit";
import { useState } from "react";

const InquiryPage = () => {
  const [replaceComponent, setReplaceComponent] = useState("");

  console.log(replaceComponent);
  return (
    <div className="inquiry-all">
      <div className="inquiry-menu">
        <Menu />
      </div>
      <div className="inquiry-left-right-flex">
        <div className="inquiry-left">
          <Left />
        </div>
        <div className="inquiry-right">
          {(() => {
            switch (replaceComponent) {
              case "ADLtable":
                {
                  return <ADL setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "BloodTesttable":
                {
                  return (
                    <BloodTest setReplaceComponent={setReplaceComponent} />
                  );
                }

                break;
              case "EMGtable":
                {
                  return <EMG setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "MGtable":
                {
                  return <MG setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "QMGtable":
                {
                  return <QMG setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "QOLtable":
                {
                  return <QOL setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "Thymustable":
                {
                  return <Thymus setReplaceComponent={setReplaceComponent} />;
                }
                break;

              case "Visittable":
                {
                  return <Visit setReplaceComponent={setReplaceComponent} />;
                }
                break;

              default:
                {
                  return <Right setReplaceComponent={setReplaceComponent} />;
                }
                break;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
export default InquiryPage;
