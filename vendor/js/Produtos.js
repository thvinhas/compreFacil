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

                    html +="<div class=\"col-lg-4 col-md-6 mb-4\">" +
                    			"<a onclick='exibirProduto(" + loja.key + "," + produto.key + ")'>"+
                        			"<div class=\"card h-100\">" +
                        				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\">" +
                   						"<div class=\"card-body\">" +
                    						"<h4 class=\"card-title\">"+ produto.val().nome + "</h4>" +
                    						"<h5>$24.99</h5>" +
                    						"<p class=\"card-text\">"+produto.val().descricao+"</p>" +
                    					"</div>" +
                        			"</div>" +
                    			"</a>" +
                			"</div>";
                });
            });
            $('.produtos').html(html);
        });
}

function exibirProduto(lojaId, produtoId) {
    localStorage.setItem("lojaId", lojaId);
    localStorage.setItem("produtoId", produtoId);
    location.href = "exibirProduto.html"
}
