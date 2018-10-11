import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { item } from './item';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private basePath: string = '/items';

  items: Observable<item[]> = null; //  list of objects
  item: Observable<item> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

}
