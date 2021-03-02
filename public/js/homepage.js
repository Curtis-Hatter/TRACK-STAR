$(document).ready(() => {
  const username = localStorage.getItem("currentUser");

  $("#lil-uzi").attr("href", `/packages/${username}`);
  // New package button link
  $("#newPackageBtn").attr("href", "/newpackage");

  // Link for delivered tab
  $("#deliveredTab").attr("href", `/delivered/${username}`);

  // Link for pending orders tab
  $("#allOrdersTab").attr("href", `/packages/${username}`);

  // Link for logout tab
  $("#logOut").attr("href", "/logout");
});
