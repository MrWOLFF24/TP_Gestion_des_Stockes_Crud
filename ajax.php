<?php

include_once "libs/crud_stock.php";

if (isset($_POST["action"])) {

    if ($_POST["action"] === "get_product") {
        echo json_encode(getProduct($_POST["id_product"]));
    }
    elseif ($_POST["action"] === "get_Products") {
        echo json_encode(getProducts());

    } elseif ($_POST["action"] === "create_product") {
        echo createProduct();

    } elseif ($_POST["action"] === "delete_product") {
        echo json_encode(deleteProducts(json_decode($_POST["ids"])));

    } elseif ($_POST["action"] === "update_product") {
        echo json_encode(updateProduct(
            $_POST["id_product"],
            $_POST["product_name"],
            $_POST["product_price"],
            $_POST["product_color"],
            $_POST["product_description"]
        ));
    }
}