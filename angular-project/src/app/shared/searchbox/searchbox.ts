import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbox',
  imports: [FormsModule],
  templateUrl: './searchbox.html',
  styleUrl: './searchbox.css',
})
export class Searchbox {
  searchCategory = 'title';
  searchQuery = '';
  @Output() searchEvent = new EventEmitter<{
    category: string;
    query: string;
  }>();

  onSearch(query?: string) {
    const q = (query ?? this.searchQuery).trim();
    if (!q) return;
    this.searchEvent.emit({ category: this.searchCategory, query: q });
  }
}
