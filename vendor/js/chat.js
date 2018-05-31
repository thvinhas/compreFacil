jQuery(document).ready(function(e) {
    exibirTodosOsChats()
});
var chatKey = "";
function exibirTodosOsChats() {
    var html = "";
    firebase.database().ref("chat")
        .once("value", function (chats) {
            chats.forEach(function (chat){
                if (chat.val().cod_cliente == localStorage.user_id) {
                    html+= "<li class='clearfix'>" +
                                "<div class='about'>" +
                                    "<div class='name' onclick='exibirChat(" + chat.key + ")'>" + chat.val().nome_loja +"</div>" +
                                "</div>"+
                           "</li>";
                }

                });

            $('.people-list .list').html(html);
        });
}

function exibirChat(chatKey) {

    var htmlchat = "";
    var htmlTituloChat = "";
    var nomeLoja = "";
    var nomeCliente = "";
    firebase.database().ref("chat/"+chatKey)
        .once("value", function (chat) {
            nomeLoja = chat.val().nome_loja;
            nomeCliente = chat.val().nome_cliente;
            htmlTituloChat += "<div class='chat-about'>" +
                "<div class='chat-with'>Chat com "+ nomeLoja+"</div>" +
                "</div>"
            $(".chat-header").html(htmlTituloChat);

        });

    firebase.database().ref("chat/"+chatKey+"/mensagem")
        .on("value", function (mensagens) {
            htmlchat = "";
            mensagens.forEach(function (mensagem) {
                if (mensagem.val().enviado == "cliente") {
                    htmlchat += "<li class='clearfix'>" +
                        "<div class='message-data align-right'>" +
                        "<span class='message-data-time'>"+mensagem.val().hora+"</span> &nbsp; &nbsp;" +
                        "<span class='message-data-name'>"+ nomeCliente +"</span> <i class='fa fa-circle me'></i>" +
                        "</div>" +
                        "<div class='message other-message float-right'>" + mensagem.val().mensagem +"</div>" +
                        "</li>"
                } else {
                    htmlchat+="<li>" +
                        "<div class='message-data'>" +
                        "<span class='message-data-name'><i class='fa fa-circle online'></i> "+ nomeLoja + "</span>" +
                        "<span class='message-data-time'>"+ mensagem.val().hora+"</span>" +
                        "</div>" +
                        "<div class='message my-message'>" + mensagem.val().mensagem+"</div>" +
                        "</li>"
                }
            });
            $(".chat-history ul").html(htmlchat);
        });


    $('#enviar').click(function () {
        var newmensagemRef = firebase.database().ref("chat/"+chatKey+"/mensagem").push();
        newmensagemRef.set({
            enviado: "cliente",
            hora: moment().format("DD/MM/YYYY HH:MM") ,
            mensagem: $('#message-to-send').val()
        });

    });
}





    




