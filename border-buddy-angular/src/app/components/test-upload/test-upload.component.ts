import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {FileDetails} from "../../models/file-details.model";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent{

  file!: File
  fileDetails!: FileDetails
  fileUris: Array<string> = []
  form: FormGroup


  constructor(private uploadService : UploadService) {
    this.form = new FormGroup({
      'date1' : new FormControl('', Validators.required),
      'date2' : new FormControl('', Validators.required)
    })
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0)
  }

  uploadFile() {
    if (this.form.valid && this.file) {
      this.uploadService.upload(this.file).subscribe({
        next: (data) => {
          this.fileDetails = data
          this.fileUris.push(this.fileDetails.fileUri)
          let startDate: string = this.form.get('date1')?.value
          let endDate: string = this.form.get('date2')?.value
          this.uploadService.save(startDate, endDate, this.fileUris[0]).subscribe({
            next: () => {
              alert("Fichier ajouté avec succès")
            }
          })
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }
}
