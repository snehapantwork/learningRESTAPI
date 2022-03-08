import { useState } from "react";
import axios from "axios";
import { FetchState, HolidayData } from "../types";

export function useGetSearchResult() {
  const [fetchresultState, setFetchResultState] = useState(FetchState.DEFAULT);
  const [holidayData, setHolidayData] = useState<Array<HolidayData>>([]);

  const getResult = async () => {
    try {
      setFetchResultState(FetchState.LOADING);
      const response = await axios.get("https://hub.dummyapis.com/vj/uwCULz5");
      const responseData = response.data as Array<HolidayData>;
      setHolidayData(responseData);
      setFetchResultState(FetchState.SUCCESS);
      console.log(responseData);
    } catch (error) {
      setFetchResultState(FetchState.ERROR);
    }
  };
  return [holidayData, fetchresultState, getResult] as const;
}
