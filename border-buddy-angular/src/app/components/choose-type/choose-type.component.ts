import {Component, OnInit} from '@angular/core';
import {DayService} from "../../services/day.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AssignTypeForm} from "../../models/assign-type.form";

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.scss']
})
export class ChooseTypeComponent implements OnInit {
  form: FormGroup
  types!: string[]

  constructor(private readonly dayService: DayService){
    this.form = new FormGroup({
      'startDate' : new FormControl('',Validators.required),
      'endDate' : new FormControl('',Validators.required),
      'type': new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.dayService.getAllTypes().subscribe(
      {next:(t:any)=>this.types=t}
    )
  }

  onSubmit() {
    if(this.form.valid){
      let assignForm : AssignTypeForm
      this.dayService.assignType(this.form).subscribe({next:()=> {
        this.form.reset()
        console.log('ok')
        }
      })
    }
  }
}