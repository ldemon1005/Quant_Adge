import { Component } from '@angular/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  _data : any = [];
  list_data : any = [];
  table : any = 0;
  constructor(){
    this.gen_data();
    setInterval(_=>{
      this.change_data();
    },5000);
  }
  tabChange($even){
    this.table = $even.index;
      setTimeout(_=>{
          this.sort_data(this.table);
      })
  }


  gen_data(){
    let value : any = {};
    for (let i = 0;i < 30;i++) {
        value.code = Math.random().toString(36).substr(2, 5).toUpperCase() + "." + Math.random().toString(36).substr(2, 2).toUpperCase();
        value.company = Math.random().toString(36).substr(2, 9).toUpperCase();
        value.price = (Math.random()*(99.99-0.01) + 0.01).toFixed(2);
        value.volume = Math.floor(Math.random()*10000000 + 100);
        value.value = Math.ceil(value.price*value.volume);
        value.change = 0;
        value._change = 0;
        let _value = Object.assign({},value);
        this._data.push(_value);
        setTimeout(_=>{
            this.sort_data(this.table);
        })
    }
  }
  change_data(){
    this._data.filter(x=>{
      let new_price : any = 0;
      new_price = (Math.random()*(x.price*1.05 - x.price*0.95) + x.price*0.95).toFixed(2);
      x.volume = x.volume + Math.ceil(Math.random()*(20) + 10);
      x.value = Math.ceil(new_price*x.volume);
      x.change = (new_price - x.price).toFixed(2);
      x._change = ((new_price - x.price)*100/x.price).toFixed(2);
      if(x.price > new_price) x.change_type = 1;
      else x.change_type = 2;
      x.price = new_price;
    });
    setTimeout(_=>{
        this.sort_data(this.table);
    })
  }
  sort_data(type){
    if(type == 0){
        this._data.sort(function(a, b){return a.value - b.value});
    }else {
        this._data.sort(function(a, b){return b.value - a.value});
    }
    this.list_data = this._data.slice(0,19)
  }
}
