
exports.reset = function () {
    document.getElementById('chassiNumber').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('processArea').value = ''
    document.getElementById('processAreaList').value = '';
    //document.getElementById("clear").style.display = "none";
    document.getElementById("btnGenerateList").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
    //document.getElementsByName('optradio')[0].checked = true;
    document.getElementById('apiUrl').value ="https://api.trackear.net/v1/vlcon/?token=40ca7bee3af47e25cb85959f5faca16f&";
    document.getElementById('chassiNumber').value = '93ZM2ATH0E8816525'
    document.getElementById('quantity').value = '10'
    document.getElementById('valueFound').innerHTML = "0"
    document.getElementById('totalFound').innerHTML = "0/0"

    document.getElementById("initProcess").disabled = false;
    document.getElementById("pauseProcess").disabled  = true;
    document.getElementById("stopProcess").disabled  = true;
    document.getElementById("continueProcess").disabled  = true;
}

exports.enableProcessButton = function() {
    document.getElementById("initProcess").disabled = true;
    document.getElementById("pauseProcess").disabled  = false;
    document.getElementById("stopProcess").disabled  = false;
    document.getElementById("continueProcess").disabled  = true;
    document.getElementById("clear").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
}

exports.showProcessedWithPdf = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("initProcess").style.display = "none";

    document.getElementById("initProcess").disabled = false;
    document.getElementById("pauseProcess").disabled  = true;
    document.getElementById("stopProcess").disabled  = true;
    document.getElementById("continueProcess").disabled  = true;
}

exports.showProcessedWithoutResult = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("initProcess").disabled = false;
    document.getElementById("pauseProcess").disabled  = true;
    document.getElementById("stopProcess").disabled  = true;
    document.getElementById("continueProcess").disabled  = true;
}