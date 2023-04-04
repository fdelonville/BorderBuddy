import {Component, OnInit} from '@angular/core';
import {MonthService} from "../../services/month.service";
import {Month} from "../../models/month.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Day} from "../../models/day.model";

@Component({
  selector: 'app-display-month',
  templateUrl: './display-month.component.html',
  styleUrls: ['./display-month.component.scss']
})
export class DisplayMonthComponent implements OnInit {

  month!: Month
  loading!: boolean
  error!: boolean
  today: string = new Date(Date.now()).toISOString().substring(0,10)
  startPosition!: number
  clicked: boolean = false
  emptyBeginning: string[] = []
  weeks: Day[][] = []

  form: FormGroup
  constructor(private readonly monthService : MonthService){
    this.form = new FormGroup({
      'date': new FormControl()
    })
  }

  splitMonth(): void{
    let dayIndex: number = 0
    for(let i: number = 1; i < this.startPosition; i++){
      let emptyDay: string = ''
      this.emptyBeginning.push(emptyDay)
    }
    this.weeks[1] = []
    for(let i: number = this.startPosition; i <= 7; i++){
      this.weeks[1].push(this.month.days[dayIndex])
      dayIndex++
    }
    for(let i: number = 2; i < 7; i++){
      this.weeks[i] = []
      for(let j: number = 0; j < 7 && dayIndex < this.month.days.length; j++){
        this.weeks[i].push(this.month.days[dayIndex])
        dayIndex++
      }
      if(dayIndex >= this.month.days.length) break
    }
  }

  getMonth(date: string): void{
    this.loading = true
    this.error = true
    this.emptyBeginning = []
    this.monthService.getOne(date).subscribe(
      {next:(m:Month) => {
          this.month = m
          this.month.days.sort((a,b) => (a.id > b.id) ? 1 : -1)
          const startDate = new Date(this.month.startDate)
          this.startPosition = startDate.getDay()
          if(this.startPosition === 0) this.startPosition = 7
          this.splitMonth()
          this.loading = false
          this.error = false
        },
        error:()=> {
          this.loading = false
          this.error = true
        }
      }
    )
  }


  ngOnInit(): void {
    this.getMonth(this.today)
  }

  onSubmit() {
    this.getMonth(this.form.get('date')?.value)
  }

  onClick(date: Date) {
    let date1!: Date
    let date2!: Date
    if(!this.clicked){
      date1 = date
      this.clicked = true
    }
    else{
      date2 = date
      console.log (date1)
      console.log (date2)
      this.clicked = false
    }
  }
}
