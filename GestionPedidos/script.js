function mostrarProductos() {
    const productListDiv = document.getElementById("product-list");
    productListDiv.innerHTML = ""; // Limpiar la lista antes de agregar los productos

    fetch("https://localhost:7057/api/Inventory")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.innerHTML = `<p><strong>ID:</strong> ${product.id}</p>
                                        <p><strong>Producto:</strong> ${product.product}</p>
                                        <p><strong>Stock:</strong> ${product.stock}</p>
                                        <button onclick="verDetalle(${product.id})">Pedir</button>`;
                productListDiv.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error al obtener la lista de productos:", error));
}

function verDetalle(id) {
    fetch(`https://localhost:7057/api/Inventory/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("detail-id").textContent = product.id;
            document.getElementById("detail-product").textContent = product.product;
            document.getElementById("detail-stock").textContent = product.stock;
            document.getElementById("product-details").classList.remove("hidden");
        })
        .catch(error => console.error("Error al obtener los detalles del producto:", error));
}

function cerrarDetalle() {
    document.getElementById("product-details").classList.add("hidden");
}

function pedirProducto() {
    const productId = document.getElementById("detail-id").textContent;
    const amount = document.getElementById("quantity").value;

    fetch(`https://localhost:7057/api/Inventory/SubtractStock/${productId}?amount=${amount}`, {
        method: 'PUT'
    })
    .then(response => {
        if (response.ok) {
            console.log("Producto pedido exitosamente.");
            cerrarDetalle();
            mostrarProductos(); // Actualizar la lista después de pedir el producto
        } else {
            throw new Error("Error al pedir el producto.");
        }
    })
    .catch(error => console.error("Error al pedir el producto:", error));
}


// Mostrar la lista de productos al cargar la página
mostrarProductos();
