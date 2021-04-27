import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/_service/home/category/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private formBuild: FormBuilder
  ) { }

  ListCategoryActive;
  ListCategoryDetailActive = [];
  formSearch: FormGroup;

  listCategoryandCateDetail = [
    {
      categoryName: '',
      categoryDetail: []
    }
  ]
  ngOnInit(): void {
    this.getAllcategoryActive();

    

    this.formSearch = this.formBuild.group({
      search: [''],
      price: [0]
    })
  }

  getAllcategoryActive() {
    this.category.getAllcategoryActive().subscribe(
      data => {
        this.ListCategoryActive = data;
        for (let i = 0; i < this.ListCategoryActive.length; i++) {

          this.category.getAllcategoryDetailByCategoryID(this.ListCategoryActive[i].cate_id).subscribe(
            data => {
              this.ListCategoryDetailActive[i] = data;
              this.listCategoryandCateDetail.push(
                {
                  categoryName: this.ListCategoryActive[i].cate_name,
                  categoryDetail: this.ListCategoryDetailActive[i]
                }
              )
            }
          )
        }

      }
    )
  }

}
