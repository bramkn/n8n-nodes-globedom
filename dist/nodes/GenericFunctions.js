"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getauthtoken = exports.globedomRequest = void 0;
const xml2js_1 = require("xml2js");
async function globedomRequest(endpoint, qs = {}, authsid = '') {
    const credentials = await this.getCredentials('globedom');
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method: 'GET',
        qs,
        uri: `${credentials.server}${endpoint}`,
        rejectUnauthorized: false,
    };
    const returnr = await this.helpers.request(options);
    const dataObject = {};
    return dataObject;
}
exports.globedomRequest = globedomRequest;
async function getauthtoken() {
    const credentials = await this.getCredentials('globedom');
    const body = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method: 'PUT',
        body,
        uri: `${credentials.server}:2109/susi/account/login/*/*/*/`,
        json: false,
        gzip: true,
        rejectUnauthorized: false,
    };
    console.log(options);
    const parserOptions = Object.assign({
        mergeAttrs: true,
        explicitArray: false,
    });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    const json = await parser.parseStringPromise(response);
    console.log(json);
    let authsid = json.response.token;
    return authsid;
}
exports.getauthtoken = getauthtoken;
//# sourceMappingURL=GenericFunctions.js.map