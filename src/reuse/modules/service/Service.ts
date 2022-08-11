import odata, { OData } from "./odata"
import rest, { Rest } from "./rest";

export class Service {
    odata: OData = odata;
    rest: Rest = rest;
}

export default new Service();
// © 2022 SAP SE or an SAP affiliate company. All rights reserved.


