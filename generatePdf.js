const { jsPDF } = require("jspdf");
var fs = require('fs');
var currentPath = process.cwd();

exports.openPdf = function () {
    const pdfFileName = document.getElementById('pdfFileName').value;
    var docLocation = __dirname + '/files/' + pdfFileName;
    window.open(docLocation, "resizeable,scrollbar");
}

exports.generatePDF = function (textList, pdfFileName) {
    
    createDirectory(currentPath + '/resources/2023')

    const doc = new jsPDF();
    doc.setFontSize(10);
    let totalElementPage = 4;
    let cont = 0;
    let totalList = 0;
    var textPage = "";

    textList.forEach(function (element) {
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

    doc.save(currentPath + '/resources/2023/' + pdfFileName + ".pdf");
    document.getElementById('pdfFileName').href = currentPath + '/resources/' + pdfFileName + '.pdf';
    document.getElementById('pdfFileName').innerHTML = 'Baixar arquivo ' + pdfFileName + '.pdf';
}

createDirectory = function (path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdir(path, function (err) {
                if (err) {
                    console.log('Falha ao criar o diretório. Erro:', err);
                } else {
                    console.log('Novo diretório criado. Caminho:', path);
                }
            });
        }
    } catch (err) {
        console.error(err);
    }

}