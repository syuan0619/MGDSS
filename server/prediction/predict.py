import pandas as pd
import skops.io as sio
import os
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler

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

def predict_MGCscore(x: pd.DataFrame) -> float:
    SVR_model = sio.load(f'{os.path.dirname(__file__)}/MGC/MGCscore_prediction_SVR.skops', trusted=True)
    MMscaler=MinMaxScaler(feature_range=(0, 1))
    normalize_df=MMscaler.fit_transform(x)
    scaled_x=pd.DataFrame(data=normalize_df)
    scaled_x.columns=x.columns
    SVR_result = SVR_model.predict(scaled_x)
    return {"MGCscore": SVR_result}