CREATE OR REPLACE TABLE `Benutzer` (
	`User_ID` INTEGER AUTO_INCREMENT,
	`Vorname` VARCHAR(255),
	`Nachname` VARCHAR(255),
	`Strasse` VARCHAR(255),
	`PLZ` VARCHAR(20),
	`Ort` VARCHAR(255),
	`Email` VARCHAR(255),
	`Passwort` VARCHAR(255),
	PRIMARY KEY(`User_ID`)
);

CREATE OR REPLACE TABLE `Rolle` (
	`Rollennummer` INTEGER AUTO_INCREMENT,
	`Berechtigung` VARCHAR(255),
	`Bezeichnung` VARCHAR(255),
	PRIMARY KEY(`Rollennummer`)
);

CREATE OR REPLACE TABLE `Benutzer_hat_Rolle` (
	`User_ID` INTEGER,
	`Rollennummer` INTEGER,
	PRIMARY KEY(`User_ID`, `Rollennummer`)
);

CREATE OR REPLACE TABLE `Location` (
	`Location_ID` INTEGER AUTO_INCREMENT,
	`Strasse` VARCHAR(255),
	`PLZ` VARCHAR(20),
	`Ort` VARCHAR(255),
	`Raumname` VARCHAR(255),
	PRIMARY KEY(`Location_ID`)
);

CREATE OR REPLACE TABLE `Kurs` (
	`Kurs_ID` INTEGER AUTO_INCREMENT,
	`Titel` VARCHAR(255),
	`Teilnehmerobergrenze` INTEGER,
	`Zeit_der_Veranstaltung` DATETIME,
	`Preis` DECIMAL,
	`Location_ID` INTEGER,
	PRIMARY KEY(`Kurs_ID`)
);

CREATE OR REPLACE TABLE `Produkt` (
	`Artikelnummer` INTEGER AUTO_INCREMENT,
	`Bezeichnung` VARCHAR(255),
	`Beschreibung` TEXT,
	`Bestand` INTEGER,
	`Preis` DECIMAL,
	PRIMARY KEY(`Artikelnummer`)
);

CREATE OR REPLACE TABLE `Bestellung` (
	`Bestellungs_ID` INTEGER AUTO_INCREMENT,
	`Bestellungsdatum` DATETIME,
	`Bestellstatus` VARCHAR(50),
	`User_ID` INTEGER,
	PRIMARY KEY(`Bestellungs_ID`)
);

CREATE OR REPLACE TABLE `Bestellposition_Produkt` (
	`Bestellungs_ID` INTEGER,
	`Artikelnummer` INTEGER,
	`Menge` INTEGER,
	PRIMARY KEY(`Bestellungs_ID`, `Artikelnummer`)
);

CREATE OR REPLACE TABLE `Bestellposition_Kurs` (
	`Bestellungs_ID` INTEGER,
	`Kurs_ID` INTEGER,
	`Anzahl_Teilnehmer` INTEGER,
	PRIMARY KEY(`Bestellungs_ID`, `Kurs_ID`)
);

ALTER TABLE `Benutzer_hat_Rolle`
ADD FOREIGN KEY(`User_ID`) REFERENCES `Benutzer`(`User_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Benutzer_hat_Rolle`
ADD FOREIGN KEY(`Rollennummer`) REFERENCES `Rolle`(`Rollennummer`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Kurs`
ADD FOREIGN KEY(`Location_ID`) REFERENCES `Location`(`Location_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Bestellung`
ADD FOREIGN KEY(`User_ID`) REFERENCES `Benutzer`(`User_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Bestellposition_Produkt`
ADD FOREIGN KEY(`Bestellungs_ID`) REFERENCES `Bestellung`(`Bestellungs_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Bestellposition_Produkt`
ADD FOREIGN KEY(`Artikelnummer`) REFERENCES `Produkt`(`Artikelnummer`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Bestellposition_Kurs`
ADD FOREIGN KEY(`Bestellungs_ID`) REFERENCES `Bestellung`(`Bestellungs_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Bestellposition_Kurs`
ADD FOREIGN KEY(`Kurs_ID`) REFERENCES `Kurs`(`Kurs_ID`)
ON UPDATE NO ACTION ON DELETE NO ACTION;