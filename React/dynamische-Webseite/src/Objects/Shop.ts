export type Produktkachel = {
  id: number;
  name: string;
  price: string;
  image: string;
  Bestseller?: boolean;
};

export const produkte ={ 
  Produkt1:{ id: 1, name: 'ProDive Maske', price: '49.99', image: '/tauchmaske.png', Bestseller: true},
  Produkt2:{ id: 2, name: 'Speed Fins', price: '79.95', image: '/flossen.png' },
  Produkt3:{ id: 3, name: 'Neoprenanzug', price: '129.00', image: '/neopren.png' },
  Produkt4:{ id: 4, name: 'KidFlex Anzug', price: '99.00', image: '/kinderanzug.png' },
  Produkt5:{ id: 5, name: 'GPS-System', price: '249.00', image: '/gps-tracker.png' },
  Produkt6:{ id: 6, name: 'SeaLight 3000', price: '59.00', image: '/tauchlampe.png' },
  Produkt7:{ id: 7, name: 'ActionCam DiveX', price: '199.00', image: '/actioncam.png' },
  Produkt8:{ id: 8, name: 'Aqua-Kompass', price: '49.99', image: '/kompass.png' },
  Produkt9:{ id: 9, name: 'Steelsharp Messer', price: '34.95', image: '/messer.png' },
  Produkt10:{ id: 10, name: 'Safety Gloves', price: '24.90', image: '/handschuhe.png' },
  Produkt11:{ id: 11, name: 'Sauerstoff-Flasche', price: '79.00', image: '/sauerstoff.png' },
  Produkt12:{ id: 12, name: 'Backpack 40l', price: '44.90', image: '/rucksack.png' }
};
