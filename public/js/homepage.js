$(document).ready(() => {
  const username = localStorage.getItem("currentUser");

  $("#lil-uzi").attr("href", `/packages/${username}`);
  $("#newPackageBtn").attr("href", "/newpackage");
  $("#deliveredTab").attr("href", `/delivered/${username}`);
  $("#allOrdersTab").attr("href", `/packages/${username}`);
  $("#logOut").attr("href", "/logout");
});
