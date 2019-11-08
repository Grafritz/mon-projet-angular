import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line: import-blacklist
import 'rxjs/Rx';
// tslint:disable-next-line: import-blacklist
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubcription: Subscription;

  constructor() {}

  ngOnInit(): void {
    const counter = Observable.interval(1000);
    this.counterSubcription = counter.subscribe(
      (valeur: number) => {
        this.secondes = valeur;
      }
      , (error) => {
        console.log('Une erreur est survenue ! ' + error);
      },
      () => {
        console.log('ObservableCompletee !');
      }
    );
  }

  ngOnDestroy(): void {
    this.counterSubcription.unsubscribe();
  }

}
