
exports.reset = function () {
    document.getElementById('chassiNumber').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('processArea').value = ''
    document.getElementById('processAreaList').value = '';
    document.getElementById("btnGenerateList").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
    document.getElementById('apiUrl').value ="https://api.trackear.net/v1/vlcon/?token=f612361e57790a6e61a0787ebf289fd0&";
    document.getElementById('chassiNumber').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('valueFound').innerHTML = "0"
    document.getElementById('totalFound').innerHTML = "0/0"
     //limpo
     document.getElementById("andamento").style.display = "none";
     document.getElementById("pausado").style.display = "none";
     document.getElementById("parado").style.display = "none";

     document.getElementById("initProcess").disabled = true;
     document.getElementById("pauseProcess").disabled = true;
     document.getElementById("stopProcess").disabled = true;
}

exports.newSearch = function () {
    document.getElementById('chassiNumber').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('processArea').value = ''
    document.getElementById('processAreaList').value = '';
    document.getElementById('pdfFileName').innerHTML = ''
    document.getElementById('pdfFileReportName').innerHTML = '';
    document.getElementById('valueFound').innerHTML = "0"
    document.getElementById('totalFound').innerHTML = "0/0"
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled = true;
    document.getElementById("stopProcess").disabled = true;
    document.getElementById("chassiNumber").disabled = false;
    document.getElementById("quantity").disabled = false;
    document.getElementById("btnGenerateList").disabled = false;
    document.getElementById('nextPosition').innerHTML = ' - ';
    document.getElementById('nextNumber').innerHTML = ' - ';
    document.getElementById('processAreaList').value = '';
    document.getElementById('actionProcess').value = 'start';
    document.getElementById('pauseProcess').innerHTML = 'Pausar';
    updateProgressBar(0);
    //limpo
    document.getElementById("andamento").style.display = "none";
    document.getElementById("pausado").style.display = "none";
    document.getElementById("parado").style.display = "none";
}

exports.startSearch = function () {
    document.getElementById("initProcess").disabled = false;
    document.getElementById("pauseProcess").disabled = true;
    document.getElementById("stopProcess").disabled = true;
    document.getElementById("chassiNumber").disabled = true;
    document.getElementById("quantity").disabled = true;
    document.getElementById("btnGenerateList").disabled = true;
    updateProgressBar(0);
}

exports.startProcess = function () {
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled = false;
    document.getElementById("stopProcess").disabled = false;

    //processando
    document.getElementById("andamento").style.display = "block";
    document.getElementById("pausado").style.display = "none";
    document.getElementById("parado").style.display = "none";
}

exports.pauseProcess = function () {
    document.getElementById("pauseProcess").disabled = false;
    document.getElementById("stopProcess").disabled = false;
}

exports.stopProcess = function () {
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled = true;
    document.getElementById("stopProcess").disabled = true;
    updateProgressBar(100);

    //parado
    document.getElementById("andamento").style.display = "none";
    document.getElementById("pausado").style.display = "none";
    document.getElementById("parado").style.display = "block";
}

exports.completeProcess = function () {
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled = true;
    document.getElementById("stopProcess").disabled = true;
    updateProgressBar(100);
}

exports.controlStatus = function() {
    var value = document.getElementById('actionProcess').value;
    if(value == 'start'){
        document.getElementById("andamento").style.display = "block";
        document.getElementById("parado").style.display = "none";
        document.getElementById("pausado").style.display = "none";
    }else if(value == 'pause'){
        document.getElementById("andamento").style.display = "none";
        document.getElementById("pausado").style.display = "block";
        document.getElementById("parado").style.display = "none";
    }else if(value == 'stop'){
     
    }
}

function updateProgressBar(width) {
    var elem = document.getElementById("progress-bar");
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}