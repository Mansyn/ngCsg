import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Review } from '../models/review';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReviewService {
    // Resolve HTTP using the constructor
    constructor(private http: Http) { }
    // private instance variable to hold url
    private reviewUrl = './assets/reviews.json';

    // Fetch all existing comments
    getReviews(): Observable<Review[]> {
        // ...using get request
        return this.http.get(this.reviewUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
}