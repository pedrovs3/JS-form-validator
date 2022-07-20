class ValidatesForm {
  constructor() {
    this.form = document.querySelector(".form");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validFields = this.checkFields();
    const validPasswords = this.passwordIsValid();

    if (validFields && validPasswords) {
      alert("O formulário foi enviado.");
      this.form.submit();
    }
  }

  passwordIsValid() {
    let valid = true;

    const password = this.form.querySelector(".passwordInput");
    const repeatPassword = this.form.querySelector(".repeatPassword");

    if (password.value !== repeatPassword.value) {
      valid = false;

      this.createError(
        password,
        'Campos "Senha" e "repetir senha" precisam ser iguais.'
      );
      this.createError(
        repeatPassword,
        'Campos "Senha" e "repetir senha" precisam ser iguais.'
      );
    }

    if (password.length < 6 || password > 12) {
      valid = false;
      this.createError(
        password,
        "A senha precisa conter entre 6 e 12 caracteres."
      );
    }

    return valid;
  }

  checkFields() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let field of this.form.querySelectorAll(".validate")) {
      const label = field.previousElementSibling.innerText.replace(":", "");
      if (!field.value) {
        this.createError(field, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if (field.classList.contains("cpfInput")) {
        if (!this.validateCPF(field)) valid = false;
      }

      if (field.classList.contains("userInput")) {
        if (!this.validateUser(field)) valid = false;
      }
    }

    return valid;
  }

  validateUser(field) {
    const user = field.value;
    let valid = true;

    if (user.length < 3 || user.length > 12) {
      this.createError(field, "O usuário deve conter entre 3 e 12 caracteres ");
      valid = false;
    }

    if (!user.match(/[a-zA-Z0-9]+$/g)) {
      this.createError(
        field,
        "O nome de usuário deve conter apenas letras e/ou números"
      );
      valid = false;
    }

    return valid;
  }

  validateCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if (!cpf.valida()) {
      this.createError(field, "CPF inválido");
      return false;
    }
    return true;
  }

  createError(field, message) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("error-text");
    field.insertAdjacentElement("afterend", div);
  }
}

const validate = new ValidatesForm();
