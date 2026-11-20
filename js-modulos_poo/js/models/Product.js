// Un disco del catálogo
export class Product {
  static GENRE_LABELS = { electronica:"Electrónica", rock:"Rock", jazz:"Jazz", folk:"Folk" };

  constructor({ id, title, artist, genre, price, cls }){
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.genre = genre;
    this.price = price;
    this.cls = cls;
  }

  get genreLabel(){ return Product.GENRE_LABELS[this.genre]; }
  get priceLabel(){ return Product.formatPrice(this.price); }

  static formatPrice(n){ return n.toFixed(2).replace('.', ',') + ' €'; }
}
