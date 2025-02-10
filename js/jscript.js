// Función para cargar las refacciones a la tabla
function cargarRefacciones() {
    $.ajax({
      url: "https://tema1.onrender.com/refacciones",
      method: "GET",
      success: function (data) {
        const tbody = $("#refacciones-tbody");
        tbody.empty();
  
        data.forEach((refaccion) => {
          const row = `
                  <tr>
                      <td>${refaccion.nombre}</td>
                      <td>${refaccion.categoria}</td>
                      <td>${refaccion.precio}</td>
                      <td>
                          <a href="#updateModal" data-rel="popup" data-transition="pop" onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">Editar</a>
                          <a href="#" onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</a>
                      </td>
                    </tr>
          `;
          tbody.append(row);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar las refacciones:", error);
      },
    });  
  }
  
  // Función para agregar una refacción a la BD
  $("#refaccion-form").on("submit", function (e) {
      e.preventDefault();
  
      const refaccion = {
        nombre: $('#nombre').val(),
        categoria: $('#categoria').val(),
        precio: $('#precio').val(),
      };
  
      $.ajax({
        url: "https://tema1.onrender.com/refacciones",
        method: "POST",
        data: JSON.stringify(refaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {
          $("#refaccion-form")[0].reset();
          cargarRefacciones();
        },
        error: function (err) {
          console.error("Error al agregar la refacción:", err);
        },
  
      });
    });
  
  // Función para eliminar una refacción
  function eliminarRefaccion(id) {
    $.ajax({
      url: `https://tema1.onrender.com/refacciones/${id}`,
      method: "DELETE",
      success: function () {
        cargarRefacciones();
      },
      error: function (err) {
        console.error("Error al eliminar la refacción:", err);
      },
    });
  }
  
  // Función para mostrar el modal con la información de la refacción
  function mostrarModal(id, nombre, categoria, precio) {
    $("#update-nombre").val(nombre);
    $("#update-categoria").val(categoria);
    $("#update-precio").val(precio);
  
    $('#updateRefaccion-form').off('submit').on('submit', function(e){
      e.preventDefault();
      const updatedRefaccion = {
        nombre: $("#update-nombre").val(),
        categoria: $("#update-categoria").val(),
        precio: $("#update-precio").val(),
      };
      $.ajax({
        url: `https://tema1.onrender.com/refacciones/${id}`,
        method: "PATCH",
        data: JSON.stringify(updatedRefaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {        
          cargarRefacciones();
          $("#updateModal").popup('close');
        },
        error: function (err) {
          console.error("Error al actualizar la refacción:", err);
        },
      });
    });
  }
  
  // Cargar las refacciones al iniciar la página
  $(document).on('pageinit', function () {
    cargarRefacciones();
  });

  // js/jscript.js

$(document).ready(function () {
  // Redirige a la vista de inicio de sesión
  $("#login-btn").on("click", function () {
    window.location.href = "login.html";
  });

  // Redirige a la vista de registro
  $("#register-btn").on("click", function () {
    window.location.href = "registro.html";
  });
});


$(document).ready(function () {
  // Funcionalidad para el formulario de registro
  if ($("#register-form").length > 0) {
    $("#register-form").on("submit", function (e) {
      e.preventDefault();

      // Obtener los datos del formulario
      var name = $("#name").val();
      var email = $("#email").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirm-password").val();

      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Crear el objeto usuario
      var user = {
        name: name,
        email: email,
        password: password
      };

      // Obtener los usuarios almacenados en localStorage
      var users = localStorage.getItem("users");
      if (users) {
        users = JSON.parse(users);
      } else {
        users = [];
      }

      // Verificar si el usuario ya está registrado (por ejemplo, usando el correo electrónico)
      var userExists = users.find(function (u) {
        return u.email === email;
      });
      if (userExists) {
        alert("El usuario ya está registrado.");
        return;
      }

      // Agregar el nuevo usuario y guardarlo en localStorage
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registro exitoso. Ahora puede iniciar sesión.");
      // Opcional: redirigir a la página de inicio de sesión
      window.location.href = "login.html";
    });
  }

  // Funcionalidad para el formulario de inicio de sesión
  if ($("#login-form").length > 0) {
    $("#login-form").on("submit", function (e) {
      e.preventDefault();

      // Obtener las credenciales del formulario
      var email = $("#username").val();
      var password = $("#password").val();

      // Obtener los usuarios almacenados en localStorage
      var users = localStorage.getItem("users");
      if (users) {
        users = JSON.parse(users);
      } else {
        users = [];
      }

      // Buscar un usuario que coincida con las credenciales
      var validUser = users.find(function (u) {
        return u.email === email && u.password === password;
      });

      if (validUser) {
        alert("Inicio de sesión exitoso.");
        // Redirigir a la página principal o al dashboard
        window.location.href = "index.html";
      } else {
        alert("Credenciales incorrectas. Inténtelo nuevamente.");
      }
    });
  }
});
