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
    otherDisease: [string];
    otherMedicine: [string];
};

type Visit = {
    number: number;
    date: string;
    treat: number;
    SBP: number;
    DBP: number;
    examination: {
        ptosis: number;
        diplopia: number;
        dysphagia: number;
        dysarthria: number;
        dyspnea: number;
        limpWeakness: number;
        MGFAclassification: number;
    };
    Prescription: {
        pyridostigmine: number;
        compesolone: number;
        cellcept: number;
        imuran: number;
        prograf: number;
    };
    selfAssessment: number;
    note: string;
};

type Thymus = {
    testDate: string;
    number: number;
    thymusStatus: number;
    thymusDescription: string;
};

type BloodTest = {
    testDate: string;
    number: number;
    ACHR: number;
    TSH: number;
    freeThyroxine: number;
    ANA: number;
    uricAcid: number;
};

type QOL = {
    number: number;
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

type QMG = {
    number: number;
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

type MG = {
    number: number;
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

type ADL = {
    number: number;
    testDate: string;
    talking: number;
    chewing: number;
    swallowing: number;
    breathing: number;
    brushTeethOrCombHair: number;
    ariseFromChair: number;
    eyelid: number;
    sum: number;
};

type EMG = {
    testDate: string;
    imgLocation: string;
    RNS: {
        part: string;
        preActivation: [];
        postActivation: [];
    };
};
export type { Patient };
