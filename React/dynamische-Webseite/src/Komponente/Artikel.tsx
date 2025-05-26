import { Produktkachel } from "../Objects/Shop";
import "./Artikel.css"

type Test = {
  product: Produktkachel;
  addToCart: (product: Produktkachel) => void;
};

export function Artikel({ product, addToCart }: Test) {
  return (
    <div className="card">
      {product.Bestseller && ( 
        <span className="badge">Bestseller</span>
      )}
      <img src={product.image} alt={product.name} />
      <h3 className="shop_h3">{product.name}</h3>
      <div className="price">€{product.price}</div>
      <button className="btn" onClick={() => addToCart(product)}>In den Warenkorb</button>
    </div>
  );
}
