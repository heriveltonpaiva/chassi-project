const init = require('./init-app');
const template = require('./templatePdf');
const pdf = require('./generatePdf');


var totalItemFound = 0;
var log = '';


exports.createResponse = function (dataList, jsonResponse, index, label, valueNumber) {

    if (jsonResponse == '') {
        registerLog("[" + index + "] " + label + ": " + valueNumber + " - Falha de comunicação externa.")
    } else {
        const data = saveResponse(jsonResponse, index, valueNumber, label);
        if (data != null) {
            dataList.push(data);
            console.log(dataList)
        }

    }
    const totalToProcess = document.getElementById('totalFound').textContent.split('/')[1];
    document.getElementById('totalFound').innerHTML = index + "/" + totalToProcess;
    document.getElementById('nextPosition').innerHTML = index;
    document.getElementById('nextNumber').innerHTML = valueNumber;
}



saveResponse = function (json, index, numberValue, label) {
    if (typeof json.Veiculo === 'undefined') {
        registerLog("[" + index + "] " + label + ": " + numberValue + " - Não encontrado.");
    } else if (typeof json !== undefined) {
        const situacao = json.Veiculo[0].situacao;
        registerLog("[" + index + "] " + label + ": " + numberValue + " - Situação: " + situacao);
        if (situacao === 'S/1 EMPLAC') {
            totalItemFound++;
            document.getElementById('valueFound').innerHTML = totalItemFound;
            return json.Veiculo[0];
        }
        return null;
    } else {
        registerLog("[" + index + "" + label + ": " + numberValue + " - Erro no processamento.")
    }
    return null;

}


exports.processTextAndGeneratePdf = function(dataList, quantity) {
    console.log(dataList);
    if (dataList.length > 0) {
        const textVehicle = dataList.map(function (item, index) {
            return template.create(item);
        });
        const pdfName = "VEICULOS_" + dataList[0].chassi + "_" + quantity;
        console.log(textVehicle);
        pdf.generatePDF(textVehicle, pdfName);
        registerLog('Arquivo ' + pdfName + '.pdf gerado com sucesso!');

        init.showProcessedWithPdf();
    } else {
        init.showProcessedWithoutResult();
    }
}


function registerLog(message) {
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    log += '[' + time + '] - ' + message + '\n';
    document.getElementById('processArea').value = log;
}
