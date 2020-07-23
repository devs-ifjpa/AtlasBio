      //Ano
     let mySelectYear=document.getElementById("year"), 
     year = new Date().getFullYear();
         let gen = function(max){
             do{
                 mySelectYear.add(new Option(year--,max--),null);
                 }while(max>0);
                     }(121);
    
        
                    

   //     function validacaoData(dia,mes, ano){            
   //         let getDia = document.getElementById("day")
   //     }
   //
        function selectDayTratamento (mes,dia, ano){            
            if(mes == 'Janeiro' || 'Março' ||'Maio' || 'Julho' ||'Agosto' ||'Outubro' ||'Dezembro'){
                for (let dias=1; dias<32; dias++){
                    dia.append(dias)
                } 
            }
            else if(mes = 'Abril'||'Junho' || 'Setembro' || 'Novembro'){
                for (let dias=1; dias<31; dias++){
                    dia.append(dias)
                } 
            }
            
            else if(ano)
                function bissexto(ano){
                    if(ano%4 === 0 || ano%400 === 0){
                        let dia = 29
                    }                               
                }      
                return  console.log()
        }
        
        

    //Mes
  //   let mySelectMonth=document.getElementById("month")
  //          
  //   month = new Date().me[mySelectMonth.getMonth()];    
  //   
  //   let me = ['Janeiro', 'Fevereiro', 'Março',  'Abril','Maio', 'Junho', 'Julho', 
  //  'Agosto','Setembro' ,'Outubro' ,'Novembro' ,'Dezembro']

    //   let meses = {Janeiro: 0 ,Fevereiro :1 ,Março:2 ,//Abril:3 ,Maio: 4 ,Junho: 5 ,Julho: 6 ,Agosto: 7 ,//Setembro: 8,Outubro: 9, Novembro: 10, Dezembro: 11}
    //  
    //  function selecionarMeses(array){
    //    console.log(array) 
    //  }
//
    //  selecionarMeses(me)