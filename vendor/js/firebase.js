
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbH2Il2iJFdOQTTurt1AMlv4JJegvREW8",
    authDomain: "comprafacil-c00cf.firebaseapp.com",
    databaseURL: "https://comprafacil-c00cf.firebaseio.com",
    projectId: "comprafacil-c00cf",
    storageBucket: "comprafacil-c00cf.appspot.com",
    messagingSenderId: "332239095219"
  };
  firebase.initializeApp(config);

  //CADASTRAR USUARIO
  function cadastre_se() {
    
      var email = $("#email").val();
      var senha = $("#senha").val();
      var senhaCon = $("#senhaCon").val();

      if (senha != senhaCon){
        alert("Senhas não conferem!");
        return false;
      }
    
      if (email == "" && senha == "") {
        alert("Preeencha os campos corretamente!");
        return false;
      }
    
      
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function(user){

          alert('Usuário criado com sucesso!');
          $('#formCad').trigger('reset');    
    
        })
        .catch(function(error){
    
          alert('Erro ao criar usuário. Tente com outro E-Mail e use senha com 6 dígitos!');
          console.log("Erro: " + error.message);
    
        });
          

    }

    //LOGAR COM EMAIL
    function logar() {
    
      var email = $("#emailLogin").val();
      var senha = $("#senhaLogin").val();
    
      firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(function(user){
    
        localStorage.setItem("user_id", user.uid);
        localStorage.setItem("user_email", user.email);
          localStorage.setItem("user_raio", user.raio);
        location.href = "compra.html";

      })
      .catch(function(error){
    
        alert('Usuário ou Senha Inválido!');
        console.log("Erro: " + error.message);
    
      });
    
    }
    
    //LOGAR COM CONTA GOOGLE
    function logarComGoogle() {
    
      var provedor = new firebase.auth.GoogleAuthProvider();
    
      firebase.auth().signInWithPopup(provedor)
        .then(function(result){
            localStorage.setItem("user_id", result.user.uid);
          localStorage.setItem("user_email", result.user.email);
          localStorage.setItem("user_raio", result.user.raio);
          location.href = "compra.html";
    
        })
        .catch(function(error){
         
    
          console.log(error.message);
          alert("Erro na Autenticação com o Google");
    
        });
    
    }
    
    //SAIR DO SISTEMA
    function logoff() {
    
      firebase.auth().signOut();
    
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");    
      localStorage.removeItem("user_raio");
      location.href = "index.html";
    
    }

//OBTER INFORMAÇÕES DO CLIENTE
function obterCliente() {

  var uId = localStorage.getItem("user_id");
  
      firebase.database().ref("cliente/"+uId)
      .once("value", function(client){
    
        $("#nome").val( client.val().nome );     
        $("#telefone").val( client.val().telefone );
        $("#endereco").val( client.val().endereco );
        $("#cep").val( client.val().cep );
        $("#raio").val( client.val().raio );

      });

}

  function obternomeCliente() {

      var uId = localStorage.getItem("user_id");

      firebase.database().ref("cliente/" + uId)
          .once("value", function (client) {

              var strg = client.val().nome;
              var word_one = strg.split(' ')[0];

              $("#nome-user").html("Olá, "  + word_one + "! ");

          });
  }

// INSERIR/ATUALIZAR INFORMAÇÕES DO CLIENTE
function infoCliente() {

    var uId = localStorage.getItem("user_id");

    var nome = $("#nome").val();
    var telefone = $("#telefone").val();
    var endereco = $("#endereco").val();
    var cep = $("#cep").val();
    var raio = $("#raio").val();
    var email = localStorage.getItem("user_email");

    var client = {
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      cep: cep,
      email: email,
      raio: raio,
    };
  
    firebase.database().ref("cliente/"+uId).set(client)
    .then(function(result){
        localStorage.setItem("user_raio", raio);
      alert("Cadastrado com Sucesso!");
      $('#ModalCliente').modal('hide');
        location.reload();
  
    })
    .catch(function(error){
  
      alert("Erro ao cadastrar");
      console.log(error.message);
  
    });
  
  }

 
