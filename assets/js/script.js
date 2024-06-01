import { getAutos } from "./Peticiones/getAutos.js";

const enviarDatos = (id, name, image, model, year, price, mileage, gearbox)=>{

    const archivoHTML = "../autos.html";
    fetch(archivoHTML)
          .then(response => response.text())
          .then((html)=>{
 
             const parser= new DOMParser();
             const doc= parser.parseFromString(html,"text/html");

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
          .catch(error =>console.log(`Error en autos.html: ${error}`));
}


const crearCards = (results=[])=>{


    let autosRow = document.getElementById("autosRow");

    results.map((results)=>{
        const {id, name, image, model, year, price, mileage, gearbox} = results;

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3")
        divCol.classList.add("col-lg-3")
        divCol.classList.add("col-md-3")
        divCol.classList.add("col-sm-12")
        divCol.classList.add("col-xs-12")
        divCol.classList.add("mt-2")
        divCol.classList.add("mt-2")

        const card = document.createElement("div");
        card.classList.add("card");
        const img= document.createElement("img");
        img.src=image;
        img.alt=`imagen de ${name}`;
        img.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("text-title");
        title.textContent =`Nombre: ${name}`;

        const subtitle = document.createElement("p");
        subtitle.classList.add("text-title");
        subtitle.textContent = `Model:${model}`;
        
        const subtitle2 = document.createElement("p");
        subtitle2.classList.add("text-title");
        subtitle2.textContent = `Year:${year}`;

        const subtitle3 = document.createElement("p");
        subtitle3.classList.add("text-title");
        subtitle3.textContent = `Price:${price}`;

        const subtitle4 = document.createElement("p");
        subtitle4.classList.add("text-title");
        subtitle4.textContent = `Mileage:${mileage}`;

        const subtitle5 = document.createElement("p");
        subtitle5.classList.add("text-title");
        subtitle5.textContent = `Gearbox:${gearbox}`;

        const btnver = document.createElement("button");
        btnver.classList.add("btn","btn-warning");
        btnver.textContent = "ver mas";
        btnver.addEventListener("click",()=>{
            console.log("ok");
            enviarDatos(id, name, image, model, year, price, mileage, gearbox);
        });

        divCol.appendChild(card);

        card.appendChild(img);
        card.appendChild(divBody);

        divBody.appendChild(title);
        divBody.appendChild(subtitle);
        divBody.appendChild(subtitle2);
        divBody.appendChild(subtitle3);
        divBody.appendChild(subtitle4);
        divBody.appendChild(subtitle5);
        divBody.appendChild(btnver);
        
        autosRow.appendChild(divCol)

    })
}

getAutos()
   .then((data)=>{crearCards(data)})
   .catch((error)=>{console.log(`error ${error}`)})