      //Ano
      let mySelectYear=document.getElementById("year"), 
      year = new Date().getFullYear();
          let gen = function(max){
              do{
                  mySelectYear.add(new Option(year--,max--),null);
                  }while(max>0);
                      }(121);
        //Mes
      let mySelectMonth=document.getElementById("month"), 
      month = new Date().getMonth();
          let g = function(max){
            do{
              mySelectMonth.add(new Option(month--,max--),null);
                  }while(max>0);
                      }(12);