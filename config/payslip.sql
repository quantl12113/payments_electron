/*
 Navicat Premium Data Transfer

 Source Server         : course_train
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : 192.168.100.8:3306
 Source Schema         : payslip

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : 65001

 Date: 26/09/2019 12:48:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cost
-- ----------------------------
DROP TABLE IF EXISTS `cost`;
CREATE TABLE `cost`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `change_cost` decimal(10, 2) NULL DEFAULT NULL,
  `travel_cost` decimal(10, 2) NULL DEFAULT NULL,
  `other_id` int(10) NULL DEFAULT NULL,
  `other_cost` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of cost
-- ----------------------------
INSERT INTO `cost` VALUES (1, 1, 1111.00, 2222.00, 1, 3333.00);

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name_jp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` date NOT NULL,
  `attach_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES (1, 'VIS001', 'NGUYEN THI HUE', 'グエン　ティ　フエ', 'hue.nt@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (2, 'VIS003', 'THAM KIM DUNG', 'タム　キム　ズン', 'dung.thamkim@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (3, 'VIS004', 'NGUYEN TUAN VU', 'グエン　トアン　ヴー', 'vu.nguyentuan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (4, 'VIS007', 'TRAN VAN TRUONG', 'チャン　ヴァン　チョン', 'truong.tran@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (5, 'VIS009', 'TRAN NGOC BAC', 'チャン　ゴク　バク', 'bac.tran@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (6, 'VIS011', 'LE MINH TIEN', 'レー　ミン　ティエン', 'tien.leminh@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (7, 'VIS014', 'HOANG VAN HIEU', 'ホアン　ヴァン　ヒエウ', 'hieu.hoangvan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (8, 'VIS015', 'NGO HAI VAN', 'ゴー　ハイ　バン', 'van.ngohai@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (9, 'VIS016', 'KIEU XUAN DONG', 'キエウ　スアン　ドン', 'dong.kieuxuan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (10, 'VIS017', 'VO THI XUAN QUYNH', 'ボー テイ　スアン　クイン', 'quynh.vothixuan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (11, 'VIS018', 'NGUYEN TRUNG KIEN', 'グエン　チュン　キエン', 'kien.nguyentrung@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (12, 'VIS019', 'NGUYEN TAM VU', 'グエン　タム　ヴー', 'vu.nguyentam@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (13, 'VIS020', 'NGUYEN XUAN LINH', 'グエン　スアン　リン', 'linh.nguyenxuan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (14, 'VIS022', 'NGUYEN NGOC TAN', 'グエン　ゴク　タン', 'tan.nguyen@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (15, 'VIS023', 'NGUYEN THI PHUONG CHI', 'グエン　テイ　フオン　チー', 'chi.ntt@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (16, 'VIS025', 'DO TUAN ANH', 'ドー　トウアン　アイン', 'anh.dotuan@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (17, 'VIS026', 'DO THI HONG', 'ド　ティ　ホン', 'hong.dothi@vietis.com.vn', '2019-09-20', NULL);
INSERT INTO `employees` VALUES (18, 'VIS027', 'DINH DUC NGHIA', 'ディン ドゥック ギア', 'nghia.dinhduc@vietis.com.vn', '2019-09-20', NULL);

-- ----------------------------
-- Table structure for other
-- ----------------------------
DROP TABLE IF EXISTS `other`;
CREATE TABLE `other`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of other
-- ----------------------------
INSERT INTO `other` VALUES (1, 'Quà 2/9');
INSERT INTO `other` VALUES (2, 'Quà 1/6 cho bé');
INSERT INTO `other` VALUES (3, 'Tiền karaoke');

SET FOREIGN_KEY_CHECKS = 1;
