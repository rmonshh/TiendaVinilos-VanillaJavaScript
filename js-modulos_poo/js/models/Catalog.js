import { Product } from './Product.js';

// Colección de productos + filtro activo por género
export class Catalog {
  #products;
  #activeGenre = "todos";

  constructor(rawProducts){
    this.#products = rawProducts.map(p => new Product(p));
  }

  setGenre(genre){ this.#activeGenre = genre; }

  get visible(){
    return this.#activeGenre === "todos"
      ? this.#products
      : this.#products.filter(p => p.genre === this.#activeGenre);
  }

  findById(id){ return this.#products.find(p => p.id === id); }
}
