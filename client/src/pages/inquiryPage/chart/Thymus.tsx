import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Thymus } from "../../../types/Patient";
import "./Thymus.css";

const patientThymus = [
  {
    testDate: "2023-11-30",
    thymusStatus: 2,
    thymusDescription: "nmsl",
  },
];

const ThymusData = patientThymus.map((item) => item.thymusStatus);
const ThymusDate = patientThymus[0]["testDate"];
const ThymusDes = patientThymus[0]["thymusDescription"];
const ThymusStatus = patientThymus[0]["thymusStatus"];
let thymusResult = "";

if (ThymusStatus === 0) {
  thymusResult = "正常";
} else if (ThymusStatus === 1) {
  thymusResult = "胸腺萎縮";
} else if (ThymusStatus === 2) {
  thymusResult = "胸腺增生";
} else if (ThymusStatus === 3) {
  thymusResult = "胸腺瘤";
}

const ThymusChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: Thymus[];
}) => {
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
            <div>{thymusResult}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThymusSmallChart = ({ historyData }: { historyData: Thymus[] }) => {
  // const ThymusData = historyData[0]["thymusStatus"];
  // let thymusResult = "";

  // if (ThymusData === 0) {
  //   thymusResult = "正常";
  // } else if (ThymusData === 1) {
  //   thymusResult = "胸腺萎縮";
  // } else if (ThymusData === 2) {
  //   thymusResult = "胸腺增生";
  // } else if (ThymusData === 3) {
  //   thymusResult = "胸腺瘤";
  // }

  return (
    <div className="thymus-chart-smallchart">
      <div>胸腺掃描結果:</div>
    </div>
  );
};
export { ThymusChart, ThymusSmallChart };
