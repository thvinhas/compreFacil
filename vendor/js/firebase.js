
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

  function cadastre_se() {
    
      //var nome = $("#nome").val();
      //var telefone = $("#telefone"); 
      var email = $("#email").val();
      //var endereco = $("#endereco").val();
      //var cep = $("#cep").val();
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
    
    function logar() {
    
      var email = $("#emailLogin").val();
      var senha = $("#senhaLogin").val();
    
      firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(function(user){
    
        localStorage.setItem("user_id", user.uid);
        localStorage.setItem("user_email", user.email);
        location.href = "compra.html";

      })
      .catch(function(error){
    
        alert('Usuário ou Senha Inválido!');
        console.log("Erro: " + error.message);
    
      });
    
    }
    
    function logarComGoogle() {
    
      var provedor = new firebase.auth.GoogleAuthProvider();
    
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
    
    }
    
    function logoff() {
    
      firebase.auth().signOut();
    
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");    
      location.href = "index.html";
    
    }

