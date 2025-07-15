import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/backoffice/models/Formation';
import { ActualitemanagmentService } from 'src/app/backoffice/service/actualitemanagment.service';

@Component({
  selector: 'app-showformationdetailsoffice',
  templateUrl: './showformationdetailsoffice.component.html',
  styleUrls: ['./showformationdetailsoffice.component.scss']
})
export class ShowformationdetailsofficeComponent {
 formation!: Formation;

  constructor(
    private route: ActivatedRoute,
    private formationService: ActualitemanagmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormationById(id).subscribe(data => {
      this.formation = data;
    });
  }

  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' + imagePath.replace('/downloadFile/', '');
  }
}
