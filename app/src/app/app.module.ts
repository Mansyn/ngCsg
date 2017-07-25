import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { Ng2ImgToolsModule } from 'ng2-img-tools'; // image resizing tool

// components
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/about/faq/faq.component';
import { TestimonialsComponent } from './components/about/testimonials/testimonials.component';
import { ServicesComponent } from './components/about/services/services.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FinishedComponent } from './components/gallery/finished/finished.component';
import { ContactComponent } from './components/contact/contact.component';
import { CallComponent } from './components/contact/call/call.component';
import { EmailComponent } from './components/contact/email/email.component';
import { FacebookComponent } from './components/contact/facebook/facebook.component';
import { AdminComponent } from './components/admin/admin.component';
import { ImagesComponent } from './components/admin/images/images.component';

// services
import { ReviewService } from './services/review.service';

// pipes
import { TitleCase } from './pipes/title-case.pipe';
import { FilterLink } from './pipes/filter-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FaqComponent,
    TestimonialsComponent,
    ServicesComponent,
    GalleryComponent,
    FinishedComponent,
    ContactComponent,
    CallComponent,
    EmailComponent,
    FacebookComponent,
    AdminComponent,
    ImagesComponent,
    TitleCase,
    FilterLink
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    Ng2ImgToolsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'about/faq', component: FaqComponent },
      { path: 'about/testimonials', component: TestimonialsComponent },
      { path: 'about/services', component: ServicesComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'gallery/finished', component: FinishedComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'contact/call', component: CallComponent },
      { path: 'contact/email', component: EmailComponent },
      { path: 'contact/facebook', component: FacebookComponent },
      { path: '*', redirectTo: 'home' }
    ])
  ],
  providers: [ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
