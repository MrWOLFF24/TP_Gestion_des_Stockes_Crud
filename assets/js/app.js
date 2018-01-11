/** @namespace */
const app = (function () {
    "use strict";


    /**
     * variable global for products
     * @alias app.productName
     * @alias app.productPrice
     * @alias app.productColor
     * @alias app.productDiscription
     * @alias app.addProd
     * @alias app.send
     * @alias app.formProduct
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
        productDiscription,
        modal
    ;


    /**
     * function to get data from array stock
     * @alias app.getData
     * @return {string}
     */
    const getData = function () {

    };

    /**
     * function for add a new product in stock
     * @alias app.addProduct
     */
    const addProduct = function (evt, mode) {
        productName = document.getElementById("product_name").value;
        productPrice = document.getElementById("product_price").value;
        productColor = document.getElementById("product_color").value;
        productDiscription = document.getElementById("product_discription").value;

            evt.preventDefault();
            const fd = new FormData();
            const xhr = new XMLHttpRequest();

            if (mode === "update") {
                fd.append("id_product", activeProductId);
            }

            fd.append("product_name", productName);
            fd.append("product_price", productPrice);
            fd.append("product_color", productColor);
            fd.append("product_discription", productDiscription);
            fd.append("action", mode + "_product");

            xhr.open("POST", "ajax.php");

            xhr.onload = function getServerResponse() {

                if (mode === "create") {
                    let id = Number(this.response);
                    addProductInDOMList(id, {
                        productName: productName,
                        productPrice: productPrice,
                        productColor: productColor,
                        productDiscription: productDiscription
                    });
                } else {
                    updateProductInDOMList(productName, productPrice, productColor, productDiscription);
                }
                resetForm();
            };
            xhr.send(fd);
    };

    /** @function resetForm
     * Réinitialise les champs du formulaire
     *
     * @returns {undefined} RAS
     */
    function resetForm() {
        productName = document.getElementById("product_name").value = "";
        productPrice = document.getElementById("product_price").value = "";
        productColor = document.getElementById("product_color").value = "";
        productDiscription = document.getElementById("product_discription").value = "";

        modal.classList.remove("is-active");
    }

    /**
     * function for delete an product in stock and display table
     * @alias app.deleteProduct
     */
    const deleteProduct = function () {
        const checked = document.querySelectorAll(".delete input:checked");
        console.log(checked);

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
     *
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
     * function for edit an object in stock and display data
     * @alias app.editProduct
     * @param {array} evt
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

        xhr.onload = function getBillFromServer() {
            const productToEdit = JSON.parse(this.response);
            display(productToEdit);
        };

        xhr.send(fd);
    };


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
        td.textContent = productData.productPrice + " €";
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productColor;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = productData.productDiscription;
        tr.appendChild(td);
        td = document.createElement("td");
        td.className = "update";
        td.innerHTML = "<span class='update-btn'>edit</span>";
        td.querySelector(".tabler-btn").onclick = editProduct();
        tr.appendChild(td);
        td = document.createElement("td");
        td.className = "delete";
        td.innerHTML = "<input type='checkbox'>";
        tr.appendChild(td);

        return document.getElementById("Product_list").appendChild(tr);
    };

    /**
     * @function updateProductInDOMList
     * @param productName
     * @param productPrice
     * @param productColor
     * @param productDiscription
     */
    const updateProductInDOMList = function (productName, productPrice, productColor, productDiscription) {
        let td;
        const tr = document.querySelector(`[data-id-product="${activeProductId}"]`);
        console.log(tr);
        td = tr.querySelector("td:nth-child(2)");
        td.textContent = productName;

        td = tr.querySelector("td:nth-child(3)");
        td.textContent = productPrice;

        td = tr.querySelector("td:nth-child(4)");
        td.textContent = productColor;

        td = tr.querySelector("td:nth-child(5)");
        td.textContent = productDiscription;
    };

    /**
     * function for display form when a element was clicked
     * @alias app.display
     */
    const display = function (productToEdit) {
        const titre = document.querySelector(".modal-content h2");
        if (modal.classList.contains("is-active")) {
            resetForm();
            display(billToEdit);
        } else {
            titre.textContent = "Modifier un Produit";
            send.value = "Modifier";
            modal.classList.add("is-active");

            if (productToEdit) {
                formStatus = "update";
                productName = document.getElementById("product_name");
                productPrice = document.getElementById("product_price");
                productColor = document.getElementById("product_color");
                productDiscription = document.getElementById("product_discription");

                productName.value = productToEdit.nom;
                productPrice.value = productToEdit.prix;
                productColor.value = productToEdit.couleur;
                productDiscription.value = productToEdit.description;
            } else {
                formStatus = "create";
                titre.textContent = "Ajouter un Produit";
                send.value = "Ajouter";
            }
        }
    };

    const init = function init() {
        // DOM elements selection
        const addProd = document.getElementById("show_prod");
        formProduct = document.getElementById("form_product");
        send = document.getElementById("send");
        modal = document.querySelector(".modal-content");
        updateProductBtns = document.querySelectorAll(".update-btn");
        updateProductBtns.forEach(function (btn) {
            btn.onclick = editProduct;
        });

        addProd.addEventListener("click", function (e) {
            e.preventDefault();
            modal.classList.add("is-active");
        });

        const deleteBtn = document.getElementById("delete_product");
        if (deleteBtn) deleteBtn.onclick = deleteProduct;
        send.onclick = function chooseFormMode(evt) {
            addProduct(evt, formStatus);
        };

        const cross = document.querySelector(".cross");
        cross.addEventListener("click", function () {
           modal.classList.remove("is-active");
        });
    };


    window.addEventListener("DOMContentLoaded", init);

}());