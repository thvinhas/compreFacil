function sessao(){
    if (localStorage.user_id == undefined){
        location.href = "index.html";
    }
    else {
        firebase.database().ref('cliente/' ).child(localStorage.user_id).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if(!exists) {
                $('#ModalCliente').modal('show');
            }
        });
    }
}
