// firebase.firestore().enablePersistence();

function Editable(id,titulo,gif1,gif2,categoria,description,static,static2){
    document.getElementById('EditableItem').style.zIndex = 1000;
    let EditableItens = document.createElement('FORM');
    EditableItens.id = 'FormEditable';
    EditableItens.insertAdjacentHTML('beforeend',
    `
        <div onclick='ExitEditable()' class="XFechar"><p>X</p></div>
        <label id='EditId'> ID: ${id}</label>
        <div class='formbox'>
            <label id='EditTitleLabel'> Titulo: ${titulo} </label><input  type='text' id='TitleEdit'>
        </div>
        <div class='formbox'>
            <label id='EditCategoriaLabel'> Categoria: ${categoria} </label><input type='text' id='CategoryEdit'> 
        </div>
        <div class='formbox'>
            <label id='DescriptionEditLabel'> Descrição: ${description} </label><input type='text' id='DescriptionEdit'>
        </div>
        <div class='formbox'>
            <img id='staticEditTextLabel' src=${static}>
            <div class='gifsEdit'>
                <input type=file id='staticEdit'>
            </div>
        </div>
        <div class='formbox'>
            <img id='static2EditTextLabel' src=${static2}>
            <div class='gifsEdit'>
                <input type=file id='static2Edit'>
            </div>
        </div>
        <div class='formbox'>
            <img id='gif1EditTextLabel' src=${gif1}>
            <div class='gifsEdit'>
                <input type=file id='gif1Edit'>
            </div>
        </div>
        <div class='formbox'>
            <img id='gif2EditTextLabel' src=${gif2}>
            <div class='gifsEdit'>
                <input type=file id='gif2Edit'>
            </div>
        </div>
        <div style='display: flex; align-items: center; justify-content: space-evenly; width: 100%;'>
            <input type='reset' class='actionbutton'>
            <p onclick='WriteData("${id}")' class='actionbutton'>Alterar Dados</p>
            <h3 style='height: auto' onclick='RemoveItem()' class='actionbutton'>Deletar</h3>
        </div>
    `);
    document.getElementById('EditableItem').insertAdjacentHTML('beforeend',EditableItens.outerHTML);
    // ConvertImage();
}

function RemoveItem(){
    let id = document.getElementById('EditId').textContent.split(' ')[2];
    firebase.firestore().collection('content').doc(id).get().then(datapack => {
        firebase.storage().ref(datapack.data().gif1).delete();
        firebase.storage().ref(datapack.data().gif2).delete();
        firebase.storage().ref(datapack.data().static).delete();
        firebase.storage().ref(datapack.data().static2).delete();
        // firebase.storage().ref(`content/${id}`).delete().then(() => {
            firebase.firestore().collection('content').doc(id).delete().then(() => {
                window.alert('Item Removido');
                document.location.reload(true);
            });
        // })    
    });
}

function ExitEditable(){
    document.getElementById('EditableItem').style.zIndex = -1000;
    document.getElementById('EditableItem').textContent = '';
}

function WriteData(id){
    if(document.getElementById('TitleEdit').value !== ''){
        firebase.firestore().collection('content').doc(id).set({
            titulo: document.getElementById('TitleEdit').value
        }, { merge: true }).then(() => { window.alert('Titulo Alterado, Recarregue a Pagina') });
    }
    if(document.getElementById('CategoryEdit').value !== ''){
        firebase.firestore().collection('content').doc(id).set({
            categoria: document.getElementById('CategoryEdit').value
        }, { merge: true }).then(() => { window.alert('Categoria Alterada, Recarregue a Pagina') });
        // .then(() => { if(setTimeout(confirm('Categoria Alterada Recarregar?'),2000)){ document.location.reload(true) };
        // });
    }
    if(document.getElementById('DescriptionEdit').value !== ''){
        firebase.firestore().collection('content').doc(id).set({
            description: document.getElementById('DescriptionEdit').value
        }, { merge: true }).then(() => { window.alert('Descrição Alterada, Recarregue a Pagina') });
        // .then(() => { if(setTimeout(confirm('Descrição Alterada Recarregar?'),2000)){ document.location.reload(true) };
        // });
    }
    if(document.getElementById('staticEdit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().static).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('staticEdit').files[0].name}`).put(document.getElementById('staticEdit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    static: `content/${id}/${document.getElementById('staticEdit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Foto Estática Alterada, Recarregue a Pagina') });    
            });
            // .then(() => { if(setTimeout(confirm('Gif1 Alterada Recarregar?'),2000)){ document.location.reload(true) };
            // });
        });
    }
    if(document.getElementById('static2Edit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().static2).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('static2Edit').files[0].name}`).put(document.getElementById('static2Edit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    static2: `content/${id}/${document.getElementById('static2Edit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Foto Estática 2 Alterada, Recarregue a Pagina') });    
            });
            // .then(() => { if(setTimeout(confirm('Gif1 Alterada Recarregar?'),2000)){ document.location.reload(true) };
            // });
        });
    }
    if(document.getElementById('gif1Edit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().gif1).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('gif1Edit').files[0].name}`).put(document.getElementById('gif1Edit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    gif1: `content/${id}/${document.getElementById('gif1Edit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Gif1 Alterada, Recarregue a Pagina') });
                // .then(() => { if(setTimeout(confirm('Gif1 Alterada Recarregar?'),2000)){ document.location.reload(true) };
                // });
            });
        });
    }
    if(document.getElementById('gif2Edit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().gif2).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('gif2Edit').files[0].name}`).put(document.getElementById('gif2Edit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    gif2: `content/${id}/${document.getElementById('gif2Edit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Gif2 Alterada, Recarregue a Pagina') });
                // .then(() => { if(setTimeout(confirm('Gif2 Alterada'),2000)){ document.location.reload(true) };
                // });
            });
        });
    }
}

document.getElementById('items') != undefined ? (
    document.querySelector('body').style.height = 'auto',
    firebase.firestore().collection('content').onSnapshot((querySnapshot) => {
        let categorys = [];
        let categoryData = [];
        querySnapshot.forEach((item) => {
            if(categorys.indexOf(item.data().categoria) === -1){
                categorys.push(item.data().categoria)
            }
        });
        categorys.map(categorysitem => {
            firebase.firestore().collection('content').where("categoria", "==", categorysitem).onSnapshot(querySnapshot => {
                let list = []
                querySnapshot.forEach(function(doc) {
                    let docData = doc.data();
                    docData.id = doc.id;
                    list.push(docData);
                });
                categoryData.push(list);
                if(categoryData.length === categorys.length){
                    categoryData.map(CategoryItems => {
                        CategoryItems.map(item => {
                            let formatData = document.createElement("DIV")
                            formatData.className = 'itemBox'
                            firebase.storage().ref(item.static).getDownloadURL().then((static) => {
                                firebase.storage().ref(item.static2).getDownloadURL().then((static2) => {
                                    firebase.storage().ref(item.gif1).getDownloadURL().then(gif1 => {
                                        firebase.storage().ref(item.gif2).getDownloadURL().then(gif2 => {
                                            formatData.insertAdjacentHTML('beforeend',
                                            `
                                                <textarea disabled class='id'>${item.id}</textarea>
                                                <h4 class='title'>${item.titulo}</h4>
                                                <img class='static' src=${static}>
                                                <img class='static' src=${static2}>
                                                <img class='gif1' src=${gif1}>
                                                <img class='gif2' src=${gif2}>
                                                <h4 class='categoria'>${item.categoria}</h4>
                                                <p class='description'>${item.description}</p>
                                                <img class='editable' onclick="Editable('${item.id}','${item.titulo}','${gif1}','${gif2}','${item.categoria}','${item.description}','${static}','${static2}')" src='./icon.svg'>
                                            `
                                            );
                                            document.getElementById('items').insertAdjacentHTML('beforeend',formatData.outerHTML);
                                        });
                                    });    
                                });
                            });
                        })
                    });
                }
            });
        });
    })
) : false;

function Firebase_Logout(){
    firebase.auth().signOut();  
}
document.getElementById("formlogin") != null ? (
    document.getElementById("formlogin").addEventListener("submit", () => {
        event.preventDefault();
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        Firebase_Login(email,password);
    })
) : false;


document.getElementById('FormCadastrarData') != null ? (
    document.getElementById('FormCadastrarData').addEventListener('submit', event => {
        // let gif1 = document.getElementById('gif1').value;
        // fetch(gif1)
        // .then(res => res.file())
        // .then(file => {
            // let objectURL = URL.createObjectURL(file);
            // gif1 = objectURL;
        // });
        let static = document.getElementById('staticPhoto').files[0];
        let static2 = document.getElementById('staticPhoto2').files[0];
        let gif1 = document.getElementById('gif1').files[0];
        let gif2 = '';
        if(document.getElementById('gif2').files[0] !== undefined){
            gif2 = document.getElementById('gif2').files[0]
        }else{
            gif2 = document.getElementById('gif1').files[0];
        }
        if(document.getElementById('staticPhoto2').files[0] !== undefined){
            static2 = document.getElementById('staticPhoto2').files[0]
        }else{
            static2 = document.getElementById('staticPhoto').files[0];
        }
        let titulo = document.getElementById('titulo').value;
        let description = document.getElementById('description').value;
        let categoria = document.getElementById('categoria').value;
        firebase.firestore().collection("content").add({
            categoria: categoria,
            titulo: titulo,
            description: description,
        }).then((docRef) => {
            var StorageRef = firebase.storage().ref(`content/${docRef.id}`);
            let staticName = static.name;
            let staticName2 = static2.name;
            let gif1Name = gif1.name;
            let gif2Name = gif2.name;
            if(gif1.name === gif2.name){
                gif2Name = gif2Name.replace(gif2Name.split('.')[gif2Name.split('.').length -1], `(1).${gif2Name.split('.')[gif2Name.split('.').length -1]}`);
            }
            if(staticName.name === staticName2.name){
                staticName2 = staticName2.replace(staticName2.split('.')[staticName2.split('.').length -1], `(1).${staticName2.split('.')[staticName2.split('.').length -1]}`);
            }
            let gif1Path = StorageRef.child(gif1Name).fullPath;
            let gif2Path = StorageRef.child(gif2Name).fullPath;
            let staticPath = StorageRef.child(staticName).fullPath;
            let staticPath2 = StorageRef.child(staticName2).fullPath;
            StorageRef.child(staticName).put(static).then(() => {
                StorageRef.child(staticName2).put(static2).then(() => {
                    StorageRef.child(gif1Name).put(gif1).then(() => {
                        StorageRef.child(gif2Name).put(gif2).then(() => {
                            firebase.firestore().collection('content').doc(docRef.id).set({
                                static: staticPath,
                                static2: staticPath2,
                                gif1: gif1Path,
                                gif2: gif2Path
                            }, { merge: true });
                            window.alert('Dados Salvos')
                        });
                    });
                });
            })
        }).catch((error) => {
            console.error("Erro ao Escrever Dados: ", error);
        });
        event.preventDefault();
    })
) : false


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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(String(window.location).split('/')[String(window.location).split('/').length - 1] === ''){
            window.location = window.location + 'action.html';
        }
    }else{
        if(String(window.location).split('/')[String(window.location).split('/').length - 1] !== ''){
            window.location = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
        }
    }
});