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

//DETECTAR BARRA DE HABILIDADES Y APLICAR ANIMACION DE PROGRESO//
window.onscroll = function() {
    efectoHabilidades()
};

function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        document.getElementById("html").classList.add("barra-progreso1");
        document.getElementById("css").classList.add("barra-progreso2");
        document.getElementById("js").classList.add("barra-progreso3");
        document.getElementById("java").classList.add("barra-progreso4");
        document.getElementById("py").classList.add("barra-progreso5");
        document.getElementById("bd").classList.add("barra-progreso6");
    }
}