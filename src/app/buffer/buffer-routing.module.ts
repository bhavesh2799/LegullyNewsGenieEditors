import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BufferPage } from './buffer.page';

const routes: Routes = [
  {
    path: '',
    component: BufferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BufferPageRoutingModule {}
