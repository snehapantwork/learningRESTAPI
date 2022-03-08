import axios from "axios";
export default function getHolidaysService(locationName, checkDateValue) {
  const URL = "https://dummyapis.com/account/update-api/uwculz5/";
  // https://dummyapis.com/account/update-api/uwculz5/
  const postObject = {
    bookingType: "hotel",
    location: `${locationName}`,
    departureDate: `${checkDateValue
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")}`,
    duration: "7",
    partyCompositions: [
      {
        adults: 2,
        childAges: [],
        infants: 0,
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    // mode: "no-cors",

    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(postObject),
  };

  return fetch(URL, requestOptions)
    .then((response) => {
      console.log(response.data);
      return response.json();
    })
    .then((currData) => {
      return currData;
    })
    .catch((err) => {
      console.log(err);
    });
}
