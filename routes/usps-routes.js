const axios = require("axios");
const convert = require("xml-js");

module.exports = app => {
  app.get("/tracking/usps/:id", (req, res) => {
    axios({
      method: "POST",
      url:
        "https://secure.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID=" +
        JSON.stringify(process.env.USPS_USER_ID) +
        "><TrackID ID=" +
        JSON.stringify(req.params.id) +
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

  app.get("/tracking/ups/:id", (req, res) => {
    const packageID = req.params.id;

    axios({
      method: "POST",
      url: "https://onlinetools.ups.com/json/Track",
      data: {
        Security: {
          UsernameToken: {
            Username: process.env.UPS_USERNAME,
            Password: process.env.UPS_PASSWORD
          },
          UPSServiceAccessToken: {
            AccessLicenseNumber: process.env.UPS_ACCESSID
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
