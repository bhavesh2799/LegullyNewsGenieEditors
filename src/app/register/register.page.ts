import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordMatch: boolean;
  companyName: any="";
 

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router,
    private navCrtl: NavController, private menu: MenuController

  ) {     this.menu.enable(false);
  }

  ngOnInit() {
  }
  
  
  async register(){
    if(this.name && this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message:'loading...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email,this.password).then((data)=>{
        this.afs.collection('users').doc(data.user.uid).set({
          'userId': data.user.uid,
          'name':this.name,
          'email':this.email,
          'createdAt':Date.now(),
          'isAdmin': "false",
          'password':this.password
        });
        data.user.sendEmailVerification();
      }).then(()=>{
        // console.log('success');
        loading.dismiss();
        this.toast("Registration Success! A verification mail has been sent to user's email address.",'success');
      }).catch((error)=>{
        loading.dismiss();
        this.toast(error.message,'danger');

      })
    
      
    }
    else{
      this.toast('Please fill in the form!','danger');
    }//end of register


   
    
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


  checkPassword(){
    if (this.password == this.confirmPassword){
      this.passwordMatch = true;
    }
    else{
      this.passwordMatch=false;
    }
  }
  redirectLogin(){
    this.router.navigate(['/login']);
  }//end of register
  resendEmail='';

 
}
  
