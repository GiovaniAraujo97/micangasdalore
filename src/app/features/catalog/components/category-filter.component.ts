import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent {
  @Input({ required: true }) categories: string[] = [];
  @Input() selected = 'Todas';
  @Output() selectedChange = new EventEmitter<string>();

  select(category: string): void {
    this.selectedChange.emit(category);
  }
}
