/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.4.6-MariaDB : Database - contact_detail
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`contact_detail` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `contact_detail`;

/*Table structure for table `tbl_email_scheduled` */

DROP TABLE IF EXISTS `tbl_email_scheduled`;

CREATE TABLE `tbl_email_scheduled` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT,
  `user_email_address` varchar(2024) DEFAULT NULL,
  `user_subject` varchar(2024) DEFAULT NULL,
  `user_text` varchar(2024) DEFAULT NULL,
  `active_status` tinyint(2) DEFAULT 1 COMMENT '1-active || 2-deactive|| 3-delect',
  `email_status` tinyint(2) DEFAULT 1 COMMENT '1-accept email || 2=reject email',
  `user_mail_schedule_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1126 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
