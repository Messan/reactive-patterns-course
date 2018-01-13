import {Component, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {Observer} from "rxjs";
import { store } from 'app/event-bus-experiments/app-data';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
    closed?: boolean;
    /**
     *
     */
    constructor() {
        this.next = this.next.bind(this); 
    }
    error (err: any) {
        console.log(err);
    }
    complete () {
        console.log('complete');
    }

    lessons: Lesson[] = [];

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data;
    }

    toggleLessonViewed(lesson:Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted:Lesson) {
        store.deleteLesson(deleted);
    }



}



