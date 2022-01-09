
import settings from './settings.json'
import scenarios from './scenaries.json'

export default function getSetting(isChoiceMustBeProvidedForAllNonFinalScenarios = true) {
    for (var choiceTimeKey in settings) {
        // console.log(settings[choiceTimeKey]);
        settings[choiceTimeKey].choix1 = scenarios[settings[choiceTimeKey].choix1];
        settings[choiceTimeKey].choix2 = scenarios[settings[choiceTimeKey].choix2];
        if (!settings[choiceTimeKey].choiceMaxTime) throw new Error("Waiting choice time not provided")
    }
    // check if settings are adequate
    if (isChoiceMustBeProvidedForAllNonFinalScenarios) {
        try {
            isSettingsOkey()
        } catch (error) {
            throw new Error(error.message)
        }
    }
    // console.log(settings);
    return settings
}

// Setting is adequate means : 
// All non final scenarios (except outro and include intro) must have a breackTime choice
// For all non final scenarios this rule must be checked currentBreakTime + choiceMaxTime <= currentScenarioEntTime for all
// we must have exactly one intro and one outro
// All the scenarios must be in sequence = (no blank between them) and they must never overlap others
const isSettingsOkey = () => {
    checkIntroOutro()
    checkSequence()
}

const checkIntroOutro = () => {
    if (scenarios.intro && scenarios.outro) {
        if (scenarios.intro.startTime != 0) {
            throw new Error("Intro start time must be 0, we got : " + scenarios.intro.startTime)
        }
        let MaxEndTime = 0
        for (var scenarioId in scenarios) {
            const scenario = scenarios[scenarioId]
            if ( (isNaN(scenario.endTime) || scenario.endTime < 0) || (isNaN(scenario.startTime) || scenario.startTime < 0) || scenario.endTime < scenario.startTime) throw new Error("scenario start or end times are wrong")
            MaxEndTime = Math.max(MaxEndTime, scenario.endTime)
        }
        if (scenarios.outro.endTime != MaxEndTime) {
            throw new Error("Outro must be the final scene : its endtime = " + scenarios.outro.endTime + " is different from the max " + MaxEndTime)
        }
    } else {
        throw new Error("Intro or Outro are missing")
    }
}

const checkSequence = () => {
    let sortable = Object.entries(scenarios)
        .sort(([, a], [, b]) => a.startTime - b.startTime)
    for (let index = 0; index < sortable.length - 1; index++) {
        const currentElement = sortable[index][1];
        const nextElement = sortable[index + 1][1];
        if (currentElement.endTime != nextElement.startTime) {
            throw new Error("The scenarios are not consecutive the end of must be the start of another ")
        }
        // if not final and not isDisplayJumpButton it should have choices
        if (!currentElement.isFinal && !currentElement.idDisplayJumpButton) {
            var isChoiceProvided = false
            for (var choiceTimeKey in settings) {
                if (currentElement.startTime < Number(choiceTimeKey) && Number(choiceTimeKey) < currentElement.endTime) {
                    isChoiceProvided = true;
                    // check that the spinnerTime don't exeed the endTime of the scenarion
                    if ((Number(choiceTimeKey) + settings[choiceTimeKey].choiceMaxTime) > currentElement.endTime) {
                        throw new Error("The waiting spinner time : " + settings[choiceTimeKey].choiceMaxTime + " + choice appearence time :  " + Number(choiceTimeKey) + " exeed the scenario end time : " + currentElement.endTime)
                    }
                    break;
                }
            }
            if (!isChoiceProvided) {
                throw new Error("No choice provided for the scenario [" + currentElement.startTime + ", " + currentElement.endTime + "]")
            }
        }
    }
}