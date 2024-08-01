document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const form = event.target;
    const formData = new FormData(form);

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Login fallido");
        }
    })
    .then(data => {
        console.log('Success:', data);
        // Guardar el token en localStorage
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            console.log('Token guardado en localStorage');
        }

        // Redirigir al usuario a la página de inicio después de un inicio de sesión exitoso
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en el inicio de sesión');
    });
});

