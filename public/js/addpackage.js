// prettier-ignore
$(document).ready(() => {

  const titleInput = $("input#title-input");
  const descriptionInput = $("input#description-input");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("select#carrierSelect");
  const addPackageButton = $("#sign-up-button");
  const username = localStorage.getItem("currentUser");
  // console.log(username);
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
    // console.log(packageData);
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
<<<<<<< HEAD
    // let isDelivered = false;
    console.log("HELLO!");
    if(carrier === "USPS"){
      $.get("/tracking/usps/" + tracking).then( res => {
      // console.log(res);
        // console.log(res.indexOf("delivered"));
        if(res.indexOf("delivered") !== -1)
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: carrier,
            user: id,
            delivered: true
          })
            .then(() => {
              window.location.reload;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
        // alert(isDelivered);
      });
    }
    else if(carrier === "UPS")
    {
      // console.log("ups");
      $.get("/tracking/ups/"+tracking).then(res =>{
        // console.log(res.Description);
        if(res.Description === "Delivered")
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: carrier,
            user: id,
            delivered: true
          })
            .then(() => {
              window.location.reload;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
      });
    }
    else if(carrier === "FedEx")
    {
      // console.log("FedEx");
      $.get("/tracking/shipengine/fedex/"+tracking).then(res =>{
        console.log(res);
        if(res.indexOf("DE") !== -1)
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: carrier,
            user: id,
            delivered: true
          })
            .then(() => {
              window.location.reload;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
      });
    }
    else{
      alert("You found the BUG! Now actually make a decision.");
      return;
    }
    // alert(isDelivered);
    
=======
    $.post("/api/newpackage", {
      title: title,
      description: description,
      tracking: tracking,
      carrier: carrier,
      user: id
    })
      .then(() => {
        window.location.replace("/packages/" + username);
        // alert("Something Happened");
      })
      .catch(handlePackageErr);
>>>>>>> a1a31b824289c9d62ea406c16c8b783a89b2cef0
  }
    
  function handlePackageErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  addPackageButton.click(addPackage);

  $("#lil-uzi").attr("href", `/packages/${username}`);
});
