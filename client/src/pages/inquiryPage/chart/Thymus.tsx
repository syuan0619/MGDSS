import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Thymus } from "../../../types/Patient";
import "./Thymus.css";

const patientThymus = [
  {
    testDate: "2023-11-30",
    thymusStatus: 0,
    thymusDescription: "thymusDescription",
  },
];

const ThymusData = patientThymus.map((item) => item.thymusStatus);
const ThymusDate = patientThymus[0]["testDate"];
const ThymusDes = patientThymus[0]["thymusDescription"];
const ThymusStatus = patientThymus[0]["thymusStatus"];

const ThymusChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: Thymus[];
}) => {
  console.log(historyData);

  return (
    <div className="thymus-chart-bg">
      <div className="thymus-chart">
        <div className="thymus-chart-header">
          <button
            className="thymus-chart-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>Thymus</p>
        </div>
        <div className="thymus-chart-footer">
          <div className="thymus-chart-footer-left">
            <div>
              <div>Test Date :</div>
              <div>
                <input
                  type="date"
                  id="testDate"
                  name="testDate"
                  value={ThymusDate}
                  disabled
                />
              </div>
            </div>
            <div>
              <div>Description : </div>
              <div>
                <input
                  defaultValue=""
                  type="text"
                  id="thymusDescription"
                  name="thymusDescription"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="thymus-chart-footer-right">
            <div>Thymus Status : </div>
            <div>{ThymusStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThymusSmallChart = ({ historyData }: { historyData: Thymus[] }) => {
  console.log(historyData);
  const ThymusData = patientThymus[0]["thymusStatus"];
  let thymusResult = "";

  if (ThymusData === 0) {
    thymusResult = "正常";
  } else if (ThymusData === 1) {
    thymusResult = "胸腺萎縮";
  } else if (ThymusData === 2) {
    thymusResult = "胸腺增生";
  } else if (ThymusData === 3) {
    thymusResult = "胸腺瘤";
  }

  return (
    <div className="thymus-chart-smallchart">
      <div>胸腺掃描結果:</div>
      <div>{thymusResult}</div>
    </div>
  );
};
export { ThymusChart, ThymusSmallChart };
