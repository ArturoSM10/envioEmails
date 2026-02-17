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

    eventosInput();
    eventosBtn();

}

function eventosInput() {
    formulario.addEventListener('input', e => {
      const validador = validaciones[e.target.id];
      if (validador) {
        const esValido = validador(e.target);
        actualizarEstado(e.target.id, esValido);
      }
    });
}

function manejarResultado(input, valido, texto) {
    if (!valido) { 
        crearAlerta(texto, input);
        return;
    }

    eliminarAlerta(input);
}

function validarEmail(entrada) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const valido = regexEmail.test(entrada.value);

    manejarResultado(entrada, valido, 'El email no es valido');
    return valido;
}

function validarTexto(entrada) {
    const valido = entrada.value.trim().length > 1;

    manejarResultado(entrada, valido, 'Este campo no puede ir vacio o es muy corto');
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
    const existe = campo.querySelector('.alert');
    if (existe) return;
    const error = document.createElement('p');
    error.textContent = text;
    error.classList.add('alert', 'incorrecto');
    campo.appendChild(error);
}

function eliminarAlerta (entrada) {
    const parent = entrada.parentElement;
    const ultimoElemento= parent.querySelector('.alert');
    if (ultimoElemento) {
        ultimoElemento.remove();
    }
}

function eventosBtn() {
    contenedorBtn.addEventListener('click', e => {
        e.preventDefault();
        const boton = e.target.closest('button');
        if (!boton) return;

        const validador = botones[boton.id];
        if (validador) validador();
    })
}

function botonEnviar() {
    const spinnerContenedor = document.querySelector('.spinner');
    const spinner = document.querySelector('.spinner .sk-chase');
    spinner.style.display = 'block';
    const alertaEnvio = document.createElement('P');
    alertaEnvio.textContent = 'Email enviado correctamente';
    alertaEnvio.classList.add('alert', 'correcto');

    setTimeout(()=>{
        spinner.style.display = 'none';
        spinnerContenedor.appendChild(alertaEnvio);
        botonReset();
        setTimeout(()=>{
            alertaEnvio.remove();
        },1000)
    }, 3000);

}

function botonReset() {
    const campos = {
        inputEmail : document.querySelector('#email'),
        inputAsunto: document.querySelector('#asunto'),
        inputMensaje: document.querySelector('#mensaje')
    }

    Object.values(campos).forEach(campo => {
        campo.value = '';
        estado[campo.id] = false;
        eliminarAlerta(campo);
    })

    const estadoCampos = validarFormulario();
    activarBtn(estadoCampos);

}

function actualizarEstado(id, valido) {
    estado[id] = valido;
    activarBtn(validarFormulario());
}