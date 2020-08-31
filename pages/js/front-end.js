function CheckPassword(){
    document.getElementById("condicoes").checked == true ?
        document.querySelector(".checkboxicon").style.backgroundColor = "#FFFFFF" :
        document.querySelector(".checkboxicon").style.backgroundColor = "#102660";
}

document.getElementById("condicoes").addEventListener("change",CheckPassword);

function ChangeCheck(){
    if(document.getElementById("condicoes").checked == true){
        document.getElementById("condicoes").checked = false;
        CheckPassword()
    }
    else{
        document.getElementById("condicoes").checked = true;
        CheckPassword()
    }
}