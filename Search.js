import React, { useState } from "react";
import getHolidaysService from "./getHolidaysService";
// https://www.virginholidays.co.uk/cjs-search-api/search
export default function Search() {
  const [returnData, setReturnData] = useState(null);
  const [isFutureDate, setIsFutureDate] = useState(true);

  const cities = ["New York", "Orlando", "Barbados", "Toranto"];
  let currentDateTime = new Date();

  function checkDateField() {
    let dateValue = document.getElementById("input-date");
    let checkDateValue = new Date(dateValue.value);
    if (checkDateValue < currentDateTime) {
      setIsFutureDate(false);
    }
  }
  function getHolidays(event) {
    event.preventDefault();
    setReturnData(null);
    let locationName = event.target[0].value.toLowerCase();
    let dateValue = document.getElementById("input-date");
    let checkDateValue = new Date(dateValue.value);
    console.log(checkDateValue);
    if (isFutureDate) {
      getHolidaysService(locationName, checkDateValue)
        .then((data) => {
          console.log("data", data);
          setReturnData(data);
          console.log(returnData);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }
  return (
    <div>
      <form onSubmit={getHolidays}>
        <label htmlFor="city">City:</label>
        <select id="city">
          {cities.map((currentCity, curInd) => (
            <option key={curInd} value={currentCity}>
              {currentCity}
            </option>
          ))}
        </select>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="input-date"
          name="input-date"
          placeholder="dd-mm-yyyy"
          min={currentDateTime}
          onChange={checkDateField}
          required
        />
        {!isFutureDate && <span>Date is Incorrect!</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
