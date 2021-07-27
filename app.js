const {
    jsPDF
} = require("jspdf");


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
    document.getElementById("printPDFBtn").style.display = "none";
    document.getElementById("clear").style.display = "none";
    document.getElementById('chassiNumber').value = '9BWAH5BZ5KP609851'
    document.getElementById('quantity').value = '2'
    document.getElementById('token').value = 'Um9kcmlnTw=='



    const apiMock = require('./apiMock');
    const template = require('./templatePdf');
    var parser = require('xml2json-light');

    var parser = require('xml2json-light');
var xml = '<saida><rt02><cod-retorno>000</cod-retorno><msg-retorno>Transação ou atualização efetuada</msg-retorno><veiculo><chassi>93YMAF40EHJ382783</chassi><placa></placa><renavam>01257516067</renavam><situacao>S/1 EMPLAC</situacao><cod-municipio>0000</cod-municipio><municipio></municipio><uf></uf><remarcacao-chassi>N</remarcacao-chassi><tipo-montagem>COMPLETA</tipo-montagem><cod-tipo-veiculo>23</cod-tipo-veiculo><tipo-veiculo>CAMINHONETE</tipo-veiculo><cod-marca-modelo>243453</cod-marca-modelo><marca-modelo>RENAULT/MASTER FUR L3H2</marca-modelo><cod-especie>2</cod-especie><especie>CARGA</especie><cod-tipo-carroceria>112</cod-tipo-carroceria><tipo-carroceria>FURGAO</tipo-carroceria><cod-cor>11</cod-cor><cor>PRETA</cor><ano-modelo>2017</ano-modelo><ano-fabricacao>2016</ano-fabricacao><potencia>130</potencia><cilindradas>2299</cilindradas><cod-combustivel>03</cod-combustivel><combustivel>DIESEL</combustivel><num-motor>M9TC678C026138</num-motor><procedencia>NACIONAL</procedencia><num-cambio></num-cambio><capacidade-passageiros>003</capacidade-passageiros><data-ultima-atualizacao>16/03/2021</data-ultima-atualizacao><multa-exigivel-renainf>0</multa-exigivel-renainf><comunicacao-venda>0</comunicacao-venda><pendencia-emissao>0</pendencia-emissao><restricao-renajud>0</restricao-renajud><ocorrencia-recall-1>00</ocorrencia-recall-1><ocorrencia-recall-2>00</ocorrencia-recall-2><ocorrencia-recall-3>00</ocorrencia-recall-3><indicador-recall-montadora>00</indicador-recall-montadora><indicador-emplacamento-eletronico>0</indicador-emplacamento-eletronico><origem-indicacao-propriedade>0</origem-indicacao-propriedade><indicador-restricao-rfb>0</indicador-restricao-rfb><indicador-placa-mercosul></indicador-placa-mercosul><indicador-restricoes-informativa-impeditiva>00</indicador-restricoes-informativa-impeditiva><desc-indicador-restricoes-informativa-impeditiva>Não tem restrição Informativa ou Impeditiva</desc-indicador-restricoes-informativa-impeditiva></veiculo><carga><cmt>00550</cmt><pbt>00350</pbt><capacidade-carga>00143</capacidade-carga><num-carroceria></num-carroceria><num-eixos>02</num-eixos><num-eixo-traseiro></num-eixo-traseiro><num-eixo-auxiliar></num-eixo-auxiliar></carga><proprietario><cod-tipo-documento></cod-tipo-documento><tipo-documento></tipo-documento><num-documento>              </num-documento></proprietario><faturamento><cod-tipo-documento>2</cod-tipo-documento><tipo-documento>PESSOA JURIDICA</tipo-documento><num-documento>03.321.110/0001-43</num-documento><uf-destino>MG</uf-destino></faturamento><diplomacia><cod-categoria-mre>00</cod-categoria-mre><des-categoria-mre></des-categoria-mre><cod-tipo-doc>0</cod-tipo-doc><tipo-doc-prop-mre></tipo-doc-prop-mre><doc-prop-mre></doc-prop-mre><data-atualizacao-mre>00/00/0000</data-atualizacao-mre></diplomacia></rt02></saida>';
var json = parser.xml2json(xml); 
 
console.log(json); 

    function validate(token, chassi, quantity) {
        var validated = true;
        console.log(token + " - " + quantity + "- " + chassi);
        if (token == '') {
            validated = false;
            registerLog('Campo: token não informado.')
        }
        if (quantity == '') {
            validated = false;
            registerLog('Campo: lote não informado.')
        }

        if (chassi == '') {
            validated = false;
            registerLog('Campo: chassi não informado.')
        }
        return validated;
    }

    function reset() {
        document.getElementById('chassiNumber').value = ''
        document.getElementById('quantity').value = ''
        document.getElementById('processArea').value = ''
        document.getElementById("printPDFBtn").style.display = "none";
        document.getElementById("clear").style.display = "none";
        document.getElementById("btnEd").style.display = "block";
        updateProgressBar(0);
    }

    var mainList;
    var quantity;
    var log = "";
    var url = "";

    function execute() {
    
      

        log = "";
        const token = document.getElementById('token').value;
        url = 'http://allleak.com/api/detran/index.php?token=' + token + '&api=chassi&documento=';
        const chassi = document.getElementById('chassiNumber').value;
        quantity = document.getElementById('quantity').value;

        if (validate(token, chassi, quantity)) {

            document.getElementById("printPDFBtn").style.display = "none";
            document.getElementById("btnEd").style.display = "none";
            document.getElementById("clear").style.display = "block";

            mainList = new Array();
            registerLog('Iniciando processamento!')
            console.log('Generate sequence [' + quantity + '] for the chassi: ' + chassi);

            const initial = chassi.substring(0, 11);
            const sequence = chassi.substring(11);
            let nextValue = parseInt(sequence);
            let cont = 0;

            while (cont < quantity) {
                mainList.push(createChassiObj(initial, nextValue))
                cont++;
                nextValue = parseInt(sequence) + cont;
            }
            updateProgressBar(10);

            var urls = mainList.map(function(item, index) {
                return item.url;
            });

            processChassi(urls);
        }
    }

    function createChassiObj(initial, nextValue) {
        var chassiObj = new Object();
        chassiObj.value = initial.concat(nextValue);
        chassiObj.url = url + initial.concat(nextValue);
        return chassiObj;
    }

    document.getElementById('btnEd').addEventListener('click', () => {
        execute();
    })

    document.getElementById('clear').addEventListener('click', () => {
        reset();
    })

    document.getElementById('printPDFBtn').addEventListener('click', () => {
        const pdfFileName = document.getElementById('pdfFileName').value;
        console.log('Download do arquivo: files/' + pdfFileName)
        var docLocation = 'files/' + pdfFileName;
        window.open(docLocation, "resizeable,scrollbar");
    })


    function registerLog(text) {
        var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
        log += '[' + time + '] - ' + text + '\n';
        document.getElementById('processArea').value = log;
    }

    async function processChassi(urls) {
        let progress = 0;
        var data;
        var dataList = new Array();
        for (const [idx, url] of urls.entries()) {
            //const response = await fetch(url);
           // const response = fetch();
           //console.log(`Received Todo ${idx+1}:`, response);
           fetch('http://api.trackear.com.br/v1/dtweb/chassi/93YMAF40EHJ382783')
           .then(function(response) {
               // When the page is loaded convert it to text
               return response.text()
           })
           .then(function(html) {
              // console.log("html "+html);
               const xmlBody = '<saida>'.concat(html.split('<saida>')[1].replace('-->',''));
               // Initialize the DOM parser
       
               console.log(xmlBody); 
               var json = parser.xml2json(xmlBody.toString());                
               console.log(json);
           })
           .catch(function(err) {  
               console.log('Failed to fetch page: ', err);  
           });
          // console.log(data);
           
           if (urls.length <= 100){
                progress += Math.floor(100 / urls.length);
                updateProgressBar(progress);
            }else{
                if(idx % Math.floor(urls.length/100) == 0){
                    updateProgressBar(progress++);
                }
            }

            const indexChassi = url.length - 17;
            const index = idx + 1;

            if (response.status == 403) {
                registerLog("Token expirado!");
                break;
            } else if (response.status == 404) {
                registerLog("["+index+"] Chassi: " + url.substring(indexChassi)+" - Não encontrado.");
            } else if(data == null){
                registerLog("["+index+"] Chassi: " + url.substring(indexChassi)+" - Erro no processamento.")
            }else{
                if (data != null && data.dadosVeiculo.situacao == 'S/1 EMPLAC' || data != null && data.dadosVeiculo.placa == '') {
                    dataList.push(data);
                    registerLog("["+index+"] Chassi: " + url.substring(indexChassi) - +" - Situação: " + data.dadosVeiculo.situacao);
                } else {
                    registerLog("["+index+"] Chassi: " + url.substring(indexChassi) - +" - Situação: " + data.dadosVeiculo.situacao);
                }
           }
        }

        registerLog('Processamento finalizado!')

        if (dataList.length > 0) {
            var textVehicle = mainList.map(function(item, index) {
                return template.create(dataList);
            });

            generatePDF(textVehicle, "VEICULOS_" + mainList[0].value + "_" + quantity);

            document.getElementById("clear").style.display = "none";
            document.getElementById("btnEd").style.display = "block";
            document.getElementById("printPDFBtn").style.display = "block";
        } else {
            document.getElementById("clear").style.display = "block";
            document.getElementById("printPDFBtn").style.display = "none";
            document.getElementById("btnEd").style.display = "none";

        }
        updateProgressBar(100);
    }

    function generatePDF(textList, pdfFileName) {

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
        registerLog('Arquivo ' + pdfFileName + '.pdf gerado com sucesso!');
        document.getElementById('pdfFileName').value = pdfFileName + '.pdf';
    }

})

function updateProgressBar(width) {
    var elem = document.getElementById("progress-bar");
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
}