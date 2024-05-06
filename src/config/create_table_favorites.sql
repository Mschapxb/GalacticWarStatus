-- Active: 1714937649559@@127.0.0.1@3306@galacticwars
DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `planet_name` varchar(255) NOT NULL,
  `fk_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favorites_unique` (`planet_name`,`fk_user_id`),
  KEY `favorites_users_FK` (`fk_user_id`),
  CONSTRAINT `favorites_users_FK` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;