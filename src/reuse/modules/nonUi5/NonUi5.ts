import assertion, { Assertion } from "./assertion";
import element, { ElementModule } from "./element";
import userInteraction, { UserInteraction } from "./userInteraction";

export class NonUi5 {
    assertion: Assertion = assertion
    element: ElementModule = element
    userInteraction: UserInteraction = userInteraction
}

export default new NonUi5()