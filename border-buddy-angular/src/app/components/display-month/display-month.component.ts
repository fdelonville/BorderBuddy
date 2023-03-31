import {Component, OnInit} from '@angular/core';
import {MonthService} from "../../services/month.service";
import {Month} from "../../models/month.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-display-month',
  templateUrl: './display-month.component.html',
  styleUrls: ['./display-month.component.scss']
})
export class DisplayMonthComponent implements OnInit {

  month!: Month
  loading!: boolean
  error!: boolean

  form: FormGroup
  constructor(private readonly monthService : MonthService){
    this.form = new FormGroup({
      'date': new FormControl()
    })
  }

  ngOnInit(): void {
    this.loading = true
    this.error = true
    // let newDate = new Date(Date.now())
    // console.log(newDate.toISOString().substring(0,10))
    this.monthService.getCurrent().subscribe(
      {next:(m:Month) => {
          this.month = m
          this.month.days.sort((a,b) => (a.id > b.id) ? 1 : -1)
          this.loading = false
          this.error = false
        }
      }
    )
  }

  onSubmit() {
    this.loading = true
    this.error = true
    this.monthService.getOne(this.form.get('date')?.value).subscribe(
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
}
