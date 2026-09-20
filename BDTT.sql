CREATE TABLE client (
  idClient INT AUTO_INCREMENT PRIMARY KEY,
  nomComplet VARCHAR(60) NOT NULL,
  mail VARCHAR(100) UNIQUE NOT NULL,
  numPassport VARCHAR(20),
  mdp VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Structure de la table `carte`
-- --------------------------------------------------------
CREATE TABLE carte (
  numCarte  VARCHAR(16) PRIMARY KEY, 
  dateFin VARCHAR(7) NOT NULL,
  csv INT NOT NULL,
  idClient INT,
  CONSTRAINT fk_carte_client FOREIGN KEY (idClient) REFERENCES client(idClient)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Structure de la table `destination`
-- --------------------------------------------------------
CREATE TABLE destination (
  idDestination INT AUTO_INCREMENT PRIMARY KEY,
  nomDestination VARCHAR(40) NOT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Structure de la table `reservation`
-- --------------------------------------------------------
CREATE TABLE reservation (
  idReservation INT AUTO_INCREMENT PRIMARY KEY,
  idClient INT,
  idDestination INT,
  numCarte VARCHAR(16),
  dateDebut DATE NOT NULL,
  dateFin DATE NOT NULL,
  prix DECIMAL(8,2) NOT NULL,
  CONSTRAINT fk_res_client FOREIGN KEY (idClient) REFERENCES client(idClient),
  CONSTRAINT fk_res_dest FOREIGN KEY (idDestination) REFERENCES destination(idDestination),
  CONSTRAINT fk_res_carte FOREIGN KEY (numCarte) REFERENCES carte(numCarte)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Insertion des données de la table `destination`
-- --------------------------------------------------------
INSERT INTO destination (nomDestination) VALUES
('Hammamet'),
('El Jem'),
('Sbeitla'),
('Tozeur'),
('Djerba');