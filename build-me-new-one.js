const fs        = require("fs");
const path      = require('path')
const skeletons = require("./skeletons");

var contents    = fs.readFileSync("./build-me.json");
var jsonContent = JSON.parse(contents);
let buildType   = process.argv[2];
var buildObj    = jsonContent[buildType];

var projectName = "Build-me-new-one";
if(process.argv[3] !== undefined) {
    projectName = process.argv[3];
}

if (!fs.existsSync(projectName)) {
    fs.mkdirSync(projectName)
}

if(buildObj["style"] !== undefined) {
    buildObj["style"].forEach(element => {
        createFile('style/'+ element);
    })
}

if(buildObj["scripts"] !== undefined) {
    buildObj["scripts"].forEach(element => {
        createFile('scripts/'+ element);
    })
}

buildObj["_"].forEach(element => {
    var text = "";
    if( element.includes("html") ) {
        skeletons.init(buildType);
        text = skeletons.getHtml();
    }
    ensureDirectoryExistence(projectName + '/' + element);

    fs.writeFile(projectName + '/' + element, text, function (err) {
        if (err) {
            return console.log("Error:" + err);
        }
    })

});


function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function createFile(path, text) {
    let filePath = projectName + '/'+ path;
    ensureDirectoryExistence(filePath);
    fs.writeFile(filePath, text, function (err) {
        if (err) {
            return console.log(err);
        }
    })
}


