// prettier-ignore
$(document).ready(() => {

  const titleInput = $("input#title-input");
  const descriptionInput = $("input#description-input");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("input#carrierSelect");
  const addPackageButton = $("#sign-up-button");
  addPackageButton.click(addPackage);

  const addPackage = event => {
    event.preventDefault();
    const packageData = {
      title: titleInput.val().trim(),
      description: descriptionInput.val().trim(),
      tracking: trackingInput.val().trim(),
      carrier: carrierInput
    };

    newPackage(
      packageData.title,
      packageData.description,
      packageData.tracking,
      packageData.carrier
    );
    titleInput.val("");
    descriptionInput.val("");
    trackingInput.val("");
    carrierInput.val("");
  };

  function newPackage(title, description, tracking, carrier) {
    $.post("/api/addPackage", {
      title: title,
      description: description,
      tracking: tracking,
      carrier: carrier
    })
      .then(() => {
        window.location.reload;
      })
      .catch(handlePackageErr);
  }

  function handlePackageErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});