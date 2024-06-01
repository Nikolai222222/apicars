import { getAutos } from "./Peticiones/getAutos.js";
import { addToCart, displayCart, showNotification } from "../../carrito.js";

const enviarDatos = (id, name, image, model, year, price, mileage, gearbox) => {
    const archivoHTML = "../autos.html";
    fetch(archivoHTML)
        .then(response => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = image;
            imagePage.alt = `Imagen de ${name}`;
            imagePage.classList.add("card-img-top");

            const titlePage = doc.getElementById("titlePage");
            titlePage.textContent = `Nombre: ${name}`;

            const subtitlePage = doc.getElementById("subtitlePage");
            subtitlePage.textContent = `Model: ${model}`;

            const subtitlePage2 = doc.getElementById("subtitlePage2");
            subtitlePage2.textContent = `Year: ${year}`;

            const subtitlePage3 = doc.getElementById("subtitlePage3");
            subtitlePage3.textContent = `Price: ${price}`;

            const subtitlePage4 = doc.getElementById("subtitlePage4");
            subtitlePage4.textContent = `Mileage: ${mileage}`;

            const subtitlePage5 = doc.getElementById("subtitlePage5");
            subtitlePage5.textContent = `Gearbox: ${gearbox}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;
        })
        .catch(error => console.log(`Error en autos.html: ${error}`));
};

const crearCards = (results = []) => {
    let autosRow = document.getElementById("autosRow");

    results.forEach(result => {
        const { id, name, image, model, year, price, mileage, gearbox } = result;

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;
        img.alt = `imagen de ${name}`;
        img.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("text-title");
        title.textContent = `Name: ${name}`;

        const subtitle = document.createElement("p");
        subtitle.classList.add("text-title");
        subtitle.textContent = `Model: ${model}`;

        const subtitle2 = document.createElement("p");
        subtitle2.classList.add("text-title");
        subtitle2.textContent = `Year: ${year}`;

        const subtitle3 = document.createElement("p");
        subtitle3.classList.add("text-title");
        subtitle3.textContent = `Price: ${price}`;

        const subtitle4 = document.createElement("p");
        subtitle4.classList.add("text-title");
        subtitle4.textContent = `Mileage: ${mileage}`;

        const subtitle5 = document.createElement("p");
        subtitle5.classList.add("text-title");
        subtitle5.textContent = `Gearbox: ${gearbox}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn", "btn-warning");
        btnVer.textContent = "Ver más";
        btnVer.addEventListener("click", () => {
            enviarDatos(id, name, image, model, year, price, mileage, gearbox);
        });

        const btnAddToCart = document.createElement("button");
        btnAddToCart.classList.add("btn", "btn-success", "ms-2");
        btnAddToCart.textContent = "Agregar al carrito";
        btnAddToCart.addEventListener("click", () => {
            addToCart(id, name, model, price);
            showNotification(name, model, price);
        });

        divBody.appendChild(title);
        divBody.appendChild(subtitle);
        divBody.appendChild(subtitle2);
        divBody.appendChild(subtitle3);
        divBody.appendChild(subtitle4);
        divBody.appendChild(subtitle5);
        divBody.appendChild(btnVer);
        divBody.appendChild(btnAddToCart);

        card.appendChild(img);
        card.appendChild(divBody);
        divCol.appendChild(card);
        autosRow.appendChild(divCol);
    });
};

getAutos().then(data => {
    crearCards(data);
    displayCart();
});
