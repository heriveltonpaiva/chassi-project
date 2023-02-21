
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

exports.enableProcessButton = function() {
    document.getElementById("clear").style.display = "none";
    document.getElementById('pdfFileName').innerHTML = ''
}

exports.showProcessedWithPdf = function() {
    document.getElementById("clear").style.display = "none";
}
exports.showProcessedWithoutResult = function() {
    document.getElementById("clear").style.display = "none";
}
/** 
//Process control
exports.pauseOrStop = function() {
    document.getElementById("initProcess").style.display = "none";
    document.getElementById("continueProcess").style.display = "none";
    document.getElementById("pauseProcess").style.display = "block";
    document.getElementById("stopProcess").style.display = "block";
}

exports.continueOrStop = function() {
    document.getElementById("initProcess").style.display = "none";
    document.getElementById("pauseProcess").style.display = "block";
    document.getElementById("continueProcess").style.display = "block";
    document.getElementById("stopProcess").style.display = "block";
}

exports.start = function() {
    document.getElementById("initProcess").style.display = "block";
    document.getElementById("pauseProcess").style.display = "none";
    document.getElementById("continueProcess").style.display = "none";
    document.getElementById("stopProcess").style.display = "none";
}

exports.endProcess = function() {
    document.getElementById("initProcess").style.display = "none";
    document.getElementById("pauseProcess").style.display = "none";
    document.getElementById("continueProcess").style.display = "none";
    document.getElementById("stopProcess").style.display = "none";
}
*/

