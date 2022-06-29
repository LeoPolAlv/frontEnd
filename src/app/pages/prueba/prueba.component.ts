import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  constructor(
    private parametro: ActivatedRoute
  ) { 
    console.log('Constructor prueba: ', parametro.snapshot.params);
  }

  ngOnInit(): void {
  }

}
