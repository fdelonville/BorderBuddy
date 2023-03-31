import {Day} from "./day.model";

export type Month = {
  id : number,
  startDate : Date,
  endDate : Date,
  days : Day[]
}
