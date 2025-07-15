import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloack.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  logs: any[] = [];
constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.getHistoriqueLogs().subscribe({
      next: (data) => {
        this.logs = data;
        console.log('Logs récupérés :', this.logs);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des logs', err);
      }
    });
  }

}
