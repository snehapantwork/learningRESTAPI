export enum FetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type HolidayData = {
  location: string;
  departureDate: Date;
  duration: number;
  holidays: Array<any>;
  partyCompositions: Array<any>;
};
