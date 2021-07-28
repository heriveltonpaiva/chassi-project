const { jsPDF } = require("jspdf");

exports.openPdf = function(){
    const pdfFileName = document.getElementById('pdfFileName').value;
    console.log('Download do arquivo: files/' + pdfFileName)
    var docLocation = 'files/' + pdfFileName;
    window.open(docLocation, "resizeable,scrollbar");
}

exports.generatePDF = function(textList, pdfFileName) {

        const doc = new jsPDF();
        doc.setFontSize(10);
        let totalElementPage = 4;
        let cont = 0;
        let totalList = 0;
        var textPage = "";

        textList.forEach(function(element) {
            textPage += element;
            if (totalElementPage - 1 == cont || totalList == textList.length - 1) {
                doc.text(textPage, 15, 15);
                cont = 0;
                textPage = "";
            } else {
                cont++;
            }
            if (cont == 0 && totalList < textList.length - 1) {
                doc.addPage()
            }
            totalList++;
        });

        doc.save("files/" + pdfFileName + ".pdf");
        document.getElementById('pdfFileName').value = pdfFileName + '.pdf';
    }