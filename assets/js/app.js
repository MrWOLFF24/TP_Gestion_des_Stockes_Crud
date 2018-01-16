/** @namespace */
const app = (function () {
    "use strict";


    /**
     * variable global for products
     * @alias app.productName
     * @alias app.productPrice
     * @alias app.productColor
     * @alias app.productDescription
     * @alias app.addProd
     * @alias app.send
     * @alias app.formProduct
     * @alias app.idsproducts
     * @type {element}
     */
    let formProduct,
        send,
        idsproducts = [],
        updateProductBtns,
        activeProductId,
        formStatus,
        productName,
        productPrice,
        productColor,
        productDescription,
        modal
    ;


    /**
     * @function getData
     * function to get data from array stock
     * @alias app.getData
     * @return {undefined}
     */
    const getData = function () {

    };

    /**
     * @function addProduct
     * function for add a new product in stock
     * @param {string} mode
     * @alias app.addProduct
     * @return {undefined} RAS
     */
    const addProduct = function (mode) {
        productName = document.getElementById("product_name").value;
        productPrice = document.getElementById("product_price").value;
        productColor = document.getElementById("product_color").value;
        productDescription = document.getElementById("product_description").value;

        if (productName && productPrice && productColor && productDescription) {

            const fd = new FormData();
            const xhr = new XMLHttpRequest();

            if (mode === "update") {
                fd.append("id_product", activeProductId);
            }

            fd.append("product_name", productName);
            fd.append("product_price", productPrice);
            fd.append("product_color", productColor);
            fd.append("product_description", productDescription);
            fd.append("action", mode + "_product");

            xhr.open("POST", "ajax.php");

            xhr.onload = function getServerResponse() {
                if (mode === "create") {
                    let id = Number(this.response);
                    addProductInDOMList(id, {
                        productName: productName,
                        productPrice: productPrice,
                        productColor: productColor,
                        productDescription: productDescription
                    });
                } else {
                    updateProductInDOMList(productName, productPrice, productColor, productDescription);
                }
                resetForm();
            };
            xhr.send(fd);
        }
    };

    /** @function resetForm
     * Réinitialise les champs du formulaire
     * @alias app.restForm
     * @returns {undefined} RAS
     */
    function resetForm() {
        productName = document.getElementById("product_name");
        productPrice = document.getElementById("product_price");
        productColor = document.getElementById("product_color");
        productDescription = document.getElementById("product_description");

        productName.value = "";
        productPrice.value = "";
        productColor.value = "";
        productDescription.value = "";

        modal.classList.remove("is-active");
    }

    /**
     * @function deleteProduct
     * function for delete an product in stock and display table
     * @alias app.deleteProduct
     * @return {undefined} RAS
     */
    const deleteProduct = function () {
        const checked = document.querySelectorAll(".delete input:checked");

        if (checked.length) {
            let fd = new FormData();
            let xhr = new XMLHttpRequest();

            checked.forEach(function (c) {
                let product = c.parentElement.parentElement;
                let idProduct = Number(product.getAttribute("data-id-product"));
                idsproducts.push(idProduct);
            });

            fd.append("action", "delete_product");

            fd.append("ids", JSON.stringify(idsproducts));

            xhr.open("POST", "ajax.php");

            xhr.onload = function getServerResponse() {
                removeProductsFromDOMList();
            };
            xhr.send(fd);
        }
    };

    /** @function removeProductsFromDOMList
     * Supprime les lignes du tableur contenant des checkbox cochés
     * @alias app.removeProductsFromDOMList
     * @returns {number} la tailles de lignes du tableur restantes
     */
    function removeProductsFromDOMList() {
        const checkBoxes = document.querySelectorAll(".delete input:checked");
        checkBoxes.forEach(function parse(checkbox) {
            checkbox.parentElement.parentElement.remove();
        });
        return document.querySelectorAll("tbody tr").length;
    }

    /**
     * @function editProduct
     * modifier le produit selectinner
     * @alias app.editProduct
     * @param evt
     * @return {undefined} RAS
     */
    const editProduct = function (evt) {
        const src = evt.target || evt.srcElement;
        const parent = src.parentElement.parentElement;
        const fd = new FormData();
        const xhr = new XMLHttpRequest();

        evt.preventDefault();

        activeProductId = Number(parent.getAttribute("data-id-product"));

        fd.append("id_product", activeProductId);
        fd.append("action", "get_product");

        xhr.open("POST", "ajax.php");

        xhr.onload = function getProductFromServer() {
            let productToEdit = JSON.parse(this.response);
            display(productToEdit);
        };

        xhr.send(fd);
    };

    /**
     * @function addProductInDOMList
     * ajouter produit dans le DOM
     * @alias app.addProductInDOMList
     * @param insertedId
     * @param productData
     * @return {Node}
     */
    const addProductInDOMList = function (insertedId, productData) {
        let td;
        const tr = document.createElement("tr");
        tr.setAttribute("data-id-product", insertedId);
        tr.classList.add("product");

        td = document.createElement("td");
        td.textContent = insertedId;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productName;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productPrice;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productColor;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productDescription;
        tr.appendChild(td);
        td = document.createElement("td");
        td.className = "update";
        td.innerHTML = "<span class='update-btn'>edit</span>";
        tr.appendChild(td);
        td = document.createElement("td");
        td.className = "delete";
        td.innerHTML = "<input type='checkbox'>";
        tr.appendChild(td);

        return document.getElementById("Product_list").appendChild(tr);
    };

    /**
     * @function updateProductInDOMList
     * modifier le produit dans le DOM
     * @param productName
     * @param productPrice
     * @param productColor
     * @param productDescription
     * @return {undefined} RAS
     */
    const updateProductInDOMList = function (productName, productPrice, productColor, productDescription) {
        let td;
        const tr = document.querySelector(`[data-id-product="${activeProductId}"]`);
        if (tr){

            td = tr.querySelector("td:nth-child(2)");
            td.textContent = productName;

            td = tr.querySelector("td:nth-child(3)");
            td.textContent = productPrice;

            td = tr.querySelector("td:nth-child(4)");
            td.textContent = productColor;

            td = tr.querySelector("td:nth-child(5)");
            td.textContent = productDescription;
        }
    };

    /**
     * @function display
     * afficher le fromulaire
     * @param productToEdit
     * @alias app.display
     * @return {undefined} RAS
     */
    const display = function (productToEdit) {
        productName = document.getElementById("product_name");
        productPrice = document.getElementById("product_price");
        productColor = document.getElementById("product_color");
        productDescription = document.getElementById("product_description");

        const titre = document.querySelector(".modal-content h2");
            if (modal.classList.add("is-active")) {
                resetForm();
                display(productToEdit);
            } else {
                titre.textContent = "Modifier un Produit";
                send.value = "Modifier";
                modal.classList.add("is-active");

                if (productToEdit) {
                    formStatus = "update";

                    productName.value = productToEdit.nom;
                    productPrice.value = productToEdit.prix;
                    productColor.value = productToEdit.couleur;
                    productDescription.value = productToEdit.description
                } else {
                    formStatus = "create";
                    titre.textContent = "Ajouter un Produit";
                    send.value = "Ajouter";
                }
            }
    };

    /**
     * @function init
     * a executer au chargement du DOM
     * @alias app.init
     * @return {undefined} RAS
     */
    const init = function init() {
        // DOM elements selection
        const addProd = document.getElementById("show_prod");
        formProduct = document.getElementById("form_product");
        send = document.getElementById("send");
        modal = document.querySelector(".modal-content");

        updateProductBtns = document.querySelectorAll(".update-btn");
        if (updateProductBtns) {
            updateProductBtns.forEach(function (btn) {
                btn.onclick = editProduct;
            });
        }

        addProd.addEventListener("click", function (e) {
            e.preventDefault();
            resetForm();
            modal.classList.add("is-active");
            display();
        });

        send.addEventListener("click", function (evt) {
            evt.preventDefault();
            addProduct(formStatus);
        });

        const deleteBtn = document.getElementById("delete_product");
        if (deleteBtn) deleteBtn.onclick = deleteProduct;

        const cross = document.querySelector(".cross");
        cross.addEventListener("click", function () {
           resetForm();
        });
    };


    window.addEventListener("DOMContentLoaded", init);

}());