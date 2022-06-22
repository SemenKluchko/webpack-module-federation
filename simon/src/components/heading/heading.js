import "./heading.scss";

export default class Heading {
  render(pageName) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.classList.add("hello-world-heading");
    h1.innerHTML = "Webpack is awesome " + pageName + " page";
    body.appendChild(h1);
  }
}
