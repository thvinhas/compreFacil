
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

        html2="<div class=\"row\">"+
        "<div class=\"col-lg-12\">"+
            "<h1 class=\"my-4\">"+nome+"</h1>"+
        "</div>"+
        "</div>"+
  
        "<div class=\"row\">"+
        
                "<div class=\"col-lg-4\">"+
                "<img class=\"card-img-top\" src=\""+imagem+"\" alt=\"\">"+
                "</div>"+
        
                "<div class=\"col-lg-8\" >"+
                    "<b>Preço:</b> "+preco+",00<br><br>"+
                    "<b>Quantidade em estoque:</b> "+quantidade+"<br><br>"+
                "<hr>"+
                    "<b>Descrição:</b> "+descricao+"<br><br>"+ 
                "<hr>"+
                   
        
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

