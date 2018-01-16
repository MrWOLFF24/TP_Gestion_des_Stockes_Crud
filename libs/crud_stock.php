<?php

include_once "utility.php";

$db = connectDB("localhost", "gestion_stock_crud", "root", "root");

function deleteProducts($ids) {
    global $db;

    $sql = "DELETE FROM produits WHERE id = :id_products";
    $query = $db->prepare($sql);
    $res = [];

    foreach ($ids as $id) {
        $query->bindParam(":id_products", $id, PDO::PARAM_INT);
        $tmp = $query->execute();
        $res[] = (object) [
            "id" => $id
        ];
    }
    return $res;
}

// insère une nouvelle ligne de facture avec les infos du post
function createProduct() {
    global $db;
    $sql = "INSERT INTO produits (nom, prix, couleur, description) VALUES (:nom, :prix, :couleur, :description)";

    $query = $db->prepare($sql);
    $query->bindParam(":nom", $_POST['product_name'], PDO::PARAM_STR);
    $query->bindParam(":prix", $_POST['product_price'], PDO::PARAM_STR);
    $query->bindParam(":couleur", $_POST['product_color'], PDO::PARAM_STR);
    $query->bindParam(":description", $_POST['product_description'], PDO::PARAM_STR);
    $res = $query->execute();
    return $db->lastInsertId();
}

// sélectionne une ligne de produit correspondant à l'id passé en paramètre
function getProduct($id) {
    global $db;
    $sql = "SELECT * FROM produits WHERE id = :id";

    $statement = $db->prepare($sql);
    $statement->bindParam(":id", $id, PDO::PARAM_INT);
    $status = $statement->execute();
    $product = $statement->fetch(PDO::FETCH_OBJ);
    return $product;
}

// récupère toutes les lignes des produits
function getProducts() {
    global $db;
    $sql = "SELECT * FROM produits";
    $statement = $db->query($sql);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_OBJ);
}

//update un produit
function updateProduct($id_product, $nom, $prix, $couleur, $description) {
    global $db;
    $id_product = (int)$id_product;

    $sql = "UPDATE produits SET nom = :nom, prix = :prix, couleur = :couleur, description = :description  WHERE id = :id";

    $query = $db->prepare($sql);
    $query->bindParam(":id", $id_product, PDO::PARAM_INT);
    $query->bindParam(":nom", $nom, PDO::PARAM_STR);
    $query->bindParam(":prix", $prix, PDO::PARAM_STR);
    $query->bindParam(":couleur", $couleur, PDO::PARAM_STR);
    $query->bindParam(":description", $description, PDO::PARAM_STR);

    return $query->execute();
}

