import assertion, { Assertion } from "./assertion";
import confirmationDialog, { ConfirmationDialog } from "./confirmationDialog";
import control, { Control } from "./control";
import date, { DateModule } from "./date";
import element, { ElementModule } from "./element";
import errorDialog, { ErrorDialog } from "./errorDialog";
import footerBar, { FooterBar } from "./footerBar";
import mockserver, { Mockserver } from "./mockserver";
import navigation, { Navigation } from "./navigation";
import navigationBar, { NavigationBar } from "./navigationBar";
import qunit, { QUnit } from "./qunit";
import session, { Session } from "./session";
import table, { Table } from "./table";
import userInteraction, { UserInteraction } from "./userInteraction";

export class Ui5 {
  assertion: Assertion = assertion;
  confirmationDialog: ConfirmationDialog = confirmationDialog;
  control: Control = control;
  date: DateModule = date;
  element: ElementModule = element;
  errorDialog: ErrorDialog = errorDialog;
  footerBar: FooterBar = footerBar;
  mockserver: Mockserver = mockserver;
  navigation: Navigation = navigation;
  navigationBar: NavigationBar = navigationBar;
  qunit: QUnit = qunit;
  session: Session = session;
  table: Table = table;
  userInteraction: UserInteraction = userInteraction;
  authenticators: any;
  users: any;
}

export default new Ui5();
