
exports.reset = function () {
    document.getElementById('chassiNumber').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('processArea').value = ''
    document.getElementById('processAreaList').value = '';
    document.getElementById("btnGenerateList").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
    document.getElementById('apiUrl').value ="https://api.trackear.net/v1/vlcon/?token=40ca7bee3af47e25cb85959f5faca16f&";
    document.getElementById('chassiNumber').value = '93ZM2ATH0E8816525';
    document.getElementById('quantity').value = '10';
    document.getElementById('valueFound').innerHTML = "0"
    document.getElementById('totalFound').innerHTML = "0/0"
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
    updateProgressBar(0);
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
}

exports.completeProcess = function () {
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled = true;
    document.getElementById("stopProcess").disabled = true;
    updateProgressBar(100);
}

function updateProgressBar(width) {
    var elem = document.getElementById("progress-bar");
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}