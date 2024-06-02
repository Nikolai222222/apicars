const carrito = [];

const updateCartCount = () =>{
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = carrito.length;
}

export const addToCart = (id, name, model, price) => {
    carrito.push({ id, name, model, price });
    displayCart();
    updateCartCount();
};

export const removeFromCart = (id) => {
    const index = carrito.findIndex(item => item.id === id);
    if (index > -1) {
        carrito.splice(index, 1);
    }
    displayCart();
    updateCartCount();
};

export const displayCart = () => {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = '';

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>No hay autos en el carrito</p>';
        return;
    }

    carrito.forEach(item => {
        const { id, name, model, price } = item;

        const divCol = document.createElement("div");
        divCol.classList.add("col-12", "mt-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("text-title");
        title.textContent = `Nombre: ${name}`;

        const subtitle = document.createElement("p");
        subtitle.classList.add("text-title");
        subtitle.textContent = `Modelo: ${model}`;

        const subtitle2 = document.createElement("p");
        subtitle2.classList.add("text-title");
        subtitle2.textContent = `Precio: ${price}`;

        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btn", "btn-danger");
        btnRemove.textContent = "Eliminar";
        btnRemove.addEventListener("click", () => {
            removeFromCart(id);
        });

        divBody.appendChild(title);
        divBody.appendChild(subtitle);
        divBody.appendChild(subtitle2);
        divBody.appendChild(btnRemove);

        card.appendChild(divBody);
        divCol.appendChild(card);
        carritoDiv.appendChild(divCol);
    });
};

export const showNotification = (name, model, price) => {
    const carNameSpan = document.getElementById("car-name");
    carNameSpan.textContent = `${name} (Modelo: ${model}, Precio: ${price})`;
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    setTimeout(() => {
        modal.hide();
    }, 3000);
};
