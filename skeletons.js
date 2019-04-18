const fs = require("fs");
var contents = fs.readFileSync("./build-me.json");
var jsonContent = JSON.parse(contents);

var libs = {
    jquery: `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>`,

    bootstrap: `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>`

}

var links = {
    css: `<link href="css/style.css" rel="stylesheet">`,
    js: `<script src="js/script.js"></script>`

}
var model = {
    libs: "",
    links: "",
    style: ""
}
var html = {};

html.init = (key) => {
    var builder = jsonContent[key];
    var jsonLibs = builder['libs'];
    var jsonScripts = builder['scripts'];
    var jsonStyleSheets = builder['style']

    if (jsonStyleSheets !== undefined) {
        jsonStyleSheets.forEach(element => {
            model.style += `<link href="style/${element}" rel="stylesheet">
            `;
        });
    }

    if (jsonScripts !== undefined) {
        jsonScripts.forEach(element => {
            model.links += `<script src="scripts/${element}"></script>
            `;
        });
    }

    if (jsonLibs !== undefined) {
        jsonLibs.forEach(element => {
            let lib = libs[element];
            if (lib !== undefined)
                model.libs += lib;
        });
    }
}
html.getHtml = () => {
    console.log(model)
    return `
        <!DOCTYPE html >
        <html>
            <head>
                <meta charset="utf-8">
                <title></title>
                <meta name="author" content="">
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${model.libs}
                ${model.style}
            </head>
            <body>
                ${model.links}
            </body>
        </html>
        `;
}


module.exports = html
