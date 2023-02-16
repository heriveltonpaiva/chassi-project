const template = require('./templatePdf');
const parser = require('./parse');
const init = require('./init-app');
const pdf = require('./generatePdf');
const macaddress = require('macaddress');
const { contextBridge, ipcRenderer } = require('electron');
var fs = require('fs')
var mainList = new Array();
var initialList = new Array();
var quantity;
var log = "";
var totalChassiFound = 0;

window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    //apiKey();
    init.reset();
    updateProgressBar(0);

    function createList() {
        const apiUrlText = document.getElementById('apiUrl').value;

        const apiUrl = apiUrlText + 't=chassi&q=';
        const apiCambioUrl = apiUrlText + 't=cambio&q=';
        const apiMotorUrl = apiUrlText + 't=motor&q=';

        log = "";
        const chassi = document.getElementById('chassiNumber').value;
        quantity = document.getElementById('quantity').value;

        var url = apiUrl;
        var label = "Chassi";

        if (document.getElementById('cambioRadio').checked) {
            url = apiCambioUrl;
            label = "Câmbio";
        } else if (document.getElementById('motorRadio').checked) {
            url = apiMotorUrl;
            label = "Motor";
        }

        if (validate(chassi, quantity)) {
            console.log("Gerando listagem prévia!!!")
            initialList = generateList(chassi, quantity);
            var count = 1;
            if (document.getElementById('asc').checked) {
                initialList = initialList.sort();
            } else if (document.getElementById('desc').checked) {
                initialList = initialList.reverse();
            }
            initialList.forEach(it => {
                log += '[' + (count++) + '] - ' + it + '\n';
                document.getElementById('processAreaList').value = log;
            })
        }

    }


    function execute() {
        const apiUrlText = document.getElementById('apiUrl').value;

        if (apiUrlText == "") {
            registerLog('URL da Api não informada!')
            return;
        }

        if (document.getElementById('processAreaList').value == '') {
            registerLog("ERRO! Necessário gerar a listagem a ser processada!")
        } else {

            const apiUrl = apiUrlText + 't=chassi&q=';
            const apiCambioUrl = apiUrlText + 't=cambio&q=';
            const apiMotorUrl = apiUrlText + 't=motor&q=';

            log = "";
            const chassi = document.getElementById('chassiNumber').value;
            quantity = document.getElementById('quantity').value;

            var url = apiUrl;
            var label = "Chassi";

            if (document.getElementById('cambioRadio').checked) {
                url = apiCambioUrl;
                label = "Câmbio";
            } else if (document.getElementById('motorRadio').checked) {
                url = apiMotorUrl;
                label = "Motor";
            }



            if (validate(chassi, quantity)) {
                updateProgressBar(10);
                processFetch(initialList, url, label);
            }

        }

    }

    async function processFetch(chassiList, apiUrl, label) {
        let progress = 0;
        var dataList = new Array();
        var blockFlow = true;
        for (const [idx, chassiNumber] of chassiList.entries()) {
            console.log("IDX de parada: "+idx + " IDX flag no HTML:"+document.getElementById("idxStep").value)
            if (document.getElementById("idxStep").value == '' || document.getElementById("idxStep").value > idx) {

                //quando pausar e parar o processo
                if (document.getElementById('step').value == "pause" || document.getElementById('step').value == "stop") {
                    console.log("Processamento parado! Próximo: " + chassiNumber);
                    registerLog("Processamento encerrado!")
                    document.getElementById("chassiStep").value = chassiNumber;
                    document.getElementById("idxStep").value = idx;

                    //quando iniciar ou continuar
                } else if (document.getElementById('step').value == "start" || document.getElementById('step').value == "continue") {
                    var url = apiUrl + chassiNumber;
                    const response = await fetch(url).then(function (response) {
                        console.log(response);
                        if (response.status == 404) {
                            registerLog('Url da API incorreta!')
                        }
                        return response;
                    });

                    const jsonResponse = await response.json();


                    if (chassiList.length <= 100) {
                        progress += Math.floor(100 / chassiList.length);
                        updateProgressBar(progress);
                    } else {
                        if (idx % Math.floor(chassiList.length / 100) == 0) {
                            updateProgressBar(progress++);
                        }
                    }

                    const index = idx + 1;
                    if (jsonResponse == '') {
                        registerLog("[" + index + "] " + label + ": " + chassiNumber + " - Falha de comunicação externa.")
                    } else {
                        const data = saveResponse(jsonResponse, index, chassiNumber, label);
                        if (data != null) {
                            dataList.push(data);
                            console.log(dataList)
                        }

                    }
                    const totalToProcess = document.getElementById('totalFound').textContent.split('/')[1];
                    document.getElementById('totalFound').innerHTML = index + "/" + totalToProcess;
                }

                //registerLog('Processamento finalizado!')
                processTextAndGeneratePdf(dataList, mainList, quantity);
                updateProgressBar(100);
            }
        }
    }

    function saveResponse(json, index, chassi, label) {

        if (typeof json.Veiculo === 'undefined') {
            registerLog("[" + index + "] " + label + ": " + chassi + " - Não encontrado.");
        } else if (typeof json !== undefined) {
            const situacao = json.Veiculo[0].situacao;
            registerLog("[" + index + "] " + label + ": " + chassi + " - Situação: " + situacao);
            if (situacao === 'S/1 EMPLAC') {
                totalChassiFound++;
                document.getElementById('valueFound').innerHTML = totalChassiFound;
                return json.Veiculo[0];
            }
            return null;
        } else {
            registerLog("[" + index + "" + label + ": " + chassi + " - Erro no processamento.")
        }
        return null;
    }


    document.getElementById('initProcess').addEventListener('click', () => {
        execute();
    })

    document.getElementById('pauseProcess').addEventListener('click', () => {
        if (document.getElementById('step').value == "pause" || document.getElementById('step').value == "stop") {
            registerLog("ERRO! O processo já está pausado ou foi finalizado!")
        } else {
            document.getElementById("step").value = "pause";
        }
    })

    document.getElementById('continueProcess').addEventListener('click', () => {


        if (document.getElementById('step').value == "continue" || document.getElementById('step').value == "stop") {
            registerLog("ERRO! O processo já está em andamento ou foi finalizado!")
        } else {
            document.getElementById("step").value = "continue";


            const apiUrlText = document.getElementById('apiUrl').value;

            const apiUrl = apiUrlText + 't=chassi&q=';
            const apiCambioUrl = apiUrlText + 't=cambio&q=';
            const apiMotorUrl = apiUrlText + 't=motor&q=';

            const chassi = document.getElementById('chassiNumber').value;
            quantity = document.getElementById('quantity').value;

            var url = apiUrl;
            var label = "Chassi";

            if (document.getElementById('cambioRadio').checked) {
                url = apiCambioUrl;
                label = "Câmbio";
            } else if (document.getElementById('motorRadio').checked) {
                url = apiMotorUrl;
                label = "Motor";
            }



            processFetch(initialList, url, label)
        }
    })

    document.getElementById('stopProcess').addEventListener('click', () => {
        if (document.getElementById('step').value == "stop") {
            registerLog("ERRO! O processo já está parado!")
        } else {
            document.getElementById("step").value = "stop";
        }
    })

    document.getElementById('clear').addEventListener('click', () => {
        console.log("Clear button!")
        init.reset();
    })

    document.getElementById('btnGenerateList').addEventListener('click', () => {
        createList();
    })

})

function processTextAndGeneratePdf(dataList, mainList, quantity) {
    console.log(dataList);
    if (dataList.length > 0) {
        const textVehicle = dataList.map(function (item, index) {
            return template.create(item);
        });
        const pdfName = "VEICULOS_" + dataList[0].chassi + "_" + quantity;
        console.log(textVehicle);
        pdf.generatePDF(textVehicle, pdfName);
        // registerLog('Arquivo ' + pdfName + '.pdf gerado com sucesso!');

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

function generateList(chassi, quantity) {
    var list = new Array();
    var factor = 4;

    if (chassi.charAt(chassi.length - 4) == '0') {
        if (chassi.charAt(chassi.length - 3) == '0') {
            factor = 2;
        } else {
            factor = 3;
        }
    }

    const initial = chassi.substring(0, chassi.length - factor);
    const sequence = chassi.substring(chassi.length - factor);


    let nextValue = parseInt(sequence);
    let cont = 0;

    while (cont < quantity) {
        list.push(initial.concat(nextValue))
        cont++;
        nextValue = parseInt(sequence) + cont;
    }
    document.getElementById('totalFound').innerHTML = "0/" + list.length;
    return list;
}

function generateChassiWithDigitList(chassi, quantity) {
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
    document.getElementById('totalFound').innerHTML = "0/" + list.length;
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
        registerLog('Campo: numeração não informado.')
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