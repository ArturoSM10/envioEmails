document.addEventListener('DOMContentLoaded', leerEventos);

const formulario = document.querySelector('.form');
const contenedorBtn = document.querySelector('.campo--btn');
const btnEnviar = document.querySelector('.submit'); 

const validaciones = {
    email: validarEmail,
    asunto: validarTexto,
    mensaje: validarTexto
};

const estado = {
    email: false,
    asunto: false,
    mensaje: false
};

const botones = {
    submitBtn: botonEnviar,
    resetBtn: botonReset
};

function leerEventos() {

    formulario.addEventListener('input', e => {
      const validador = validaciones[e.target.id];
      if (validador) {
        const esValido = validador(e.target);

        estado[e.target.id] = esValido;
        const estadoCampos = validarFormulario();
        activarBtn(estadoCampos);
      }
    });

    eventosBtn();

}

function validarEmail(entrada) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const valido = regexEmail.test(entrada.value);

    if(!valido) {
        crearAlerta('El email no es válido', entrada);
        return valido;
    }
    eliminarAlerta(entrada);
    return valido;
} 

function validarTexto(entrada) {
    const valido = entrada.value.trim().length > 1;
    if(!valido) {
        crearAlerta('Este campo no puede ir vacio o es muy corto', entrada);
        return valido;
    }
    eliminarAlerta(entrada);
    return valido;
} 

function validarFormulario() {
    return Object.values(estado).every( valor => valor);
}

function activarBtn(estado) {
    if(estado) {
        btnEnviar.removeAttribute('disabled');
        return;
    }
    btnEnviar.setAttribute('disabled', '');
}

function crearAlerta(text, child) {
    const id = child.id;
    const campo = document.getElementById(id).parentElement;
    const existe = campo.lastElementChild.classList.contains('alert')
    if (existe) return;
    const error = document.createElement('p');
    error.textContent = text;
    error.classList.add('alert', 'incorrecto');
    campo.appendChild(error);
}

function eliminarAlerta (entrada) {
    const parent = entrada.parentElement;
    const ultimoElemento= parent.lastElementChild;
    if (ultimoElemento.classList.contains('alert')) {
        ultimoElemento.remove();
    }
}

function eventosBtn() {
    contenedorBtn.addEventListener('click', e => {
        e.preventDefault()
        const validador = botones[e.target.id];
        if (validador) {
            const esValido = validador(e.target);

        }
    })
}

function botonEnviar(entrada) {
    agregarSpinner();
    // setTimeout(()=>{
    //     agregarSpinner();
    // }, 3000);
}

function botonReset() {
    const campos = {
        inputEmail : document.querySelector('#email'),
        inputAsunto: document.querySelector('#asunto'),
        inputMensaje: document.querySelector('#mensaje')
    }

    Object.values(campos).forEach(campo => {
        campo.value = '';
        eliminarAlerta(campo);
    })

}

function agregarSpinner() {
    const spinner = document.querySelector('.spinner .sk-chase');
    const spinnerContenedor = document.querySelector('.spinner');
    spinner.style.display = 'block';
    const alertaEnvio = document.createElement('P');
    alertaEnvio.textContent = 'Email enviado correctamente';   
    alertaEnvio.classList.add('alert', 'correcto'); 
    setTimeout(()=>{
        spinner.style.display = 'none';
        spinnerContenedor.appendChild(alertaEnvio);
        setTimeout(()=>{
            spinnerContenedor.remove();
            botonReset();
        },1000)
    }, 3000);

    
}