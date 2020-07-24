function gerarDias(start,stop){
    day=[]
    for(let dias=start; dias< stop+1; dias++){
        day.push(dias)
    }
    return(console.log(day))
}

gerarDias(1,29)



function bissexto(ano){
    day=[]
    if(ano%4 === 0 || ano%400 === 0){
        for (let dias = 1; dias < 30; dias++){
            day.push(dias)
        }
    }
    else{
        for (let dias = 1; dias < 29; dias++){
            day.push(dias)
        }
    }
    return day
}



function selectDayTratamento (mes,year){          
    day=[]
    let ano = bissexto 
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
            for (let dias = 1; dias < 32; dias++){
                day.push(dias)
            }
        }
        else if(mes === meses[i].month && meses[i].trinteum === false){
            for (let dias = 1; dias < 31; dias++){
                day.push(dias)
            }
        }
    }
    if(mes === 'Fevereiro'){
      ano(year)        
    }    
    return console.log(mes, day)
}

//selectDayTratamento("Fevereiro", 2015)
