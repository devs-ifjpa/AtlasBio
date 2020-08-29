firebase.firestore().enablePersistence();

function Editable(id,titulo,gif1,gif2,categoria,description){
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
    firebase.firestore().collection('content').doc(id).delete().then(() => {
        window.alert('Item Removido');
        document.location.reload(true);
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
        }, { merge: true }).then(() => { window.alert('Titulo Alterado') });
    }
    if(document.getElementById('CategoryEdit').value !== ''){
        firebase.firestore().collection('content').doc(id).set({
            categoria: document.getElementById('CategoryEdit').value
        }, { merge: true }).then(() => { window.alert('Categoria Alterada') });
    }
    if(document.getElementById('DescriptionEdit').value !== ''){
        firebase.firestore().collection('content').doc(id).set({
            description: document.getElementById('DescriptionEdit').value
        }, { merge: true }).then(() => { window.alert('Descrição Alterada') });
    }
    if(document.getElementById('gif1Edit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().gif1).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('gif1Edit').files[0].name}`).put(document.getElementById('gif1Edit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    gif1: `content/${id}/${document.getElementById('gif1Edit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Gif1 Alterada') });
            });
        });
    }
    if(document.getElementById('gif2Edit').files[0] !== undefined){
        firebase.firestore().collection('content').doc(id).get().then(doc => {
            firebase.storage().ref(doc.data().gif2).delete().then(function() {
                firebase.storage().ref(`content/${id}/${document.getElementById('gif2Edit').files[0].name}`).put(document.getElementById('gif2Edit').files[0])
                firebase.firestore().collection('content').doc(id).set({
                    gif2: `content/${id}/${document.getElementById('gif2Edit').files[0].name}`
                }, { merge: true }).then(() => { window.alert('Gif2 Alterada') });
            });
        });
    }
    // console.log(firebase.storage().ref(`content/${id}/`))

    // if(document.getElementById('TitleEdit').value !== ''){
        // firebase.firestore().collection('content').doc(id).set({
            // titulo: document.getElementById('TitleEdit').value
        // }, { merge: true });
    // }
    // if(document.getElementById('CategoryEdit').value !== ''){
        // firebase.firestore().collection('content').doc(id).set({
            // categoria: document.getElementById('CategoryEdit').value
        // }, { merge: true });
    // }
    // if(document.getElementById('DescriptionEdit').value !== ''){
        // firebase.firestore().collection('content').doc(id).set({
            // description: document.getElementById('DescriptionEdit').value
        // }, { merge: true });
    // }
    // if(document.getElementById('gif1Edit').files[0] !== undefined){
    //    firebase.storage().ref(`content/${id}`) 
    // }



    // if(document.getElementById('TitleEdit').value === ''){
        // titulo = document.getElementById('TitleEdit').value === '';
    // }
    // if(document.getElementById('').value === ''){
        // titulo = document.getElementById('CategoryEdit').value === '';
    // }
    // console.log(categoria);
    // console.log(description);
    // console.log(gif1);
    // console.log(gif2);
}

// function ConvertImage(){
    // if (window.File && window.FileReader && window.FileList && window.Blob) {
        // document.getElementById('gif1Edit').addEventListener('change', handleFileSelect, false);
        // document.getElementById('gif2Edit').addEventListener('change', handleFileSelect2, false);
    // } else {
        // alert('API não Suportada em seu Navegador.');
    // }
    // function handleFileSelect(evt) {
        // var f = evt.target.files[0]; // FileList object
        // var reader = new FileReader();
        // reader.onload = (function(theFile) {
            // return function(e) {
                // var binaryData = e.target.result;
                // var base64String = window.btoa(binaryData);
                // document.getElementById('gif1EditText').value = base64String;
                // alert('Arquivo Convertido para URI');
            // };
        // })(f);
        // reader.readAsBinaryString(f);
    // }
    // function handleFileSelect2(evt) {
        // var f = evt.target.files[0]; // FileList object
        // var reader = new FileReader();
        // reader.onload = (function(theFile) {
            // return function(e) {
                // var binaryData = e.target.result;
                // var base64String = window.btoa(binaryData);
                // document.getElementById('gif2EditText').value = base64String;
                // alert('Arquivo Convertido para URI');
            // };
        // })(f);
        // reader.readAsBinaryString(f);
    // }
    // console.log(!!(document.getElementById('FormEditable') != undefined));
    // if(true){
        // window.alert('teste')
        // console.log(document.getElementById('FormEditable'));
        // document.getElementById('FormEditable').addEventListener('submit', event => {
            // event.preventDefault();
            // let id = document.getElementById('EditId').textContent.split(' ID: ')[1];
            // let title = document.getElementById('TitleEdit').value;
            // let gif1 = document.getElementById('gif1Edit').files[0];
            // let gif2 = document.getElementById('gif2Edit').files[0];
            // let description = document.getElementById('DescriptionEdit').value;
            // let categoria = document.getElementById('CategoryEdit').value;
            // console.log(firebase.storage().ref(`content/${id}`));
            // if(title != ''){
                // firebase.firestore().collection("content").doc(id).set({
                    // titulo: title
                // },{ merge: true });
            // }
            // if(description != ''){
                // firebase.firestore().collection("content").doc(id).set({
                    // description: description
                // },{ merge: true });
            // }
            // if(categoria != ''){
                // firebase.firestore().collection("content").doc(id).set({
                    // categoria: categoria
                // },{ merge: true });
            // }
            // if(gif1 != ''){
                // firebase.firestore().collection("content").doc(id).set({
                    // gif1: gif1.name
                // },{ merge: true }).then(() => {
                    // firebase.storage().ref(`content/${id}`)
                // });
            // }


            // let id = document.getElementById('EditId').textContent.split('ID: ')[1];
            // let title = ''
            // document.getElementById('TitleEdit').value != "" ?
                // title = document.getElementById('TitleEdit').value :
                // title = document.getElementById('EditTitleLabel').textContent.split(': ')[1];
            // let gif1 = '';
            // document.getElementById('gif1Edit').files[0] != '' ?
                // gif1 = document.getElementById('gif1Edit').files[0] :
                // gif1 = document.getElementById('gif1EditTextLabel').attributes.src.value
            // let gif2 = '';
            // document.getElementById('gif2Edit').files[0] != '' ?
                // gif2 = document.getElementById('gif2Edit').files[0] :
                // gif2 = document.getElementById('gif2EditTextLabel').attributes.src.value;
            // let description = '';
            // document.getElementById('DescriptionEdit').value != '' ?
                // description = document.getElementById('DescriptionEdit').value :
                // description = document.getElementById('DescriptionEditLabel').textContent.split(': ')[1];
            // let categoria = ''
            // document.getElementById('CategoryEdit').value != '' ?
                // categoria = document.getElementById('CategoryEdit').value :
                // categoria = document.getElementById('EditCategoriaLabel').textContent.split(': ')[1];
            // if(title != "" || gif1 != "" || gif2 != "" || description != "" || categoria != ""){
                // firebase.firestore().collection("content").doc(id).update({
                    // titulo: title,
                    // gif1: gif1,
                    // gif2: gif2,
                    // categoria: categoria,
                    // description: description
                // }).then(() => {
                    // window.alert('Dados Alterados com Sucesso');
                    // document.location.reload(true);
                // }).catch(error => {
                    // console.error("Error writing document: ", error);
                // });
            // }
        // });
    // }
// }

// document.getElementById('editableForm') != undefined ? (
    // document.getElementById('EditableTitulo').textContent = String(window.location).split('titulo=')[1].split(',')[0],
    // document.getElementById('EditableGif1').textContent = String(window.location).split('gif1=')[1].split(',')[0],
    // document.getElementById('EditableGif2').textContent = String(window.location).split('gif2=')[1].split(',')[0]
// ) : false;

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
                            firebase.storage().ref(item.gif1).getDownloadURL().then(gif1 => {
                                firebase.storage().ref(item.gif2).getDownloadURL().then(gif2 => {
                                    formatData.insertAdjacentHTML('beforeend',
                                    `
                                        <textarea disabled class='id'>${item.id}</textarea>
                                        <h4 class='title'>${item.titulo}</h4>
                                        <img class='gif1' src=${gif1}>
                                        <img class='gif2' src=${gif2}>
                                        <h4 class='categoria'>${item.categoria}</h4>
                                        <p class='description'>${item.description}</p>
                                        <img class='editable' onclick="Editable('${item.id}','${item.titulo}','${gif1}','${gif2}','${item.categoria}','${item.description}')" src='./icon.svg'>
                                    `
                                    );
                                    document.getElementById('items').insertAdjacentHTML('beforeend',formatData.outerHTML);
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
        let gif1 = document.getElementById('gif1').files[0];
        // gif1Format = gif1Format.split('.')[gif1Format.split('.').length - 1];
        let gif2 = document.getElementById('gif2').files[0];
        // gif2Format = gif2Format.split('.')[gif2Format.split('.').length - 1];
        let titulo = document.getElementById('titulo').value;
        let description = document.getElementById('description').value;
        // let gif1 = `data:img/${gif1Format};base64,${document.getElementById('gif1Text').value}`;
        // let gif2 = `data:img/${gif2Format};base64,${document.getElementById('gif2Text').value}`;
        let categoria = document.getElementById('categoria').value;
        firebase.firestore().collection("content").add({
            categoria: categoria,
            titulo: titulo,
            description: description,
        }).then((docRef) => {
            var StorageRef = firebase.storage().ref(`content/${docRef.id}`);
            StorageRef.child(gif1.name).put(gif1).then(() => {
                StorageRef.child(gif2.name).put(gif2).then(() => {
                    firebase.firestore().collection('content').doc(docRef.id).set({
                        gif1: StorageRef.child(gif1.name).fullPath,
                        gif2: StorageRef.child(gif2.name).fullPath
                    }, { merge: true });
                    window.alert('Dados Salvos')
                });
            });
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