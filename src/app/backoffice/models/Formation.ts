export enum FlagEtape {
  ACTUALITE = 'ACTUALITE',
  FORMATION = 'FORMATION'
}

export interface Formation {
  id: number;
  formationNom: string;
  image: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  niveau: string;
  duree: number;
  categorie: string;
  formateur: string;
  placesDisponibles: number;
  certifiante: boolean;
  nbParticipants: number;
  heureDebut: string; // ex: "09:00:00"
  heureFin: string;   // ex: "17:00:00"
  endroit: string;
  flagEtape: FlagEtape; // ajout manquant
}
