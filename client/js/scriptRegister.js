window.addEventListener("load", () => {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", (e) => {
      const { errors, firstName, lastName, email, password, phone, facebook, instagram, twitter, terms } = validaCampos();

      if (Object.values(errors).length > 0 || !terms) {
          e.preventDefault(); // Evita que el formulario se envíe si hay errores
      } else {
          // Asigna un evento de submit para redirigir a index.html
          form.target = 'hidden_iframe';
      }
  });

  const validaCampos = () => {
      let errors = {};

      const firstNameField = document.querySelector("#firstName");
      const lastNameField = document.querySelector("#lastName");
      const emailField = document.querySelector("#email");
      const passwordField = document.querySelector("#password");
      const phoneField = document.querySelector("#phone");
      const facebookField = document.querySelector("#facebook");
      const instagramField = document.querySelector("#instagram");
      const twitterField = document.querySelector("#twitter");
      const checkboxField = document.querySelector("#checkbox");

      const firstNameValue = firstNameField.value.trim();
      const lastNameValue = lastNameField.value.trim();
      const emailValue = emailField.value.trim().toLowerCase();
      const passwordValue = passwordField.value.trim();
      const phoneValue = phoneField.value.trim();
      const facebookValue = facebookField.value.trim();
      const instagramValue = instagramField.value.trim();
      const twitterValue = twitterField.value.trim();
      const termsValue = checkboxField.checked;

      if (!firstNameValue) {
          errors.firstName = "El nombre es requerido";
          validaFalla("firstName", "El nombre es requerido");
      } else {
          delete errors.firstName;
          validaOk("firstName");
      }

      if (!lastNameValue) {
          errors.lastName = "El apellido es requerido";
          validaFalla("lastName", "El apellido es requerido");
      } else {
          delete errors.lastName;
          validaOk("lastName");
      }

      if (!emailValue) {
          errors.email = "El email es requerido";
          validaFalla("email", "El email es requerido");
      } else if (!validaEmail(emailValue)) {
          errors.email = "El email ingresado no es válido";
          validaFalla("email", "El email ingresado no es válido");
      } else {
          delete errors.email;
          validaOk("email");
      }

      if (!passwordValue) {
          errors.password = "La contraseña es requerida";
          validaFalla("password", "La contraseña es requerida");
      } else {
          delete errors.password;
          validaOk("password");
      }

      if (!phoneValue) {
          errors.phone = "El teléfono es requerido";
          validaFalla("phone", "El teléfono es requerido");
      } else {
          delete errors.phone;
          validaOk("phone");
      }

      if (!termsValue) {
          errors.terms = "Debes aceptar los términos y condiciones";
          validaFalla("checkbox", "Debes aceptar los términos y condiciones");
      } else {
          delete errors.terms;
          validaOk("checkbox");
      }

      return {
          errors,
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          phone: phoneValue,
          facebook: facebookValue,
          instagram: instagramValue,
          twitter: twitterValue,
          terms: termsValue
      };
  };

  const validaFalla = (input, msg) => {
      let aviso = document.querySelector(`#${input}Error`);
      aviso.textContent = msg;
      aviso.classList.add("error");
      aviso.classList.remove("ok");
  };

  const validaOk = (input) => {
      let aviso = document.querySelector(`#${input}Error`);
      aviso.classList.remove("error");
      aviso.classList.add("ok");
  };

  const validaEmail = (email) => {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };
});

// Agrega un iframe oculto para recibir la respuesta del servidor
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
iframe.name = 'hidden_iframe';
document.body.appendChild(iframe);

// Escucha el evento de carga del iframe para redirigir a index.html
iframe.addEventListener('load', () => {
  window.location.href = "index.html";
});

