import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Thymus } from "../../../types/Patient";
import "./Thymus.css";

const ThymusChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: Thymus[];
}) => {
  console.log(historyData);
  const ThymusData = historyData?.slice(-1)[0]?.["thymusStatus"];
  let thymusResult = "";
  if (ThymusData === undefined) {
    thymusResult = "無資料";
  } else if (ThymusData === 0) {
    thymusResult = "正常";
  } else if (ThymusData === 1) {
    thymusResult = "胸腺萎縮";
  } else if (ThymusData === 2) {
    thymusResult = "胸腺增生";
  } else if (ThymusData === 3) {
    thymusResult = "胸腺瘤";
  } else {
    thymusResult = "";
  }
  console.log(ThymusData);

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
  const ThymusData = historyData?.slice(-1)[0]?.["thymusStatus"];
  let thymusResult = "";
  if (ThymusData === undefined) {
    thymusResult = "無資料";
  } else if (ThymusData === 0) {
    thymusResult = "正常";
  } else if (ThymusData === 1) {
    thymusResult = "胸腺萎縮";
  } else if (ThymusData === 2) {
    thymusResult = "胸腺增生";
  } else if (ThymusData === 3) {
    thymusResult = "胸腺瘤";
  } else {
    thymusResult = "";
  }

  return (
    <div className="thymus-chart-smallchart">
      <div>胸腺掃描結果:{thymusResult}</div>
    </div>
  );
};
export { ThymusChart, ThymusSmallChart };
