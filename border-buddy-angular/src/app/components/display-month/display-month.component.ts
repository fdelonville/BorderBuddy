import {Component, OnInit} from '@angular/core';
import {MonthService} from "../../services/month.service";
import {Month} from "../../models/month.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Day} from "../../models/day.model";
import {DayService} from "../../services/day.service";

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
  emptyBeginning: string[] = []
  weeks: Day[][] = []
  clickedDate1?: Date
  clickedDate2?: Date
  types!: string[]
  monthForm: FormGroup
  typeForm: FormGroup

  constructor(private readonly monthService : MonthService, private readonly dayService : DayService){
    this.monthForm = new FormGroup({
      'date': new FormControl()
    })
    this.typeForm = new FormGroup({
      'startDate': new FormControl(),
      'endDate': new FormControl(),
      'type': new FormControl('',Validators.required)
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
      this.month.days[dayIndex].selected = false
      this.weeks[1].push(this.month.days[dayIndex])
      dayIndex++
    }
    for(let i: number = 2; i < 7; i++){
      this.weeks[i] = []
      for(let j: number = 0; j < 7 && dayIndex < this.month.days.length; j++){
        this.month.days[dayIndex].selected = false
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
    this.dayService.getAllTypes().subscribe(
      {next:(t:any)=>this.types=t}
    )
  }

  onSubmitMonth() {
    this.getMonth(this.monthForm.get('date')?.value)
  }

  onClick(day: Day) {
      if (this.clickedDate1 == undefined) {
        this.clickedDate1 = day.dayDate
        day.selected = true
      }
      else if (this.clickedDate2 == undefined) {
        this.clickedDate2 = day.dayDate
        day.selected = true
      }
      else{
        this.clickedDate1 = undefined
        this.clickedDate2 = undefined
        this.month.days.forEach(day => day.selected = false)
      }
  }

  onSubmitType() {
    if(this.typeForm.valid && this.clickedDate1){
      if(!this.clickedDate2) this.clickedDate2 = this.clickedDate1
      this.typeForm.patchValue({
        'startDate': this.clickedDate1,
        'endDate': this.clickedDate2
      })
      this.dayService.assignType(this.typeForm.value).subscribe({next:()=> {
          this.typeForm.reset()
          this.getMonth(new Date(this.month.startDate).toISOString().substring(0,10))
          this.clickedDate1 = undefined
          this.clickedDate2 = undefined
        }
      })
    }
  }
}
