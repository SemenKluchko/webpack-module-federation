import "./helloButton.scss";

export default class HelloButton {
  render() {
    const button = document.createElement("button");
    const body = document.querySelector("body");
    button.classList.add("hello-world-button");

    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hey, my name is Semen";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };

    button.innerHTML = "Say Hello";
    body.appendChild(button);
  }
}
