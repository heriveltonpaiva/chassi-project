const creator = require('./create-list');
const responseProcess = require('./response-process');
var logTextArea = '';
var index = 0;
exports.start = function () {
    reset();

    var isListGenerated = document.getElementById('processAreaList').value == '';
    if (isListGenerated) {
        registerLog("ERRO! Necessário gerar a listagem a ser processada!")
    } else {
        var label = "Chassi";
        var list = creator.createTemporaryList();
        processFetch(list, label);
    }

}

exports.continue = function (list, label){
    processFetch(list, label);
}

async function processFetch(list, label) {
    let progress = 0;
    var dataList = new Array();
    const apiUrl = creator.getApiUrl();
    const listLength = list.length;

    for (const [idx, valueNumber] of list.entries()) {
        var url = apiUrl + valueNumber;

        if(document.getElementById('actionProcess').value === 'pause'){
            registerLog('Processamento pausado!')
            break;
        }else if(document.getElementById('actionProcess').value === 'stop'){
            updateProgressBar(100)
            registerLog("Processamento encerrado manualmente!");
            break;
        }

        const response = await fetch(url).then(function (response) {
            if (response.status == 404) {
                registerLog('Url da API incorreta!')
            }
            return response;
        });

        const jsonResponse = await response.json();

        index = idx + 1;
        responseProcess.createResponse(dataList, jsonResponse, index, label, valueNumber);

        if (listLength <= 100) {
            progress += Math.floor(100 / listLength);
            updateProgressBar(progress);
        } else {
            if (idx % Math.floor(listLength / 100) == 0) {
                updateProgressBar(progress++);
            }
        }
        if(idx == listLength){
            registerLog('Processamento finalizado!')
            updateProgressBar(100)
        }

    }
    responseProcess.processTextAndGeneratePdf(dataList, index);
}


function updateProgressBar(width) {
    var elem = document.getElementById("progress-bar");
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}

function registerLog(message) {
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    logTextArea += '[' + time + '] - ' + message + '\n';
    document.getElementById('processArea').value = logTextArea;
}

reset = function () {
    logTextArea = '';
}
