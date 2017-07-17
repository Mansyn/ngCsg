import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'testimonials',
    template: require('./testimonials.component.html'),
    styles: [require('./testimonials.component.scss')]
})
export class TestimonialsComponent implements OnInit {
    section: any;
    page: any;
    reviews: Review[];

    constructor(
        private app: AppComponent,
        private reviewService: ReviewService) {
        this.section = app.navLinks.filter(x => x.section == 'about')[0];
        this.page = this.section.pages.filter(x => x.link == 'testimonials')[0];
    }

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