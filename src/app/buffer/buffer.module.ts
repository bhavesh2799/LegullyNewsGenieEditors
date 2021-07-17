import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { BufferPageRoutingModule } from './buffer-routing.module';

import { BufferPage } from './buffer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    BufferPageRoutingModule
  ],
  declarations: [BufferPage]
})
export class BufferPageModule {}
