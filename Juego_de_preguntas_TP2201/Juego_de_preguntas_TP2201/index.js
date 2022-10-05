let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

//tengo 10 preguntas en un json//

window.onload = function () {
  bpreguntas = readText("bpreguntas.json");
  interprete_bp = JSON.parse(bpreguntas);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];
let preguntas_hechas = 0;
let preguntas_correctas = 0;
let valor_dado =0;


let suerte= document.getElementById("tirar_dado")
suerte.addEventListener("click", tirar_dados)

function tirar_dados(){
  if (pepe>0) {
      valor_dado= Math.floor(Math.random()*9);
      preguntas_correctas= preguntas_correctas*valor_dado;
      select_id("resultado_dado").innerHTML="hasta acá tenes "+ (preguntas_correctas ) +  " puntos";
      select_id("dado").innerHTML=valor_dado;
    }
    else{
      select_id("tirar_dado").innerHTML="Ya no podes tirar el dado "
    }
    pepe=pepe-1;
    }
  
let fin_juego=document.getElementById("final");
fin_juego.addEventListener("click", juego_terminado)    

function juego_terminado() {
 
    if (mostrar_pantalla_juego_términado) { 
      swal.fire({
        icon: "success",
        title: "Juego finalizado",
        text: "Puntuación: " + preguntas_correctas + " Puntos. ",
        footer: '<a href=".">Empecemos de nuevo</a>'
      })
      }
    }
      
  
  

function escogerPreguntaAleatoria() {

  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } 
  else {
    n = 0;
  }
  console.log("while", npreguntas.includes(n), npreguntas, npreguntas.length )

  while (npreguntas.includes(n)) {
    n++;
    console.log("n", n)
    if (n >= interprete_bp.length) {
      n = 0;
    } 
    
    if (npreguntas.length >= 10 ) {
      if (cantidad_ayuda<=4) {
        
        console.log(cantidad_ayuda);
        document.getElementById("juego_dados").style.display="block";
        select_id("explicado").innerHTML="hasta acá tenes "+preguntas_correctas+ " puntos" ;
        if (cantidad_ayuda==1) {
          select_id("explicado2").innerHTML="Pediste ayuda "+ cantidad_ayuda + " vez. ";
        }
        else{
          select_id("explicado2").innerHTML="Pediste ayuda "+ cantidad_ayuda + " veces. ";
        }
        select_id("explicado3").innerHTML="Tenes "+ (5-cantidad_ayuda)+ " oportunidades de duplicar tu puntaje";
        
      }
      else {
       if (mostrar_pantalla_juego_términado) { 
        swal.fire({
          icon: "success",
          title: "Juego finalizado",
          text: "Puntuación: " + preguntas_correctas + " Puntos. ",
          footer: '<a href=".">Empecemos de nuevo</a>'
        })

         }
         if (reiniciar_puntos_al_reiniciar_el_juego) {
           preguntas_correctas = 0
           preguntas_hechas = 0
          }
          npreguntas = [];
        } 
    }
      //Aquí es donde el juego se reinicia
    }
    npreguntas.push(n);
    preguntas_hechas++;
    
    escogerPregunta(n);
  }
  



puntos = 10;
let cantidad_ayuda = 0;
let boton6 = document.getElementById("boton_pedir_ayuda2");
let boton5 = document.getElementById("boton_pedir_ayuda1");
boton6.addEventListener("click", valor_puntos2) 
boton5.addEventListener("click", valor_puntos1) 
var pepe=5;

function valor_puntos1(){
  puntos = 8
  if (cantidad_ayuda < 5) {
    cantidad_ayuda++
    pepe--
    }  
  else{
    boton5.style.display="none";
  }
};

function valor_puntos2(){
puntos = 3
if (cantidad_ayuda < 5) {
  cantidad_ayuda++
  pepe--
 }  
else{
  boton5.style.display="none";
}
};


function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  select_id("ayuda1").innerHTML = pregunta.ayuda1
  select_id("ayuda2").innerHTML = pregunta.ayuda2

  let pc = preguntas_correctas;

  if (preguntas_hechas > 0 ) {
    select_id("puntaje").innerHTML = "Puntos acumulados: "+ pc + "</br>" + "Preguntas respondidas: "+(preguntas_hechas - 1);
  } 
  else {
    select_id("puntaje").innerHTML = "Puntos acumulados: 0"+ "</br>" + "Preguntas respondidas: 0";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  select_id("imagen").setAttribute("src", pregunta.imagen);
  style("imagen").height = "200px";
  style("imagen").width = "100%";

}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas= (preguntas_correctas+puntos);
    puntos=10;
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
    puntos=10;
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 200);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}





function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}