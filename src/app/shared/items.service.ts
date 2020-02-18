import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public firebase: AngularFireDatabase) { }
  itemList: AngularFireList<any>;
  form = new FormGroup({
    $key: new FormControl(null),
    type: new FormControl('', Validators.required),
    name: new FormControl ('', Validators.required),
    description: new FormControl (''),
    relationship: new FormControl ('')
  });

  getItems(){
    this.itemList = this.firebase.list('items');
    return this.itemList.snapshotChanges();
  }
  insertItems(item){
    this.itemList.push({
      type: item.type,
      name: item.name,
      description: item.description,
      relationship: item.relationship
    });
  }
  focusForm(item){
    this.form.setValue(item);
  }
  updateItem(item){
    this.itemList.update(item.$key,
      {
      type: item.type,
      name: item.name,
      description: item.description,
      relationship: item.relationship
      });
  }
  deleteItem($key: string){
    this.itemList.remove($key);
  }
}
