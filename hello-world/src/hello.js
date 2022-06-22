import HelloButton from "./components/hello-button/helloButton.js";
import Heading from "./components/heading/heading.js";

const helloWorldButton = new HelloButton();
const heading = new Heading();

heading.render("Hello");
helloWorldButton.render();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
}

if (process.env.NODE_ENV === "development") {
  console.log("Production mode");
}
