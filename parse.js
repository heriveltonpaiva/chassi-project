var parser = require('xml2json-light');

exports.xmlToJson = function(html) {
  const initIndex = html.indexOf("<saida>"); 
  const endIndex = html.indexOf("</saida>"); 
  const xmlBody = html.substring(initIndex, endIndex).concat('</saida>');
  return parser.xml2json(xmlBody.toString());
}