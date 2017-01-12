import { Component } from '@angular/core'
import { GoogleSheetsService } from '../google-sheets.service'
import { TimelineEntryCollection } from '../timeline-entry-collection'

@Component({
  selector: 'kendo-ui-timeline',
  providers: [ GoogleSheetsService ],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent {

  timelineEntryCollections: TimelineEntryCollection[] = [];

  constructor(public googleSheetsService: GoogleSheetsService) {
    googleSheetsService.load('1Z54-N6h0Dl-JSfr2o95f58g2omYz7DLw9CX-j7Th_VQ')
      .then ((data) => {
        this.timelineEntryCollections = data;
      }, (error) => {
        // handle error
      });
  }

}