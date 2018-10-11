import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbTimeStruct, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})



export class DatepickerComponent implements OnInit {


@ViewChild('dp') dp: ElementRef;
@ViewChild('selDate') selDate: ElementRef;

t1:NgbTimepicker;
model: NgbDateStruct;
time1: NgbTimeStruct;
time2: NgbTimeStruct;
d : NgbDate;
desc : string;
date: {year: number, month: number};
coursesObs: Observable<any[]>;

  ngOnInit(): void {
    this.selectToday();
    this.time1 = {hour: 13, minute: 30, second: 0};
    this.time2 = {hour: 14, minute: 0, second: 0};
    this.model = this.calendar.getToday();
    this.desc = "Null";
    this.coursesObs = this.getCourses('/0/');
    console.log(this.coursesObs);
  }
   
  
    constructor(private calendar: NgbCalendar,private db: AngularFireDatabase) {
    }
  
    selectToday() {
      this.model = this.calendar.getToday();
      console.log(this.desc);
    }

    selectDate(){
      console.log(this.desc);
    }
    
    selectTime(){
      console.log(this.time1.hour+" "+this.time1.minute);
    }
    saveMeeting(){
      this.db.list('/0').push({ day: this.model.day, month:this.model.month, year:this.model.year
        , startTimeH : this.time1.hour,startTimeM:this.time1.minute,
        endTimeH: this.time2.hour, endTimeM:this.time2.minute}).then(ref=>{
          console.log(ref.key);
        });
    }
    getCourses(listPath): Observable<any[]> {
      
      return this.db.list(listPath).valueChanges();
    }
}
