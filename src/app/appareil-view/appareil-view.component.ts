import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;
  title = 'Mon Projet Angular';

  lastUpdate = new Date();
  lastUpdateAsync = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  // appareilOne = 'Machine à laver';
  // appareilTwo = 'Frigo';
  // appareilThree = 'Ordinateur';

  appareils: any[];
  appareilSubscription: Subscription;

  constructor( private appareilService: AppareilService, private router: Router) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

ngOnInit() {
  // this.appareils = this.appareilService.appareils;
  this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
    (appareilItems: any[]) => {
      this.appareils = appareilItems;
    }
  );
  this.appareilService.emitAppareilSubject();
}

  onAllumer() {
    // console.log('Tout allumer');
    this.appareilService.swithOnAll();
  }
  onEteindre() {
    // this.appareilService.swithOffAll();
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.swithOffAll();
    } else {
      return null;
    }
  }
  getPageEdit() {
    this.router.navigate(['/edit']);
  }
  onSave() {
    this.appareilService.addAppareilToServeur();
  }
  onFetch() {
    this.appareilService.getAppareilsFormServeur();
  }
}
