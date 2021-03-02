// prettier-ignore
$(document).ready(() => {

  const titleInput = $("input#title-input");
  const descriptionInput = $("input#description-input");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("select#carrierSelect");
  const addPackageButton = $("#add-package-button");
  const username = localStorage.getItem("currentUser");
  // console.log(username);
  // console.log(addPackageButton.value);
  // console.log("WORLD");
  const addPackage = () => {
    // setTimeout(() => { alert("Hello"); }, 3000);
    // console.log("HELLO!!!");
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
    // let isDelivered = false;
    console.log("HELLO!");
    console.log (carrier);
    if(carrier === "USPS"){
      $.get("/tracking/usps/" + tracking).then( res => {
        console.log(res);
        // console.log(res.indexOf("delivered"));
        if(res.indexOf("delivered") !== -1)
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: "/img/usps.svg",
            user: id,
            delivered: true
          })
            .then(() => {
              console.log("hello");
              const id = localStorage.getItem("currentUser");
              window.location.href = "/delivered/" + id;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
        else
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: "/img/usps.svg",
            user: id,
            delivered: false
          })
            .then(() => {
              console.log("hello");
              const id = localStorage.getItem("currentUser");
              window.location.href = "/packages/" + id;
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
            carrier: "/img/ups.svg",
            user: id,
            delivered: true
          })
            .then(() => {
              const id = localStorage.getItem("currentUser");
              window.location.href = "/delivered/" + id;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
        else
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: "/img/ups.svg",
            user: id,
            delivered: false
          })
            .then(() => {
              const id = localStorage.getItem("currentUser");
              window.location.href = "/packages/" + id;
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
            carrier: "/img/fedex.svg",
            user: id,
            delivered: true
          })
            .then(() => {
              const id = localStorage.getItem("currentUser");
              window.location.href = "/delivered/" + id;
              // alert("Something Happened");
            })
            .catch(handlePackageErr);
        }
        else
        {
          $.post("/api/newpackage", {
            title: title,
            description: description,
            tracking: tracking,
            carrier: "/img/fedex.svg",
            user: id,
            delivered: false
          })
            .then(() => {
              const id = localStorage.getItem("currentUser");
              window.location.href = "/packages/" + id;
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
    
  }
    
  function handlePackageErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  addPackageButton.click(addPackage);

  $("#lil-uzi").attr("href", `/packages/${username}`);
});
