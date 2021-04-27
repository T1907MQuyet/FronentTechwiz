import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/_model/User';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';
import { OrderService } from 'src/app/_service/home/order/order.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  ListCategoryActive;
  ListCategoryDetailActive = [];
  isLogin = false;

  listCategoryandCateDetail = [];
  PhotoFilePath;
  userInfor;
  ngOnInit(): void {
    let idUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser'))).value.customer_id;

    this.authentication.getUserById(idUser).subscribe(
      data => {
        this.isLogin = true;
        let contain = data;

        this.userInfor = contain; console.log(this.userInfor);
        this.GetDataEditorAdd();

      }
    )

    this.formGroupFucntion();
  }
  formUserUpgrade: FormGroup;
  formGroupFucntion() {
    this.formUserUpgrade = this.formBuilder.group({
      customer_id: [''],
      username: [''],
      address: [''],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      email: ['']
    });
  }
  get phonenumber() { return this.formUserUpgrade.get('phonenumber'); }

  upgradeInfor(val) {
    console.log(val);

    let data = {
      "customer_id": val.customer_id,
      "address": val.address,
      "phonenumber": val.phonenumber
    }

    this.authentication.upgradeInfor(data).subscribe(
      data => {
        window.location.reload();
      }
    )

  }

  uploadPhoto(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    if (event.target.files) { // Check File true : false
      var reader = new FileReader(); // DOM
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.PhotoFilePath = event.target.result;
      }
    }

    this.authentication.UploadPhoto(formData).subscribe((data: any) => {
    })
  }

  GetDataEditorAdd() {
    this.formUserUpgrade.controls.customer_id.patchValue(this.userInfor.customer_id);

    this.formUserUpgrade.controls.username.patchValue(this.userInfor.username);

    this.formUserUpgrade.controls.address.patchValue(this.userInfor.address);
    this.formUserUpgrade.controls.phonenumber.patchValue(this.userInfor.phonenumber);
    this.formUserUpgrade.controls.email.patchValue(this.userInfor.email);
  }


}