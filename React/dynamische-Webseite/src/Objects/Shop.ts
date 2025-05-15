export type Produktkachel = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const produkte: Produktkachel[] = [
  { id: 1, name: 'ProDive Maske', price: 49.99, image: '/tauchmaske.png' },
  { id: 2, name: 'Speed Fins', price: 79.95, image: '/flossen.png' },
  { id: 3, name: 'Neoprenanzug', price: 129.00, image: '/neopren.png' },
  { id: 4, name: 'KidFlex Anzug', price: 99.00, image: '/kinderanzug.png' },
  { id: 5, name: 'GPS-System', price: 249.00, image: '/gps-tracker.png' },
  { id: 6, name: 'SeaLight 3000', price: 59.00, image: '/tauchlampe.png' },
  { id: 7, name: 'ActionCam DiveX', price: 199.00, image: '/actioncam.png' },
  { id: 8, name: 'Aqua-Kompass', price: 49.99, image: '/kompass.png' },
  { id: 9, name: 'Steelsharp Messer', price: 34.95, image: '/messer.png' },
  { id: 10, name: 'Safety Gloves', price: 24.90, image: '/handschuhe.png' },
  { id: 11, name: 'Sauerstoff-Flasche', price: 79.00, image: '/sauerstoff.png' },
  { id: 12, name: 'Backpack 40l', price: 44.90, image: '/rucksack.png' }
];
