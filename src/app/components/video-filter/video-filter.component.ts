import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-filter',
  templateUrl: './video-filter.component.html',
  styleUrls: ['./video-filter.component.scss'],
})
export class VideoFilterComponent  implements OnInit {

  @Input() categories: string[]; 
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string;

  constructor() {
    this.categories = []; 
    this.selectedCategory = ''; 
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    console.log('this.selectedCategory', this.selectedCategory);
    this.categorySelected.emit(category);
  }
  ngOnInit() {}

}
