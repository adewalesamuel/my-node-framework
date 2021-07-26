const isUrl = (url) => {
    return (typeof url === "string") ? true : false
}

const getPath = (url) => {
    if (!isUrl(url))
        throw new Error("Url is not valid");
    
    let split;
    let path = url.toLowerCase();

    if (path.includes('www.') || path.includes('://')) {
        split = (path.includes('www.')) ? "www." : "://";
        path = path.split(split)[1];
    }
       
    path = path.includes('?') ? path.split('?')[0] : path;
    path = path.endsWith('/') ? path.slice(0, -1) : path;
    path = path.includes('/') ? path.split('/').slice(1, path.split('/').length ).join('/') : ''
    
    return '/' + path;
}

const getQueries = (url) => {
    if (!isUrl(url))
        throw new Error("Url is not valid");    

    if (!url.includes("?"))
        return {};

    let query = url.toLowerCase().split("?")[1];

    if (query.includes("&"))
        query = query.split("&");

    query = !(query instanceof Array) ? [query] : query;

    const queryObject = {};
    
    query.forEach(element => {
        if (!element.includes("="))
            return;

        let key = element.split("=")[0];
        let value = element.split("=")[1];

        queryObject[key] = value;
    });

    return queryObject;
}

const getParams = (structurePath, path) => {
    if (typeof path !== "string")
        throw new Error("path is not valid");

    let newPath = path.endsWith('/') ? path : path + "/";
    let newStructurePath = structurePath.endsWith('/') ? structurePath : structurePath + "/";
    
    const params = {};
    const paramsRegex = /\{.*?\}/i;
    const splitPath = newPath.split('/').slice(1, -1);
    const splitStructurePath = newStructurePath.split('/').slice(1, -1);

    if (splitPath.length !== splitStructurePath.length)
        throw new Error("Path doest not match endpoint.");
    
    splitStructurePath.forEach((section,index) => {
        let keyArr = section.toString().match(paramsRegex);

        if (!keyArr || keyArr.length < 1)
            return

        params[keyArr[0].substring(1, keyArr[0].indexOf('}'))] = splitPath[index];
    })

    return params;
}

const isEndpoint = (structurePath, path) => {
    if (typeof path !== "string")
        throw new Error("Path is not valid");


    let stripedPath = path.endsWith('/') ? path : path + "/";
    let stripedStructurePath = structurePath.endsWith('/') ? structurePath : structurePath + "/";
    let params; 
    
    try {
        params = getParams(stripedStructurePath, stripedPath);
    } catch (error) {
        return false;
    }

    for (param in params) {
        stripedPath = stripedPath.replace(params[param], '');
        stripedStructurePath = stripedStructurePath.replace(`{${param}}`, '');
    }

    return (stripedPath === stripedStructurePath) ? true : false;
}

module.exports = {
    getParams,
    getQueries,
    getPath, 
    isEndpoint
}
