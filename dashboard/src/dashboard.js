import NavigationBar from "./components/navigation-bar/navigation-bar.js";

const navigationItems = [
  {
    url: "/hello-world-page",
    title: "Hello World Page",
  },
  {
    url: "/simon-page",
    title: "Simon Page",
  },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;

if (url === "/hello-world-page") {
  import("HelloWorldApp/HelloWorldPage").then((HelloWorldPageModule) => {
    const HelloWorldPage = HelloWorldPageModule.default;
    const helloWorldPage = new HelloWorldPage();
    helloWorldPage.render();
  });
} else if (url === "/simon-page") {
  import("SimonApp/SimonPage").then((SimonPageModule) => {
    const SimonPage = SimonPageModule.default;
    const simonPage = new SimonPage();
    simonPage.render();
  });
}

console.log("dashboard");
