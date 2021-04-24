import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/home/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private category: CategoryService
  ) { }

  ListCategoryActive;
  ListCategoryDetailActive = [];

  listCategoryandCateDetail = [
    {
      categoryName: '',
      categoryDetail: []
    }
  ]
  ngOnInit(): void {
    this.getAllcategoryActive();
  }

  getAllcategoryActive() {
    this.category.getAllcategoryActive().subscribe(
      data => {
        this.ListCategoryActive = data;
        for (let i = 0; i < this.ListCategoryActive.length; i++) {
          // console.log(this.ListCategoryActive[i].cate_id);

          this.category.getAllcategoryDetailByCategoryID(this.ListCategoryActive[i].cate_id).subscribe(
            data => {
              // this.ListCategoryDetailActive[i] = data;
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

  // getAllcategoryDetailByCategoryID(id) {
  //   this.category.getAllcategoryDetailByCategoryID(id).subscribe(
  //     data => {
  //       this.ListCategoryDetailActive = data;
  //       console.log(data);
  //     }
  //   )
  // }
}
