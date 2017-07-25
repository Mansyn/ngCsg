import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppComponent } from '../app.component';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // Constructor with injected service
    constructor(
        private app: AppComponent,
        private reviewService: ReviewService
    ) {
        app.sidenav.close();
    }

    // Local properties
    reviews: Review[];

    loadReviews() {
        // Get all comments
        this.reviewService.getReviews()
            .subscribe(
            reviews => this.reviews = this.getRandom(reviews), //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    private getRandom(reviews) {
        let randomIndex = Math.floor((Math.random() * reviews.length));
        let first = reviews[randomIndex];
        reviews.splice(reviews.indexOf(first), 1);
        let randomIndex2 = Math.floor((Math.random() * reviews.length));
        let second = reviews[randomIndex2];
        return [first, second];
    }

    ngOnInit() {
        // Load comments
        this.loadReviews()
    }

}