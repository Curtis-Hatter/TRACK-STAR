const axios = require("axios");
const convert = require("xml-js");

module.exports = app => {
  app.get("/tracking/usps/:id", (req, res) => {
    // modelName.getOne(req.body.trackID, (data) => {
    //     const hbsObject = {
    //         NameofProperties: data,
    //     };
    //     res.render('index', hbsObject);
    // });
    // axios.post("/")

    //secure.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="689UCREX6489"><TrackID ID="9405511298370510938918"></TrackID></TrackRequest>
    const trackID = JSON.stringify(req.params.id);
    console.log(trackID);
    axios({
      method: "POST",
      url:
        "https://secure.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID='689UCREX6489'><TrackID ID=" +
        trackID +
        "></TrackID></TrackRequest>"
      // data: {
      //   firstName: 'Finn',
      //   lastName: 'Williams'
      // }
    }).then(res => {
      //   console.log(res.data);
      const xml = res.data;
      const result = convert.xml2json(xml, { compact: true, spaces: 4 });
      console.log(result);
    });
  });

  app.get("/tracking/ups", (req, res) => {
    axios({
      method: "POST",
      url: "https://onlinetools.ups.com/json/Track",
      data: {
        Security: {
          UsernameToken: {
            Username: "Irate_Swami",
            Password: "cH@tter259263"
          },
          UPSServiceAccessToken: {
            AccessLicenseNumber: "FD94DB0BC94D9FF2"
          }
        },
        TrackRequest: {
          Request: {
            RequestAction: "Track",
            RequestOption: "activity"
          },
          InquiryNumber: "1Z8F13280392127539"
        }
      }
    }).then(res => {
      console.log(res.data);
    });
  });
};
