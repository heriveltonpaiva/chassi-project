const { jsPDF } = require("jspdf");
var fs = require('fs');
var currentPath = process.cwd();

exports.openPdf = function () {
    const pdfFileName = document.getElementById('pdfFileName').value;
    var docLocation = __dirname + '/files/' + pdfFileName;
    window.open(docLocation, "resizeable,scrollbar");
}

exports.generatePDF = function (textList, pdfFileName, brand) {
    var path = currentPath + '/resources/' + brand + "/";
    createDirectory(path)

    const doc = new jsPDF();
    doc.setFontSize(12);
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

    doc.save(path + pdfFileName + ".pdf");
    document.getElementById('pdfFileName').href = path + pdfFileName + '.pdf';
    document.getElementById('pdfFileName').innerHTML = 'Baixar arquivo ' + brand + "/" + pdfFileName + '.pdf';
}


exports.generateReportPDF = function (textList, pdfFileName) {
    var path = currentPath + '/resources/relatorios/';
    createDirectory(path)

    const doc = new jsPDF();
    doc.setFontSize(12);
    let totalElementPage = 50;
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

    doc.save(path + pdfFileName + ".pdf");
    document.getElementById('pdfFileReportName').href = path + pdfFileName + '.pdf';
    document.getElementById('pdfFileReportName').innerHTML = 'Baixar arquivo relatorios/' + pdfFileName + '.pdf';
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

        fs.readdirSync(currentPath + '/resources/', { withFileTypes: true })
            .filter(item => !item.isDirectory())
            .map(item => console.log(item.name))
    } catch (err) {
        console.error(err);
    }

}