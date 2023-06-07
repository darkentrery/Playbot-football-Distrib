import {OnboardingComponent} from "../../onboardingComponent/OnboardingComponent";


export const OnboardingStep2Component = ({isOpen, user, funcs}) => {


    const clickSave = () => {

    }

    const clickBack = () => {
        funcs.closeComponent();
        funcs.openOnboardingStep1();
    }

    const clickSkip = () => {
        funcs.closeComponent();
        funcs.openOnboardingStep2();
    }

    return (
        <OnboardingComponent
            isOpen={isOpen}
            step={2}
            closeWindow={funcs.closeComponent}
            button2Text={"Пропустить"}
            button1Click={clickSave}
            button2Click={clickSkip}
            clickBack={clickBack}
        >
            <div className={"onboarding-step-2-component"}>

            </div>
        </OnboardingComponent>
    )
}