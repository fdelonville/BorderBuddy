import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from "@angular/router";

export const LoggedInGuard: CanActivateFn =  function(){
  const router = inject(Router)
  if(!sessionStorage.getItem('token')){
    router.navigateByUrl("/accueil")
    return false
  }
  else return true
}
