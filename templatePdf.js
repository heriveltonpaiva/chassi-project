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
               'Potência: {potency} \n'+
               'Carga cmt: {cmtCarga}  \n'+
               'Carga pbt: {pbtCarga}  \n'+
               'Eixos: {eixosCarga} \n\n';

function replaceMe(data) {
  const pattern = /{\s*(\w+?)\s*}/g;
  return template.replace(pattern, (_, token) => data[token] || '');
}

exports.create = function(data) {
  const dataVehicle = getDataVehicle(data.resultado);
  return replaceMe(dataVehicle);
}

function getDataVehicle(veiculo){
const vehicle = {
 "chassi": veiculo['chassi'],
 "model": veiculo['codigoMarcaModelo']+" - "+veiculo['descricaoMarcaModelo'],
 "type" : veiculo['codigoTipoVeiculo']+" - "+veiculo['descricaoTipoVeiculo'],
 "modelYear": veiculo['anoModelo'],
 "factoryYear" : veiculo['anoFabricacao'],
 "potency" : veiculo['potencia'] + "cv "+veiculo['cilindradas']+" cc",
 "body": veiculo['codigoTipoCarroceria']+" - "+veiculo['descricaoTipoCarroceria'],
 "gas": veiculo['codigoCombustivel']+" - "+veiculo['descricaoCombustivel'],
 "especie": veiculo['codigoEspecieVeiculo']+" - "+veiculo['descricaoEspecieVeiculo'],
 "color": veiculo['codigoCor']+" - "+veiculo['descricaoCor'],
 "capacity": veiculo['lotacao'],
 "motorNumber": veiculo['numeroMotor'],
 "cambioNumber": veiculo['numeroCambio'],
 "cmtCarga": veiculo['cmt'],
 "pbtCarga": veiculo['pbt'],
 "eixosCarga": veiculo['qtdEixos'],
}
return vehicle;
}