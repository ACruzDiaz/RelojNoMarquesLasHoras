const objetoReloj = document.querySelector('div.objetoReloj');
const pantallaSec = document.querySelector('.pantallaSecundaria');
const cuerpo = document.querySelector('body');
const empiezaContar = document.querySelector('.botonPlay');
const cancelar = document.querySelector('#cancelar');
const agregarReloj = document.querySelector('.agregarReloj img');
const guardarBtn = document.querySelector('#guardar');

const main = document.querySelector('main');

// const borrarReloj = document.querySelector('.borrarReloj');


var relojList = [];

class Reloj {
    constructor(nombre, horas, minutos, segundos){
        this.nombre = nombre;
        this.horas = horas;
        this.minutos = minutos;
        this.segundos = segundos;

    }

    crearNuevoReloj(){


        guardarBtn.addEventListener('click', e =>{


            if (e.target == e.currentTarget) {
                const textoNombre = document.querySelector('#userInput');
                const inputNombre = textoNombre.nodeValue;
                const setHora = parseInt(document.querySelector('#setHora'));
                const setMin = parseInt(document.querySelector('#setMin'));
                const setSeg = parseInt(document.querySelector('#setSeg'));
                console.log(textoNombre, inputNombre, setHora,setMin,setSeg);

            if(false){
                alert("Nombre invalido. Escriba otro nombre para este reloj.");
            }
            else{
                return new Reloj(inputNombre, setHora, setMin, setSeg);
                
            }
        }
        })

    }

    drawNewReloj(){
        // 
        const nuevoReloj = document.createElement('div');
        nuevoReloj.classList.add('objetoReloj');
        nuevoReloj.addEventListener('click', e => {
            if (e.target !== e.currentTarget) {
                console.log("No se pudo jefe");
            }
            else {
                $pantallaSec.style.display = 'flex';
                cuerpo.style.overflow = 'hidden';
            }
        })
        nuevoReloj.innerHTML =
        `<h2 class="tituloReloj">`+this.nombre+`</h2>
        <p class="tiempo">
            <span class="disHor">`+this.horas+`</span>
            <span>:</span>
            <span class="disMin">`+this.minutos+`</span>
            <span>:</span>
            <span class="disSeg">`+this.segundos+`</span>
        </p>
        <div class="botonPlay"><img src="./img/play-button.png" alt="botonplay"></div>
        <div class="botonRestart"><img src="./img/restart.png" alt="botonrestart"></div>`;
        //Regresa el HTML listo para ser Appended
        return nuevoReloj;
        
    }
}



agregarReloj.addEventListener('click', e => {
    if (e.target == e.currentTarget) {
        agregarNuevoReloj();


    } else {
        console.log("No le atinaste");
    }
})

$pantallaSec.addEventListener('click', e => {

    if (e.target == e.currentTarget) {
        $pantallaSec.style.display = 'none';
        cuerpo.style.overflow = 'auto';
    }
})

cancelar.addEventListener('click', e => {

    if (e.target == e.currentTarget) {
        $pantallaSec.style.display = 'none';
        cuerpo.style.overflow = 'auto';
    }
})









function agregarNuevoReloj() {
    const imgBorrar = document.querySelector('.borrarReloj');
    imgBorrar.style.display = 'none'
    $pantallaSec.style.display = 'flex';
    cuerpo.style.overflow = 'hidden';


    const originalInstance = new Reloj('default',0,0,0);
    const newReloj = originalInstance.crearNuevoReloj();
    main.appendChild(newReloj.drawNewReloj());

}