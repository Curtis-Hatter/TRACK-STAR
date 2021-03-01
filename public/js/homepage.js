$(document).ready(() => {
  const username = localStorage.getItem("currentUser");

  $("#lil-uzi").attr("href", `/packages/${username}`);
});
