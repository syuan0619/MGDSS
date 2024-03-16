import "./Thymus.css";
import { useState } from "react";
import { Thymus as typeThymus } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Thymus = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [Thymus, setThymus] = useState<typeThymus>({
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThymus({ ...Thymus, [name]: value });
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");
    if (confirmResult) {
      console.log(Thymus);
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
          <p>BloodTest</p>
        </div>
        <div className="inquiry-table-Thymus-content">
          <div className="inquiry-table-BloodTest-content-row">
            <div className="inquiry-table-BloodTest-content-row-testdate">
              <label htmlFor="testDate">Test Date:</label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={Thymus.testDate}
                onChange={handleChange}
              />
            </div>
            <div className="inquiry-table-Thymus-content-row-ptosis">
              <label htmlFor="ptosis">ptosis</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="ptosis"
                name="ptosis"
                min="0"
                max="3"
                step="1"
                list="ptosis"
              />

              <datalist id="ptosis">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
              </datalist>
            </div>
          </div>
        </div>
        <div className="inquiry-table-Thymus-content-row">
            <div className="inquiry-table-Thymus-content-row-Note">
              <div className="inquiry-table-Thymus-content-row-Note-head">
                <label htmlFor="TSH">note</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="inquiry-table-Thymus-content-row-input-Note "
                  defaultValue=""
                  onChange={handleChange}
                  type="text"
                  id="note"
                  name="note"
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
