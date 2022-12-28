document.getElementById('emp-result').style.display='none';

/*
 * Función que busca un empleado según el id y la 
 * respuesta es procesada por showSearchEmp en app.js
*/
document.getElementById('fSearch').addEventListener('submit',function(e) {
    e.preventDefault();
    var xhrReq = new XMLHttpRequest();
    var idEmp = document.getElementById('search').value;
    xhrReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            showSearchEmp(xhrReq.responseXML);
        }
    };
    xhrReq.open('GET','./cgi-bin/searchEmp.pl?idEmp='+idEmp,true);
    xhrReq.send();
});
loadEmployees();
