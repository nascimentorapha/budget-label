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
        unidade
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
    IPI,
    valor_total = 0,
    perda = data.dados[21].preco,
    mk = data.dados[22].preco,
    valor_m2 = data.dados[23].preco,
    valor_fita = data.dados[24].preco,
    mao_obra = data.dados[25].preco


    function SetPrice(){
        for (i in data.dados){
            if (tipo_papel == data.dados[i].name ){
                tipo_papel_preco = data.dados[i].preco // 23/09/21 13:50 - Não usa essa variável nos cálculos
                IPI = data.dados[i].IPI
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

    // ###   Tratamento dos números para transformá-los para float, pois no POST
    // ###   eles dão erro de NaN (Not a Number), pois no JSON está/edita como string o dado

    function AdjustNumbers(){
        // Define as variáveis
        var largura_temp,
        altura_temp,
        comprimento_temp,
        colunas_temp,
        lateral_temp,
        vertical_temp,
        horizontal_temp,
        qtd_mes_temp,
        perda_temp,
        mk_temp,
        medida_temp,
        tipo_papel_preco_temp,
        tipo_cola_preco_temp,
        cor_preco_temp,
        embalagem_preco_temp,
        valor_m2_temp,
        tubete_preco_temp,
        valor_fita_temp,
        mao_obra_temp = 0;

        // Tratamento das variáveis
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
        perda_temp = parseFloat(perda);
        perda = perda_temp;
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
        valor_fita_temp = parseFloat(valor_fita);
        valor_fita = valor_fita_temp;
        mao_obra_temp = parseFloat(mao_obra);
        mao_obra = mao_obra_temp;
    }

    AdjustNumbers();


    // ###     Cálculos dos preços         ###//


    qtd_rolo = ( ( ( comprimento/(altura+horizontal) ) * colunas) * 1000 );
    rolo_tubete_liner = (  (largura*colunas)+(lateral*2) + ((vertical*colunas) - vertical));

    medida = ((rolo_tubete_liner/1000) * comprimento);
    // var medida_temp = parseFloat(medida).toFixed(2);
    // medida = medida_temp;
    console.log("medida = ", medida);
    console.log("perda = ", perda, " | perda dividida = ", perda/100);
    console.log("valor do m2 = ", valor_m2);
    console.log("IPI = ", IPI, " | IPI DIVIDIDO = ", IPI/100);
    valor = ( ( ( medida + (medida * (perda/100) ) ) ) * (valor_m2 + ( valor_m2 * (IPI/100) ))  );
    // var valor_temp = parseFloat(valor).toFixed(2);
    // valor = valor_temp;

    console.log("\napos os calculos: \n")
    
    console.log("medida = ", medida);
    console.log("perda = ", perda);
    console.log("valor do m2 = ", valor_m2);
    console.log("IPI = ", IPI);
    console.log("Valor = ", valor);
    custo_rolo = valor + tubete_preco + valor_fita + embalagem_preco + mao_obra;
    
    console.log("Custo do rolo: ", custo_rolo);
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
        IPI,
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
        IPI,
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