import HelloButton from "../hello-button/helloButton";
import Heading from "../heading/heading";

export default class HelloWorldPage {
  render() {
    const helloWorldButton = new HelloButton();
    const heading = new Heading();
    heading.render("Hello");
    helloWorldButton.render();
  }
}

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
}

if (process.env.NODE_ENV === "development") {
  console.log("Production mode");
}
