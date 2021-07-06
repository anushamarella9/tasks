let CODE_TYPE = "local";
// let CODE_TYPE = "dev";
// let CODE_TYPE = "prod";

let localDomain = "http://localhost:5000/";
// let devDomain = "http://sparkdevapi.cowhite.com/";
let devDomain = "https://apidev.sparkvisions.com/";
let prodDomain = "";

function getFullUrl(path) {
    let domain;
    if(CODE_TYPE == "local") {
        domain = localDomain;
    } else if(CODE_TYPE == "dev") {
        domain = devDomain;
    } 
     else if(CODE_TYPE == "prod") {
        domain = prodDomain;
    }
    if(path[0] == "/") {
        path = path.substr(1, path.length);
    }
    return domain + path;
}
module.exports = {
    getFullUrl: getFullUrl
}
