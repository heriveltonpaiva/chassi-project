const dataNotFound = {"saida":{"rt01":{"cod-retorno":"001","msg-retorno":"Nenhum registro encontrado"}}}

const data =  {
    "saida":{
       "rt02":{
          "cod-retorno":"000",
          "msg-retorno":"Transação ou atualização efetuada",
          "veiculo":{
             "chassi":"93YMAF40EHJ382783",
             "placa":"",
             "renavam":"01257516067",
             "situacao":"S/1 EMPLAC",
             "cod-municipio":"0000",
             "municipio":"",
             "uf":"",
             "remarcacao-chassi":"N",
             "tipo-montagem":"COMPLETA",
             "cod-tipo-veiculo":"23",
             "tipo-veiculo":"CAMINHONETE",
             "cod-marca-modelo":"243453",
             "marca-modelo":"RENAULT/MASTER FUR L3H2",
             "cod-especie":"2",
             "especie":"CARGA",
             "cod-tipo-carroceria":"112",
             "tipo-carroceria":"FURGAO",
             "cod-cor":"11",
             "cor":"PRETA",
             "ano-modelo":"2017",
             "ano-fabricacao":"2016",
             "potencia":"130",
             "cilindradas":"2299",
             "cod-combustivel":"03",
             "combustivel":"DIESEL",
             "num-motor":"M9TC678C026138",
             "procedencia":"NACIONAL",
             "num-cambio":"",
             "capacidade-passageiros":"003",
             "data-ultima-atualizacao":"16/03/2021",
             "multa-exigivel-renainf":"0",
             "comunicacao-venda":"0",
             "pendencia-emissao":"0",
             "restricao-renajud":"0",
             "ocorrencia-recall-1":"00",
             "ocorrencia-recall-2":"00",
             "ocorrencia-recall-3":"00",
             "indicador-recall-montadora":"00",
             "indicador-emplacamento-eletronico":"0",
             "origem-indicacao-propriedade":"0",
             "indicador-restricao-rfb":"0",
             "indicador-placa-mercosul":"",
             "indicador-restricoes-informativa-impeditiva":"00",
             "desc-indicador-restricoes-informativa-impeditiva":"Não tem restrição Informativa ou Impeditiva"
          },
          "carga":{
             "cmt":"00550",
             "pbt":"00350",
             "capacidade-carga":"00143",
             "num-carroceria":"",
             "num-eixos":"02",
             "num-eixo-traseiro":"",
             "num-eixo-auxiliar":""
          },
          "proprietario":{
             "cod-tipo-documento":"",
             "tipo-documento":"",
             "num-documento":""
          },
          "faturamento":{
             "cod-tipo-documento":"2",
             "tipo-documento":"PESSOA JURIDICA",
             "num-documento":"03.321.110/0001-43",
             "uf-destino":"MG"
          },
          "diplomacia":{
             "cod-categoria-mre":"00",
             "des-categoria-mre":"",
             "cod-tipo-doc":"0",
             "tipo-doc-prop-mre":"",
             "doc-prop-mre":"",
             "data-atualizacao-mre":"00/00/0000"
          }
       }
    }
 }

exports.mock = data;