const init = require('./init-app');
const template = require('./templatePdf');
const pdf = require('./generatePdf');
var generalList = new Array

var totalItemFound = 0;
var log = '';

exports.clearConsoleLog = function(){
    log = '';
    totalItemFound = 0;
}

exports.clearCountProcess = function(){
    log = '';
    document.getElementById('countProcess').value = 0;
}

exports.createResponse = function (dataList, jsonResponse, index, label, valueNumber) {
    var countContinue = parseInt(document.getElementById('countProcess').value)+1;
    document.getElementById('countProcess').value = countContinue;

    if (jsonResponse == '') {
        registerLog("[" + countContinue + "] " + label + ": " + valueNumber + " - Falha de comunicação externa.")
    } else {
        const data = saveResponse(jsonResponse, countContinue, valueNumber, label);
        if (data != null) {
            dataList.push(data);
        }

    }
    const totalToProcess = document.getElementById('totalFound').textContent.split('/')[1];
    document.getElementById('totalFound').innerHTML = countContinue + "/" + totalToProcess;
    document.getElementById('nextPosition').innerHTML = countContinue;
    document.getElementById('nextNumber').innerHTML = valueNumber;
}



saveResponse = function (json, countContinue, numberValue, label) {
    if (typeof json.Veiculo === 'undefined') {
        registerLog("[" + countContinue + "] " + label + ": " + numberValue + " - Não encontrado.");
        generalList.push("[" + countContinue + "] " + label + ": " + numberValue + " - Não encontrado."+" \n")
    } else if (typeof json !== undefined) {
        const situacao = json.Veiculo[0].situacao;
        registerLog("[" + countContinue + "] " + label + ": " + numberValue + " - Situação: " + situacao);
        generalList.push("[" + countContinue + "] " + label + ": " + numberValue + " - Situação: " + situacao+" \n")
        if (situacao === 'S/1 EMPLAC') {
            totalItemFound++;
            document.getElementById('valueFound').innerHTML = totalItemFound;
            return json.Veiculo[0];
        }
        return null;
    } else {
        generalList.push("[" + countContinue + "" + label + ": " + numberValue + " - Erro no processamento."+" \n")
        registerLog("[" + countContinue + "" + label + ": " + numberValue + " - Erro no processamento.")
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
        console.log("Nada encontrado para geração do PDF")
    }
}


function registerLog(message) {
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    log += '[' + time + '] - ' + message + '\n';
    document.getElementById('processArea').value = log;
}
