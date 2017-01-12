import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IntlService } from '@progress/kendo-angular-intl';
import { TimelineEntry } from './timeline-entry';
import { TimelineEntryCollection } from './timeline-entry-collection';

@Injectable()
export class GoogleSheetsService {

  data: any = null;

  constructor(public http: Http, public intl: IntlService) {}

  load( id ) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json'; 
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json() )
        .subscribe( data => {
          this.data = data.feed.entry;
          let currentYear:Number = 0;
          let timelineEntryCollections: TimelineEntryCollection[] = [];
          let tempTimelineEntryCollection:TimelineEntryCollection;
          if (this.data && this.data.length > 0 ) {
            this.data.forEach((entry, index) => {
              let date = this.intl.parseDate(entry.gsx$date.$t);
              if (currentYear < date.getFullYear()) {
                if (index != 0) {
                  timelineEntryCollections.push(tempTimelineEntryCollection);
                }
                tempTimelineEntryCollection = new TimelineEntryCollection();
                tempTimelineEntryCollection.year = currentYear = date.getFullYear();
              }
              let timelineEntry:TimelineEntry = {
                date: this.intl.parseDate(entry.gsx$date.$t),
                title: entry.gsx$title.$t,
                description: entry.gsx$description.$t,
                type: entry.gsx$type.$t,
                version: entry.gsx$version.$t,
                imageUrl: entry.gsx$imageurl.$t,
                notesUrl: entry.gsx$notesurl.$t,
                youTubeId: entry.gsx$youtubeid.$t,
                tweetUrl:  entry.gsx$tweeturl.$t,
                tweetId: entry.gsx$tweetid.$t
              };
              if (index == this.data.length - 1) {
                timelineEntryCollections.push(tempTimelineEntryCollection);
              }
              tempTimelineEntryCollection.entries.push(timelineEntry);
            });
          }
          resolve(timelineEntryCollections);
        });
    });
  }
}