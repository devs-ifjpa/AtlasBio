var db = firebase.firestore();
let FieldValue = firebase.firestore.FieldValue;
let connectedRef = firebase.database().ref(".info/connected");

// LOGIN DEFAULT

document.getElementById("formlogin") != null ? (
    document.getElementById("formlogin").addEventListener("submit", () => {
        event.preventDefault();
        var email = document.getElementById("loginemail");
        var password = document.getElementById("loginpassword");
        Firebase_Login(email,password);
    })
) : false;

function Firebase_Login(userEmail,userPass){
    userEmail = userEmail.value;
    userPass = userPass.value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        var errorMessage = error.message;
        if(errorMessage == "The password is invalid or the user does not have a password."){
            window.alert("Senha inválida ou usuário não cadastrado.")
        }
        else if(errorMessage == "The email address is badly formatted."){
            window.alert("O endereço de email está mal formatado ou não foi preenchido.")
        }
    });
}

// $LOGIN DEFAULT

// LOGOUT

function Firebase_Logout(){
    firebase.auth().signOut();  
}

// $LOGOUT

// REGISTER

    function SelectChecked(father,kids){
        return Array.from(father.querySelectorAll(kids)).filter(item => {
            if(item.selected == true){
                return item 
            }
        })[0];
    }

    document.getElementById("Form_Register") != null ? (
        document.getElementById("Form_Register").addEventListener("submit", () => {
            event.preventDefault();
            let email = document.getElementById("email").value;
            let name = document.getElementById("name").value;
            let password = document.getElementById("password").value;
            let confirm = document.getElementById("confirm");
            let voce = SelectChecked(document.getElementById("voce"),"option").value;
            let day = SelectChecked(document.getElementById("day"),"option").textContent;
            let month = SelectChecked(document.getElementById("month"),"option").textContent;
            let year = SelectChecked(document.getElementById("year"),"option").textContent;
            let date = `${day}/${month}/${year}`;
            voce != "you" ? (
                password == confirm.value ?
                Firebase_RegisterEmail(email,password,[name,date,voce]) :
                alert('As senhas não conferem')
            ) :
            alert("Selecione sua profissão");
        })
    ) : false;

    function Firebase_RegisterEmail(email,password,data){
        if(email != "" && password != ""){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
                data.length > 0 ? Firebase_RegisterDatabase(data) : false;
            }).catch(function(error) {
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                errorMessage == "The email address is already in use by another account." ?
                    alert('O endereço de email já está sendo usado por outra conta.') : false;
            });
        }
    }
  
  
// $REGISTER

// CRUD

    // CREATE

        function Firebase_RegisterDatabase(data){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var user = firebase.auth().currentUser;
                    db.collection("users").doc(user.uid).set({
                        nome: data[0],
                        data: data[1],
                        profissao: data[2]
                    }).then(function() {
                        Firebase_Logout();
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                }
            });
        }

    // $CREATE

    // READ

        function Firebase_ReadDatabase(user,dir = 'users'){
            db.collection(dir).doc(user.uid).get().then(doc => {
                Firebase_FormatData(doc.data());
            }).catch(err => {
                console.log('Error getting document', err);
            });
        }

        function Firebase_FormatData(datauser){
            console.log(datauser);
            // console.log(datauser.nome);
            // console.log(datauser.profissao);
            // console.log(datauser.data);
        }

    // $READ

    // UPDATE

        function Firebase_UpdateDatabase(user,data){
            db.collection("users").doc(user.uid).update({
                nome: data[0],
                data: data[1],
                profissao: data[2]
            }).then(function() {
                Firebase_Logout();
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }

    // $UPDATE

    // DELETE

        function Firebase_DeleteDatabase(user,data){
            if(data == undefined){
                db.collection("users").doc(user.uid).delete()
            }
            else{
                let dataremove = [
                    { nome: FieldValue.delete() },
                    { data: FieldValue.delete() },
                    { profissao: FieldValue.delete() }
                ];
                data == "nome" ? dataoption = dataremove[0] :
                data == "data" ? dataoption = dataremove[1] :
                data == "profissao" ? dataoption = dataremove[2] : false;
                db.collection("users").doc(user.uid).update(dataoption);
            }
        }

    // $DELETE

// $CRUD

// REGISTER ALTERNATIVE

function Firebase_AlternativeLogin(type,data){
    if(type == "Google" || type == "google"){
        var provider = new firebase.auth.GoogleAuthProvider();
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

// $REGISTER ALTERNATIVE

// OFFLINE

    firebase.firestore().enablePersistence();

// $OFFLINE

// SIGNED

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            location.href
            // User is signed in.
            console.log("entrou");
            // firebase.firestore().disableNetwork();
            // firebase.firestore().enableNetwork();
            connectedRef.on("value", function(snap) {
                if (snap.val() === true) {
                    Firebase_ReadDatabase(user);
                    console.log("connected");
                } else {
                    Firebase_ReadDatabase(user);
                    console.log("not connected");
                }
            });
        }else{
            console.log("saiu");
        }
    });

// $SIGNED
