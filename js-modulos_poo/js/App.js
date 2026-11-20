import { rawProducts } from './data.js';
import { Catalog } from './models/Catalog.js';
import { Cart } from './models/Cart.js';
import { CatalogView } from './views/CatalogView.js';
import { CartView } from './views/CartView.js';
import { Toast } from './views/Toast.js';

// Clase principal: crea los objetos y conecta modelos con vistas
export class App {
  #catalog = new Catalog(rawProducts);
  #cart = new Cart();
  #catalogView = new CatalogView(document.getElementById('grid'), this.#catalog);
  #cartView = new CartView(this.#cart);
  #toast = new Toast(document.getElementById('toast'));

  init(){
    this.#bindFilters();
    this.#bindCatalog();
    this.#bindCart();
    this.#bindMisc();
    this.#catalogView.render();
    this.#cartView.render();
  }

  #bindFilters(){
    const filters = document.getElementById('filters');
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if(!btn) return;
      filters.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      this.#catalog.setGenre(btn.dataset.genre);
      this.#catalogView.render();
    });
  }

  #bindCatalog(){
    document.getElementById('grid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="add"]');
      if(!btn) return;
      const product = this.#catalog.findById(Number(btn.dataset.id));
      this.#cart.add(product);
      this.#cartView.render();
      this.#toast.show(`${product.title} añadido a la cesta`);
      btn.textContent = "Añadido";
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = "Añadir a la cesta"; btn.classList.remove('added'); }, 1400);
    });
  }

  #bindCart(){
    document.getElementById('drawerItems').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if(!btn) return;
      const id = Number(btn.dataset.id);
      if(btn.dataset.action === 'qty') this.#cart.changeQty(id, Number(btn.dataset.delta));
      if(btn.dataset.action === 'remove') this.#cart.remove(id);
      this.#cartView.render();
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
      this.#toast.show("Pedido confirmado (demo) — gracias por tu compra");
      this.#cart.clear();
      this.#cartView.render();
      this.#cartView.close();
    });

    document.getElementById('cartToggle').addEventListener('click', () => this.#cartView.open());
    document.getElementById('drawerClose').addEventListener('click', () => this.#cartView.close());
    document.getElementById('overlay').addEventListener('click', () => this.#cartView.close());
  }

  // Botones con data-scroll (hero) y data-toast (newsletter)
  #bindMisc(){
    document.addEventListener('click', (e) => {
      const scrollBtn = e.target.closest('[data-scroll]');
      if(scrollBtn) document.getElementById(scrollBtn.dataset.scroll).scrollIntoView();
      const toastBtn = e.target.closest('[data-toast]');
      if(toastBtn) this.#toast.show(toastBtn.dataset.toast);
    });
  }
}
