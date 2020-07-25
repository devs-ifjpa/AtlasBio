$(document).ready(function(){
    $(".hamburguer").click(function(){
        $(this).toggleClass("active")
        $(".menu").toggleClass("active")
    });
});



function gerarDias(start,stop){
    day=[]
    for(let dias=start; dias< stop+1; dias++){
        day.push(dias)
    }
    return day
}

function bissexto(ano){
    (ano%4 === 0 || ano%400 === 0)?mySelectDay.add(new Option(gerarDias(1,29)),null):mySelectDay.add(new Option(gerarDias(1,28)),null)
    return day
}

      //Ano
     let mySelectYear=document.getElementById("year"), 
     year = new Date().getFullYear();
         let gen = function(max){
             do{
                 mySelectYear.add(new Option(year--,max--),null);
                 }while(max>0);
                     }(121);
    
        
let mySelectMonth = document.getElementById('month')             
let mySelectDay = document.getElementById('day')

        function selectDayTratamento (mes,year){      
            const meses = ['Janeiro', 'Março', 'Maio', 'Julho', 'Agosto', 'Outubro','Dezembro']
            for (let i in meses){
                if (mes === meses[i]){
                    mySelectDay.add(new Option(gerarDias(1,31)),null)
                    break
                }
                else mySelectDay.add(new Option(gerarDias(1,30)),null)
            }
            if(mes === 'Fevereiro'){
              bissexto(year)        
            }    
            return console.log(mes, day)
        }
        
        selectDayTratamento("Fevereiro", 2016)
                    