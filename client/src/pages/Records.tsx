import { Box, Grid, Paper, styled, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import "../style/Records.css";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Records = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <div className="container"> */}
      <div className="Sideheader">hello</div>
      <div className="wrapper">
        <div className="Sideleft">
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="病患資料" {...a11yProps(0)} />
                <Tab label="身分設定" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
        </div>
        <div className="Sideright">
          <div className="card">1</div>
          <div className="card">2</div>
          <div className="card">3</div>
          <div className="card">4</div>
        </div>
      </div>
      <div className="claerfix"></div>
      {/* </div> */}
      {/* <div className="Sidefooter"></div> */}
    </>
  );
};
export default Records;
