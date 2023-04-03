import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MonthService} from "../../services/month.service";

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.scss']
})
export class CreatePeriodComponent {
  form: FormGroup
  startDate!: string
  endDate!: string

  constructor(private readonly monthService : MonthService) {
    this.form = new FormGroup({
      'startDate' : new FormControl(),
      'endDate' : new FormControl()
    })
  }

  onSubmit() {
    this.startDate = this.form.get('startDate')?.value
    this.endDate = this.form.get('endDate')?.value
    this.monthService.createPeriod(this.startDate,this.endDate)
      .subscribe(
        {next: () => this.form.reset()}
      )
  }
}
