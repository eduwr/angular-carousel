import {Component, Input, OnInit} from '@angular/core';
import {IDocuments} from "../app.component";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() slides: IDocuments[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
