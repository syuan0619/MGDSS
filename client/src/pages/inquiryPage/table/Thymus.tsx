import "./Thymus.css";
import { useState } from "react";
import { Thymus as typeThymus } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";

const Thymus = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [Thymusscore, setThymusScore] = useState<typeThymus>({
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "testDate" || name === "thymusDescription") {
      setThymusScore({ ...Thymusscore, [name]: value });
    } else {
      const numericValue = parseInt(value, 10);
      setThymusScore({
        ...Thymusscore,
        [name]: isNaN(numericValue) ? value : numericValue,
      });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");

    if (confirmResult) {
      console.log(Thymusscore);
      await api
        .post(`/inquiry/${"6567477ac1d120c47468dcdf"}/thymus`, Thymusscore)
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <div className="inquiry-table-Thymus-all">
      <div className="inquiry-table-Thymus-bg">
        <div className="inquiry-table-Thymus-head">
          <button
            className="Thymus-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>Thymus</p>
        </div>
        <div className="inquiry-table-Thymus-content">
          <div className="inquiry-table-Thymus-content-row">
            <div className="inquiry-table-Thymus-content-row-testdate">
              <label htmlFor="testDate">Test Date:</label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={Thymusscore.testDate}
                onChange={handleChange}
              />
            </div>
            <div className="inquiry-table-Thymus-content-row-thymusStatus">
              <label htmlFor="thymusStatus">thymusStatus</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="thymusStatus"
                name="thymusStatus"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="Thymus-datalist" id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Thymus-content-row">
            <div className="inquiry-table-Thymus-content-row-thymusDescription">
              <label htmlFor="thymusDescription">thymusDescription</label>
              <input
                defaultValue=""
                onChange={handleChange}
                type="text"
                id="thymusDescription"
                name="thymusDescription"
              />
            </div>
          </div>
        </div>

        <div className="inquiry-table-Thymus-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default Thymus;
