 $(".omb_btn-google").click(function(){
 	var provedor =  new firebase.auth.GoogleAuthProvider();

 	firebase.auth().signInWithPopup(provedor)
 	.then(function(result){

 		localStorage.setItem("user_id", result.user.uid);
 		localStorage.setItem("user_email", result.user.email);

 		location.href = "compra.html";

 	})
 	.catch(function(error){

 		console.log(error.message);
 		alert("Erro na Autenticação com o Google");

 	});
 });