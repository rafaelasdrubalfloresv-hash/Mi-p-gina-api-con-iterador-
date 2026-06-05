

// Seleccionamos el elemento de la tabla
const contenido = document.querySelector('#contenido');

async function consumirApi() {
  // URL correcta de la API de pruebas JSONPlaceholder
  const url = "https://jsonplaceholder.typicode.com/users"; 
  
  const tipoApi = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const respuesta = await fetch(url, tipoApi); 
    
    if (!respuesta.ok) {
      contenido.innerHTML = `
        <tr>
          <td colspan="4">No pude extraer los datos (Error de servidor)</td>
        </tr>`;
      return;
    }

    // Convertimos la respuesta a JSON
    const usuarios = await respuesta.json();
    
    // Limpiamos el mensaje de "Cargando..."
    contenido.innerHTML = "";

    // ITERADOR: Recorremos el arreglo de usuarios y los agregamos a la tabla
    usuarios.forEach(usuario => {
      contenido.innerHTML += `
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.name}</td>
          <td>${usuario.email}</td>
          <td>${usuario.company.name}</td>
        </tr>
      `;
    });

  } catch (error) {
    // Por si falla el internet o la URL está caída
    console.error("Error al conectar con la API:", error);
    contenido.innerHTML = `
      <tr>
        <td colspan="4">Error de red. No se pudo conectar a la API.</td>
      </tr>`;
  }
}

// Ejecutamos la función al cargar la página
consumirApi();