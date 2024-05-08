import "./Thymus.css";
import { Thymus } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import typeChange from "../../../types/Change";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";

const TableThymus = ({
  setReplaceComponent,
  selectedDate,
  thymusscore,
  setthymusscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  thymusscore: Thymus;
  setthymusscore: React.Dispatch<React.SetStateAction<Thymus>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultThymus: Thymus = {
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  };
  const [defaultRes, setDefaultRes] = useState<Thymus>(defaultThymus);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/thymus/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setthymusscore(response.data.table);
    } catch {
      return;
    }
  };
  useEffect(() => {
    getDefaultData();
  }, [selectedDate]);
  console.log(defaultRes);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "thymusDescription") {
      setthymusscore({ ...thymusscore, [name]: value });
    } else {
      const numericValue = parseInt(value, 10);
      setthymusscore({
        ...thymusscore,
        [name]: isNaN(numericValue) ? value : numericValue,
      });
    }
  };

  const handleSubmit = async () => {
    console.log("thymusscore", thymusscore);
    setReplaceComponent("right");
    setChangeOrNot({ ...changeOrNot, changeThymus: true });
    getAllData();
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
                value={thymusscore.thymusDescription}
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
                  checked={defaultRes.thymusStatus === 0}
                  type="radio"
                  id="thymusStatus0"
                  name="thymusStatus0"
                  value={0}
                />
                <label>胸腺正常</label>
              </div>
              <div className="thymus-radio">
                <input
                  checked={defaultRes.thymusStatus === 1}
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus1"
                  name="thymusStatus1"
                  value={1}
                />
                <label>胸腺委縮</label>
              </div>
              <div className="thymus-radio">
                <input
                  checked={defaultRes.thymusStatus === 2}
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus2"
                  name="thymusStatus2"
                  value={2}
                />
                <label>胸腺增生</label>
              </div>
              <div className="thymus-radio">
                <input
                  checked={defaultRes.thymusStatus === 3}
                  onChange={handleChange}
                  type="radio"
                  id="thymusStatus3"
                  name="thymusStatus3"
                  value={3}
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
export default TableThymus;
