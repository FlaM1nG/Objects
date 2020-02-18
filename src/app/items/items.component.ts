import { Component, OnInit } from '@angular/core';
import { ItemsService} from '../shared/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public itemsService: ItemsService) { }
  submitted: boolean;
  showSuccessInsert: boolean;
  showSuccessUpdate: boolean;
  formControls = this.itemsService.form.controls;
  itemsArray = [];
  disabled = true;
  ngOnInit(): void {
    if (this.itemsService.getItems()) {
      this.disabled = true;
    }
    this.itemsService.getItems().subscribe(
      list => {
        this.itemsArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
  onSubmit(){
    this.submitted = true;
    if (this.itemsService.form.valid){
      if (this.itemsService.form.get('$key').value == null){
      this.itemsService.insertItems(this.itemsService.form.value);
      this.showSuccessInsert = true;
      setTimeout(() => this.showSuccessInsert = false, 3500);
      } else {
      this.itemsService.updateItem(this.itemsService.form.value);
      this.showSuccessUpdate = true;
      setTimeout(() => this.showSuccessUpdate = false, 3500);
      }
      this.disabled = false;
      this.submitted = false;
      this.itemsService.form.reset();
    }
    }
  }
