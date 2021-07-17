import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.page.html',
  styleUrls: ['./buffer.page.scss'],
})
export class BufferPage implements OnInit {
  userData:any = [];userinfo='';

  constructor(private loadingCtrl:LoadingController,private afs:AngularFirestore,
    private toastr:ToastController,private router:Router,private http:HttpClient,
    private storage:AngularFireStorage) {
      this.isEditorFn(atob(window.location.href.split('/buffer/')[1].split('%3D')[0]).split('randomNameByMe')[0]);
      this.userData.isAdmin=atob(window.location.href.split('/buffer/')[1].split('%3D')[0]).split('randomNameByMe')[0];

      this.userData.email=atob(window.location.href.split('/buffer/')[1].split('%3D')[0]).split('randomNameByMe')[1];
      this.userData.password=atob(window.location.href.split('/buffer/')[1].split('%3D')[0]).split('randomNameByMe')[2];
      this.userData.name=atob(window.location.href.split('/buffer/')[1].split('%3D')[0]).split('randomNameByMe')[3];

     
      this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name;

     }
 
     isEditorFn(val){
      if(val != "true"){
        this.router.navigateByUrl('/login');

      }

 
}
ngOnInit() {
}
interests :any = [
  {'id':1,'val':'IT'},
  {'id':2,'val':'GST TAX'},
  {'id':3,'val':'MCA'},
  {'id':4,'val':'EPF'},
  {'id':5,'val':'GST AAR'}
];
interest:any = [];
articles : any = [];
article:any = [];
showCard = false;
showArticles = false;

  async interestChange(event: {
  component: IonicSelectableComponent,
  value: any
}) {
  console.log('interest:', event.value);
  const loading = await this.loadingCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    spinner:'circles',
  });
  await loading.present();
  this.articles = [];
  this.showArticles =false;
  this.showCard = false;
  
  
  let userDoc = this.afs.firestore.collection(`${this.interest.val}`);
  userDoc.get().then((querySnapshot) => { 
    
    
      
   
    querySnapshot.forEach((doc) => {
      this.articles[this.articles.length] = {'id':this.articles.length+1,'val':doc.data().Notification,'article_id':doc.id,'source':doc.data()['Website']+' Website'||'EPF','link':doc.data()['PDF Link'] || doc.data()['Notification Link']};
     
    })

  }).then(()=>{
    loading.dismiss();
    console.log(this.articles)
    this.showArticles = true;
  })
}
articleChange(event: {
  component: IonicSelectableComponent,
  value: any
}) {
  this.showCard = true;

}
toHome(){
  this.router.navigateByUrl('/home/'+btoa(this.userinfo + "randomNameByMe" + this.interest.val + "randomNameByMe"+this.article.article_id))
  console.log('Before home: ',this.userinfo + "randomNameByMe" + this.interest.val + "randomNameByMe"+this.article.article_id)
}


}
