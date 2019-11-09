import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

  urlRealTimeDataBase = 'https://projettest-firebase.firebaseio.com/';
  appareilDataBase = 'appareils.json';
  urlAppareilDB = this.urlRealTimeDataBase + this.appareilDataBase;

  appareilSubject =  new Subject<any[]>();
  private appareils = [
      /*{
        id: 1,
        name: 'Machine à laver',
        status: 'éteint'
      },
      {
        id: 2,
        name: 'Frigo',
        status: 'allumé'
      },
      {
        id: 3,
        name: 'Ordinateur',
        status: 'éteint'
      },
      {
        id: 4,
        name: 'Laptop / Tablette',
        status: 'allumé'
      }*/
    ];

  constructor( private httpClient: HttpClient ) {}

    emitAppareilSubject() {
      this.appareilSubject.next(this.appareils.slice());
    }

  getAppareilById(id: number) {
    const appareil = this.appareils.find( (obj) => {
      return obj.id === id;
    });
    return appareil;
  }
  swithOnAll() {
      for ( let appareil of this.appareils ) {
        appareil.status = 'allumé';
      }
      this.emitAppareilSubject();
  }

  swithOffAll() {
      for ( let appareil of this.appareils ) {
        appareil.status = 'éteint';
      }
      this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }
  addAppareil(newName: string, newStatus: string) {
    const appareilObj = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObj.id = this.appareils[(this.appareils.length - 1)].id + 1;
    appareilObj.name = newName;
    appareilObj.status = newStatus;
    this.appareils.push(appareilObj);

    this.emitAppareilSubject();
  }
  addAppareilToServeur() {
    this.httpClient
    .put(this.urlAppareilDB, this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement termine!');
      },
      (erreur) => {
        console.log('Erreur de sauvegarde !' + erreur);
      }
    );
  }
  postAppareilToServeur() {
    this.httpClient
    .post(this.urlAppareilDB, this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement termine!');
      },
      (erreur) => {
        console.log('Erreur de sauvegarde !' + erreur);
      }
    );
  }
  getAppareilsFormServeur() {
    this.httpClient
    .get<any[]>(this.urlAppareilDB)
    .subscribe(
      (reponse) => {
        this.appareils = reponse;
        this.emitAppareilSubject();
      },
      (erreur) => {
        console.log('Erreur de chargement! ' + erreur);
      }
    );
  }
}
