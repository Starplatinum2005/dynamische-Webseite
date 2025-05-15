import { Produktkachel } from "../Objects/Shop";

type Props = {
  product: Produktkachel;
  addToCart: (product: Produktkachel) => void;
};

export function ProductCard({ product, addToCart }: Props) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3 className="shop_h3">{product.name}</h3>
      <div className="price">€{product.price.toFixed(2).replace('.', ',')}</div>
      <button className="btn" onClick={() => addToCart(product)}>In den Warenkorb</button>
    </div>
  );
}
