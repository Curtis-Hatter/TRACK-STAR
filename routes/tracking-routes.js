const axios = require("axios");
const convert = require("xml-js");
const request = require("request");
// const { response } = require("express");

module.exports = app => {
  //USPS Tracking api
  app.get("/tracking/usps/:id", (req, res) => {
    //Call a POST request to some url to return xml
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
    }).then(response => {
      //   console.log(res.data);
      //the res.data is xml and needs to be converted to json
      const xml = response.data;
      const result = convert.xml2json(xml, { compact: true, spaces: 4 });
      console.log(result);
      res.send(result);
    });
  });

  //FEDEX Call xml same with USPS
  // app.get("/tracking/fedex/test", (req, res) => {
  //   const xmlBodyStr = `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://fedex.com/ws/track/v18">
  //   <SOAP-ENV:Body>
  //      <TrackRequest>
  //         <WebAuthenticationDetail>
  //            <UserCredential>
  //               <Key>Rw8rWDAbeVKwEv4V</Key>
  //               <Password>zhVDJKpYBtglaJX3HII6NcdUs</Password>
  //            </UserCredential>
  //         </WebAuthenticationDetail>
  //         <ClientDetail>
  //            <AccountNumber>510087720</AccountNumber>
  //            <MeterNumber>119196585</MeterNumber>
  //         </ClientDetail>
  //         <TransactionDetail>
  //            <CustomerTransactionId>Track By Number_v18</CustomerTransactionId>
  //            <Localization>
  //               <LanguageCode>EN</LanguageCode>
  //            </Localization>
  //         </TransactionDetail>
  //         <Version>
  //            <ServiceId>trck</ServiceId>
  //            <Major>18</Major>
  //            <Intermediate>0</Intermediate>
  //            <Minor>0</Minor>
  //         </Version>
  //         <SelectionDetails>
  //            <PackageIdentifier>
  //               <Type>TRACKING_NUMBER_OR_DOORTAG</Type>
  //               <Value>231300687629630</Value>
  //            </PackageIdentifier>
  //         </SelectionDetails>
  //         <ProcessingOptions>INCLUDE_DETAILED_SCANS</ProcessingOptions>
  //      </TrackRequest>
  //     </SOAP-ENV:Body>
  // </SOAP-ENV:Envelope>`;
  //   const config = { headers: { "Content-Type": "text/xml" } };

  //   axios
  //     .post("https://wsbeta.fedex.com/web-services", xmlBodyStr, config)
  //     .then(res => {
  //       const xml = res.data;
  //       const result = convert.xml2json(xml, { compact: true, spaces: 4 });
  //       console.log(result);
  //     });
  // });

  //CHANGED API CALL to shipengine passing ID for tracking
  app.get("/tracking/shipengine/fedex/:id", (req, res) => {
    const id = req.params.id;
    const options = {
      method: "GET",
      url:
        "https://api.shipengine.com/v1/tracking?carrier_code=fedex&tracking_number=" +
        id,
      headers: {
        Host: "api.shipengine.com",
        "API-Key": "TEST_KrVo/J2myk1/PbESqE+JUQf/Je4eAENJylD6g4B4iGU"
      }
    };
    request(options, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      console.log(response.body);
      res.send(response.body);
    });
  });

  // UPS Call returns JSON, THANK YOU!!!
  // Changed password... Now doesn't work
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

          InquiryNumber: JSON.stringify(packageID)
        }
      }
    }).then(response => {
      console.log(response.data);
      res.send(response.body);
    });
  });

  // app.get("/tracking/shipengine/ups/:id", (req, res) => {
  //   const id = req.params.id;
  //   const options = {
  //     method: "GET",
  //     url:
  //       "https://api.shipengine.com/v1/tracking?carrier_code=ups&tracking_number=" +
  //       id,
  //     headers: {
  //       Host: "api.shipengine.com",
  //       "API-Key": "TEST_KrVo/J2myk1/PbESqE+JUQf/Je4eAENJylD6g4B4iGU"
  //     }
  //   };
  //   request(options, (error, response) => {
  //     if (error) {
  //       throw new Error(error);
  //     }
  //     console.log(response.body);
  //   });
  // });

  //NO FREAKING CLUE HOW THIS WORKS!
  // app.get("/tracking/amazon/:id", (req, res) => {
  //   const packageID = req.params.id;
  //   const tracker = new api.Tracker({
  //     tracking_code: "",
  //     carrier: "AmazonMws"
  //   });
  //   // console.log(tracker);
  //   tracker.save().then(console.log);
  // });

  // app.get("/tracking/fedex/:id", (req, res) => {
  //   axios.get(
  //     "https://wsbeta.fedex.com:443/web-services?Password=zhVDJKpYBtglaJX3HII6NcdUs&?AccountNumber=510087720",
  //     (reap, steap) => {
  //       console.log(steap);
  //     }
  //   );
  // });
};
