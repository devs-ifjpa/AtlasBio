

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
    if(mes === 'Janeiro' || 'Março' ||'Maio' || 'Julho' ||'Agosto' ||'Outubro' ||'Dezembro'){
        for (let dias=1; dias<31; dias++){
            day.push(dias)
        } 
    }
    
    else if(mes === 'Abril'||'Junho' || 'Setembro' || 'Novembro'){
        for (let dias=1; dias<31; dias++){
            day.push(dias)
        } 
    }

    else{
        for (let dias=1; dias<29; dias++){
            day.push(dias)
        } 
    }
    return console.log(mes, day)
}

selectDayTratamento('Junho')
