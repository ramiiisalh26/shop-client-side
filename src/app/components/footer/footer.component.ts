import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // back_to_top = document.querySelector(".back_to_top");

  back_to_top(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
  }
}
