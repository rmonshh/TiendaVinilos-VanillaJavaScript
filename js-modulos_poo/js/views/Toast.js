// Aviso temporal en pantalla
export class Toast {
  #el;
  #timer;

  constructor(el){ this.#el = el; }

  show(msg){
    this.#el.textContent = msg;
    this.#el.classList.add('show');
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => this.#el.classList.remove('show'), 2600);
  }
}
