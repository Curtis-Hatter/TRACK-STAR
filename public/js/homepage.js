$(document).ready(() => {
  const username = localStorage.getItem("currentUser");

  $("#lil-uzi").attr("href", `/packages/${username}`);
  $("#deliveredTab").attr("href", `/delivered/${username}`);
  $("#allOrdersTab").attr("href", `/packages/${username}`);
  $("#logOut").attr("href", "/logout");
});
