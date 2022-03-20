import assertion, { Assertion } from "./assertion";
import date, { DateModule } from "./date";
import navigation, { Navigation } from "./navigation";
import userInteraction, { UserInteraction } from "./userInteraction";

export class Common {
    assertion: Assertion = assertion
    date: DateModule = date
    navigation: Navigation = navigation
    userInteraction: UserInteraction = userInteraction
}

export default new Common()