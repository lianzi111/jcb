/*
Navicat MySQL Data Transfer

Source Server         : findlove
Source Server Version : 50145
Source Host           : localhost:3306
Source Database       : jcb

Target Server Type    : MYSQL
Target Server Version : 50145
File Encoding         : 65001

Date: 2015-10-18 21:20:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_manageraccount`
-- ----------------------------
DROP TABLE IF EXISTS `t_manageraccount`;
CREATE TABLE `t_manageraccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userCode` varchar(200) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `userName` varchar(20) DEFAULT NULL,
  `registTime` varchar(20) DEFAULT NULL,
  `createTime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_manageraccount
-- ----------------------------
INSERT INTO `t_manageraccount` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70', null, '管理员', null, null);
