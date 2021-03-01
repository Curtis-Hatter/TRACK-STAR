// prettier-ignore
$(document).ready(() => {

  const titleInput = $("input#title-input");
  const descriptionInput = $("input#description-input");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("select#carrierSelect");
  const addPackageButton = $("#sign-up-button");
  const username = sessionStorage.getItem("currentUser");
  
  // console.log(addPackageButton.value);
  // console.log("WORLD");
  const addPackage = event => {
    // setTimeout(() => { alert("Hello"); }, 3000);
    // console.log("HELLO!!!");
    event.preventDefault();
    const packageData = {
      title: titleInput.val().trim(),
      description: descriptionInput.val().trim(),
      tracking: trackingInput.val().trim(),
      carrier: carrierInput.val(),
      id: username
    };
    console.log(packageData);
    newPackage(
      packageData.title,
      packageData.description,
      packageData.tracking,
      packageData.carrier,
      packageData.id
    );
    titleInput.val("");
    descriptionInput.val("");
    trackingInput.val("");
    carrierInput.val("");
  };
    
  function newPackage(title, description, tracking, carrier, id) {
    $.post("/api/newpackage", {
      title: title,
      description: description,
      tracking: tracking,
      carrier: carrier,
      id: id
    })
      .then(() => {
        // window.location.reload;
        alert("Something Happened");
      })
      .catch(handlePackageErr);
  }
    
  function handlePackageErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  addPackageButton.click(addPackage);
});
