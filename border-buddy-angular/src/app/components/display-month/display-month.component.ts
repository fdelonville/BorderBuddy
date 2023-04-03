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

  form: FormGroup
  constructor(private readonly monthService : MonthService){
    this.form = new FormGroup({
      'date': new FormControl()
    })
  }

  getMonth(date: string): void{
    this.loading = true
    this.error = true
    this.monthService.getOne(date).subscribe(
      {next:(m:Month) => {
          this.month = m
          this.month.days.sort((a,b) => (a.id > b.id) ? 1 : -1)
          this.loading = false
          this.error = false
        },
        error:()=>{
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
