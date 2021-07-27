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
               'Capacidade de carga: {capacityCarga}  \n'+
               'Eixos: {eixosCarga} \n\n';

function replaceMe(data) {
  const pattern = /{\s*(\w+?)\s*}/g;
  return template.replace(pattern, (_, token) => data[token] || '');
}

exports.create = function(data) {
  const dataVehicle = getDataVehicle(data.dadosVeiculo, data.carga);
  return replaceMe(dataVehicle);
}

function getDataVehicle(veiculo, carga){
const vehicle = {
 "chassi": veiculo.chassi,
 "model": veiculo.marcaModelo,
 "type" : veiculo.tipo,
 "modelYear": veiculo.anoModelo,
 "factoryYear" : veiculo.anoFabricacao,
 "potency" : veiculo.potencia + "cv "+veiculo.cilindradas+" cc",
 "body": veiculo.carroceria,
 "gas": veiculo.combustivel,
 "especie": veiculo.especie,
 "color": veiculo.cor,
 "capacity": veiculo.capacidadePassageiro,
 "motorNumber": veiculo.numeroMotor,
 "cambioNumber": veiculo.numeroCambio,
 "cmtCarga": carga.cmt,
 "pbtCarga": carga.pbt,
 "capacityCarga": carga.capacidadeCarga,
 "eixosCarga": carga.eixos,

}
return vehicle;
}