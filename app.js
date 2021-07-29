const template = require('./templatePdf');
const parser = require('./parse');
const init = require('./init-app');
const pdf = require('./generatePdf');
const apiMock = require('./apiMock');

const apiUrl = 'http://api.trackear.com.br/v1/dtweb/chassi/';

var mainList = new Array();
var quantity;
var log = "";

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    init.reset();
    updateProgressBar(0);

    function execute() {
        log = "";
        const chassi = document.getElementById('chassiNumber').value;
        quantity = document.getElementById('quantity').value;

        if (validate(chassi, quantity)) {
            init.enableProcessButton();    
            registerLog('Iniciando processamento!')
            mainList = generateChassiList(chassi, quantity);
            updateProgressBar(10);
            processChassi(mainList);
        }
    }

    async function processChassi(chassiList) {
        let progress = 0;
        var dataList = new Array();
        for (const [idx, chassiNumber] of chassiList.entries()) {
            const response = await fetch(apiUrl+chassiNumber).then(function (response) {
                return response;
            });
            
            const html = await response.text();
            

            if (chassiList.length <= 100) {
                progress += Math.floor(100 / chassiList.length);
                updateProgressBar(progress);
            } else {
                if (idx % Math.floor(chassiList.length / 100) == 0) {
                    updateProgressBar(progress++);
                }
            }

            const index = idx + 1;
            if (html == '') {
                registerLog("[" + index + "] Chassi: " + chassiNumber + " - Falha de comunicação externa.")
            } else {
                const data = saveResponse(parser.xmlToJson(html), index, chassiNumber);
                if (data != null) {
                    dataList.push(data);
                    console.log(dataList)
                }
            }
        }

        registerLog('Processamento finalizado!')
        processTextAndGeneratePdf(dataList, mainList, quantity);
        updateProgressBar(100);
    }

    function saveResponse(json, index, chassi) {

        if (typeof json.saida.rt02 === 'undefined') {
            registerLog("[" + index + "] Chassi: " + chassi + " - Não encontrado.");
        } else if (typeof json.saida.rt02 !== undefined) {
            const situacao = json.saida.rt02['veiculo'].situacao;
            registerLog("[" + index + "] Chassi: " + chassi + " - Situação: " + situacao);
            if(situacao === 'S/1 EMPLAC'){
                return json;
            }
            return null;
        } else {
            registerLog("[" + index + "] Chassi: " + chassi + " - Erro no processamento.")
        }
        return null;
    }


    document.getElementById('btnEd').addEventListener('click', () => {
        execute();
    })

    document.getElementById('clear').addEventListener('click', () => {
        init.reset();
        updateProgressBar(0);
    })

})

function processTextAndGeneratePdf(dataList, mainList, quantity){
    if (dataList.length > 0) {
        const textVehicle = dataList.map(function (item, index) {
            return template.create(item);
        });
        const pdfName = "VEICULOS_" + mainList[0] + "_" + quantity;
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

function generateChassiList(chassi, quantity){
    var list = new Array();
    const initial = chassi.substring(0, 11);
    const sequence = chassi.substring(11);

    let nextValue = parseInt(sequence);
    let cont = 0;

    while (cont < quantity) {
        list.push(initial.concat(nextValue))
        cont++;
        nextValue = parseInt(sequence) + cont;
    }
   return list;         
}

function updateProgressBar(width) {
    var elem = document.getElementById("progress-bar");
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}

function validate(chassi, quantity) {
    var validated = true;
    if (!quantity) {
        validated = false;
        registerLog('Campo: lote não informado.')
    }
    if (!chassi) {
        validated = false;
        registerLog('Campo: chassi não informado.')
    }
    return validated;
}