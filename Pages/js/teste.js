

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
        for (let dias=1; dias<3; dias++){
            console.log('primeiro')
        } 
    }
    
    else if(mes === 'Abril'||'Junho' || 'Setembro' || 'Novembro'){
        for (let dias=1; dias<31; dias++){
            console.log('segundo')
        } 
    }

    else{
        for (let dias=1; dias<29; dias++){
            console.log('terceiro')
        } 
    }
    return day
}

selectDayTratamento('Junho')
