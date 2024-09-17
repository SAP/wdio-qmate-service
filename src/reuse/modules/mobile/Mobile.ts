import gestures, { Gestures } from "./gestures";
import element, { ElementModule } from "./element";
import userInteraction, { UserInteraction } from "./userInteraction";
import device, { Device } from "./device";

export class Mobile {
  gestures: Gestures = gestures;
  userInteraction: UserInteraction = userInteraction;
  element: ElementModule = element;
  device: Device = device;

}

export default new Mobile();