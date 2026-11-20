import { Product } from './Product.js';

// Lógica de la cesta (no sabe nada del DOM)
export class Cart {
  #items = [];   // cada elemento: { product, qty }

  get items(){ return this.#items; }
  get isEmpty(){ return this.#items.length === 0; }
  get count(){ return this.#items.reduce((sum, i) => sum + i.qty, 0); }
  get total(){ return this.#items.reduce((sum, i) => sum + i.qty * i.product.price, 0); }
  get totalLabel(){ return Product.formatPrice(this.total); }

  add(product){
    const existing = this.#items.find(i => i.product.id === product.id);
    if(existing){ existing.qty += 1; } else { this.#items.push({ product, qty:1 }); }
  }

  changeQty(id, delta){
    const item = this.#items.find(i => i.product.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) this.remove(id);
  }

  remove(id){
    this.#items = this.#items.filter(i => i.product.id !== id);
  }

  clear(){ this.#items = []; }
}
