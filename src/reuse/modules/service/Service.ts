import odata, { OData } from "./odata"
import rest, { Rest } from "./rest";

export class Service {
    odata: OData = odata;
    rest: Rest = rest;
}

export default new Service();