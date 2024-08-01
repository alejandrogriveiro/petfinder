document.getElementById('pet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('pet-name').value;
    const code = document.getElementById('pet-code').value;  // Corregido de 'pet-facebook' a 'pet-code'
    const status = document.getElementById('pet-status').value;
    const bio = document.getElementById('pet-bio').value;  // Corregido de 'pet-info' a 'pet-bio'

    if (!name || !code || !status || !bio) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const formData = {
        name: name,
        code: code,
        status: status,
        bio: bio,
        picture: 'www.alejandro.com'  // Enviar la URL en lugar de la imagen
    };

    // Obtener el token de autenticación almacenado
    const authToken = localStorage.getItem('authToken');

    fetch('http://localhost:3000/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`  // Enviar el token de autenticación
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error al registrar la mascota');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Mascota registrada con éxito');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar la mascota: ' + error.message);
    });
});

