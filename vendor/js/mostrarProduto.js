
var valor = location.href.split("?");
var valor2 = valor[1].split("&");
var vProd = valor2[0].split("=");
var vLoja = valor2[1].split("=");
var idProduto = vProd[1];
var idLoja = vLoja[1];



function verProds(){


    firebase.database().ref('loja/'+idLoja+'/produtos/'+ idProduto).once('value').then(function(snapshot) {
        
        var nome = (snapshot.val().nome);
        var imagem = (snapshot.val().urlImagem);
        var descricao = (snapshot.val().descricao);
        var preco = (snapshot.val().preco);
        var quantidade = (snapshot.val().quantidade);

        html2="<div class=\"row mt-4\">"+

            "<div class=\"col-lg-4\">"+
            "<img class=\"card-img-top\" src=\""+imagem+"\" alt=\"\">"+
            "</div>"+

            "<div class=\"col-lg-8\" >"+
            "<h1 class=\"my-4\">"+nome+"</h1>"+
            "<form method='post' target='pagseguro' action='https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html'>"+

            "<input name='receiverEmail' value='suporte@lojamodelo.com.br' type='hidden'>"+
            "<input name='currency' value='BRL' type='hidden'>"+
            "<h2>"+preco+",00</h2><br><br>"+
            "<hr>"+
            "<h3>Descrição do vendedor:</h3><br /> "+descricao+"<br><br>"+
            "<hr>"+
            "<input name='itemId1' value='0001' type='hidden'>"+
            "<input name='itemDescription1' value='" + nome + "' type='hidden'>"+
            "<input name='itemAmount1' value='"+parseInt(preco.match(/\d+/)[0]).toFixed(2)+"' type='hidden'>"+
            "<input name='itemWeight1' value='1000' type='hidden'>"+

            "<input name='shippingType' value='3' type='hidden'>"+
            "<input name='shippingAddressPostalCode' value='01452002' type='hidden'>"+
            "<input name='shippingAddressStreet' value='Av. Brig. Faria Lima' type='hidden'>"+
            "<input name='shippingAddressNumber' value='1384' type='hidden'>"+
            "<input name='shippingAddressComplement' value='5o andar' type='hidden'>"+
            "<input name='shippingAddressDistric' value='Jardim Paulistano' type='hidden'>"+
            "<input name='shippingAddressCity' value='Sao Paulo' type='hidden'>"+
            "<input name='shippingAddressState' value='SP' type='hidden'>"+
            "<input name='shippingAddressCountry' value='BRA' type='hidden'>"+

            "<input name='senderName' value='José Comprador' type='hidden'>"+
            "<input name='senderAreaCode' value='11' type='hidden'>"+
            "<input name='senderPhone' value='56273440' type='hidden'>"+
            "<input name='senderEmail' value='c{93842340}@sandbox.pagseguro.com.br' type='hidden'>"+
            "<div class=\"form-group row\">"+
            "<label for=\"example-number-input\" class=\"col-2 col-form-label\">Quantidade: </label>"+
            "<input type='number' name='itemQuantity1' class=\"form-control qtd\"  value='1' min='1' max='"+parseInt(quantidade.replace(/\D/g, ''))+"'><br><br>"+
            " <input alt='Pague com PagSeguro' name='submit'  type='image' src='https://p.simg.uol.com.br/out/pagseguro/i/botoes/pagamentos/120x53-pagar.gif'/>"+
            "</div>"+
            "</form>"+
            "</div>"+

            "</div>";

          $('#detalheProduto').html(html2);


      });


}

function obterLoja(){

    firebase.database().ref('loja/'+idLoja).once('value').then(function(snapshot) {

        var nome = (snapshot.val().nome);
        var endereco = (snapshot.val().endereco);
        var cep = (snapshot.val().cep);
        var telefone = (snapshot.val().telefone);
        var email = (snapshot.val().email);

        html = "<hr>"+
        "<h5>Informações da Loja:</h5><br>"+
        "<b>Nome:</b> "+nome+", <b>Telefone:</b> "+telefone+", <b>CEP:</b> "+cep+"<br>"+
        "<b>Endereço:</b> "+endereco+"<br>"+
        "<b>Email:</b> "+email+"<br><br><br>";

        $('#detalheLoja').html(html);

    });


}

