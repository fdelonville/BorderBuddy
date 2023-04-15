import {Day} from "./day.model";

export class Justificatif{
   id!: number

   fileURL!: string

   startDate!: Date

   endDate!: Date

   daysCovered!: Day[]
}
