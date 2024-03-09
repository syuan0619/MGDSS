import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./menu.css";
const Menu = () => {
  return (
    <div className="inquiry-menu-all">
      <div className="inquiry-menu-left">
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
        <div className="inquiry-menu-numbox">001</div>
      </div>
      <div className="inquiry-menu-right">
        <button className="inquiry-menu-button">新增量表</button>
        <button className="inquiry-menu-button">新增電生理訊號量表</button>
        <button className="inquiry-menu-button">病情預測</button>
        <button className="inquiry-menu-button">結束看診</button>
      </div>
    </div>
  );
};
export default Menu;
