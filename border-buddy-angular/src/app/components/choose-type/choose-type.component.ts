import {Component, OnDestroy, OnInit} from '@angular/core';
import {DayService} from "../../services/day.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {parseEnum} from "@angular/compiler-cli/linker/src/file_linker/partial_linkers/util";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.scss']
})
export class ChooseTypeComponent implements OnInit, OnDestroy {
  form: FormGroup
  types!: string[]
  assignType!: Subscription
  getType!: Subscription

  constructor(private readonly dayService: DayService){
    this.form = new FormGroup({
      'startDate' : new FormControl('',Validators.required),
      'endDate' : new FormControl('',Validators.required),
      'type': new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.getType = this.dayService.getAllTypes().subscribe(
      {next:(t:any)=>{
        this.types=t
        enum Type{}
      }}
    )
  }

  onSubmit() {
    if(this.form.valid){
      this.assignType = this.dayService.assignType(this.form.value).subscribe({next:()=> {
        this.form.reset()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getType.unsubscribe()
    if(this.assignType) {
      this.assignType.unsubscribe()
    }
  }
}
