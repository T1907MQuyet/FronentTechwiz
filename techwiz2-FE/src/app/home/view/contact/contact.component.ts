import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/_service/home/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  alert = false;
  clickisDis = false;
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.formfeedBackFuntion();
  }

  formFeedback:FormGroup;
  formfeedBackFuntion() {
    this.formFeedback = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-z ]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      content: ['', [Validators.required]],
    })
  }

  get formFeedbackF() { return this.formFeedback.controls; }

  onSubmit(val) {
    if(this.formFeedback.status != 'INVALID') {
      let data = {
        "fullname": val.fullname,
        "email": val.email,
        "phonenumber": val.phonenumber,
        "content": val.content
      }

      this.contactService.postFeedback(data).subscribe(
        () => {
          this.alert = true;
        }
      )
    }

    else {

      this.formFeedbackF.fullname.errors.required = true;
      this.formFeedbackF.email.errors.required = true;
      this.formFeedbackF.phonenumber.errors.required = true;
      this.formFeedbackF.content.errors.required = true;
      this.clickisDis = true;
    }
  }

}
