const startProcess = require('./start-process');
const creator = require('./create-list');
var label = 'Chassi';
exports.pause = function () {

    if (document.getElementById('actionProcess').value === 'pause') {
        continueProcess();
    } else {
        document.getElementById('actionProcess').value = 'pause';
        document.getElementById('pauseProcess').innerHTML = 'Continuar';
        console.log("Processamento pausado!");
        //pausado
        document.getElementById("andamento").style.display = "none";
        document.getElementById("pausado").style.display = "block";
        document.getElementById("parado").style.display = "none";
    }
}

continueProcess = function () {
    const nextPosition = parseInt(document.getElementById('nextPosition').innerHTML);
    const nextNumber = document.getElementById('nextNumber').innerHTML;

    document.getElementById('actionProcess').value = 'start';
    document.getElementById('pauseProcess').innerHTML = 'Pausar';

    //processando
    document.getElementById("andamento").style.display = "block";
    document.getElementById("pausado").style.display = "none";
    document.getElementById("parado").style.display = "none";

    console.log("Processo continuando na posição: " + nextPosition + " e sequencial " + nextNumber);

    var list = creator.createTemporaryList();
    var newList = list.slice(nextPosition);

    startProcess.continue(newList, label);

}