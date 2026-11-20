// Panel lateral de la cesta: pinta el Cart y controla abrir/cerrar
export class CartView {
  #cart;
  #drawer = document.getElementById('drawer');
  #overlay = document.getElementById('overlay');
  #itemsEl = document.getElementById('drawerItems');

  constructor(cart){ this.#cart = cart; }

  open(){  this.#drawer.classList.add('open');    this.#overlay.classList.add('open'); }
  close(){ this.#drawer.classList.remove('open'); this.#overlay.classList.remove('open'); }

  render(){
    const cart = this.#cart;
    document.getElementById('cartCount').textContent = cart.count;
    document.getElementById('cartTotal').textContent = cart.totalLabel;
    document.getElementById('checkoutBtn').disabled = cart.isEmpty;

    if(cart.isEmpty){
      this.#itemsEl.innerHTML = `<div class="empty-cart">Tu cesta está vacía por ahora.<br>Explora el catálogo y añade algún disco.</div>`;
      return;
    }
    this.#itemsEl.innerHTML = cart.items.map(({ product:p, qty }) => `
      <div class="drawer-item">
        <div class="thumb"></div>
        <div class="info">
          <h4>${p.title}</h4>
          <div class="artist">${p.artist}</div>
          <div class="row">
            <div>
              <button class="qty-btn" data-action="qty" data-id="${p.id}" data-delta="-1">−</button>
              <span style="margin:0 8px;">${qty}</span>
              <button class="qty-btn" data-action="qty" data-id="${p.id}" data-delta="1">+</button>
            </div>
            <button class="remove-link" data-action="remove" data-id="${p.id}">Quitar</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}
