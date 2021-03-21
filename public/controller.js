const data = require('./data.json')

// variáveis dinâmicas
let qtd_rolo = 0
let rolo_tubete = 0
let medida_m2 = 0
let valor = 0
let custo_rolo = 0
let custo_total = 0
let custo_etiqueta = 0
let custo_titech = 0
let valor_negociado = 0
let mkup_total = 0
let valor_total = 0

// Cálculo qtd rolo
$(document).ready(function(){
    $('.qtd_rolo').keyup(function(){
        var total_qtd_rolo = 0
        var altura = document.getElementById('altura').value
        console.log(altura)
    })
    
    
})

function qtd_rolo_change(){
    var total_qtd_rolo = 0
    var altura = document.getElementById('altura').value
    console.log(altura)
}


var largura = document.getElementById('largura').value;