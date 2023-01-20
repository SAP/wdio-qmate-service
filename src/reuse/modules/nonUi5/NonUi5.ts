import assertion, { Assertion } from "./assertion";
import element, { ElementModule } from "./element";
import navigation, { Navigation } from "./navigation";
import userInteraction, { UserInteraction } from "./userInteraction";
import session, { Session } from "./session";


export class NonUi5 {
    assertion: Assertion = assertion
    element: ElementModule = element
    navigation: Navigation = navigation
    userInteraction: UserInteraction = userInteraction
    session: Session = session
}

export default new NonUi5()