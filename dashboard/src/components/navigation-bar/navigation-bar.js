import "./navigation-bar.scss";

export default class NavigationBar {
  render(navigationItems) {
    const liItems = navigationItems.map((item) => {
      return `
      <li>
      <a href="${item.url}">
      ${item.title}</a>
      </li>
      `;
    });

    const ul = document.createElement("ul");
    ul.innerHTML = liItems.join("");
    ul.classList.add("navigation-bar");
    document.querySelector("body").appendChild(ul);
  }
}
