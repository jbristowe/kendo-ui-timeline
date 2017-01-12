import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { AppComponent } from './app.component';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { TimelineComponent } from './timeline/timeline.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    YoutubePlayerModule
  ],
  providers: [{
     provide: IntlService,
     useClass: CldrIntlService
   }],
  bootstrap: [AppComponent]
})

export class AppModule {
}