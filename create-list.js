const sufixChassi = 't=chassi&q=';
const sufixCambio = 't=cambio&q=';
const sufixEngine = 't=motor&q=';
var url = '';
var count = 1;
var logTextArea = '';

exports.createTemporaryList = function () {
    reset();

    const quantity = document.getElementById('quantity').value;
    const numberValue = document.getElementById('chassiNumber').value;

    this.getApiUrl();

    console.log("Criação da lista temporária [" + quantity + "] - [" + numberValue + "]");
    if (validate(numberValue, quantity)) {
        var list = ordernedList(generateList(numberValue, quantity));
        list.forEach(it => {
            logTextArea += '[' + (count++) + '] - ' + it + '\n';
            document.getElementById('processAreaList').value = logTextArea;
        })
        document.getElementById('totalFound').innerHTML = "0/" + list.length;
        return list;
    }
    return null;
}

exports.getApiUrl = function () {
    const api = document.getElementById('apiUrl').value;
    var label = '';

    if (document.getElementById('cambioRadio').checked) {
        url = api + sufixCambio;
        label = 'Busca por Câmbio'
    } else if (document.getElementById('motorRadio').checked) {
        url = api + sufixEngine;
        label = 'Busca por Motor'
    } else {
        url = api + sufixChassi;
        label = 'Busca por Chassi'
    }

    if (document.getElementById('apiUrl').value == '') {
        logTextArea = "API não foi informada.";
    }

    document.getElementById('label').innerHTML = label;

    return url;
}

generateList = function (numberValue, quantity) {
    var list = new Array();
    var factor = 4;

    if (numberValue.charAt(numberValue.length - 4) == '0') {
        if (numberValue.charAt(numberValue.length - 3) == '0') {
            factor = 2;
        } else {
            factor = 3;
        }
    }

    const initial = numberValue.substring(0, numberValue.length - factor);
    const sequence = numberValue.substring(numberValue.length - factor);

    let nextValue = parseInt(sequence);
    let cont = 0;

    while (cont < quantity) {
        list.push(initial.concat(nextValue))
        cont++;
        nextValue = parseInt(sequence) + cont;
    }
    return list;
}

ordernedList = function (list) {
    var initialList;
    if (document.getElementById('asc').checked) {
        initialList = list.sort();
    } else if (document.getElementById('desc').checked) {
        initialList = list.reverse();
    }
    return initialList;
}

validate = function (numberValue, quantity) {
    var validated = true;
    if (!quantity) {
        validated = false;
        console.log('Campo: lote não informado.')
    }
    if (!numberValue) {
        validated = false;
        console.log('Campo: numeração não informado.')
    }
    return validated;
}

reset = function () {
    logTextArea = "";
    count = 1;
}