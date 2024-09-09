import gestures, { Gestures } from "./gestures";
import element, { ElementModule } from "./element";
import userInteraction, { UserInteraction } from "./userInteraction";

export class Mobile {
  gestures: Gestures = gestures;
  userInteraction: UserInteraction = userInteraction;
  element: ElementModule = element;

}

export default new Mobile();