import {Component, Input} from '@angular/core'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {
  IconDefinition,
  faStar,
  faStarHalfStroke as faHalfStar,
  faS,
} from '@fortawesome/free-solid-svg-icons'
import {faStar as faEmptyStar} from '@fortawesome/free-regular-svg-icons'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent {
  faStar = faStar
  faHalfStar = faHalfStar
  faEmptyStar = faEmptyStar

  stars: IconDefinition[] = []

  private _score: number = 0
  @Input()
  set score(val: number) {
    this._score = val > 5 ? 5 : val;
    const solidStarCount: number = Math.floor(this._score)
    for (let i: number = 0; i < solidStarCount; i++) {
      this.stars.push(faStar)
    }

    if(this._score - solidStarCount > 0 && this._score - solidStarCount < 1){
      this.stars.push(faHalfStar)
    }

    for (let i: number = this.stars.length; i < 5; i++) {
      this.stars.push(faEmptyStar)
    }
  }
}
