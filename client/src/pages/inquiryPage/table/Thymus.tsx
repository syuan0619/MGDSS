import "./Thymus.css";
import { useState } from "react";
import { Thymus as typeThymus } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";
import { useParams } from "react-router-dom";

const Thymus = ({
  setReplaceComponent,
  selectedDate,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
}) => {
  const routeParams = useParams();

  const [Thymusscore, setThymusScore] = useState<typeThymus>({
    testDate: selectedDate,
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
        .post(`/inquiry/${routeParams.id}/thymus`, Thymusscore)
        .then((res) => {
          console.log(res.data);
          setReplaceComponent("right");
        });
    }
  };

  return (
    <div className="inquiry-table-Thymus-all">
      <div className="inquiry-table-Thymus-bg">
        <div className="inquiry-table-Thymus-head">
          <div className="inquiry-table-Thymus-return">
            <button
              className="Thymus-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-Thymus-head-title">
            <p>Thymus</p>
          </div>
          <div className="inquiry-table-Thymus-content-row-sum"></div>
        </div>
        <div className="inquiry-table-Thymus-content">
          <div className="inquiry-table-Thymus-content-row">
            <div className="inquiry-table-Thymus-content-row-thymusDescription">
              <label htmlFor="thymusDescription">Description:</label>
              <input
                defaultValue=""
                onChange={handleChange}
                type="text"
                id="thymusDescription"
                name="thymusDescription"
              />
            </div>
          </div>
          <div className="inquiry-table-Thymus-content-row-thymusStatus">
            <label htmlFor="thymusStatus">Thymus Status</label>
            <div className="thymus-radio-all">
              <div className="thymus-radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus"
                  name="thymusStatus"
                  value="0"
                />
                <label>胸腺正常</label>
              </div>
              <div className="thymus-radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus"
                  name="thymusStatus"
                  value="1"
                />
                <label>胸腺委縮</label>
              </div>
              <div className="thymus-radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus"
                  name="thymusStatus"
                  value="2"
                />
                <label>胸腺增生</label>
              </div>
              <div className="thymus-radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus"
                  name="thymusStatus"
                  value="3"
                />
                <label>胸腺瘤</label>
              </div>
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
