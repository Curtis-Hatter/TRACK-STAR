// prettier-ignore
$(document).ready(() => {
  // Getting references to our form and input

  const emailInput = $("input#email-input");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#password-input-check");
  const signUpButton = $("#sign-up-button");
  signUpButton.click(signUp);

  const signUp = event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    if (userData.passwordInput !== userData.confirmPassword) {
      return alert("Password's don't match");
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.username,
      userData.password,
      userData.confirmPassword
    );
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  };

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password
    })
      .then(() => {
        window.location.replace("/packages");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
