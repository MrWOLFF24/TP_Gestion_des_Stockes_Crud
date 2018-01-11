-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  jeu. 11 jan. 2018 à 12:25
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `gestion_stock_crud`
--

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nom` varchar(60) DEFAULT NULL,
  `prix` decimal(10,0) DEFAULT NULL,
  `couleur` varchar(30) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `prix`, `couleur`, `description`) VALUES
  (5, 'genji', '100', 'green', 'js ninja'),
  (6, 'ana', '900', 'bleu', 'sharp shooter'),
  (7, 'roadhog', '588', 'gray', 'pig machine'),
  (8, 'chacale', '5000', 'gray/yellow', 'mad man / sientist'),
  (11, 'salut', '66', 'dqsd', 'dqsdq');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;