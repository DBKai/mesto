export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    if (items === undefined) return;
    for (let i = items.length - 1; i >= 0; i--) {
      this._renderer(items[i]);
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
