jQuery(document).ready(function(e) {
  exibirTodosProdutos()
});


function exibirTodosProdutos() {
    var html0 = "";
    var html = "";
    firebase.database().ref("loja")
        .on("value", function (lojas) {
            lojas.forEach(function (loja){
                
                html0 +="<div class=\"list-group-item\">"+
                            "<button type=\"button\" class=\"btn btn-link\" id=\"loja\" onclick=\"filtraLoja('"+loja.val().nome+"')\">"+loja.val().nome+"</button>"+
                        "</div>";
                        $('#filtroLoja').html(html0);

                let produtos = loja.child('produtos');
                produtos.forEach(function (produto) {

                    html +=""+
                            "<div class=\"col-lg-4 col-md-6 mb-4\" id=\"prods\">" +
                    			"<a href=\"produto.html?produtoId="+produto.key+"&lojaId="+loja.key+"\">"+
                        			"<div class=\"card h-100\">" +
                        				"<img class=\"card-img-top\" src=\""+produto.val().urlImagem+"\" alt=\"\">" +
                   						"<div class=\"card-body\">" +
                    						"<h4 class=\"card-title\" id=\"prodNome\">"+ produto.val().nome + "</h4>" +
											"<h5>"+produto.val().preco+",00</h5>" +
											"<p class=\"invisivel\" id=\"lojaNome\">"+loja.val().nome+"</p> "+
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


//Filtro por loja
function todasLojas(){
	var produtos = document.querySelectorAll("#prods");
	for (var i = 0; i < produtos.length; i++){
		produtos[i].classList.remove("invisivel");
	}
}

function filtraLoja(loja){
	var produtos = document.querySelectorAll("#prods");
	for (var i = 0; i < produtos.length; i++){
		var ljNome = produtos[i].querySelector("#lojaNome"); 
		var nome = ljNome.textContent;
		if(nome == loja){
			produtos[i].classList.remove("invisivel");
		}else{
			produtos[i].classList.add("invisivel");
		}

	}
}

//Filtro dos produtos por nome
var pesquisaCamp = document.querySelector("#fitroProdutos"); 

pesquisaCamp.addEventListener("input", function(){
	
	var produtos = document.querySelectorAll("#prods");
	
	if (this.value.length > 0) { 
	for (var i = 0; i < produtos.length; i++){ 
		
		
		var tdNome = produtos[i].querySelector("#prodNome"); 
		var nome = tdNome.textContent; 
		
		var expressao = new RegExp(this.value, "i"); 
		if(!expressao.test(nome)){ 
			produtos[i].classList.add("invisivel");  
		} else {
			produtos[i].classList.remove("invisivel"); 
			
		}
	}
	}else{ 
		for(var i = 0; i < produtos.length; i++){ 

			produtos[i].classList.remove("invisivel");
		}
		
	} 
});




    




