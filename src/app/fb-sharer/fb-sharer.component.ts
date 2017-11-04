import { Component, Input } from '@angular/core';
import Inmueble from '../../modelos/inmueble';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-fb-sharer',
  templateUrl: 'fb-sharer.template.html',
  styleUrls: ['./fb-sharer.component.css']
})
export class FbSharerComponent {
  @Input() inmueble: Inmueble;
  @Input() modalidad: string;

  constructor(private serv: RegistrosService) { }

  openFb() {
    let url = 'http://www.facebook.com/sharer.php?s=100&p[title]='
      + encodeURIComponent(this.inmueble.encabezado)
      + '&p[summary]='
      + encodeURIComponent(this.inmueble.resumen) + '&p[url]='
      + encodeURIComponent('http://www.nufc.com')
      + '&p[images][0]='
      + encodeURIComponent('http://www.somedomain.com/image.jpg');
    window.open(url, '_blank', 'location=yes,height=430,width=670,scrollbars=yes,status=yes');
  }
}
