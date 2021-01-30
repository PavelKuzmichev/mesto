

export default class Section {
    constructor({ data }, addNewItem, containerSelector) {
      this._renderedItems = data;
      this._addNewItem = addNewItem
          this._container = document.querySelector(containerSelector);
          
    }
  
   renderItems() {
      this._renderedItems.forEach((item) => {
        
        this._container.append(this._addNewItem(item.name, item.link));
    })}
  
    setItem(element) {
      this._container.append(element);
          }
  }