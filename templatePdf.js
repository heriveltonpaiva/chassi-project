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
  const dataVehicle = getDataVehicle(data.saida.rt02['veiculo'], data.saida.rt02['carga']);
  return replaceMe(dataVehicle);
}

function getDataVehicle(veiculo, carga){
const vehicle = {
 "chassi": veiculo['chassi'],
 "model": veiculo['cod-marca-modelo']+" - "+veiculo['marca-modelo'],
 "type" : veiculo['cod-tipo-veiculo']+" - "+veiculo['tipo-veiculo'],
 "modelYear": veiculo['ano-modelo'],
 "factoryYear" : veiculo['ano-fabricacao'],
 "potency" : veiculo['potencia'] + "cv "+veiculo['cilindradas']+" cc",
 "body": veiculo['cod-tipo-carroceria']+" - "+veiculo['tipo-carroceria'],
 "gas": veiculo['cod-combustivel']+" - "+veiculo['combustivel'],
 "especie": veiculo['cod-especie']+" - "+veiculo['especie'],
 "color": veiculo['cod-cor']+" - "+veiculo['cor'],
 "capacity": veiculo['capacidade-passageiros'],
 "motorNumber": veiculo['num-motor'],
 "cambioNumber": veiculo['num-cambio'],
 "cmtCarga": carga['cmt'],
 "pbtCarga": carga['pbt'],
 "capacityCarga": carga['capacidade-carga'],
 "eixosCarga": carga['num-eixos'],

}
return vehicle;
}