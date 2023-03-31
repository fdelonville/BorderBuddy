import {Component, OnInit} from '@angular/core';
import {MonthService} from "../../services/month.service";
import {Month} from "../../models/month.model";

@Component({
  selector: 'app-display-month',
  templateUrl: './display-month.component.html',
  styleUrls: ['./display-month.component.scss']
})
export class DisplayMonthComponent implements OnInit {

  month!: Month
  constructor(private readonly monthService : MonthService){}

  ngOnInit(): void {
    this.monthService.getCurrent().subscribe(
      {next:(m:Month) => {
          this.month = m
        }
      }
    )
  }

}
