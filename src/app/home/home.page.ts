import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import fetch from 'node-fetch'
import {
  Plugins
} from '@capacitor/core';


// import { TwitterClient } from 'twitter-api-client';
class Port {
  public id: number;
  public val: string;
  public isChecked: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pdf_url=[]
  article:any = [];
  userData:any=[]
  uploadProgress=0;
  category=[
    {id:1,val:'Businessman',isChecked:false},
    {id:2,val:'Startup',isChecked:false},
    {id:3,val:'Professional',isChecked:false},
    {id:4,val:'Accountant',isChecked:false},
    {id:5,val:'Others',isChecked:false},
  ];
  interests = [
    {id:1,val:'GST',isChecked:false},
    {id:2,val:'Income Tax',isChecked:false},
    {id:3,val:'IBBI',isChecked:false},

    {id:4,val:'SEBI',isChecked:false},
    {id:5,val:'Company Law',isChecked:false},

    {id:6,val:'LLP',isChecked:false},
    {id:7,val:'Labour Laws',isChecked:false},
    {id:8,val:'RBI',isChecked:false},
    {id:9,val:'MCA',isChecked:false},
    {id:10,val:'Foreign Trade',isChecked:false},

    {id:11,val:'ICAI',isChecked:false},
    {id:12,val:'DGFT',isChecked:false},

    {id:13,val:'FSSAI',isChecked:false},
    {id:14,val:'Commerce',isChecked:false},
    {id:15,val:'ICMAI',isChecked:false},
    {id:16,val:'NSDL',isChecked:false},

    {id:17,val:'NCLAT',isChecked:false},
    {id:18,val:'CBIC',isChecked:false},

  ];
  types = [
    {id:1,val:'Government Notifications',isChecked:false},
    {id:2,val:'Website and Functional Updates',isChecked:false},
    {id:3,val:'News',isChecked:false},
    {id:4,val:'Notice',isChecked:false},
    {id:5,val:'Circular',isChecked:false},

  ];
   
  
  states: Port[];
  state: any;
  type:any;
  interest:any;
  cat:any;
  numPdf=1;
  userinfo:any=''
  bufferInterest = ''
  bufferId=''

  

  constructor(private loadingCtrl:LoadingController,private afs:AngularFirestore,
    private toastr:ToastController,private router:Router,private http:HttpClient,
    private storage:AngularFireStorage) {
      // console.log(window.location.href);

      // console.log(atob(window.location.href.split('/home/')[1].split('%3D')[0]));
      this.isEditorFn(atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[0]);
      this.userData.isAdmin=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[0];

      this.userData.email=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[1];
      this.userData.password=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[2];
      this.userData.name=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[3];
      if(atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[5]){
        this.bufferInterest = atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[4];
        this.bufferId = atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[5];
        console.log("ID: ",this.bufferId)
        this.printArticle()
      }

     
      this.getYesterdayNews();this.getCollections();
      this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name;

    }

    isEditorFn(val){
      if(val != "true"){
        this.router.navigateByUrl('/login');

      }
      this.states = [
        {id:1,val:'Andhra Pradesh',isChecked:false},
        {id:2,val:'Arunachal Pradesh',isChecked:false},
        {id:3,val:'Assam',isChecked:false},
        {id:4,val:'Bihar',isChecked:false},
        {id:5,val:'Chattisgarh',isChecked:false},
        {id:6,val:'Goa',isChecked:false},
        {id:7,val:'Gujarat',isChecked:false},
        {id:8,val:'Haryana',isChecked:false},
        {id:9,val:'Himachal Pradesh',isChecked:false},
        {id:10,val:'Jharkhand',isChecked:false},
        {id:11,val:'Karnataka',isChecked:false},
        {id:12,val:'Kerala',isChecked:false},
        {id:13,val:'Madhya Pradesh',isChecked:false},
        {id:14,val:'Maharashtra',isChecked:false},
        {id:15,val:'Manipur',isChecked:false},
        {id:16,val:'Meghalaya',isChecked:false},
        {id:17,val:'Mizoram',isChecked:false},
        {id:18,val:'Nagaland',isChecked:false},
        {id:19,val:'Odisha',isChecked:false},
        {id:20,val:'Punjab',isChecked:false},
        {id:21,val:'Rajasthan',isChecked:false},
        {id:22,val:'Sikkim',isChecked:false},
        {id:23,val:'Tamil Nadu',isChecked:false},
        {id:24,val:'Telangana',isChecked:false},
        {id:25,val:'Tripura',isChecked:false},
        {id:26,val:'Uttarakhand',isChecked:false},
        {id:27,val:'Uttar Pradesh',isChecked:false},
        {id:28,val:'West Bengal',isChecked:false},
        {id:30,val:'Andaman and Nicobar Islands',isChecked:false},
      {id:31,val:'Dadra and Nagar Haveli and Daman & Diu',isChecked:false},
      {id:32,val:'Jammu & Kashmir',isChecked:false},
      {id:33,val:'Lakshdweep',isChecked:false},
      {id:34,val:'Chandigarh',isChecked:false},
      {id:35,val:'The Government of NCT of Delhi',isChecked:false},
      {id:36,val:'Ladakh',isChecked:false},
      {id:37,val:'Puducherry',isChecked:false},
       
    
      ];
      
      

    }
    
  async loadImagesFromDevice(event,n) {

    this.article.image_url='';
    this.article.id=new Date().getTime();
  
  
    const file = event.target.files[0];
    // console.log(event.target.files[0])
  
    // const filereader = new FileReader();
    // const reader = (filereader as any)._realReader;
      const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
        reader.onload = async () => {
  
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))],{type:'image/jpg'});
      // create blobURL, such that we could use it in an image element:
      
      const randomId = Math.random()
      .toString(36)
      .substring(2, 8);
      this.article.id2 = new Date().getTime()
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        spinner:'circles',
      });
      await loading.present();
  
    const uploadTask = this.storage.upload(
      `article_images/${this.article.id2}`,
      blob
    );

  
    
  
    uploadTask.percentageChanges().subscribe(async change => {
      this.uploadProgress = change;
      
      
    });
  
  // https://firebasestorage.googleapis.com/v0/b/expenses-aarc.appspot.com/o/files%2F1_image_1?alt=media&token=13a3a975-c542-47bd-91c3-18b8d7eb539b
    uploadTask.then(async res => {
      loading.dismiss();
      this.article.image_url=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_images%2F${this.article.id2}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`
  
      
    });
  }
  
    reader.onerror = (error) => {
  
      //handle errors
  
    };
  };

  loadPdfFromDevice(event,n) {
    

    const file = event.target.files[0];
    // console.log(file);
  
  //    const filereader = new FileReader();
  // const reader = (filereader as any)._realReader;
  const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
        reader.onload = async () => {
  
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))],{type:'application/pdf'});
      // create blobURL, such that we could use it in an image element:
      
      const randomId = Math.random()
      .toString(36)
      .substring(2, 8);
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        spinner:'circles',
      });
      await loading.present();
 
    const uploadTask = this.storage.upload(
      `article_pdfs/${this.article.id}_${n}`,
      blob
    );
   

    uploadTask.percentageChanges().subscribe(change => {
      this.uploadProgress = change;
    });
 
    uploadTask.then(async res => {
      loading.dismiss();
      if(n==1){
        this.article.pdf_url0=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }
      else if(n==2){
        this.article.pdf_url1=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }
      else if(n==3){
        this.article.pdf_url2=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }
      else if(n==4){
        this.article.pdf_url3=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }
      else if(n==5){
        this.article.pdf_url4=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }
      else if(n==6){
        this.article.pdf_url5=`https://firebasestorage.googleapis.com/v0/b/legully-news-genie.appspot.com/o/article_pdfs%2F${this.article.id}_${n}?alt=media&token=92e57ede-3b03-48f5-bc65-ab6c6cb09339`

      }


      
    });
  
  
    };
  
    reader.onerror = (error) => {
  
      //handle errors https://firebasestorage.googleapis.com/v0/b/legully-expense-app.appspot.com/o/files%2F1615195549857_pdf?alt=media&token=38133089-1be1-4eda-b056-2d862a483836
  
    };
  };
  sendEmailNotification=false;
  img_url = '';
  submit(){
    
   
    if(this.article.id){
      // console.log('Article Details: ',this.article);
      this.addToCollection();
      this.afs.collection('articles').doc(this.article.id.toString()).set({
        'ArticleId':this.article.id.toString(),
        'Heading':this.article.heading,
        'Body':this.article.body,
        'interests':this.getListSmall(this.article.interest),
        'types':this.getListSmall(this.article.type),
        'userTypes':this.getListSmall(this.article.cat),
        'states':this.getListSmall(this.article.state),
        'Dated':new Date().toDateString(),

        'ImageUrl':this.article.image_url,
        'numPdf':this.numPdf,
        'PdfUrl0':this.article.pdf_url0 || '',
        'PdfUrl1':this.article.pdf_url1 || '',
        'PdfUrl2':this.article.pdf_url2 || '',
        'PdfUrl3':this.article.pdf_url3 || '',
        'PdfUrl4':this.article.pdf_url4 || '',
        'PdfUrl5':this.article.pdf_url5 || '',

        'Source':this.article.source || '',
        'Link':this.article.source_link || '',
        'fullArticle':this.article.fullArticle || ''
        // 'tags':this.getList(this.cat,this.interest,this.state,this.type)
    }).then(()=>{
      this.toast('Article Published!','primary')
      this.notifcationHead = this.article.heading;
      this.notificationBody = this.article.body;
      this.notificationId = this.article.id.toString();
      this.img_url = this.article.image_url;
      this.notificationTopics = this.getListSmall(this.article.interest);
      this.onOAuthBtnClick()
      
    }).then(()=>{
      this.clear();
    })
    }
    else{
      this.toast('Please upload Article Image','danger');
    }

    
}

  async toast(message,status){
    const toast = await this.toastr.create({
      message:message,
      position:'top',
      color: status,
      duration:2000
    });
    toast.present();
    

}//end of toast
clear(){
  this.article.heading='';
  this.article.id=new Date().getTime();
  this.article.body='';
  this.article.interest='';
  this.article.type='';
  this.article.cat='';
  this.article.state='';
  this.article.image_url='';
  this.article.pdf_url0='';
  this.article.pdf_url1='';
  this.article.pdf_url2='';
  this.article.pdf_url3='';
  this.article.pdf_url4='';
  this.article.pdf_url5='';
  this.numPdf=1;

  this.article.source = '';
  this.article.source_link = '';
  this.article.fullArticle = '';
  this.collection = [];


 
}
k = 0;
  selectAll(data){
    if( this.k %2 == 0){
      for(let i=0;i<data.length;i++){
        data[i]['isChecked'] = true;
      }
      this.k++;

    }
    else{
      for(let i=0;i<data.length;i++){
        data[i]['isChecked'] = false;
      }
      this.k++;

    }

   

  }
  l = 0
  selectAllStates(){
    this.article.state = this.states;
    if( this.l %2 == 0){
      this.article.state = this.states;

      this.l++;

    }
    else{
      this.article.state = null;

     
      this.l++;

    }
  }
  getList(val1,val2,val3,val4){
    let i =[];
    i[0] = val1;
    let k=1;
    for(let j=0;j<val2.length;j++){
      i[k] = val2[j].val;
      k++;

    }
    for(let j=0;j<val3.length;j++){
      i[k] = val3[j].val;
      k++;

    }
    for(let j=0;j<val4.length;j++){
      i[k] = val4[j].val;
      k++;

    }
    return i;
  }
  getListSmall(val1){
    let k=0;
    let i = [];
    for(let j=0;j<val1.length;j++){
      i[k] = val1[j].val;
      k++;

    }
    return i;
  }
  toTwo(val){
    if(new String(val).length == 1){
      return '0'+val;
    }
    else return val;
  }

uploadNewsletter(){
  console.log(new Date().getUTCFullYear()+'-'+this.toTwo(new Date().getUTCMonth())+'-'+this.toTwo(new Date().getUTCDay())+'T'+this.toTwo(new Date().getUTCHours())+':'+this.toTwo(new Date().getUTCMinutes())+'-'+this.toTwo(new Date().getUTCSeconds())+':'+new Date().getUTCMilliseconds()+'Z')

const url = 'https://api.sendinblue.com/v3/emailCampaigns/';

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': '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'
  },
  body: JSON.stringify({sender: {name: 'LegalAstro', email: 'bhaveshkotwani1999@gmail.com'},recipients: {listIds: [4]},inlineImageActivation: false,sendAtBestTime: false,abTesting: false,ipWarmupEnable: false,tag: 'Newsletter',name: "Newsletter",
  htmlContent: this.htmlString,subject: "Today's Newsletter by LegalAstro",
  scheduledAt:new Date().getUTCFullYear()+'-'+this.toTwo(new Date().getUTCMonth()+1)+'-'+this.toTwo(new Date().getUTCDate())+'T'+this.toTwo(new Date().getUTCHours())+':'+this.toTwo(new Date().getUTCMinutes()+5)+':'+this.toTwo(new Date().getUTCSeconds())+'.'+new Date().getUTCMilliseconds()+'Z'
  })
};

fetch(url, options)
.then(res => res.json())
  .then(json => {

    const url = `https://api.sendinblue.com/v3/emailCampaigns/${json["id"]}/sendNow`;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'api-key': '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'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));

  }).then(()=>{
    this.toast('Newsletter Published Successfully!','primary');

  })
  
}
yesterdayNews = [];
htmlString = '<html>';
numArticlesNews = 0;
getYesterdayNews(){
  this.htmlString = `<html><body>`;
  let num = 0;
  let userDoc = this.afs.firestore.collection(`articles`);
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        if(Number(doc.data().ArticleId) > Number(new Date(new Date().setDate(new Date().getDate()-2)).getTime())){
          this.yesterdayNews[num] = doc.data();
          num++;
        }
        console.log(Number(new Date(new Date().setDate(new Date().getDate()-19)).getTime()))


      })}).then(()=>{
        this.numArticlesNews = num;
        for(let i =0 ; i< this.yesterdayNews.length;i++){
          this.htmlString += `<div style="text-align:center;  position:relative;
          z-index:1;
          height:100%;
          min-width: 100px;
          max-width: 500px;
          margin: 0 auto;">
          <h3 style='text-align:center; margin-top:10px;'>${this.yesterdayNews[i].Heading}</h3>
          <h5 style='text-align:center'>${this.yesterdayNews[i].Source}</h5>
          
          <img src=${this.yesterdayNews[i].ImageUrl} style="text-align:center; width:100%" ><br>
          
          <h5>${this.yesterdayNews[i].Body}</h5><br><br>
          </div>`
        }
        


      }).then(()=>{
        this.htmlString += `<div style="text-align:center;  position:relative;
        z-index:1;
        height:100%;
        min-width: 100px;
        max-width: 300px;
        margin: 0 auto;">
        <img src="https://raw.githubusercontent.com/bhavesh2799/BHAVESH-KOTWANI/master/legalAstro.PNG" style="width:40%;text-align:center;"><br>
        <a href="https://play.google.com/store/apps/details?id=com.legully.genienews" >Download our news app</a>
        </div></body></html>`
      }).then(()=>{
        // console.log(this.htmlString)
        // console.log(this.yesterdayNews)
      })

}
searchItem = '';
token = 'AAAAAAAAAAAAAAAAAAAAAJM7OwEAAAAAzTdW2%2BSCwTmUVxFV6aJ6IaMA%2F5s%3DM9tSamThoniqffXsU0HXpqGpVKwbmvedudeMHYAeMigKo5mUVU';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

//   async getTweets(){
//   const twitterClient = new TwitterClient({
//     apiKey: '27zafJZxpMlmbawpjpOL6UJrt',
//     apiSecret: 'JxtH40L9NfpwNS3lprn2B5wGvF7avulJJCNm05SGgXlx900r0e',
//     accessToken: '1054769601517707267-OfdrrzBeNJpTkSWCFiI2ANZVqK61mX',
//     accessTokenSecret: 'wzSFW55KAgB3O3pt0Fi4RPVEMXofgqrfk0GgVZTpLx8VV',
    
//   });  
//   await twitterClient.trends.trendsAvailable().then((data)=>{
//     console.log(data);

//   });
  
// }

collections:any = [];collection:any=[];
getCollections(){
  let i = 0;
  let userDoc = this.afs.firestore.collection(`collections`);
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        this.collections[i] = {'id':i+1,'val':doc.id}
        i++;

      })}).then(()=>{
        // console.log(this.collections)
      })
}

addToCollection(){
  if(this.collection[0]){
    let userDoc = this.afs.firestore.collection(`collections`);
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {

        if(doc.id == this.collection[0]['val']){
          // console.log('collection.val: ',this.collection[0].val)
          let data = doc.data().articles;
          data[data.length] = this.article.id.toString();
          // console.log(data)
          this.afs.collection('collections').doc(doc.id).set({
            'articles':data
          })
        }
      })
    })
  }
  
}
collectionName = '';
createCollection(){
  let data = [];
  data[0] = this.article.id.toString() || '';
  this.afs.collection('collections').doc(this.collectionName).set({
    'articles': data

})
this.toast('New Collection Created!','primary')
}

redirectBuffer(){
  this.router.navigateByUrl('/buffer/'+btoa(this.userinfo))
}
printArticle(){
  if(this.bufferId){
    let userDoc = this.afs.firestore.collection(this.bufferInterest);
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {
        if(doc.id == this.bufferId){
          this.article.heading = doc.data()['Notification'];
          this.article.source = doc.data()['Website']+' Website' || 'EPF';
          this.article.source_link = doc.data()['Notification Link'] || doc.data()['PDF Link'];

         }
})
    })
  }
  
  }
notifcationHead = '';
notificationBody = '';
notificationId = '';
notificationTopics = [];

postNotification(){
  let articleHead = this.notifcationHead;
  let articleBody = this.notificationBody;
  let articleId = this.notificationId;

let topics = this.notificationTopics;
topics[topics.length] = "Notification1";
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${this.accessToken}`);
myHeaders.append("Content-Type", "application/json");
for(let i=0;i<topics.length;i++){
  var raw = JSON.stringify({"message":{"notification": {"title": articleHead, "body": articleBody},"data":{
    "Link":articleId}, "android":{
    "notification":{
      "title": articleHead, "body": articleBody,
      "image":this.img_url
    },
    "priority":"normal"
  },
  "apns":{
    "payload":{
      "aps":{
        "mutable-content":1
      }
    },
    "fcm_options": {
        "image":this.img_url
    }
  },
  "webpush":{
    "headers":{
      "image":this.img_url
    }
  }
, "topic":topics[i].split(' ')[0]}});
  console.log("Payload: ",raw);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://fcm.googleapis.com/v1/projects/legully-news-genie/messages:send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => {console.log('error', error);
    this.oauthFailed = true;
    this.onOAuthBtnClick();
    
});
  
  }
}







accessToken = ''
refreshToken: string;
  oauth2Options = {
      authorizationBaseUrl: "https://accounts.google.com/o/oauth2/auth",
      accessTokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      scope: "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/firebase.messaging",
      // resourceUrl: "https://www.googleapis.com/userinfo/v2/me",
      web: {
        appId: "393285276005-i5cd4o7qesrvukgiuqes9vso5dkhoqvi.apps.googleusercontent.com",
        responseType: "token", // implicit flow
        accessTokenEndpoint: "", // clear the tokenEndpoint as we know that implicit flow gets the accessToken from the authorizationRequest
        redirectUrl: "https://legully-news-genie.web.app/",
        windowOptions: "height=600,left=50,top=50"
      },
      // android: {
      //   appId: environment.oauthAppId.google.android,
      //   responseType: "code", // if you configured a android app in google dev console the value must be "code"
      //   redirectUrl: "com.companyname.appname:/" // package name from google dev console
      // },
      
    }
oauthFailed = false;
    onOAuthBtnClick() {
      if(this.accessToken == '' || this.oauthFailed){
        Plugins.OAuth2Client.authenticate(
          this.oauth2Options
      ).then(response => {
          this.accessToken = response["access_token"];
          this.refreshToken = response["refresh_token"];
         

          // only if you include a resourceUrl protected user values are included in the response!
          let oauthUserId = response["id"];
          let name = response["name"];
          console.log('Access Token',this.accessToken);
          console.log('Refresh Token',this.refreshToken);
          this.oauthFailed = false;

          // go to backend
      }).catch(reason => {
          console.error("OAuth rejected", reason);
      }).then(()=>{
          this.postNotification();
      })
  
      }
      else{
        this.postNotification();
      }

    }   
}