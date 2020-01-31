import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShapeshiftPage } from './shapeshift';

@NgModule({
  declarations: [
    ShapeshiftPage,
  ],
  imports: [
    IonicPageModule.forChild(ShapeshiftPage),
  ],
  exports: [
    ShapeshiftPage
  ]
})
export class ShapeshiftModule { }
