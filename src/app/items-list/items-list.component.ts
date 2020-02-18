import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  constructor(public itemService: ItemsService) { }

  itemsArray = [];
  showDeleteMessage: boolean;
  searchText = '';

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      list => {
        this.itemsArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
  onDelete($key){
    if(confirm('Are you sure to delete this item?')){
      this.itemService.deleteItem($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 3500);
    }
  }

  filterCondition(item){
    return item.type.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

}
