const data = require('./data.json')
const fs = require('fs')


exports.calc = function (req,res){

    return res.render("users/index", {dados: data.dados} )
    
}

exports.post = function (req, res){
   
    const id = Number(data.cotacao.length + 1)

    let = {
        name_client, 
        tipo_papel,
        tipo_papel_preco, 
        tipo_cola, 
        tipo_cola_preco,
        cor, 
        cor_nome,
        cor_preco,
        embalagem,
        embalagem_nome,
        embalagem_preco,
        largura,
        altura,
        comprimento,
        colunas,
        lateral,
        vertical,
        horizontal,
        tubete,
        tubete_nome,
        tubete_preco,
        qtd_mes,
        unidade,
        // perda,
        valor_m2,
        mk
    } = req.body

    let qtd_rolo,
    rolo_tubete_liner,
    medida,
    valor, 
    custo_rolo,
    custo_total,
    custo_etiqueta,
    custo_titech,
    valor_negociado,
    mkup_total,
    valor_total = 0,
    perda = 5

    function SetPrice(){
        for (i in data.dados){
            if (tipo_papel == data.dados[i].name ){
                tipo_papel_preco = data.dados[i].preco
            }
        }
        for (i in data.dados){
            if (tipo_cola == data.dados[i].name){
                tipo_cola_preco = data.dados[i].preco
            }
        }

        for (i in data.dados){
            if (cor == data.dados[i].name){
                cor_preco = data.dados[i].preco
            }
        }

        for (i in data.dados){
            if (embalagem == data.dados[i].name){
                embalagem_preco = data.dados[i].preco
            }
        }

        for (i in data.dados){
            if (tubete == data.dados[i].name){
                tubete_preco = data.dados[i].preco
            }
        }

        return true;
    }

    SetPrice()

    function AdjustNumbers(){
        var largura_temp,
        altura_temp,
        comprimento_temp,
        colunas_temp,
        lateral_temp,
        vertical_temp,
        horizontal_temp,
        qtd_mes_temp,
        // perda_temp,
        mk_temp,
        medida_temp,
        tipo_papel_preco_temp,
        tipo_cola_preco_temp,
        cor_preco_temp,
        embalagem_preco_temp,
        valor_m2_temp,
        tubete_preco_temp = 0;

        largura_temp = parseFloat(largura);
        largura = largura_temp;
        altura_temp = parseFloat(altura);
        altura = altura_temp
        comprimento_temp = parseFloat(comprimento);
        comprimento = comprimento_temp;
        colunas_temp = parseFloat(colunas);
        colunas = colunas_temp;
        lateral_temp = parseFloat(lateral);
        lateral = lateral_temp;
        vertical_temp = parseFloat(vertical);
        vertical = vertical_temp;
        horizontal_temp = parseFloat(horizontal);
        horizontal = horizontal_temp;
        qtd_mes_temp = parseFloat(qtd_mes);
        qtd_mes = qtd_mes_temp;
        // perda_temp = parseFloat(perda);
        // perda = perda_temp;
        mk_temp = parseFloat(mk);
        mk = mk_temp;
        medida_temp = parseFloat(medida);
        medida = medida_temp;
        valor_m2_temp = parseFloat(valor_m2);
        valor_m2 = valor_m2_temp;
        tipo_papel_preco_temp = parseFloat(tipo_papel_preco);
        tipo_papel_preco = tipo_papel_preco_temp;
        tipo_cola_preco_temp = parseFloat(tipo_cola_preco);
        tipo_cola_preco = tipo_cola_preco_temp;
        cor_preco_temp = parseFloat(cor_preco);
        cor_preco = cor_preco_temp;
        embalagem_preco_temp = parseFloat(embalagem_preco);
        embalagem_preco = embalagem_preco_temp;
        tubete_preco_temp = parseFloat(tubete_preco);
        tubete_preco = tubete_preco_temp;

    }

    AdjustNumbers();


    // ###     Cálculos dos preços         ###//


    qtd_rolo = ( ( ( comprimento/(altura+horizontal) ) * colunas) * 1000 );
    rolo_tubete_liner = (  (largura*colunas)+(lateral*2) + ((vertical*colunas) - vertical));

    medida = ((rolo_tubete_liner/1000) * comprimento);
    valor = ( ( ( medida + ((medida*perda)/100)) ) * (valor_m2 + ( (valor_m2 * 5)/100  ))  );

    console.log("valor");
    console.log(valor);
    console.log("tubete_preco");
    console.log(tubete_preco);
    console.log("tipo_papel_preco");
    console.log(tipo_papel_preco);
    console.log("embalagem_preco");
    console.log(embalagem_preco);

    console.log("custo_rolo antes")
    console.log(custo_rolo)
    custo_rolo = valor + tubete_preco + tipo_papel_preco + embalagem_preco + 0,05 + 1;
    console.log("custo_rolo depois")
    console.log(custo_rolo)
    custo_total = custo_rolo * qtd_mes;
    custo_etiqueta = custo_rolo / qtd_rolo;
    custo_titech = custo_rolo / 0.8;
    valor_negociado = custo_titech / mk;
    mkup_total = custo_rolo / valor_negociado;
    valor_total = valor_negociado * qtd_mes;

    data.cotacao.push({
        id,
        qtd_rolo,
        rolo_tubete_liner,
        medida,
        valor,
        custo_rolo,
        custo_total,
        custo_etiqueta,
        custo_titech,
        valor_negociado,
        mkup_total,
        valor_total,
        name_client, 
        tipo_papel, 
        tipo_papel_preco, 
        tipo_cola, 
        tipo_cola_preco,
        cor, 
        cor_nome,
        cor_preco,
        embalagem_nome,
        embalagem_preco,
        largura,
        altura,
        comprimento,
        colunas,
        lateral,
        vertical,
        horizontal,
        tubete_nome,
        tubete_preco,
        qtd_mes,
        unidade,
        perda,
        mk
    })

    const cotacao = {
        valor,
        qtd_rolo,
        id,
        name_client, 
        tipo_papel, 
        tipo_papel_preco, 
        tipo_cola, 
        tipo_cola_preco,
        cor, 
        cor_nome,
        cor_preco,
        embalagem_nome,
        embalagem_preco,
        largura,
        altura,
        comprimento,
        colunas,
        lateral,
        vertical,
        horizontal,
        tubete_nome,
        tubete_preco,
        qtd_mes,
        unidade,
        perda,
        mk
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ //criação do arquivo
        if (err) {//tratamento de erro                                      //JSON com os dados do login
            return res.send("Write file error") 
        }

        return res.redirect(`/result/${id}`)
    })
}



exports.result = function(req, res) {

    return res.render("users/result")
}