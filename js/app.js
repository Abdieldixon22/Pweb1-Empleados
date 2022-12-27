/*
 * Función llamada cuando se ingresan los datos en el
 * formulario de empleados, se hace uso del script 
 * register.pl para insertar datos.
*/
function doInsert() {
    document.getElementById("emp-form").addEventListener('submit', function(e){
        e.preventDefault();

        var fName = document.getElementById("firstName").value;
        var lName = document.getElementById("lastName").value;
        var dni = document.getElementById("dni").value;
        var salary = document.getElementById("salary").value;
        
        var xhrReq = new XMLHttpRequest();
        xhrReq.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                insertResponse(xhrReq.responseText);
            }
        };
        xhrReq.open('GET','./cgi-bin/register.pl?dni='+dni+'&firstN='+fName+'&lastN='+lName+'&salary='+salary,true);
        xhrReq.send();
    });

}

function insertResponse(text) {
    if(text == 'OK') {
        
    }else {

    }
}