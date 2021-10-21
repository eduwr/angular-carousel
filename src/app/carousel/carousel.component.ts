import {Component, HostListener, Input, OnInit} from '@angular/core';
import {IDocuments} from "../app.component";
import {animate, style, transition, trigger, animation, useAnimation} from "@angular/animations";
import {RsjxintervalService} from "../services/rsjxinterval.service";
import {Subscription} from "rxjs";

export const fadeIn = animation([
  style({opacity: 0}),
  animate('2s', style({
    opacity: 1
  }))
]);

// export const scaleIn = animation([
//   style({opacity: 0, transform: "scale(0.5)"}),
//   animate('2s', style({
//     opacity: 1,
//     transform: "scale(1)"
//   }))
// ]);



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void=>*', [
        useAnimation(fadeIn),
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() slides: IDocuments[] = [];
  currentIndex = 0;
  counterValue: `${string}%` = "10%";
  time=5;
  interval: Subscription = new Subscription();
  constructor(private rxjsIntervalService: RsjxintervalService) { }


  ngOnInit(): void {
    this.initInterval()
  }

  initInterval() {
    if(this.interval) {
      this.interval.unsubscribe()
    }
    this.interval = this.rxjsIntervalService
      .initInterval(this.time*10)
      .subscribe(d => {
        this.counterValue = `${d.counterValue}%`
        if(d.counterValue === 100) {
          this.next();
        }
      })
  }

  next() {
    if(this.currentIndex < this.slides.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
    this.initInterval()
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--
    } else {
      this.currentIndex = this.slides.length - 1
    }
    this.initInterval()
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.rxjsIntervalService.pauseCounter()
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.rxjsIntervalService.resumeCounter()
  }
}
