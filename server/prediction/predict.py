import pandas as pd
import skops.io as sio
import os
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
SVR_model = sio.load(f'{os.path.dirname(__file__)}/MGC/MGCscore_prediction_SVR.skops', trusted=True)
DT_model = sio.load(f'{os.path.dirname(__file__)}/MGC/MGCscore_prediction_DT.skops', trusted=True)
LR_model = sio.load(f'{os.path.dirname(__file__)}/MGC/MGCscore_prediction_LR.skops', trusted=True)
KNN_model = sio.load(f'{os.path.dirname(__file__)}/MGC/MGCscore_prediction_KNN.skops', trusted=True)


def patient_to_dataframe(patient: dict) -> pd.DataFrame:
    data = {}
    # info
    info = patient['info']
    data['age'] = [datetime.now().year - int(info['DOB'][:4])]
    for i in ['male', 'female']:
        if info['sex'] == i:
            data[f'sex_{i}'] = [1]
        else:
            data[f'sex_{i}'] = [0]
    data['height'] = [info['height']]
    data['weight'] = [info['weight']]
    
    # visit
    visit = patient['visit']
    data['selfAssessment'] = [visit['selfAssessment']]
    data['prescription_pyridostigmine'] = [visit['prescription']['pyridostigmine']]
    data['prescription_compesolone'] = [visit['prescription']['compesolone']]
    data['prescription_imuran'] = [visit['prescription']['imuran']]
    for key, value in visit['examination'].items():
        data[f'examination_{key}'] = [value]
    for i in ['I', 'II', 'IIA', 'IIB', 'III', 'IIIA', 'IIIB', 'IV', 'IVA', 'IVB', 'V']:
        if visit['MGFAclassification'] == i:
            data[f'MGFAclassification_{i}'] = [1]
        else:
            data[f'MGFAclassification_{i}'] = [0]
    
    # blood test
    data['bloodTest_ACHR'] = [patient['bloodTest']['ACHR']]
    
    # QOL
    for key, value in patient['qol'].items():
        if key != 'testDate':
            data[f'QOL_{key}'] = [value]
            
    # QMG
    for key, value in patient['qmg'].items():
        if key != 'testDate':
            data[f'QMG_{key}'] = [value]
            
    # MG
    for key, value in patient['mg'].items():
        if key != 'testDate':
            data[f'MG_{key}'] = [value]
            
    # ADL 
    for key, value in patient['adl'].items():
        if key != 'testDate':
            data[f'ADL_{key}'] = [value]
            
    df = pd.DataFrame(data= data)
    return df

def predict_MGCscore(x: pd.DataFrame) -> dict:
    MMscaler=MinMaxScaler(feature_range=(0, 1))
    normalize_df=MMscaler.fit_transform(x)
    scaled_x=pd.DataFrame(data=normalize_df)
    scaled_x.columns=x.columns
    SVR_result = SVR_model.predict(scaled_x)[0] if SVR_model.predict(scaled_x)[0] > 0 else 0
    DT_result = DT_model.predict(scaled_x)[0] if DT_model.predict(scaled_x)[0] > 0 else 0
    LR_result = LR_model.predict(scaled_x)[0] if LR_model.predict(scaled_x)[0] > 0 else 0
    KNN_result = KNN_model.predict(scaled_x)[0] if KNN_model.predict(scaled_x)[0] > 0 else 0
    return {"MGCscore_SVR": round(SVR_result), "MGCscore_DT": round(DT_result), 
            "MGCscore_LR": round(LR_result), "MGCscore_KNN": round(KNN_result)}