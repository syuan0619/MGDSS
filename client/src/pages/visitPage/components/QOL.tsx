import { CloseFullscreenRounded, OpenInFullRounded } from "@mui/icons-material";
import { Grid, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { QOL } from "../../../types/Schema";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "1",
  },
  {
    value: 100,
    label: "2",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value);
}

//QOLComponent
const qol = () => {
  //enlargeButton
  const onEnlarge = (tableName: string) => {
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxWidth", "100%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxHeight", "100%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--overflow-tablebox", "auto");
    document
      .getElementById("rightinnercontext")
      ?.style.setProperty("--rightinner-overflow", "hidden");
    document
      .getElementById(tableName)
      ?.style.setProperty("--z-index-tablebox", "9999");
    document.getElementById("buttonOpen")!.style.visibility = "hidden";
    document.getElementById("buttonOnLesson")!.style.visibility = "visible";
    document.getElementById("buttonRotate")!.style.visibility = "hidden";
  };

  ////lessonButton
  const onLessen = (tableName: string) => {
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxWidth", "50%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--size-tableboxHeight", "50%");
    document
      .getElementById(tableName)
      ?.style.setProperty("--overflow-tablebox", "hidden");
    document
      .getElementById("rightinnercontext")
      ?.style.setProperty("--rightinner-overflow", "hidden");
    document
      .getElementById(tableName)
      ?.style.setProperty("--z-index-tablebox", "0");
    document.getElementById("buttonOpen")!.style.visibility = "visible";
    document.getElementById("buttonOnLesson")!.style.visibility = "hidden";
    document.getElementById("buttonRotate")!.style.visibility = "visible";
  };
  //QOLScore
  const [qolScore, setQolScore] = useState<QOL>({
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 0,
    sum: 0,
  });

  const scoreQolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQolScore({ ...qolScore, [e.target.name]: e.target.value });
  };

  let qolSum = 0;
  Object.values(qolScore)
    .slice(0, -1)
    .map((item) => (qolSum += item));
  qolScore["sum"] = qolSum / 50;

  const onSubmitQolScore = () => {
    console.log(qolScore);
  };

  //QOLscale
  const qolScale = Object.keys(qolScore)
    .slice(0, -1)
    .map((item) => (
      <>
        <Grid item xs={6}>
          <Typography gutterBottom>{item}</Typography>
          <Slider
            name={item}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            sx={{ width: "60%" }}
            onChange={scoreQolInput}
          />
        </Grid>
      </>
    ));

  const qolExp = (
    <div className="tablebox" id="qolTable">
      <div className="tableboxFront">
        <div className="tableboxtop">
          <OpenInFullRounded
            onClick={() => onEnlarge("qolTable")}
            id="buttonOpen"
          ></OpenInFullRounded>

          <CloseFullscreenRounded
            onClick={() => onLessen("qolTable")}
            id="buttonOnLesson"
            visibility="hidden"
          ></CloseFullscreenRounded>
        </div>
        <div className="tableboxinner">
          <h1>QOL</h1>
          <Grid container spacing={4} alignItems="center">
            {qolScale}總分:
            {qolScore["sum"]}
            <button className="button" onClick={onSubmitQolScore}>
              確定
            </button>
          </Grid>
        </div>
      </div>
    </div>
  );

  return qolExp;
};

export default qol;
