//HAMBURGUESA RESPONSIVE//
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//CLIK Y QUITAR MENU DE HAMBURGUESA//
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";


    //DESAPARECER MENU DE HAMBURGUESA//
    var x = document.getElementById("nav");
    x.className = "";
}

