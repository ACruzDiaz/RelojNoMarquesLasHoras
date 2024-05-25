const $objetoReloj = document.querySelector('.objetoReloj');
const $pantallaSec = document.querySelector('.pantallaSecundaria');
const cuerpo = document.querySelector('body');
const empiezaContar = document.querySelector('.botonPlay');
const imgBorrar = document.querySelector('.borrarReloj');
const agregarReloj = document.querySelector('.agregarReloj img');
const guardarBtn = document.querySelector('#guardar');
const btnReiniciar = document.querySelector('.botonRestart')
const main = document.querySelector('main');

const cancelar = document.querySelector('#cancelar');
let editing = false;
var relojList = [];

class Reloj {
    
    constructor(nombre, horas, minutos, segundos){
        this.nombre = nombre;
        this.horas = horas;
        this.minutos = minutos;
        this.segundos = segundos;
        this.horasf = this.horas;
        this.minutosf = this.minutos;
        this.segundosf = this.segundos;
    }

    editar(inputNombre, hor, min , seg, index){
        main.children[index].querySelector(".tituloReloj").textContent = inputNombre;
        main.children[index].querySelector(".disSeg").textContent = seg.toString().padStart(2, '0');
        main.children[index].querySelector(".disMin").textContent = min.toString().padStart(2, '0');
        main.children[index].querySelector(".disHor").textContent = hor.toString().padStart(2, '0');
        this.nombre = inputNombre;
        this.horas = hor;
        this.minutos = min;
        this.segundos = seg;
        this.horasf = this.horas;
        this.minutosf = this.minutos;
        this.segundosf = this.segundos;
        
    }
    reiniciarCount(displayseg, displaymin, displayhor){
        this.horas = this.horasf;
        this.minutos = this.minutosf;
        this.segundos = this.segundosf;
        displayseg.textContent = this.segundos.toString().padStart(2, '0');
        displaymin.textContent = this.minutos.toString().padStart(2, '0');
        displayhor.textContent = this.horas.toString().padStart(2, '0');
    }
    startCount(displayseg, displaymin, displayhor){
        this.intervalID = setInterval(() => {
            if(this.horas ==0 && this.minutos == 0 && this.segundos == 0){
                clearInterval(this.intervalID);
                return;
            }else{
                this.segundos--;
                if(this.segundos < 0){
                    this.minutos--;
                    this.segundos = 59;
                    if(this.minutos < 0){
                        this.horas--;
                        this.minutos = 59;
                    }
                }
                if(this.segundos < 10){
                    displayseg.textContent = ("0"+this.segundos);
                }else{
                    displayseg.textContent = this.segundos;
                }
                if(this.minutos < 10){
                    displaymin.textContent = ("0"+this.minutos);
                }else{
                    displaymin.textContent = this.minutos;
                }
                if(this.horas < 10){
                    displayhor.textContent = ("0"+this.horas);
                }else{
                    displayhor.textContent = this.horas;
                }
            }
        
        }, 1000);
    }
    pauseCount(){
        clearInterval(this.intervalID);
    }
    drawNewReloj(){
        const nuevoReloj = document.createElement('div');
        nuevoReloj.classList.add('objetoReloj');
        //Event listener para menu secundario
        nuevoReloj.addEventListener('click', e => {
            e.stopPropagation();
            if (e.target !== e.currentTarget) {
                console.log("nuevoReloj");
            }
            else {
                const num = relojList.indexOf(this);
                console.log(relojList.indexOf(this));
                editing =true;
                $pantallaSec.style.display = 'flex';
                cuerpo.style.overflow = 'hidden';
                imgBorrar.style.display = 'flex'
                document.querySelector('#userInput').textContent = this.nombre;
                e.stopPropagation();
                const borrarListener = (e) => {
                    if (e.target == e.currentTarget && num >= 0) {
                        console.log("BORRAR: " + num); 
                        console.log(main.children[num]); 
                        main.removeChild(main.children[num]);
                        relojList.splice(num,1);
                        cerrarMenu();
                        

                    }
                    
                    imgBorrar.removeEventListener('click', borrarListener);
                }
                console.log(num);
                imgBorrar.addEventListener('click', borrarListener, {once:true});
                guardarBtn.addEventListener('click',() => editarGuardar(num),{once:true});
                
                cancelar.addEventListener('click',cancelarListener), {once:true};
                $pantallaSec.addEventListener('click', cancelarListenerScreen), {once: true};
                e.stopPropagation();
            }

        });
        nuevoReloj.innerHTML =
        `<h2 class="tituloReloj">`+this.nombre+`</h2>
        <p class="tiempo">
            <span class="disHor"></span>
            <span>:</span>
            <span class="disMin"></span>
            <span>:</span>
            <span class="disSeg"></span>
        </p>
        <button id = "playid" class="botonPlay"></button>
        <button class="botonRestart"><img src="./img/restart.png" alt="botonrestart"></button>`;

        let displayseg = nuevoReloj.querySelector(".disSeg");
        let displaymin = nuevoReloj.querySelector(".disMin");
        let displayhor = nuevoReloj.querySelector(".disHor");
        displayseg.insertAdjacentText("afterbegin",this.segundos.toString().padStart(2, '0'));
        displaymin.insertAdjacentText("afterbegin",this.minutos.toString().padStart(2, '0'));
        displayhor.insertAdjacentText("afterbegin",this.horas.toString().padStart(2, '0'));
        main.appendChild(nuevoReloj);

        //Event listener para poner play
        const play = nuevoReloj.querySelector('#playid');
        play.addEventListener('click', e=>{
            if (e.target !== e.currentTarget) {
                console.log("play ");
            }
            else {
                play.classList.toggle("botonPause");
                play.classList.toggle("botonPlay");
                if(play.className.includes("botonPause")){
                    this.startCount(displayseg, displaymin, displayhor);
                }else if(play.className.includes("botonPlay")){
                    this.pauseCount();
                }
                e.stopPropagation();
            }
        });
        //Event listener para reiniciar el contador
        const btnReiniciar = nuevoReloj.querySelector('.botonRestart')
        btnReiniciar.addEventListener('click', e=>{
            if (e.target !== e.currentTarget) {
                console.log("reiniciar ");
            }
            else {
                this.reiniciarCount(displayseg, displaymin, displayhor);
            }
            e.stopPropagation(); 
        });
    }
}


//- - - - - - -  - - Funciones  - - - - - - - - - - - 
function cerrarMenu(){
    $pantallaSec.style.display = 'none';
    cuerpo.style.overflow = 'auto';
    editing = false;
    return;
}

function abrirMenu(){
    imgBorrar.style.display = 'none';
    $pantallaSec.style.display = 'flex';
    cuerpo.style.overflow = 'hidden';
    guardarBtn.addEventListener('click',activarGuardar, {once:true, passive:true });
    cancelar.addEventListener('click',cancelarListener);
    $pantallaSec.addEventListener('click', cancelarListenerScreen);
}

function crearNuevoReloj(nombre, hora, min, sec){
    const reloj = new Reloj(nombre,hora,min,sec);
    relojList.push(reloj);
    relojList[relojList.length - 1].drawNewReloj();
}






//- - - - - - - Event Listeners - - - - - - - - - - - 
const editarGuardar = (num) =>{

    if (event.target == event.currentTarget && editing === true) {
        
        const inputNombre = document.querySelector('#userInput').value;
        const setHora = parseInt(document.querySelector('#setHora').value);
        const setMin = parseInt(document.querySelector('#setMin').value);
        const setSeg = parseInt(document.querySelector('#setSeg').value);
  
        relojList[num].editar(inputNombre, setHora, setMin, setSeg, num);
        cerrarMenu();

    }
    guardarBtn.removeEventListener("click", editarGuardar); 
    event.stopPropagation();
    console.log("EditarGuardar")
    
};

const activarGuardar = (e) =>{

    if (e.target == e.currentTarget && editing === false) {
        const inputNombre = document.querySelector('#userInput').value;
        const setHora = parseInt(document.querySelector('#setHora').value);
        const setMin = parseInt(document.querySelector('#setMin').value);
        const setSeg = parseInt(document.querySelector('#setSeg').value);
        crearNuevoReloj(inputNombre, setHora, setMin, setSeg);
        
        cerrarMenu();

            
    }
    guardarBtn.removeEventListener("click", activarGuardar);
    e.stopPropagation();
    console.log("activarGuardar")

};

agregarReloj.addEventListener('click', e => {
    if (e.target == e.currentTarget) {
        abrirMenu();
        e.stopPropagation(); 
    } else {
        console.log("No le atinaste");
    }
});

const cancelarListenerScreen = (e) => {
    if (e.target == e.currentTarget) {
        editing = false;
        $pantallaSec.style.display = 'none';
        cuerpo.style.overflow = 'auto';
    }
    $pantallaSec.removeEventListener('click', cancelarListenerScreen)
}

const cancelarListener = (e) => {
    if (e.target == e.currentTarget) {
        editing = false;
        $pantallaSec.style.display = 'none';
        cuerpo.style.overflow = 'auto';
    }
    cancelar.removeEventListener('click', cancelarListener);
}