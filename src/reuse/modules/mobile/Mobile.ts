import gestures, { Gestures } from "./gestures";
import element, { ElementModule } from "./element";
import userInteraction, { UserInteraction } from "./userInteraction";
import device, { Device } from "./device";
import android, { Android } from "./android";
import ios, { Ios } from "./ios";

export class Mobile {
  gestures: Gestures = gestures;
  userInteraction: UserInteraction = userInteraction;
  element: ElementModule = element;
  device: Device = device;
  android: Android = android;
  ios: Ios = ios;
}
export default new Mobile();
