var parser = require('xml2json-light');

exports.xmlToJson = function(html) {
  const xmlBody = '<saida>'.concat(html.split('<saida>')[1].replace('-->',''));
  return parser.xml2json(xmlBody.toString());
}