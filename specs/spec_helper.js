var jsdom = require("jsdom").jsdom;
GLOBAL.document = jsdom("<html><head></head><body></body></html>");
GLOBAL.window = document.parentWindow;
document.implementation.createHTMLDocument = jsdom;

require("./polyfills")

require("stik-core");

require("../src/module");
require("../src/form");
require("../src/node");

require("stik-labs");

GLOBAL.stik = window.stik;
