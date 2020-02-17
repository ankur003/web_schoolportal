import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ankur',
  templateUrl: './ankur.component.html',
  styleUrls: ['./ankur.component.css']
})
export class AnkurComponent  {

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


}
