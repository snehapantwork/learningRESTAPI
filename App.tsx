import React from "react";
import "./App.css";
import { useGetSearchResult } from "./hooks/api-hooks-results";
import Search from "./components/search/Search";

import { FetchState, HolidayData } from "./types";

function App() {
  const [holidayData, fetchresultState, getResult] = useGetSearchResult();
  const searchedResult: Array<any> = [];
  return (
    <div className="container">
      <h1>List of Holidays</h1>
      {fetchresultState === FetchState.DEFAULT && (
        <>
          <p>Hello! Click below button to get the list of holidays</p>
          <button onClick={getResult}>Get List of Holidays ✈ </button>
          <Search />
        </>
      )}
      {fetchresultState === FetchState.LOADING && <p>Fetching data...</p>}
      {fetchresultState === FetchState.ERROR && (
        <>
          <p>Opps!! Something went wrong. Please try again.</p>
          <button onClick={getResult}>Get List of Holidays</button>
        </>
      )}

      {fetchresultState === FetchState.SUCCESS && (
        <>
          <ul className="lists">
            {holidayData.map((data, key) => (
              <li key={key} className="result">
                <h2>Location: {data.location} ⛱ </h2>
                {/* FLIGHT INFO*/}
                <div className="flight-info">
                  <div className="date-time">
                    <p>Departure Date: {data.departureDate}</p>
                    <p>Duration: {data.duration} hrs</p>
                  </div>
                  <div className="passenger-info">
                    {data.partyCompositions.forEach((item) => {
                      searchedResult.push({
                        adults: item.adults,
                        infants: item.infants,
                      });
                    })}
                    <p>Adults: {searchedResult[0].adults}</p>
                    <p>Infants: {searchedResult[0].infants}</p>
                  </div>
                </div>
                {/* HOLIDAY INFO*/}
                {data.holidays.forEach((item) => {
                  searchedResult.push({
                    totalPrice: item.totalPrice,
                    pricePerPerson: item.pricePerPerson,
                    hotel: item.hotel,
                  });
                })}
                <div className="holiday-info">
                  <h3>Price Details</h3>
                  <div className="price-info">
                    <div className="total-price">
                      <p>Total Price: £{searchedResult[1].totalPrice}</p>
                    </div>
                    <div className="price-per-person">
                      <p>
                        Price per person: £{searchedResult[1].pricePerPerson}
                      </p>
                    </div>
                  </div>
                  <h3>Hotel Details</h3>
                  <div className="hotel-details-container">
                    <div className="hotel-details-container1">
                      <p>Name: {searchedResult[1].hotel.name}</p>
                      <p>Rating: {searchedResult[1].hotel.content.vRating}</p>
                    </div>
                    <div className="hotel-details-container1">
                      <p>
                        Location:{" "}
                        {searchedResult[1].hotel.content.parentLocation}
                      </p>
                      <p>
                        Facilities:
                        {searchedResult[1].hotel.content.atAGlance[0]}
                      </p>
                    </div>
                  </div>
                  <div className="hotel-images">
                    <img
                      src={`https:${searchedResult[1].hotel.content.images[0].RESULTS_CAROUSEL.url}`}
                      className="photos"
                    ></img>
                    <p>
                      Description:{" "}
                      {searchedResult[1].hotel.content.hotelDescription}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
