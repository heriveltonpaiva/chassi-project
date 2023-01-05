
exports.reset = function () {
    document.getElementById('chassiNumber').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('processArea').value = ''
    document.getElementById("clear").style.display = "none";
    document.getElementById("btnEd").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
    //document.getElementsByName('optradio')[0].checked = true;

    //document.getElementById('chassiNumber').value = '8AFAR22N4LJ185594'
    //document.getElementById('quantity').value = '1'
    document.getElementById('valueFound').innerHTML = "0"
    document.getElementById('totalFound').innerHTML = "0/0"
}

exports.enableProcessButton = function() {
    document.getElementById("btnEd").style.display = "none";
    document.getElementById("clear").style.display = "block";
    document.getElementById('pdfFileName').innerHTML = ''
}

exports.showProcessedWithPdf = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("btnEd").style.display = "none";
}

exports.showProcessedWithoutResult = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("btnEd").style.display = "none";
}