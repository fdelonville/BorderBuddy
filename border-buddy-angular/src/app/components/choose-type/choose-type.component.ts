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
  errorMessage?: string
  username = sessionStorage.getItem('username')
  login = (this.username ? this.username : '')

  constructor(private readonly dayService: DayService){
    this.form = new FormGroup({
      'startDate' : new FormControl('',Validators.required),
      'endDate' : new FormControl('',Validators.required),
      'type': new FormControl('',Validators.required),
      'login': new FormControl()
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
      this.form.patchValue({'login':this.login})
      this.assignType = this.dayService.assignType(this.form.value).subscribe({next:()=> {
          this.form.reset()
          this.errorMessage = undefined
        },
        error: () => this.errorMessage = "Erreur : le type n'a pas pu être modifié."
      })
    }
    else this.errorMessage = "Tous les champs doivent être remplis."
  }

  ngOnDestroy(): void {
    this.getType.unsubscribe()
    if(this.assignType) {
      this.assignType.unsubscribe()
    }
  }
}
