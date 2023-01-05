var template = 'Marca/Modelo: {model} \n'+
               'Chassi: {chassi} \n'+
               'Nº do Motor: {motorNumber} \n'+
               'N° do Câmbio: {cambioNumber} \n'+
               'Ano/Modelo: {factoryYear}/{modelYear}   \n'+
               'Tipo: {type}\n'+
               'Espécie: {especie} \n'+
               'Cor: {color} \n'+
               'Carroceria: {body} \n'+
               'Combustível: {gas} \n'+
               'N° de passageiro: {capacity} \n'+
               'Potência: {potency} \n';

function replaceMe(data) {
  const pattern = /{\s*(\w+?)\s*}/g;
  return template.replace(pattern, (_, token) => data[token] || '');
}

exports.create = function(data) {
  const dataVehicle = getDataVehicle(data);
  return replaceMe(dataVehicle);
}

function getDataVehicle(veiculo){
const vehicle = {
 "chassi": veiculo['chassi'],
 "model": veiculo['codigoMarcaModelo']+" - "+veiculo['marcaModelo'],
 "type" : veiculo['codigoTipo']+" - "+veiculo['tipo'],
 "modelYear": veiculo['anoModelo'],
 "factoryYear" : veiculo['anoFabricacao'],
 "potency" : veiculo['potencia'] + "cv "+veiculo['cilindradas']+" cc",
 "body": veiculo['carroceria'],
 "gas": veiculo['combustivel'],
 "especie": veiculo['codigoEspecieVeiculo']+" - "+veiculo['especie'],
 "color": veiculo['codigoCor']+" - "+veiculo['cor'],
 "capacity": veiculo['capacidadePassageiro'],
 "motorNumber": veiculo['motor'],
 "cambioNumber": veiculo['cambio']
}
return vehicle;
}