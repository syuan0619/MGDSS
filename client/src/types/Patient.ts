type Patient = {
    info: Info;
    visit: Visit[];
    thymus: Thymus[];
    bloodTest: BloodTest[];
    QOL: QOL[];
    QMG: QMG[];
    MG: MG[];
    ADL: ADL[];
    EMG: EMG[];
};

// 基本資料
type Info = {
    "ID#": string;
    name: string;
    DOB: string;
    sex: string;
    height: number;
    weight: number;
    status: string;
    other: string;
    attackDate: string;
    beginSymptom: string;
    otherHospitalRecord: {
        recentlyDate: string;
        totalTimes: number;
    };
    otherDisease: string[];
    otherMedicine: string[];
};

// 看診紀錄
type Visit = {
    testDate: string;
    treat: number; // 0 ~ 4
    SBP: number;
    DBP: number;
    selfAssessment: number; // 0 ~ 2
    note: string;
    prescription: {
        // 0 ~ 9
        pyridostigmine: number;
        compesolone: number;
        cellcept: number;
        imuran: number;
        prograf: number;
    };
    examination: {
        // 0 or 1 except MGFAclassification
        ptosis: number;
        diplopia: number;
        dysphagia: number;
        dysarthria: number;
        dyspnea: number;
        limpWeakness: number;
        MGFAclassification: string;
    };
};

// 胸腺掃描
type Thymus = {
    testDate: string;
    thymusStatus: number; // 0 ~ 3
    thymusDescription: string;
};

// 血液檢查
type BloodTest = {
    testDate: string;
    ACHR: number;
    TSH: number;
    freeThyroxine: number;
    ANA: number;
    uricAcid: number;
};
// 0 ~ 2 except testDate, sum
type QOL = {
    testDate: string;
    frustration: number;
    eyeUsing: number;
    eating: number;
    social: number;
    entertainment: number;
    fullfillFamilyNeeds: number;
    plansNecessity: number;
    jobState: number;
    speaking: number;
    driving: number;
    depression: number;
    walking: number;
    beingInPublicPlaces: number;
    overwhelm: number;
    freshenUp: number;
    sum: number;
};

// 0 ~ 3 except testDate, sum
type QMG = {
    testDate: string;
    doubleVision: number;
    ptosis: number;
    facialMuscle: number;
    swallowing: number;
    speakFluency: number;
    rightArmHeight: number;
    leftArmHeight: number;
    vitalCapacity: number;
    rightHandGrid: number;
    leftHandGrid: number;
    headLift: number;
    rightLegHeight: number;
    leftLegHeight: number;
    sum: number;
};

// 0 ~ 3 except testDate, sum
type MG = {
    testDate: string;
    ptosis: number;
    doubleVision: number;
    eyeClosure: number;
    talking: number;
    chewing: number;
    swallowing: number;
    breathing: number;
    neckFlexion: number;
    shoulderAbduction: number;
    hipFlexion: number;
    sum: number;
};

// 0 ~ 3 except testDate, sum
type ADL = {
    testDate: string;
    talking: number;
    chewing: number;
    swallowing: number;
    breathing: number;
    brushTeethOrCombHair: number;
    ariseFromChair: number;
    doubleVision: number;
    eyelid: number;
    sum: number;
};

type EMG = {
    testDate: string;
    img: Blob;
    nasalis: {
        preActivation: number;
        postActivation: [];
    };
    abd: {
        preActivation: number;
        postActivation: [];
    };
    trapezius: {
        preActivation: number;
        postActivation: [];
    };
};
export type { Patient, Info, Visit, Thymus, BloodTest, QOL, QMG, MG, ADL, EMG };
