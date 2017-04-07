import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {

    // Constructor with injected service
    constructor(
        private reviewService: ReviewService
    ) { }

    // Local properties
    reviews: Review[];

    loadReviews() {
        // Get all comments
        this.reviewService.getReviews()
            .subscribe(
            reviews => this.reviews = reviews, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    ngOnInit() {
        // Load comments
        this.loadReviews()
    }

}