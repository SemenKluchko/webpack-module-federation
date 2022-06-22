import Kluchko from "./Kluchko.png";
import "./simon-image.scss";

export default class SimonImage {
  render() {
    const img = document.createElement("img");
    const body = document.querySelector("body");
    img.src = Kluchko;
    img.alt = "Simon Kliuchko";
    img.classList.add("simon-image");
    body.appendChild(img);
  }
}
