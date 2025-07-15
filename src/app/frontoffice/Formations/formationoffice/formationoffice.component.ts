import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/backoffice/models/Formation';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';

@Component({
  selector: 'app-formationoffice',
  templateUrl: './formationoffice.component.html',
  styleUrls: ['./formationoffice.component.scss']
})
export class FormationofficeComponent implements OnInit{
 formations: Formation[] = [];
  filteredFormations: Formation[] = [];  // Formations filtrées
  searchTermNom: string = '';
  searchTermDateDebut: string = '';
  searchTermDateFin: string = '';
  currentPage = 1;
  itemsPerPage = 8;

  constructor(private actualiteService: ActualitemanagmentService, private router: Router) {}

  ngOnInit(): void {
    this.actualiteService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.filteredFormations = data;  // Initialement, afficher toutes les formations
      },
      error: (err) => console.error('Erreur lors du chargement des formations', err)
    });
  }

  filterFormations(): void {
    this.filteredFormations = this.formations.filter(formation => {
      const matchesNom = formation.formationNom.toLowerCase().includes(this.searchTermNom.toLowerCase());
      const matchesDateDebut = this.searchTermDateDebut ? new Date(formation.dateDebut).toISOString().substring(0, 10) === this.searchTermDateDebut : true;
      const matchesDateFin = this.searchTermDateFin ? new Date(formation.dateFin).toISOString().substring(0, 10) === this.searchTermDateFin : true;

      return matchesNom && matchesDateDebut && matchesDateFin;
    });
  }

  // showFormationDetails(formation: Formation, modal: ShowactualitedetailofficeComponent): void {
  //   modal.formation = formation;
  //   modal.openModal();
  // }

  showFormationDetails(formation: Formation): void {
      this.router.navigate(['/front-office/formation-detail', formation.id]);
    }

  get paginatedFormations() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredFormations.slice(start, end);
  }
  
  get totalPages() {
    return Math.ceil(this.filteredFormations.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
