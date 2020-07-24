function gerarDias(start,stop){
    day=[]
    for(let dias=start; dias< stop+1; dias++){
        day.push(dias)
    }
    return day
}

function bissexto(ano){
    if(ano%4 === 0 || ano%400 === 0){
        gerarDias(1,29)
    }
    else{
        gerarDias(1,28)
    }
    return day
}

function selectDayTratamento (mes,year){      
    const meses = ['Janeiro', 'Março', 'Maio', 'Julho', 'Agosto', 'Outubro', 'Dezembro']
    for (let i in meses){
        if (mes === meses[i]){
            gerarDias(1,31)
            break
        }
        else gerarDias(1,30)
    }
    if(mes === 'Fevereiro'){
      bissexto(year)        
    }    
    return console.log(mes, day)
}

selectDayTratamento("Fevereiro", 2015)
