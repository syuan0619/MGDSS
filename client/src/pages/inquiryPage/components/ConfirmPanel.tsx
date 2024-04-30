import Confirm from "./Confirm";
import "./Confirm.css";
import { tablePatient } from "../../../types/Patient";
import ConfirmEMG from "./ConfirmEMG";
import ConfirmVisit from "./ConfirmVisit";

const ConfirmPanel = ({ patients }: { patients: tablePatient | undefined }) => {
  return (
    patients && (
      <div className="confirm-panel">
        <div className="row-of-confirm-panel">
          <Confirm title="ADL" initialData={patients.ADL} />
          <Confirm title="BloodTest" initialData={patients.bloodTest} />
          <ConfirmEMG title="BloodTest" initialData={patients.EMG} />
          <Confirm title="MG" initialData={patients.MG} />
        </div>
        <div className="row-of-confirm-panel">
          <Confirm title="QMG" initialData={patients.QMG} />
          <Confirm title="QOL" initialData={patients.QOL} />
          <Confirm title="Thymus" initialData={patients.thymus} />
          <ConfirmVisit title="Visit" initialData={patients.visit} />
        </div>
      </div>
    )
  );
};

export default ConfirmPanel;

// const [ADLscore] = useState<typeADL>({
//   testDate: "",
//   talking: 0,
//   chewing: 0,
//   swallowing: 0,
//   breathing: 0,
//   brushTeethOrCombHair: 0,
//   ariseFromChair: 0,
//   eyelid: 0,
//   sum: 0,
// });
// const [BloodTestscore] = useState<typeBloodTest>({
//   testDate: "",
//   ACHR: 0,
//   TSH: 0,
//   freeThyroxine: 0,
//   ANA: 0,
//   uricAcid: 0,
// });
// const [MGscore] = useState<typeMG>({
//   testDate: "",
//   ptosis: 0,
//   doubleVision: 0,
//   eyeClosure: 0,
//   talking: 0,
//   chewing: 0,
//   swallowing: 0,
//   breathing: 0,
//   neckFlexion: 0,
//   shoulderAbduction: 0,
//   hipFlexion: 0,
//   sum: 0,
// });
// const [QMGscore] = useState<typeQMG>({
//   testDate: "",
//   doubleVision: 0,
//   ptosis: 0,
//   facialMuscle: 0,
//   swallowing: 0,
//   speakFluency: 0,
//   rightArmHeight: 0,
//   leftArmHeight: 0,
//   vitalCapacity: 0,
//   rightHandGrid: 0,
//   leftHandGrid: 0,
//   headLift: 0,
//   rightLegHeight: 0,
//   leftLegHeight: 0,
//   sum: 0,
// });
// const [QOLscore] = useState<typeQOL>({
//   testDate: "",
//   frustration: 0,
//   eyeUsing: 0,
//   eating: 0,
//   social: 0,
//   entertainment: 0,
//   fullfillFamilyNeeds: 0,
//   plansNecessity: 0,
//   jobState: 0,
//   speaking: 0,
//   driving: 0,
//   depression: 0,
//   walking: 0,
//   beingInPublicPlaces: 0,
//   overwhelm: 0,
//   freshenUp: 0,
//   sum: 0,
// });
// const [Thymusscore] = useState<typeThymus>({
//   testDate: "",
//   thymusStatus: 0,
//   thymusDescription: "",
// });
