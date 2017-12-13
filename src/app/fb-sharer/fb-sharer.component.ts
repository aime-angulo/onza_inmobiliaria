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
    let inmuebleUrl = encodeURIComponent('http://www.onzainmobiliaria.com/inmueble/' + this.inmueble.id);
    let url = 'https://www.facebook.com/dialog/share?'
      + 'app_id=211192345592954'
      + '&display=popup'
      + '&href=' + inmuebleUrl;

    window.open(url, '_blank', 'location=yes,height=430,width=670,scrollbars=yes,status=yes');
  }
}
