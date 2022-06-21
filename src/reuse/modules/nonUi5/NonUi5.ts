import assertion, { Assertion } from "./assertion";
import element, { ElementModule } from "./element";
import navigation, { Navigation } from "./navigation";
import userInteraction, { UserInteraction } from "./userInteraction";

export class NonUi5 {
    assertion: Assertion = assertion
    element: ElementModule = element
    navigation: Navigation = navigation
    userInteraction: UserInteraction = userInteraction
}

export default new NonUi5()