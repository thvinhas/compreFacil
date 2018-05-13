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
                    html +=  "<div class=\"col-lg-4 col-md-6 mb-4\">" +
                        "              <div class=\"card h-100\">" +
                        "                <a href=\"#\"><img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"></a>" +
                        "                <div class=\"card-body\">" +
                        "                  <h4 class=\"card-title\">" +
                        "                    <a onclick='exibirProduto(" + loja.key + "," + produto.key + ")'>"+produto.val().nome+"</a>" +
                        "                  </h4>" +
                        "                  <h5>$24.99</h5>" +
                        "                  <p class=\"card-text\">"+produto.val().descricao+"</p>" +
                        "                </div>" +
                        "                <div class=\"card-footer\">" +
                        "                  <small class=\"text-muted\">&#9733; &#9733; &#9733; &#9733; &#9734;</small>" +
                        "                </div>" +
                        "                </div>" +
                        "              </div>";
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
