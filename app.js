const init = require('./init-app');
const creator = require('./create-list');
const processStart = require('./start-process');
const processPause = require('./pause-process');
const processStop = require('./stop-process');
const pdf = require('./generatePdf');
const macaddress = require('macaddress');
const { shell } = require('electron');
var fs = require('fs')
var currentPath = process.cwd();

window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    init.reset();

    document.getElementById('initProcess').addEventListener('click', () => {
        processStart.start();
    })

    document.getElementById('pauseProcess').addEventListener('click', () => {
        processPause.pause();
    })

    document.getElementById('stopProcess').addEventListener('click', () => {
        processStop.stop();
    })

    document.getElementById('clear').addEventListener('click', () => {
        init.reset();
    })

    document.getElementById('btnGenerateList').addEventListener('click', () => {
        creator.createTemporaryList();
    })
    document.getElementById('openReports').addEventListener('click', () => {
        shell.openExternal(currentPath + '/resources/')
    })

})

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