
exports.reset = function () {
    document.getElementById('chassiNumber').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('processArea').value = ''
    document.getElementById("printPDFBtn").style.display = "none";
    document.getElementById("clear").style.display = "none";
    document.getElementById("btnEd").style.display = "block";

    document.getElementById("printPDFBtn").style.display = "none";
    document.getElementById("clear").style.display = "none";
    document.getElementById('chassiNumber').value = '93YMAF40EHJ382783'
    document.getElementById('quantity').value = '2'
}

exports.enableProcessButton = function() {
    document.getElementById("printPDFBtn").style.display = "none";
    document.getElementById("btnEd").style.display = "none";
    document.getElementById("clear").style.display = "block";
}

exports.showProcessedWithPdf = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("btnEd").style.display = "none";
    document.getElementById("printPDFBtn").style.display = "block";
}

exports.showProcessedWithoutResult = function() {
    document.getElementById("clear").style.display = "block";
    document.getElementById("printPDFBtn").style.display = "none";
    document.getElementById("btnEd").style.display = "none";
}