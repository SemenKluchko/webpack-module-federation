import "./image-caption.scss";

export default class mageCaption {
  render(text) {
    const p = document.createElement("p");
    p.classList.add("image-caption");
    p.innerHTML = text;
    document.querySelector("body").appendChild(p);
  }
}
