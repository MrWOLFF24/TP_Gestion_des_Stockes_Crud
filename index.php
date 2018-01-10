<?php include "inc/head.php"; ?>
<?php   include "inc/navBar.php"; ?>

    <div class="search_product">
        <label for="search"><i class="fa fa-search" aria-hidden="true"></i></label>
        <input id="search" type="search" placeholder="Nom du produit">
        <div class="disconnect">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            <span><a href="">Déconnexion</a></span>
        </div>
    </div>
    <div class="gst_stock">
        <h2>Gestion des Stocks</h2>
        <a id="show_prod" href="#">Ajouter produit</a>
    </div>
    <!-- modal add product -->
    <div class="modal-content">
        <h2>Ajouter un Produit</h2>
        <i class="fa fa-times fa-3x cross" aria-hidden="true"></i>

        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" id="add_product">
            <label for="product_name">Nom du produit :</label>
            <input id="product_name" type="text" placeholder="Ex: basket Nike" required>
            <br>
            <label for="product_price">Prix du Produit :</label>
            <input id="product_price" type="text" placeholder="Ex: 23 €" required>
            <br>
            <label for="product_color">Couleur du Produit :</label>
            <input id="product_color" type="text" placeholder="Ex: Rouge">
            <br>
            <label for="product_discription">Description du Produit :</label>
            <textarea id="product_discription" placeholder="Super produit" required></textarea>
            <br>
            <input id="send" class="button success" type="submit" value="Ajouter">
        </form>
    </div>
    <!-- Tableau -->
    <div class="products">
        <h3>List des produits</h3>
        <p id="count"></p>
        <table>
            <thead>
            <tr>
                <th>Référance</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Couleur</th>
                <th>Discription</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody id="Product_list">
            </tbody>
        </table>
    </div>


<?php include "inc/footer.php"; ?>
