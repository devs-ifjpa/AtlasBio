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
    const meses = [
    {
        "month": "Janeiro",
        "trinteum": true
    },
    {
        "month": "Março",
        "trinteum": true
        
    },
    {
        "month": "Abril",
        "trinteum": false
        
    },
    {
        "month": "Maio",
        "trinteum": true
        
    },
    {
        "month": "Junho",
        "trinteum": false
        
    },
    {
        "month": "Julho",
        "trinteum": true
        
    },
    {
        "month": "Agosto",
        "trinteum": true
        
    },
    {
        "month": "Setembro",
        "trinteum": false
        
    },
    {
        "month": "Outubro",
        "trinteum": true
        
    },
    {
        "month": "Novembro",
        "trinteum": false
        
    },
    {
        "month": "Dezembro",
        "trinteum": true
        
    }
    ]
    for (let i in meses){
        if(mes === meses[i].month && meses[i].trinteum === true){
            gerarDias(1,31)
        }
        else if(mes === meses[i].month && meses[i].trinteum === false){
            gerarDias(1,30)
        }
    }
    if(mes === 'Fevereiro'){
      bissexto(year)        
    }    
    return console.log(mes, day)
}

selectDayTratamento("Fevereiro", 2016)
