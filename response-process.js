const init = require('./init-app');
const template = require('./templatePdf');
const pdf = require('./generatePdf');
var generalList = new Array

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
        generalList.push("[" + index + "] " + label + ": " + numberValue + " - Não encontrado."+" \n")
    } else if (typeof json !== undefined) {
        const situacao = json.Veiculo[0].situacao;
        registerLog("[" + index + "] " + label + ": " + numberValue + " - Situação: " + situacao);
        generalList.push("[" + index + "] " + label + ": " + numberValue + " - Situação: " + situacao+" \n")
        if (situacao === 'S/1 EMPLAC') {
            totalItemFound++;
            document.getElementById('valueFound').innerHTML = totalItemFound;
            return json.Veiculo[0];
        }
        return null;
    } else {
        generalList.push("[" + index + "" + label + ": " + numberValue + " - Erro no processamento."+" \n")
        registerLog("[" + index + "" + label + ": " + numberValue + " - Erro no processamento.")
    }
    return null;

}


exports.processTextAndGeneratePdf = function (dataList, quantity) {
    var brand = '';

    if (dataList.length > 0) {
        const textVehicle = dataList.map(function (item, index) {
            brand = item['marcaModelo'].split("/")[0];
            return template.create(item);
        });

        const pdfName = "VEICULOS_" + brand + "_" + dataList[0].chassi + "_" + dataList.length;
        pdf.generatePDF(textVehicle, pdfName, brand);
        registerLog('Arquivo ' + pdfName + '.pdf gerado com sucesso!');

        const pdfSearchName = "RELATORIO_BUSCA_" + dataList[0].chassi + "_" + dataList.length;
        pdf.generateReportPDF(generalList, pdfSearchName);

    } else {
        init.completeProcess();
    }
}


function registerLog(message) {
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    log += '[' + time + '] - ' + message + '\n';
    document.getElementById('processArea').value = log;
}
