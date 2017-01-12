import { Component, ElementRef, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timeline-tweet',
  template: ''
})

export class TweetComponent implements OnInit {

  private _elementRef: ElementRef;
  @Input() tweetId;

  constructor(private elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  ngOnInit() {
    if (this.tweetId) {
      twttr.widgets.createTweet(this.tweetId, this._elementRef.nativeElement);
    }
  }
}