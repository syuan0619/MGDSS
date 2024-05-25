import pandas as pd
import skops.io as sio
import os
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler

MG_SVR_model = sio.load(
    f"{os.path.dirname(__file__)}/MG/MG_sum_prediction_SVR.skops", trusted=True
)
MG_RF_model = sio.load(
    f"{os.path.dirname(__file__)}/MG/MG_sum_prediction_RF.skops", trusted=True
)
MG_LR_model = sio.load(
    f"{os.path.dirname(__file__)}/MG/MG_sum_prediction_LR.skops", trusted=True
)
MG_KNN_model = sio.load(
    f"{os.path.dirname(__file__)}/MG/MG_sum_prediction_KNN.skops", trusted=True
)

ADL_SVR_model = sio.load(
    f"{os.path.dirname(__file__)}/ADL/ADL_sum_prediction_SVR.skops", trusted=True
)
ADL_RF_model = sio.load(
    f"{os.path.dirname(__file__)}/ADL/ADL_sum_prediction_RF.skops", trusted=True
)
ADL_LR_model = sio.load(
    f"{os.path.dirname(__file__)}/ADL/ADL_sum_prediction_LR.skops", trusted=True
)
ADL_KNN_model = sio.load(
    f"{os.path.dirname(__file__)}/ADL/ADL_sum_prediction_KNN.skops", trusted=True
)


def patient_to_dataframe(patient: dict) -> pd.DataFrame:
    data = {}
    # info
    info = patient["info"]
    data["age"] = [datetime.now().year - int(info["DOB"][:4])]
    for i in ["male", "female"]:
        if info["sex"] == i:
            data[f"sex_{i}"] = [1]
        else:
            data[f"sex_{i}"] = [0]
    data["height"] = [info["height"]]
    data["weight"] = [info["weight"]]

    # visit
    visit = patient["visit"]
    data["selfAssessment"] = [visit["selfAssessment"]]
    data["prescription_pyridostigmine"] = [visit["prescription"]["pyridostigmine"]]
    data["prescription_compesolone"] = [visit["prescription"]["compesolone"]]
    data["prescription_imuran"] = [visit["prescription"]["imuran"]]
    for key, value in visit["examination"].items():
        data[f"examination_{key}"] = [value]
    for i in ["I", "II", "IIA", "IIB", "III", "IIIA", "IIIB", "IV", "IVA", "IVB", "V"]:
        if visit["MGFAclassification"] == i:
            data[f"MGFAclassification_{i}"] = [1]
        else:
            data[f"MGFAclassification_{i}"] = [0]

    # blood test
    data["bloodTest_ACHR"] = [patient["bloodTest"]["ACHR"]]

    # QOL
    for key, value in patient["qol"].items():
        if key != "testDate":
            data[f"QOL_{key}"] = [value]

    # QMG
    for key, value in patient["qmg"].items():
        if key != "testDate":
            data[f"QMG_{key}"] = [value]

    # MG
    for key, value in patient["mg"].items():
        if key != "testDate":
            data[f"MG_{key}"] = [value]

    # ADL
    for key, value in patient["adl"].items():
        if key != "testDate":
            data[f"ADL_{key}"] = [value]

    df = pd.DataFrame(data=data)
    return df


def predict_MG_sum(x: pd.DataFrame) -> dict:
    MMscaler = MinMaxScaler(feature_range=(0, 1))
    normalize_df = MMscaler.fit_transform(x)
    scaled_x = pd.DataFrame(data=normalize_df)
    scaled_x.columns = x.columns
    MG_SVR_result = (
        MG_SVR_model.predict(scaled_x)[0]
        if MG_SVR_model.predict(scaled_x)[0] > 0
        else 0
    )
    MG_RF_result = (
        MG_RF_model.predict(scaled_x)[0] if MG_RF_model.predict(scaled_x)[0] > 0 else 0
    )
    MG_LR_result = (
        MG_LR_model.predict(scaled_x)[0] if MG_LR_model.predict(scaled_x)[0] > 0 else 0
    )
    MG_KNN_result = (
        MG_KNN_model.predict(scaled_x)[0]
        if MG_KNN_model.predict(scaled_x)[0] > 0
        else 0
    )
    MG_mean = (MG_SVR_result + MG_RF_result + MG_LR_result + MG_KNN_result) / 4
    MG_min = min(MG_SVR_result, MG_RF_result, MG_LR_result, MG_KNN_result)
    MG_max = max(MG_SVR_result, MG_RF_result, MG_LR_result, MG_KNN_result)
    return {"MG_mean": round(MG_mean), "MG_min": round(MG_min), "MG_max": round(MG_max)}


def predict_ADL_sum(x: pd.DataFrame) -> dict:
    MMscaler = MinMaxScaler(feature_range=(0, 1))
    normalize_df = MMscaler.fit_transform(x)
    scaled_x = pd.DataFrame(data=normalize_df)
    scaled_x.columns = x.columns
    ADL_SVR_result = (
        ADL_SVR_model.predict(scaled_x)[0]
        if ADL_SVR_model.predict(scaled_x)[0] > 0
        else 0
    )
    ADL_RF_result = (
        ADL_RF_model.predict(scaled_x)[0]
        if ADL_RF_model.predict(scaled_x)[0] > 0
        else 0
    )
    ADL_LR_result = (
        ADL_LR_model.predict(scaled_x)[0]
        if ADL_LR_model.predict(scaled_x)[0] > 0
        else 0
    )
    ADL_KNN_result = (
        ADL_KNN_model.predict(scaled_x)[0]
        if ADL_KNN_model.predict(scaled_x)[0] > 0
        else 0
    )
    ADL_mean = (ADL_SVR_result + ADL_RF_result + ADL_LR_result + ADL_KNN_result) / 4
    ADL_min = min(ADL_SVR_result, ADL_RF_result, ADL_LR_result, ADL_KNN_result)
    ADL_max = max(ADL_SVR_result, ADL_RF_result, ADL_LR_result, ADL_KNN_result)
    return {
        "ADL_mean": round(ADL_mean),
        "ADL_min": round(ADL_min),
        "ADL_max": round(ADL_max),
    }
