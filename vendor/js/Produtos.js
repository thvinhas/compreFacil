jQuery(document).ready(function(e) {
  exibirTodosProdutos()
});

function exibirTodosProdutos() {
    var html = "";
    firebase.database().ref("loja")
        .on("value", function (lojas) {
            lojas.forEach(function (loja){
                let produtos = loja.child('produtos');
                produtos.forEach(function (produto) {

                    html +=""+
                            "<div class=\"col-lg-4 col-md-6 mb-4\">" +
                    			"<a href=\"produto.html?produtoId="+produto.key+"&lojaId="+loja.key+"\" onclick='exibirProduto()'>"+
                        			"<div class=\"card h-100\">" +
                        				"<img class=\"card-img-top\" src=\""+produto.val().urlImagem+"\" alt=\"\">" +
                   						"<div class=\"card-body\">" +
                    						"<h4 class=\"card-title\">"+ produto.val().nome + "</h4>" +
                    						"<h5>"+produto.val().preco+",00</h5>" +
                    						"<p class=\"card-text\">"+produto.val().descricao+"</p>" +
                                        "</div>" +
                                       
                        			"</div>" +
                                "</a>"+
                                "" +
                            "</div>"+
                            "";                        

                });
            });
            $('.produtos').html(html);
        });
}





    




