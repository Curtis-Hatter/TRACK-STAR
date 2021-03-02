// prettier-ignore
$(document).ready(() => {
  // Getting references to our form and input

  const emailInput = $("input#email-input");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#password-input-check");
  const signUpButton = $("#sign-up-button");
  
  const signUp = event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.username) {
      return alert("Please enter valid email, username, and password");
    }

    // console.log(userData.passwordInput);
    // console.log(userData.confirmPassword);
    if (userData.password !== userData.confirmPassword) {
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
  signUpButton.click(signUp);
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  // console.log(emailInput);
  function signUpUser(email, username, password) {
    // console.log(email);
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password
    })
      .then(() => {
        window.location.href = "/";
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
