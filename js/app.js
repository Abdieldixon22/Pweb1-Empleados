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
                insertResponse(xhrReq.responseXML);
            }
        };
        xhrReq.open('GET','./cgi-bin/register.pl?dni='+dni+'&firstN='+fName+'&lastN='+lName+'&salary='+salary,true);
        xhrReq.send();
    });

}

/*
 * Esta función recibe un xml con el empleado registrado,
 * luego es insertado en la tabla para su visualización
*/
function insertResponse(xml) {
    const aux = xml.childNodes[0].childNodes[1];
    const status = aux.childNodes[0].nodeValue;
    if(status == 'OK') {
        insertTableEmployees(xml);
        document.getElementById("emp-form").reset();
    }else {
        alert('Error al momento de insertar');
    }
}

/*  
 * Esta función inserta todos los empleados de la base 
 * de datos en la tabla por medio de insertTableEmployees
*/  
function loadEmployees() {
    var xhrReq = new XMLHttpRequest();
    xhrReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            insertTableEmployees(xhrReq.responseXML);
        }
    };
    xhrReq.open('GET','./cgi-bin/listEmp.pl',true);
    xhrReq.send();
}

/*
 * Esta función recibe uno o más empleados en formato XML
 * para ser insertados como fila en la tabla "employees"
*/
function insertTableEmployees(xml) {
    var employees = xml.getElementsByTagName("employee");
    for (var i = 0; i < employees.length; i++) {  

        var tr = document.createElement("tr");
        for(var j = 1; j < employees[i].childNodes.length; j+=2){
            var att = employees[i].childNodes[j].childNodes[0].nodeValue;
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(att));        
            tr.appendChild(td);
        }
        var del = document.createElement("button");
        del.className = "btn btn-danger";
        del.id = employees[i].childNodes[1].childNodes[0].nodeValue;
        del.textContent = "Delete";
        del.addEventListener('click', function(e) {
            doDelete(this.id, this.parentNode);
        });
        tr.appendChild(del);
        document.getElementById("employees").appendChild(tr);
    }   
}

/*
 * Función que recibe un id de empleado y un nodo padre
 * de tabla(fila), este último es removido una vez la 
 * respuesta del deleteEmp.pl sea correcta
*/
function doDelete(idEmp, parentNode) {
    var xhrReq = new XMLHttpRequest();
    xhrReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            if(this.responseText == "OK") {
                parentNode.remove();
            }
        }
    };
    xhrReq.open('GET','./cgi-bin/deleteEmp.pl?idEmp='+idEmp,true);
    xhrReq.send();
}

/*
 * Función que muestra al empleado buscado de formato XML
 * a líneas en <ul> <li> </li> </ul>
*/
function showSearchEmp(xml) {
    const aux = xml.childNodes[0].childNodes[1];
    const status = aux.childNodes[0].nodeValue;
    if(status == 'OK') {
        console.log(xml);
        var aux1 = xml.getElementsByTagName('employee')[0];

        /*
        var idEmp = aux1.childNodes[1].childNodes[0].nodeValue;
        var fName = aux1.childNodes[3].childNodes[0].nodeValue;
        var lName = aux1.childNodes[5].childNodes[0].nodeValue;
        var dni = aux1.childNodes[7].childNodes[0].nodeValue;
        var salary = aux1.childNodes[9].childNodes[0].nodeValue;
        */
        
    }else {
        alert('Usuario no encontrado');
    }
}
