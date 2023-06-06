import {OnboardingComponent} from "../../onboardingComponent/OnboardingComponent";


export const OnboardingStep1Component = ({isOpen, user, closeComponent}) => {
    return (
        <OnboardingComponent isOpen={isOpen} step={1} closeWindow={closeComponent}>

        </OnboardingComponent>
    )
}