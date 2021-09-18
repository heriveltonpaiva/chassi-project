const template = require('./templatePdf');
const parser = require('./parse');
const init = require('./init-app');
const pdf = require('./generatePdf');
const apiUrl = 'http://api.trackear.com.br/v1/denat/chassi/';
const macaddress = require('macaddress');
var fs = require('fs')
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

    apiKey();
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
        var totalEmCirculacao = 0;
        var totalSemPlaca = 0;
        for (const [idx, chassiNumber] of chassiList.entries()) {

            const response = await fetch(apiUrl + chassiNumber).then(function (response) {
                console.log(response);
                return response;
            });

            const index = idx + 1;

            const jsonBody = await response.json();
            if (chassiList.length <= 100) {
                progress += Math.floor(100 / chassiList.length);
                updateProgressBar(progress);
            } else {
                if (idx % Math.floor(chassiList.length / 100) == 0) {
                    updateProgressBar(progress++);
                }
            }

            if (response.status !== 200) {
                registerLog("[" + index + "] Chassi: " + chassiNumber + " - Não encontrado.")
            } else {
                const data = saveResponse(jsonBody, index, chassiNumber);
                if (data != null) {
                    dataList.push(data);
                    if (data.resultado.situacao === 'S/1 EMPLAC') {
                        totalSemPlaca++;
                        console.log(totalSemPlaca);
                        document.getElementById('valueSemPlaca').innerHTML = totalSemPlaca;
                        processTextAndGeneratePdf(dataList, mainList, quantity);
                    }

                } else {
                    totalEmCirculacao++;
                    document.getElementById('valueFound').innerHTML = totalEmCirculacao;
                }

            }
        }

        registerLog('Processamento finalizado!')
        processTextAndGeneratePdf(dataList, mainList, quantity);
        updateProgressBar(100);
    }

    function saveResponse(json, index, chassi) {
        const situacao = json.resultado.situacao;
        registerLog("[" + index + "] Chassi: " + chassi + " - Situação: " + situacao);
        if (situacao === 'S/1 EMPLAC') {
            return json;
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

function processTextAndGeneratePdf(dataList, mainList, quantity) {
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

function generateChassiList(chassi, quantity) {
    var list = new Array();
    const initial = chassi.substring(0, 13);
    const sequence = chassi.substring(13);

    let nextValue = parseInt(sequence);
    let cont = 0;

    while (cont < quantity) {
        list.push(initial.concat(nextValue))
        if (getOptionValueChecked() == 2) {
            var count = 0;
            var total = 10;
            var digit = "X";
            while (count <= total) {
                const init = chassi.substring(0, 8);
                const sequence = chassi.substring(9, 13);
                console.log(init.concat(digit).concat(sequence).concat(nextValue));
                list.push(init.concat(digit).concat(sequence).concat(nextValue))
                digit = count;
                count++;
            }
        }
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

function getOptionValueChecked() {
    var ele = document.getElementsByName('optradio');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value;
        }
    }
}

function apiKey() {
    try {
        var data = fs.readFileSync('config.txt', 'utf8');
        console.log(data);
        if (data.split("keyApi:")[0].substring(10) === 'false') {
            macaddress.one(function (err, mac) {
                const key = mac.replaceAll(':', '');
                var logger = fs.createWriteStream('config.txt', {})
                logger.write('enableKey:true');
                logger.write('keyApi:' + key);
                logger.end()
            });
        } else {
            //validar key 
            console.log("Verificando key");
            macaddress.one(function (err, mac) {
                const key = mac.replaceAll(':', '');
                if (data.split("keyApi:")[1] !== key) {
                    document.getElementById('quantity').disabled = true;
                    document.getElementById("chassiNumber").disabled = true;
                    document.getElementById("btnEd").disabled = true;
                    alert("App não registrada! Entre em contato com desenvolvedor.");
                }
            });
        }
    } catch (e) {
        //validar se config existe 
        document.getElementById('quantity').disabled = true;
        document.getElementById("chassiNumber").disabled = true;
        document.getElementById("btnEd").disabled = true;
        alert("App não configurada! Entre em contato com desenvolvedor.");
    }
}