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

    document.getElementById('Form_Register-Google') != null ? (
        document.getElementById("Form_Register-Google").addEventListener("submit", () => {
            event.preventDefault();
            let voce = SelectChecked(document.getElementById("voce"),"option").value;
            let day = SelectChecked(document.getElementById("day"),"option").textContent;
            let month = SelectChecked(document.getElementById("month"),"option").textContent;
            let year = SelectChecked(document.getElementById("year"),"option").textContent;
            let date = `${day}/${month}/${year}`;
            voce != "you" ? (
                Firebase_RegisterDatabase(['',date,voce],"Google")
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

        function Firebase_RegisterDatabase(data, google = undefined){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var user = firebase.auth().currentUser;
                    if(google !== undefined){
                        data[0] = user.displayName;
                    }
                    db.collection("users").doc(user.uid).set({
                        nome: data[0],
                        data: data[1],
                        profissao: data[2],
                        favoritos: [],
                    }).then(function() {
                        if(google === undefined){
                            Firebase_Logout();
                        }else{
                            window.location = window.location.origin + '/pages/content/index.html';
                        }
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
            db.collection('users').doc(user.uid).get().then(doc => {
                if(doc.data() === undefined && window.location.href.indexOf("pages/register") === -1){
                    window.location = window.location.origin + "/pages/register-google/index.html";
                }else{
                    if((window.location.href.indexOf('pages/login') !== -1 ||
                        window.location.href.indexOf('pages/register') !== -1 ||
                        window.location.href.indexOf('pages/recovery') !== -1) && doc.data() !== undefined){
                        window.location = window.location.href.split('pages')[0] + 'pages/content/index.html';
                    }
                }
            }).catch(err => {
                console.error("Error writing document: ", err);
            });
            // if(user.displayName != undefined && window.location.href.indexOf('pages/register') === -1){
            //    window.location = window.location.origin + "/pages/register/index.html";
            //}
            // location.href
            // User is signed in.
            // console.log("entrou");
            // firebase.firestore().disableNetwork();
            // firebase.firestore().enableNetwork();
            // connectedRef.on("value", function(snap) {
                // if (snap.val() === true) {
                    // Firebase_ReadDatabase(user);
                    // console.log("connected");
                // } else {
                    // Firebase_ReadDatabase(user);
                    // console.log("not connected");
                // }
            // });
        }else{
            if((window.location.href.indexOf('pages/login') === -1 &&
            window.location.href.indexOf('pages/register') === -1 &&
            window.location.href.indexOf('pages/recovery') === -1) ||
            window.location.href.indexOf('pages/register-google') !== -1){
                window.location = window.location.href.split('pages')[0] + 'pages/login/index.html';
            }
            console.log("saiu");
        }
    });

// $SIGNED

// CONTEUDO-BOX

if(document.getElementById("ConteudoBox") != undefined){
    let category = [];
    let categoryData = [];
    db.collection("content").onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(category.indexOf(doc.data().categoria) == -1){
                category.push(doc.data().categoria);
            }
        });
        category.map(item => {
            db.collection('content').where("categoria", "==", item).onSnapshot(function(querySnapshot) {
                let list = []
                var x = 0;
                querySnapshot.forEach(function(doc) {
                    list.push(doc.data());
                    list[x].id = doc.id;
                    x++;
                });
                categoryData.push(list);
                if(categoryData.length === category.length){
                    categoryData.map(item => {
                        let itembox = document.createElement("DIV")
                        itembox.insertAdjacentHTML('beforeend',
                        `<div class="titulos">
                            <p id='first-title' class="titulo left">${item[0].categoria}</p>
                        </div>`)
                        let demos = document.createElement('DIV')
                        demos.className = 'demos'
                        item.map(itemcategoria => {
                            firebase.storage().ref(itemcategoria.static).getDownloadURL().then((photo) => {
                                demos.insertAdjacentHTML('beforeend',
                                `<a href='${`${window.location.href.split('content').join('content-item')}?${itemcategoria.id}`}' class="demos2">
                                    <div class="demo">
                                        <img class='freezeframe' src='${photo}'></img>
                                    </div>
                                    <div class="demo2">
                                        <p>${itemcategoria.titulo.split(' ').join('<br>')}</p>
                                    </div>
                                </a>
                                `);
                            });
                            itembox.appendChild(demos);
                            document.getElementById('ConteudoBox').appendChild(itembox)
                        });
                        // document.getElementById('ConteudoBox').insertAdjacentHTML('beforeend', itembox);
                        // if(categoryData[length - 1] == item){
                            // document.getElementById('ConteudoBox').appendChild(itembox);
                        // }
                    });
                }
            });
        });
    });

    
    // {to quieto pq to falando com ela}
    // `{vou falar com ela ja volto}`
    // category.map(item => {
        // db.collection('content').where("categoria", "==", item).onSnapshot(function(querySnapshot) {
            // querySnapshot.forEach(function(doc) {
                // console.log(doc.data().titulo)
                // cities.push(doc.data().name);
            // });
        // });    
    // })
    // document.getElementById("ConteudoBox").innerHTML = categoryData;
}

// $CONTEUDO-BOX

// PREFERRED-BOX

if(document.getElementById('PreferredBox') !== null){
    let category = [];
    let categoryData = [];
    let categoryloop = 0;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection('users').doc(user.uid).get().then((userData) => {
                db.collection("content").onSnapshot(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if(category.indexOf(doc.data().categoria) == -1){
                            category.push(doc.data().categoria);
                        }
                    });
                    category.map(item => {
                        db.collection('content').where("categoria", "==", item).onSnapshot(function(querySnapshot) {
                            let list = []
                            var x = 0;
                            querySnapshot.forEach(function(doc) {
                                if(userData.data().favoritos.indexOf(doc.id) !== -1){
                                    list.push(doc.data());
                                    list[x].id = doc.id;
                                    x++;    
                                }
                            });
                            categoryloop++
                            if(list.length !== 0){
                                categoryData.push(list);
                            }
                            if(category.length === categoryloop){
                                categoryData.map(item => {
                                    let itembox = document.createElement("DIV")
                                    itembox.insertAdjacentHTML('beforeend',
                                    `<div class="titulos">
                                        <p id='first-title' class="titulo left">${item[0].categoria}</p>
                                    </div>`)
                                    let demos = document.createElement('DIV')
                                    demos.className = 'demos'
                                    item.map(itemcategoria => {
                                        firebase.storage().ref(itemcategoria.static).getDownloadURL().then((photo) => {
                                            demos.insertAdjacentHTML('beforeend',
                                            `<a href='${`${window.location.origin}/pages/content-item/?${itemcategoria.id}`}' class="demos2">
                                                <div class="demo">
                                                    <img class='freezeframe' src='${photo}'></img>
                                                </div>
                                                <div class="demo2">
                                                    <p>${itemcategoria.titulo.split(' ').join('<br>')}</p>
                                                </div>
                                            </a>
                                            `);
                                        });
                                        itembox.appendChild(demos);
                                        document.getElementById('PreferredBox').appendChild(itembox)
                                    });
                                });
                            }
                        });
                    });
                });
            });
        }
    });
}

// $PREFERRED-BOX

// CONTEUDO-INDIVIDUAL

if(window.location.href.indexOf('/pages/content-item/') !== -1){
    const id = String(window.location).split('?')[1];
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection('users').doc(user.uid).get().then((userData) => {
                if(userData.data().favoritos.indexOf(id) !== -1){
                    document.getElementById('StarFavorite').src = '../img/estrelaFav.svg'
                }
                firebase.firestore().collection('content').doc(id).get().then((doc) => {
                    document.getElementById('descriptionGif').innerHTML =  doc.data().description;
                    document.getElementById('first-title').innerHTML = doc.data().titulo
                    firebase.storage().ref(doc.data().gif1).getDownloadURL().then((url) => {
                        document.getElementById('Gif1').innerHTML = `<img class='gifImage' src='${url}'></img>`
                    });
                    firebase.storage().ref(doc.data().gif2).getDownloadURL().then((url) => {
                        document.getElementById('Gif2').innerHTML = `<img class='gifImage' src='${url}'></img>`
                    });
                });
            });
        }
    });
}

if(document.getElementById('StarFavorite') !== null){
    document.getElementById('StarFavorite').addEventListener('click',() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection('users').doc(user.uid).get().then((userData) => {    
                    if(document.getElementById('StarFavorite').src.indexOf('estrelaFav.svg') !== -1){
                        let NewData = userData.data().favoritos;
                        const position = NewData.indexOf(window.location.href.split('?')[1]);
                        NewData.splice(position, 1)
                        firebase.firestore().collection('users').doc(user.uid).set({
                            favoritos: NewData,
                        }, { merge: true });
                        document.getElementById('StarFavorite').src = document.getElementById('StarFavorite').src.split('estrelaFav.svg').join('estrelaFavVazada.svg');
                    }else{
                        let NewData = userData.data().favoritos;
                        NewData.push(window.location.href.split('?')[1]);
                        firebase.firestore().collection('users').doc(user.uid).set({
                            favoritos: NewData,
                        }, { merge: true });
                        document.getElementById('StarFavorite').src = document.getElementById('StarFavorite').src.split('estrelaFavVazada.svg').join('estrelaFav.svg');
                    }
                });
            }
        });
    });
}

// $CONTEUDO-INDIVIDUAL
