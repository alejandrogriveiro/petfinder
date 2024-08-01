document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para obtener y mostrar las mascotas cuando la página se carga
    fetchPets();
});

async function fetchPets() {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    const contentDiv = document.getElementById('content');
    
    if (!token) {
        contentDiv.innerHTML = '<p>Usuario no autenticado. Inicie sesión para ver sus mascotas.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/pets', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const pets = await response.json();

        if (pets.length === 0) {
            contentDiv.innerHTML = '<p>No tienes mascotas registradas.</p>';
        } else {
            contentDiv.innerHTML = pets.map(pet => `
                <div class="pet-card">
                    <img src="${pet.picture}" alt="${pet.name}" class="pet-picture"/>
                    <h3>${pet.name}</h3>
                    <p><strong>Código:</strong> ${pet.code}</p>
                    <p><strong>Activo:</strong> ${pet.is_active ? 'Sí' : 'No'}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        contentDiv.innerHTML = '<p>Hubo un problema al cargar los datos de las mascotas.</p>';
    }
}
