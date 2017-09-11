import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const avatars = [
  'assets/image/img0.jpg',
  'assets/image/img1.jpg',
  'assets/image/img2.jpg',
  'assets/image/img3.jpg',
  'assets/image/img4.jpg',
  'assets/image/img5.jpg',
  'assets/image/img6.jpg',
  'assets/image/img7.jpg'
];
const mottos = [
  '绅士是不会偷女王的王冠的！',
  '做个坏蛋感觉简直太好了！',
  '兄弟有难，奋不顾身！',
  '别看我疯疯颠颠，其实我也会伤心，我也会不高兴，我也会失落。',
  '对于这个看脸的世界失望了。',
  '我们要永远永远在一起，不分离。即使你变了，我也会陪伴你，让你回到从前。',
  '难道我的演讲没有激发你们证明自己的斗志吗？',
  '即使不快乐，也要记得哈哈大笑。'
];

/*
  Generated class for the MockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockProvider {

  constructor(public http: Http) {
    console.log('Hello MockProvider Provider');
  }

  getAvatars() {
    return avatars;
  }

  getMottos() {
    return mottos;
  }

}
