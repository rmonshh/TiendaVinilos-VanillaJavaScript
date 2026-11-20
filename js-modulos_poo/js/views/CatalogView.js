// Pinta la rejilla de discos a partir del Catalog
export class CatalogView {
  #el;
  #catalog;

  constructor(el, catalog){
    this.#el = el;
    this.#catalog = catalog;
  }

  render(){
    this.#el.innerHTML = this.#catalog.visible.map(p => `
      <div class="card">
        <div class="sleeve ${p.cls}">
          <div class="peek"></div>
          <span class="tag">${p.genreLabel}</span>
        </div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <div class="artist">${p.artist}</div>
          <div class="card-foot">
            <span class="price">${p.priceLabel}</span>
            <button class="add-btn" data-action="add" data-id="${p.id}">Añadir a la cesta</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}
