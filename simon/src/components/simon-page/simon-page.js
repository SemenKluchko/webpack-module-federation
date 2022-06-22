import Heading from "../heading/heading.js";
import SimonImage from "../simon-image/simon-image.js";

export default class SimonPage {
  render() {
    const heading = new Heading();
    const simonImage = new SimonImage();
    heading.render("Simon");
    simonImage.render();

    import("ImageCaptionApp/ImageCaption").then((ImageCaptionModule) => {
      const ImageCaption = ImageCaptionModule.default;
      const imageCaption = new ImageCaption();
      imageCaption.render("Simon Kluchko, Frontent Developer at Levi9");
    });
  }
}
