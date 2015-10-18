/*
Navicat MySQL Data Transfer

Source Server         : findlove
Source Server Version : 50145
Source Host           : localhost:3306
Source Database       : jcb

Target Server Type    : MYSQL
Target Server Version : 50145
File Encoding         : 65001

Date: 2015-10-18 21:20:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `ID` int(20) NOT NULL DEFAULT '0',
  `ParentID` int(20) DEFAULT NULL,
  `menuLevel` int(20) DEFAULT NULL,
  `menuname` varchar(150) DEFAULT NULL,
  `menupage` varchar(240) DEFAULT NULL,
  `childnum` int(20) DEFAULT NULL,
  `menudes` varchar(300) DEFAULT NULL,
  `menutype` varchar(6) DEFAULT NULL,
  `menuorder` int(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `Operator` varchar(60) DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  `createtime` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', '0', '1', '徽贷宝系统', '', '6', null, '1', '1', '1', '', null, '');
INSERT INTO `t_menu` VALUES ('2', '1', '2', '用户管理', '', '9', null, '1', '2', '1', '', null, '');
INSERT INTO `t_menu` VALUES ('3', '1', '2', '订单管理', '', '7', null, '1', '3', '1', '', null, '');
INSERT INTO `t_menu` VALUES ('4', '1', '2', '产品管理', '', '4', null, '1', '4', '1', '', null, '');
INSERT INTO `t_menu` VALUES ('5', '1', '2', '资金管理', '', '2', null, '1', '5', '2', '', null, '');
INSERT INTO `t_menu` VALUES ('6', '1', '2', '到期付款', ' ', '3', null, '1', '6', '1', null, null, null);
INSERT INTO `t_menu` VALUES ('7', '1', '2', '提现管理', '', '1', null, '1', '7', '1', null, null, null);
INSERT INTO `t_menu` VALUES ('8', '1', '2', '系统消息', ' ', '2', null, '1', '8', '1', null, null, null);
INSERT INTO `t_menu` VALUES ('9', '1', '2', '用户反馈', null, '4', null, '1', '9', '1', null, null, null);
INSERT INTO `t_menu` VALUES ('10', '1', '2', '交易统计', null, '4', null, '1', '10', '1', null, null, null);
INSERT INTO `t_menu` VALUES ('11', '1', '2', 'BANNER管理', null, '4', null, '1', '11', '1', null, null, null);
