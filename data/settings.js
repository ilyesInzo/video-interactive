
import settings from './settings.json'
import scenarios from './scenaries.json'

export default function getSetting(isChoiceMustBeProvidedForAllNonFinalScenarios = true){

    for (const choiceTimeKey of Object.keys(settings))  {
        // console.log(settings[choiceTimeKey]);
        settings[choiceTimeKey].choix1 = scenarios[settings[choiceTimeKey].choix1];
        settings[choiceTimeKey].choix2 = scenarios[settings[choiceTimeKey].choix2];
     }

    // check if settings are adequate
    if (isChoiceMustBeProvidedForAllNonFinalScenarios){
        try {
            isSettingsOkey()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // console.log(settings);
    return settings
}

//setting is adequate means : 
// All non final scenarios (except outro and include intro) must have a breackTime choice
// For all non final scenarios this rule must be checked currentBreakTime + choiceMaxTime <= currentScenarioEntTime for all
// we must have exactly one intro and one outro
const isSettingsOkey = () => {
    //throw new Error("haha")
}