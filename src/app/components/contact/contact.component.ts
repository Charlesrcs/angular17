import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  contactForm: FormGroup;
  postFlag:boolean=true;
  editFlag:boolean=false;
  user_id!:number;
  showNotification: boolean = false;
  notificationMessage: string = '';
  show:number=0;
  getApi = "https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile";
  records: any;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.contactForm = this.fb.group({
      createdAt: [new Date().toISOString().split('T')[0], Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      gender: ['Male', Validators.required],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pan_no: ['', Validators.required],
      adhaar_no: ['', Validators.required],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.getApiMethod();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this._http.post(`${this.getApi}`,this.contactForm.value).subscribe({
        next: (res) => {
          this.getApiMethod();
          this.showSuccess('Insert Data Successfully');
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
      console.log('Form Submitted:', this.contactForm.value);
    }
  }

  getApiMethod(): void {
    this._http.get(this.getApi).subscribe({
      next: (res) => {
        this.records=res;
        this.postFlag=true;
        this.editFlag=false;
        this.contactForm.reset();
       if(this.show==0){
        this.showSuccess('Fetch Data Successfully');
        this.show=1;
      }
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getByIdMethod(){

  }
  putApiMethod(){
    this._http.put(`${this.getApi}/${this.user_id}`,this.contactForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getApiMethod();
        this.showSuccess('Update Data Successfully');
      },
      error: (err) => {
        console.error(err);
      }
    });
   
  }
  editRecord(id: number) {
    this.postFlag=false;
    this.editFlag=true;
    this.user_id=id;
    const record = this.records.find((r: { id: number; }) => r.id === id);
    if (record) {
      this.contactForm.patchValue({
        createdAt: record.createdAt,
        first_name: record.first_name,
        last_name: record.last_name,
        emailId: record.emailId,
        age: record.age,
        gender: record.gender,
        mobilenumber: record.mobilenumber,
        pan_no: record.pan_no,
        adhaar_no: record.adhaar_no,
        status: record.status
      });
    }
  }
  
  deleteApiMethod(user_id:number){
    this._http.delete(`${this.getApi}/${user_id}`).subscribe({
      next: (res) => {
        console.log(res);
        this.getApiMethod();
        this.showSuccess('Delete Data Successfully');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  showSuccess(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
