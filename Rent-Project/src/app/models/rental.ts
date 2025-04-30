export interface House {
  id: number;
  etage: number;
  reference: string;
  superficie: number;
  nbpieces: number;
  ville: string;
  rue: string;
  postal: string;
  title: string;
  description: string;
  price: number;
  image: string;
  status?: 'Disponible' | 'Loué';

}
