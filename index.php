<?php include "inc/head.php"; ?>
<?php   include "inc/navBar.php"; ?>

<?php $products = getProducts(); ?>

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
        <a id="show_prod">Ajouter produit</a>
    </div>
    <!-- modal from product -->
    <div class="modal-content">
        <h2>Ajouter un Produit</h2>
        <i class="fa fa-times fa-3x cross" aria-hidden="true"></i>

        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data" method="POST" id="form_product">
            <label for="product_name">Nom du produit :</label>
            <input id="product_name" name="product_name" type="text" placeholder="Ex: basket Nike" required>
            <br>
            <label for="product_price">Prix du Produit :</label>
            <input id="product_price" name="product_price" type="number" placeholder="Ex: 23 €" required>
            <br>
            <label for="product_color">Couleur du Produit :</label>
            <input id="product_color" name="product_color" type="text" placeholder="Ex: Rouge">
            <br>
            <label for="product_description">Description du Produit :</label>
            <textarea id="product_description" name="product_description" placeholder="Super produit" required></textarea>
            <br>
            <input id="send" class="button success" type="submit" value="Ajouter">
        </form>
    </div>
    <!-- Tableau -->
    <div class="products">
        <h3>List des produits</h3>
        <?php if (isset($products) && !count($products)): ?>
            <p id="count">Pas de produits pour le moment ...</p>
        <?php endif; ?>

        <?php if (isset($products) && count($products)): ?>
        <table>
            <thead>
            <tr>
                <th>Référance</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Couleur</th>
                <th>description</th>
                <th>Modifier</th>
                <th>
                    <input type="submit" id="delete_product" value="Supprimer">
                </th>
            </tr>
            </thead>
            <tbody id="Product_list">
            <?php foreach ($products as $product) {
                echo "<tr data-id-product='$product->id'>";

                foreach ($product as $prop => $val) {
                    $val = isset($val) ? $val : "N.R";
                    echo "<td>" . $val . "</td>";
                }
                echo "<td class='update'>
                    <span class='update-btn'>edit</span>
                </td>";
                echo "<td class='delete'>
                    <input type='checkbox' />
                </td>";
            }
            echo "</tr>";
            ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>


<?php include "inc/footer.php"; ?>
