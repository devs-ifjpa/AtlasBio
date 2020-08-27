firebase.firestore().enablePersistence();

function Editable(id,titulo,gif1,gif2,categoria,description){
    document.getElementById('EditableItem').style.zIndex = 1000;
    let EditableItens = document.createElement('FORM');
    EditableItens.className = 'FormEditable';
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
                <textarea id='gif1EditText' disabled required></textarea>
            </div>
        </div>
        <div class='formbox'>
            <img id='gif2EditTextLabel' src=${gif2}>
            <div class='gifsEdit'>
                <input type=file id='gif2Edit'>
                <textarea id='gif2EditText' disabled required></textarea>
            </div>
        </div>
        <div style='display: flex; align-items: center; justify-content: space-evenly; width: 100%;'>
            <input type='reset' class='actionbutton'>
            <input type='submit' value='Alterar Dados' class='actionbutton'>
            <h3 style='height: auto' onclick='RemoveItem()' class='actionbutton'>Deletar</h3>
        </div>
    `);
    document.getElementById('EditableItem').insertAdjacentHTML('beforeend',EditableItens.outerHTML);
    ConvertImage();
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

function ConvertImage(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('gif1Edit').addEventListener('change', handleFileSelect, false);
        document.getElementById('gif2Edit').addEventListener('change', handleFileSelect2, false);
    } else {
        alert('API não Suportada em seu Navegador.');
    }
    function handleFileSelect(evt) {
        var f = evt.target.files[0]; // FileList object
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var binaryData = e.target.result;
                var base64String = window.btoa(binaryData);
                document.getElementById('gif1EditText').value = base64String;
                alert('Arquivo Convertido para URI');
            };
        })(f);
        reader.readAsBinaryString(f);
    }
    function handleFileSelect2(evt) {
        var f = evt.target.files[0]; // FileList object
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var binaryData = e.target.result;
                var base64String = window.btoa(binaryData);
                document.getElementById('gif2EditText').value = base64String;
                alert('Arquivo Convertido para URI');
            };
        })(f);
        reader.readAsBinaryString(f);
    }

    document.querySelector('.FormEditable').addEventListener('submit', event => {
        let id = document.getElementById('EditId').textContent.split('ID: ')[1];
        let title = ''
        document.getElementById('TitleEdit').value != "" ?
            title = document.getElementById('TitleEdit').value :
            title = document.getElementById('EditTitleLabel').textContent.split(': ')[1];
        let gif1 = '';
        document.getElementById('gif1EditText').value != '' ?
            gif1 = `data:img/${document.getElementById('gif1Edit').value.split('.')[document.getElementById('gif1Edit').value.split('.').length - 1]};base64,${document.getElementById('gif1EditText').value}` :
            gif1 = document.getElementById('gif1EditTextLabel').attributes.src.value
        let gif2 = '';
        document.getElementById('gif2EditText').value != '' ?
            gif2 = `data:img/${document.getElementById('gif2Edit').value.split('.')[document.getElementById('gif2Edit').value.split('.').length - 1]};base64,${document.getElementById('gif2EditText').value}` :
            gif2 = document.getElementById('gif2EditTextLabel').attributes.src.value;
        let description = '';
        document.getElementById('DescriptionEdit').value != '' ?
            description = document.getElementById('DescriptionEdit').value :
            description = document.getElementById('DescriptionEditLabel').textContent.split(': ')[1];
        let categoria = ''
        document.getElementById('CategoryEdit').value != '' ?
            categoria = document.getElementById('CategoryEdit').value :
            categoria = document.getElementById('EditCategoriaLabel').textContent.split(': ')[1];
        if(title != "" || gif1 != "" || gif2 != "" || description != "" || categoria != ""){
            firebase.firestore().collection("content").doc(id).update({
                titulo: title,
                gif1: gif1,
                gif2: gif2,
                categoria: categoria,
                description: description
            }).then(() => {
                window.alert('Dados Alterados com Sucesso');
                document.location.reload(true);
            }).catch(error => {
                console.error("Error writing document: ", error);
            });
        }
        event.preventDefault();
    });
}

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
                            formatData.insertAdjacentHTML('beforeend',
                                `
                                    <textarea disabled class='id'>${item.id}</textarea>
                                    <h4 class='title'>${item.titulo}</h4>
                                    <img class='gif1' src=${item.gif1}>
                                    <img class='gif2' src=${item.gif2}>
                                    <h4 class='categoria'>${item.categoria}</h4>
                                    <p class='description'>${item.description}</p>
                                    <img class='editable' onclick="Editable('${item.id}','${item.titulo}','${item.gif1}','${item.gif2}','${item.categoria}','${item.description}')" src='./icon.svg'>
                                `
                            );
                            document.getElementById('items').insertAdjacentHTML('beforeend',formatData.outerHTML);    
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
    document.getElementById('FormCadastrarData').addEventListener('submit', () => {
        event.preventDefault();
        // let gif1 = document.getElementById('gif1').value;
        // fetch(gif1)
        // .then(res => res.file())
        // .then(file => {
            // let objectURL = URL.createObjectURL(file);
            // gif1 = objectURL;
        // });
        let gif1Format = document.getElementById('gif1').value;
        gif1Format = gif1Format.split('.')[gif1Format.split('.').length - 1];
        let gif2Format = document.getElementById('gif2').value;
        gif2Format = gif2Format.split('.')[gif2Format.split('.').length - 1];
        let titulo = document.getElementById('titulo').value;
        let description = document.getElementById('description').value;
        let gif1 = `data:img/${gif1Format};base64,${document.getElementById('gif1Text').value}`;
        let gif2 = `data:img/${gif2Format};base64,${document.getElementById('gif2Text').value}`;
        let categoria = document.getElementById('categoria').value;
        Firebase_RegisterDatabase([categoria,titulo,description,gif1,gif2]);
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
function Firebase_RegisterDatabase(data){
    firebase.firestore().collection("content").doc().set({
        categoria: data[0],
        titulo: data[1],
        description: data[2],
        gif1: data[3],
        gif2: data[4],
    }).then(() => {
        window.alert('Dados Salvos')
    }).catch((error) => {
        console.error("Erro ao Escrever Dados: ", error);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(window.location != window.location.origin + '/' + String(window.location).split('/')[3] + '/' + String(window.location).split('/')[4] + 'action.html' && String(window.location).split('/').pop() == 'login.html'){
            window.location = window.location.origin + '/' + String(window.location).split('/')[3] + '/' + String(window.location).split('/')[4] + 'action.html'
        }
        // document.getElementById('login').style.display = 'none';
        // document.getElementById('signed').style.display = 'block';
    }else{
        if(window.location != window.location.origin + '/' + String(window.location).split('/')[3] + '/' + 'index.html'){
            window.location = window.location.origin + '/' + String(window.location).split('/')[3] + '/' + 'index.html';
        }
        // document.getElementById('login').style.display = 'block';
        // document.getElementById('signed').style.display = 'none';
    }
});