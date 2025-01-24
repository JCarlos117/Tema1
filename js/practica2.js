class Refaccion {
    constructor(descripcion, categoria, precio) {
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = parseFloat(precio).toFixed(2);
    }
}

class GestorRefacciones {
    constructor() {
        this.refacciones = [];
    }

    agregarRefaccion(refaccion) {
        this.refacciones.push(refaccion);
        this.mostrarRefacciones();
    }

    eliminarRefaccion(index) {
        this.refacciones.splice(index, 1);
        this.mostrarRefacciones();
    }

    editarRefaccion(index, nuevaRefaccion) {
        this.refacciones[index] = nuevaRefaccion;
        this.mostrarRefacciones();
    }

    mostrarRefacciones() {
        const tbody = document.querySelector('#refacciones-table tbody');
        tbody.innerHTML = '';
        this.refacciones.forEach((refaccion, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${refaccion.descripcion}</td>
                <td>${refaccion.categoria}</td>
                <td>${refaccion.precio}</td>
                <td class="actions">
                    <button onclick="gestor.eliminarRefaccion(${index})">Eliminar</button>
                    <button onclick="abrirModal(${index})">Editar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

//Instancia del gestor
const gestor = new GestorRefacciones();

//Manipular el formulario
document.getElementById('refaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
    gestor.agregarRefaccion(nuevaRefaccion);

    //Limpiar el formulario
    this.reset();
});

//Abrir el modal y cargar los datos de la refacción a editar
function abrirModal(index) {
    const refaccion = gestor.refacciones[index];

    document.getElementById('modal-nombre').value = refaccion.descripcion;
    document.getElementById('modal-categoria').value = refaccion.categoria;
    document.getElementById('modal-precio').value = refaccion.precio;

    const guardarBtn = document.getElementById('guardar-cambios');
    guardarBtn.onclick = function () {
        const nuevaRefaccion = new Refaccion(
            document.getElementById('modal-nombre').value,
            document.getElementById('modal-categoria').value,
            document.getElementById('modal-precio').value
        );
        gestor.editarRefaccion(index, nuevaRefaccion);
        cerrarModal();
    };

    document.getElementById('modal-editar').style.display = 'block';
}

//Cerrar el modal
function cerrarModal() {
    document.getElementById('modal-editar').style.display = 'none';
}

//Cerrar el modal si se hace clic fuera de este
window.onclick = function (event) {
    const modal = document.getElementById('modal-editar');
    if (event.target === modal) {
        cerrarModal();
    }
};
