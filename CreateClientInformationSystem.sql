-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema u17140634_COS301_Client_Information_Database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema u17140634_COS301_Client_Information_Database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `u17140634_COS301_Client_Information_Database` DEFAULT CHARACTER SET utf8 ;
USE `u17140634_COS301_Client_Information_Database` ;

-- -----------------------------------------------------
-- Table `u17140634_COS301_Client_Information_Database`.`clientInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u17140634_COS301_Client_Information_Database`.`clientInfo` (
  `client_id` INT NOT NULL,
  `client_name` VARCHAR(45) NOT NULL,
  `client_surname` VARCHAR(45) NOT NULL,
  `method_of_notification` VARCHAR(45) NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `cell_number` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `home_address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`client_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u17140634_COS301_Client_Information_Database`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u17140634_COS301_Client_Information_Database`.`transactions` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `value_changed` VARCHAR(45) NOT NULL,
  `old_value` VARCHAR(45) NOT NULL,
  `new_value` VARCHAR(45) NOT NULL,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  INDEX `user_id_idx` (`client_id` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `u17140634_COS301_Client_Information_Database`.`clientInfo` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
