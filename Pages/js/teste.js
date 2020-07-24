

function bissexto(ano){
    if(ano%4 === 0 || ano%400 === 0){
        return console.log('É bissexto000000000000')
    }
    else{
        return console.log('Não é bissexto')
    }
}

function selectDayTratamento (mes){          
    day=[]
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
        else{
            for (let dias = 1; dias < 29; dias++){
                day.push(dias)
            }
            break
        }
    }
    return console.log(mes, day)
}

selectDayTratamento("Janeiro")
