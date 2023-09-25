import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-filter',
  templateUrl: './video-filter.component.html',
  styleUrls: ['./video-filter.component.scss'],
})
export class VideoFilterComponent  implements OnInit {

  @Input() categories: string[]; // Список доступных категорий
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string;

  constructor() {
    this.categories = []; // Initialize categories as an empty array
    this.selectedCategory = ''; // Initialize selectedCategory as an empty string
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    console.log('this.selectedCategory', this.selectedCategory);
    this.categorySelected.emit(category);
  }
  ngOnInit() {}

}
