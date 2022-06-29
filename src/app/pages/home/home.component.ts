import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
//import  '@mapbox/mapbox-gl-geocoder/dist/';
import { Router } from '@angular/router';
import { GeoJson } from 'src/app/interfaces/geo-json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("popupContainer") popupContainer: any;

  public ptnPopup: boolean= false;
  public title: string = '';
  public direccion: string = '';
  public oficina: string = '';

  public mapa!: Mapboxgl.Map;

  public  geojson: any = {
    'type': 'FeatureCollection',
    'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-4.72805, 41.5212706] //Longitud ,Latitud
          },
          'properties': {
            'title': 'Atos Valladolid',
            'direccion': 'C/los abetos, 56, Valladolid, España',
            'oficina': 'Valladolid'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-3.635565190411423, 40.45664222174938 ]
          },
          'properties': {
            'title': 'Atos Madrid',
            'direccion': 'Albarracin, 25, Madrid, España',
            'oficina':'Madrid'
          }
        }
      ]
    };

  constructor(
    private router: Router,
  ) { 
    console.log('Constructor de Home');
  }

  ngOnInit(): void {
    
    this.crearMapa();
    this.cargarDatosMapa();
    this.mostrarPopup();
    
  }

  crearMapa(){
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      //accessToken: environment.mapboxKey,
      container: 'mapa-mapbox', // container ID de la etiqueta en la que vamos a inlcuir el map
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-3.0, 41.0], // starting position se trabaja asi. Longitud y luego latitud
      zoom: 4 // starting zoom
    });

    this.mapa.addControl(new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      //mapboxgl: Mapboxgl
    }));

     // Add zoom and rotation controls to the map.
     this.mapa.addControl(new Mapboxgl.NavigationControl()); 
     this.mapa.addControl(new Mapboxgl.FullscreenControl());
     this.mapa.addControl(new Mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
     }));
  }

  /*cargarDatosMapa(){
    // add markers to map
    for (const feature of this.geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      
      // make a marker for each feature and add to the map
      new Mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
          new Mapboxgl
            .Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h4>${feature.properties.title}</h4><p>${feature.properties.description}</p>`
            )
        )
      .addTo(this.mapa);
    }
  }*/

  cargarDatosMapa(){
    this.mapa.on('load', () => {
      this.mapa.loadImage('./assets/images/marker-icons/mapbox-marker-icon-20px-red.png',
      //this.mapa.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      (error,imagen: any) => {
        if(error) throw error
        this.mapa.addImage('marker', imagen);
        this.mapa.addSource('points',{
          'type': 'geojson',
          'data': this.geojson
        });
        
        this.mapa.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': 'marker',
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': [
                  'Open Sans Semibold',
                  'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 1.25],
                'text-anchor': 'top'
            }
        });

        //this.mostrarPopup();
      });
    });
  }

  mostrarPopup(){
    this.ptnPopup = false
    const popup = new Mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true
    });

    this.mapa.on('click', 'points', (e: any) => {
        console.log('MouseEnter');
        // Change the cursor style as a UI indicator.
        this.mapa.getCanvas().style.cursor = 'pointer';
         this.ptnPopup = true;
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        this.title = e.features[0].properties.title;
        this.direccion = e.features[0].properties.direccion;
        this.oficina = e.features[0].properties.oficina;
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
        .setLngLat(coordinates)
        .setDOMContent(this.popupContainer.nativeElement)
        //.setHTML(description)
        .addTo(this.mapa);
      });
       
      this.mapa.on('mouseenter', 'points', () => {
        this.mapa.getCanvas().style.cursor = 'pointer';
      });

      this.mapa.on('mouseleave', 'points', () => {
        this.mapa.getCanvas().style.cursor = '';
      });
  }
}