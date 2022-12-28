function removeSearch(){
    document.getElementById('emp-result').style.display='none';
}

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

/*
 * Función llamada cuando se ingresan los datos en el
 * formulario de empleados, se hace uso del script 
 * register.pl para insertar datos.
*/
document.getElementById("emp-form").addEventListener('submit', function(e){
    e.preventDefault();

    var fName = document.getElementById("firstName").value;
    var lName = document.getElementById("lastName").value;
    var dni = document.getElementById("dni").value;
    var salary = document.getElementById("salary").value;
        
    var xhrReq = new XMLHttpRequest();
    xhrReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            insertResponse(xhrReq.responseXML);
        }
    }; 
    xhrReq.open('GET','./cgi-bin/register.pl?dni='+dni+'&firstN='+fName+'&lastN='+lName+'&salary='+salary,true);
    xhrReq.send();
});

removeSearch();
loadEmployees();
