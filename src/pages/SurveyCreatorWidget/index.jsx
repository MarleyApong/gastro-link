// Uncomment the following line if you are using Next.js:
// 'use client'

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true,
    showDefaultLanguageInPreviewTab: true,
    showTranslationTab: true,
    showThemeTab: true,
    showHeaderInEmptySurvey: true
};

export function SurveyCreatorWidget() {
    const creator = new SurveyCreator(creatorOptions);
    creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
    creator.saveSurveyFunc = (saveNo, callback) => {
        window.localStorage.setItem("survey-json", creator.text);
        callback(saveNo, true);
        // saveSurveyJson(
        //     "https://your-web-service.com/",
        //     creator.JSON,
        //     saveNo,
        //     callback
        // );
    };

    return (
        <SurveyCreatorComponent creator={creator} />
    )
}

// function saveSurveyJson(url, json, saveNo, callback) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.ok) {
//       callback(saveNo, true);
//     } else {
//       callback(saveNo, false);
//     }
//   })
//   .catch(error => {
//     callback(saveNo, false);
//   });
// }
