"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tlogout = exports.getauthtoken = exports.globedomRequest = void 0;
const xml2js_1 = require("xml2js");
async function globedomRequest(endpoint, body, authsid = '', method) {
    const credentials = await this.getCredentials('globedom');
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method,
        body,
        uri: `${credentials.server}:2109${endpoint}`,
        rejectUnauthorized: false,
    };
    const parserOptions = Object.assign({
        mergeAttrs: true,
    });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    const json = await parser.parseStringPromise(response);
    const logout = await tlogout.call(this, authsid);
    console.log(response);
    console.log(json);
    let rejson;
    let rjson;
    var data = new Array();
    if (json.multiresponse) {
        rjson = json.multiresponse.response;
        for (let e = 0; e < rjson.length; e++) {
            var data2 = new Array();
            data2.push({ json: rjson[e] });
            data.push(data2);
        }
        rejson = data;
    }
    else {
        rejson = json.response;
    }
    return rejson;
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
    const parserOptions = Object.assign({
        mergeAttrs: true,
        explicitArray: false,
    });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    const json = await parser.parseStringPromise(response);
    let authsid = json.response.token;
    console.log(response);
    return authsid;
}
exports.getauthtoken = getauthtoken;
async function tlogout(authsid) {
    const credentials = await this.getCredentials('globedom');
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method: 'GET',
        uri: `${credentials.server}:2109/susi/account/logout/*/*/${authsid}/`,
        json: false,
        gzip: true,
        rejectUnauthorized: false,
    };
    const parserOptions = Object.assign({
        mergeAttrs: true,
        explicitArray: false,
    });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    const json = await parser.parseStringPromise(response);
    return authsid;
}
exports.tlogout = tlogout;
//# sourceMappingURL=GenericFunctions.js.map