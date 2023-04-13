import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonthService} from "../../services/month.service";
import {Month} from "../../models/month.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Day} from "../../models/day.model";
import {DayService} from "../../services/day.service";
import {Subscription} from "rxjs";
import {UploadService} from "../../services/upload.service";
import {FileDetails} from "../../models/file-details.model";

@Component({
  selector: 'app-display-month',
  templateUrl: './display-month.component.html',
  styleUrls: ['./display-month.component.scss']
})
export class DisplayMonthComponent implements OnInit, OnDestroy {

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
  subscriptions: Subscription[] = []
  file!: File
  fileDetails!: FileDetails
  fileUris: Array<string> = []

  constructor(private readonly monthService : MonthService, private readonly dayService : DayService, private readonly uploadService: UploadService){
    this.monthForm = new FormGroup({
      'date': new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(7)])
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

  createAndDisplayPeriod(year: string): void{
    let firstDay: string = year + "-01-01"
    let lastDay: string = year + "-12-31"
    let createMonthSub: Subscription = this.monthService.createPeriod(firstDay, lastDay).subscribe({
      next:()=> {
        if(!this.monthForm.get('date')?.value){
          console.log('')
          this.ngOnInit()
        }
        else this.onSubmitMonth()
      },
      error:() => {
        this.loading = false
        this.error = true
      }
    })
    this.subscriptions.push(createMonthSub)
  }

  getMonth(date: string): void{
    this.loading = true
    this.error = true
    this.emptyBeginning = []
    let getMonthSub: Subscription = this.monthService.getOne(date).subscribe(
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
          this.createAndDisplayPeriod(date.substring(0, 4))
        }
      }
    )
    this.subscriptions.push(getMonthSub)
  }


  ngOnInit(): void {
    this.getMonth(this.today)
    let getTypeSub: Subscription = this.dayService.getAllTypes().subscribe(
      {next:(t:any)=>this.types=t}
    )
    this.subscriptions.push(getTypeSub)
  }

  onSubmitMonth() {
    if(this.monthForm.valid) {
      this.weeks = []
      let date: string = this.monthForm.get('date')?.value
      date += "-01"
      this.getMonth(date)
    }
  }

  onClick(day: Day) {
      if (this.clickedDate1 == undefined) {
        this.clickedDate1 = day.dayDate
        day.selected = true
      }
      else if(this.clickedDate1 == day.dayDate && this.clickedDate2 == undefined){
        this.clickedDate1 = undefined
        day.selected = false
      }
      else if (this.clickedDate2 == undefined) {
        this.clickedDate2 = day.dayDate
        day.selected = true
        if(this.clickedDate1 > this.clickedDate2){
          let tempDate : Date = this.clickedDate1
          this.clickedDate1 = this.clickedDate2
          this.clickedDate2 = tempDate
        }
        this.month.days.forEach(d => {
          if(this.clickedDate1 && this.clickedDate2 && (d.dayDate > this.clickedDate1 && d.dayDate < this.clickedDate2)) d.selected = true
        })
      }
      else{
        this.clickedDate1 = undefined
        this.clickedDate2 = undefined
        this.month.days.forEach(d => d.selected = false)
      }
  }

  onSubmitType() {
    if(this.typeForm.valid && this.clickedDate1){
      if(!this.clickedDate2) this.clickedDate2 = this.clickedDate1
      this.typeForm.patchValue({
        'startDate': this.clickedDate1,
        'endDate': this.clickedDate2
      })
      let setTypeSub: Subscription = this.dayService.assignType(this.typeForm.value).subscribe({next:()=> {
          if(this.file){
            let uploadFileSub: Subscription = this.uploadService.upload(this.file).subscribe({
              next: (data) => {
                this.fileDetails = data
                this.fileUris.push(this.fileDetails.fileUri)
                let date1: string = (this.clickedDate1 ? new Date(this.clickedDate1).toISOString().substring(0,10) : '')
                let date2: string = (this.clickedDate2 ? new Date(this.clickedDate2).toISOString().substring(0,10) : date1)
                if(this.clickedDate1 && !this.clickedDate2){
                  this.clickedDate2 = this.clickedDate1
                  date2 = this.clickedDate2.toISOString().substring(0,10)
                }

                let saveFileToDBSub: Subscription = this.uploadService.save(date1, date2, this.fileUris[0]).subscribe({
                  next: () => {
                    alert("Fichier ajouté avec succès")
                    this.typeForm.reset()
                    this.getMonth(new Date(this.month.startDate).toISOString().substring(0,10))
                    this.clickedDate1 = undefined
                    this.clickedDate2 = undefined
                  }
                })
                this.subscriptions.push(saveFileToDBSub)
              },
              error: (e) => {
                console.log(e)
              }
            })
            this.subscriptions.push(uploadFileSub)
          }
        }
      })
      this.subscriptions.push(setTypeSub)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=> sub.unsubscribe())
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0)
  }
}
