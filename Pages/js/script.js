// $(document).ready(function(){
//     $(".hamburguer").click(function(){
//         $(this).toggleClass("active")
//         $(".menu").toggleClass("active")
//     });
// });

function Desvasado(doc){
    let link = doc.outerHTML.split(" ")[2].split("=")[1];
    if(link == '"../img/footer/Botão-Opções-Vazado.png"'){
        doc.src = '../img/footer/menu_pintado.svg'
    }else{
        doc.src = '../img/footer/Botão-Opções-Vazado.png'
    }
}

function gerarDias(start,stop){
    let mySelectDay = document.getElementById('day')
    day=[]
    for(let dias=start; dias< stop+1; dias++){
        day.push(dias)
    }
    day.forEach(e => {
        mySelectDay.add(e,null)
    });
}

function bissexto(ano){
    (ano%4 === 0 || ano%400 === 0)?gerarDias(1,29):gerarDias(1,28)
    return day
}

if(document.getElementById("year") != undefined){
        //Ano
    let mySelectYear = document.getElementById("year")
    year = new Date().getFullYear();
    let gen = function(max){
        do{
            mySelectYear.add(new Option(year--,max--),null);
        }while(max>0);
    }(121);
}

function selectDayTratamento (mes,year){
    const meses = ['Jan', 'Mar', 'Mai', 'Jul', 'Ago', 'Out','Dez']
    for (let i in meses){
        if (mes === meses[i]){
            gerarDias(1,31)
            break
        }
        else gerarDias(1,30)
    }
    if(mes === 'Fev'){
        bissexto(year)
    }
    return console.log(mes, day)
}

let mySelectMonth = document.querySelector('[wm-month] option')
let mySelectYear = document.getElementById("year")

// selectDayTratamento(mySelectMonth.innerHTML, mySelectYear.innerText)


mySelectMonth.addEventListener('change', ()=>{
    console.log('log')
    selectDayTratamento(mySelectMonth.value,mySelectYear.value)
})