export default interface Patient {
    info: {
        "ID#": string;
        name: string;
        DOB: string;
        sex: string;
        age: number;
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
    thymus: [
        {
            number: number;
            testDate: string;
            thymusStatus: number;
            thymusDescription: string;
        }
    ];
    bloodTest: [
        {
            number: number;
            testDate: string;
            ACHR: number;
            TSH: number;
            freeThyroxine: number;
            ANA: number;
            uricAcid: number;
        }
    ];
    QOLtable: [
        {
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
        }
    ];
    QMGtable: [
        {
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
        }
    ];
    MGtable: [
        {
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
        }
    ];
    ADLtable: [
        {
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
        }
    ];
    visit: [
        {
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
        }
    ];
}

// default settings
// {
//     info: {
//         "ID#": "",
//         name: "",
//         DOB: "2023-11-29",
//         sex: "",
//         age: 0,
//         height: 0,
//         weight: 0,
//         status: "候診",
//         other: "unknown",
//         attackDate: "2023-11-29",
//         beginSymptom: "beginSymptom",
//         otherHospitalRecord: {
//             recentlyDate: "2023-11-29",
//             totalTimes: 0,
//         },
//         otherDisease: ["diseaseOne"],
//         otherMedicine: ["medicineOne"],
//     },
//     thymus: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             thymusStatus: 0,
//             thymusDescription: "thymusDescription",
//         },
//     ],
//     bloodTest: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             ACHR: 0,
//             TSH: 0,
//             freeThyroxine: 0,
//             ANA: 0,
//             uricAcid: 0,
//         },
//     ],
//     QOLtable: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             frustration: 0,
//             eyeUsing: 0,
//             eating: 0,
//             social: 0,
//             entertainment: 0,
//             fullfillFamilyNeeds: 0,
//             plansNecessity: 0,
//             jobState: 0,
//             speaking: 0,
//             driving: 0,
//             depression: 0,
//             walking: 0,
//             beingInPublicPlaces: 0,
//             overwhelm: 0,
//             freshenUp: 0,
//             sum: 0,
//         },
//     ],
//     QMGtable: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             doubleVision: 0,
//             ptosis: 0,
//             facialMuscle: 0,
//             swallowing: 0,
//             speakFluency: 0,
//             rightArmHeight: 0,
//             leftArmHeight: 0,
//             vitalCapacity: 0,
//             rightHandGrid: 0,
//             leftHandGrid: 0,
//             headLift: 0,
//             rightLegHeight: 0,
//             leftLegHeight: 0,
//             sum: 0,
//         },
//     ],
//     MGtable: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             ptosis: 0,
//             doubleVision: 0,
//             eyeClosure: 0,
//             talking: 0,
//             chewing: 0,
//             swallowing: 0,
//             breathing: 0,
//             neckFlexion: 0,
//             shoulderAbduction: 0,
//             hipFlexion: 0,
//             sum: 0,
//         },
//     ],
//     ADLtable: [
//         {
//             number: 0,
//             testDate: "2023-11-29",
//             talking: 0,
//             chewing: 0,
//             swallowing: 0,
//             breathing: 0,
//             brushTeethOrCombHair: 0,
//             ariseFromChair: 0,
//             eyelid: 0,
//             sum: 0,
//         },
//     ],
//     visit: [
//         {
//             number: 0,
//             date: "2023-11-29",
//             treat: 0,
//             SBP: 0,
//             DBP: 0,
//             examination: {
//                 ptosis: 0,
//                 diplopia: 0,
//                 dysphagia: 0,
//                 dysarthria: 0,
//                 dyspnea: 0,
//                 limpWeakness: 0,
//                 MGFAclassification: 0,
//             },
//             Prescription: {
//                 pyridostigmine: 0,
//                 compesolone: 0,
//                 cellcept: 0,
//                 imuran: 0,
//                 prograf: 0,
//             },
//             selfAssessment: 0,
//             note: "note",
//         },
//     ],
// }
