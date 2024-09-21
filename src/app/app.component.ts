import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'angular17';
  
 ngOnInit(): void {
  AOS.init({
    duration: 1000,  // Duration of animation in milliseconds
  offset: 120,     // Distance between the bottom of the viewport and the element before animation starts
  easing: 'ease-in-out',
  });
 }
}
