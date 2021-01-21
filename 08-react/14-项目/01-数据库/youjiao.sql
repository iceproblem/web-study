/*
SQLyog Ultimate v11.25 (64 bit)
MySQL - 5.7.24 : Database - youjiao
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`youjiao` /*!40100 DEFAULT CHARACTER SET gbk COLLATE gbk_bin */;

USE `youjiao`;

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values ('1M_pw8lHa9jLlARx2jese-ob8IhrC-td',1604732073,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-11-07T06:54:33.261Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('4jJ2cImr0WceWJv1Aes-3st66MsQUfsQ',1604734634,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-11-07T07:37:14.355Z\",\"httpOnly\":true,\"path\":\"/\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwicGFzc3dvcmQiOiI3ZTRiZTlhZGNjZjk2Yjk1YzhiMjUyYTZmNmVmNWRhOCIsImlhdCI6MTYwNDY0Njg3Mn0.tNR9GPH8Hbuc54YrW_FChR_Czv_d_eYzxrwKKWaeUG4\"}'),('TpxzMpEX-KYxjmFDAjAYAudnzQ8NBl55',1604732016,'{\"cookie\":{\"originalMaxAge\":86399995,\"expires\":\"2020-11-07T06:53:36.327Z\",\"httpOnly\":true,\"path\":\"/\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwicGFzc3dvcmQiOiI3ZTRiZTlhZGNjZjk2Yjk1YzhiMjUyYTZmNmVmNWRhOCIsImlhdCI6MTYwNDQ3Njc4MH0.dPzBd-Cm12ScgDpnFo7iaPaA5KIo1tFCbqOZCiBt2bk\"}'),('_T-jFHpG58v0w2E_5ZFh7a_OREMxipsx',1604732059,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-11-07T06:54:19.243Z\",\"httpOnly\":true,\"path\":\"/\"}}');

/*Table structure for table `t_activities` */

DROP TABLE IF EXISTS `t_activities`;

CREATE TABLE `t_activities` (
  `activities_tag` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activities_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '活动标题',
  `activities_time` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '活动时间',
  `activities_img` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '活动封面',
  `activities_price` float(10,2) NOT NULL COMMENT '活动价格',
  `activities_tag_id` int(11) DEFAULT NULL COMMENT '活动标签',
  `activities_count` int(11) NOT NULL DEFAULT '0' COMMENT '活动报名人数',
  `activities_address_id` int(11) NOT NULL COMMENT '活动地点id',
  `activities_object_id` int(11) NOT NULL COMMENT '所属招生对象id',
  `activities_bus_day_id` int(11) NOT NULL COMMENT '营期',
  `activities_intro` longtext COLLATE gbk_bin COMMENT '活动介绍',
  `activities_trip` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '活动行程安排',
  `activities_days` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '开营时间',
  `activities_notice` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '报名须知',
  `is_focus` int(1) DEFAULT '0' COMMENT '0不上轮播图, 1上轮播图',
  `focus_img` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '轮播图图片',
  `buy_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_activities` */

insert  into `t_activities`(`activities_tag`,`id`,`activities_name`,`activities_time`,`activities_img`,`activities_price`,`activities_tag_id`,`activities_count`,`activities_address_id`,`activities_object_id`,`activities_bus_day_id`,`activities_intro`,`activities_trip`,`activities_days`,`activities_notice`,`is_focus`,`focus_img`,`buy_count`) values ('11',2,'1','2020-10-27 14:36:21','/uploads/images/activities/1604644594425.jpg',1.00,NULL,0,2,1,1,'<p>111</p>','<p>111</p>','<p>111</p>','<p>111</p>',0,'/uploads/images/activities/1604644597666.jpg',NULL),('htxl',3,'111','2020-11-11 15:33:44','/uploads/images/activities/1604648040274.jpg',11.00,NULL,0,2,2,3,'<p><span style=\"color:#000000\"><span style=\"background-color:#ffffff\"><span style=\"font-size:30px\"><strong>活动介绍</strong></span></span></span></p><p></p><div class=\"media-wrap image-wrap\"><img src=\"http://localhost:5000/uploads/images/activities/1604648059681.jpg\"/></div><p></p>','<p><span style=\"color:#000000\"><span style=\"font-size:14px\"><span style=\"background-color:#ffffff\">行程安排</span></span></span></p>','<p><span style=\"color:#000000\"><span style=\"font-size:14px\"><span style=\"background-color:#ffffff\">开营日期</span></span></span></p>','<p><span style=\"color:#000000\"><span style=\"font-size:14px\"><span style=\"background-color:#ffffff\">报名须知</span></span></span></p>',0,'/uploads/images/activities/1604648045421.jpg',NULL);

/*Table structure for table `t_activities_address` */

DROP TABLE IF EXISTS `t_activities_address`;

CREATE TABLE `t_activities_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activities_address` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '活动地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_activities_address` */

insert  into `t_activities_address`(`id`,`activities_address`) values (1,'北京'),(2,'上海'),(3,'南京'),(4,'杭州'),(5,'深圳');

/*Table structure for table `t_activities_bus` */

DROP TABLE IF EXISTS `t_activities_bus`;

CREATE TABLE `t_activities_bus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activities_bus_day` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '营期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_activities_bus` */

insert  into `t_activities_bus`(`id`,`activities_bus_day`) values (1,'1天'),(2,'2天'),(3,'3天'),(4,'4天'),(5,'5天'),(6,'6天'),(7,'7天');

/*Table structure for table `t_activities_object` */

DROP TABLE IF EXISTS `t_activities_object`;

CREATE TABLE `t_activities_object` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activities_object_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '招生对象',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_activities_object` */

insert  into `t_activities_object`(`id`,`activities_object_name`) values (1,'全部托班（2-3岁）'),(2,'小班（3-4岁）'),(3,'中班（4-5岁）'),(4,'大班（5-6岁）');

/*Table structure for table `t_activities_tag` */

DROP TABLE IF EXISTS `t_activities_tag`;

CREATE TABLE `t_activities_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activities_tag_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '活动标签',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_activities_tag` */

insert  into `t_activities_tag`(`id`,`activities_tag_name`) values (1,'体验军旅'),(2,'军事拓展'),(3,'实弹射击');

/*Table structure for table `t_admin` */

DROP TABLE IF EXISTS `t_admin`;

CREATE TABLE `t_admin` (
  `id` int(11) NOT NULL,
  `account` varchar(255) COLLATE gbk_bin NOT NULL,
  `password` varchar(255) COLLATE gbk_bin NOT NULL,
  `account_name` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `account_icon` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_admin` */

insert  into `t_admin`(`id`,`account`,`password`,`account_name`,`account_icon`) values (1,'admin','7e4be9adccf96b95c8b252a6f6ef5da8','xiaoqiang','http://localhost:5000/uploads/images/admin/1604646902746.png');

/*Table structure for table `t_home_message` */

DROP TABLE IF EXISTS `t_home_message`;

CREATE TABLE `t_home_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_keyword` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_des` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_job` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_copy` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_bei` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `site_logo` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_home_message` */

insert  into `t_home_message`(`id`,`site_name`,`site_keyword`,`site_des`,`site_job`,`site_copy`,`site_bei`,`site_logo`) values (1,'fds','fsda','fsad',NULL,'fsadf','fsdf','/uploads/images/home/1604645177514.png');

/*Table structure for table `t_job` */

DROP TABLE IF EXISTS `t_job`;

CREATE TABLE `t_job` (
  `buy_count` int(11) DEFAULT NULL,
  `job_publish_time` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '职场人生标题',
  `job_img` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '职场人生封面',
  `job_author` varchar(255) COLLATE gbk_bin NOT NULL,
  `job_time` varchar(255) COLLATE gbk_bin NOT NULL DEFAULT '0' COMMENT '文章发布时间',
  `job_views` int(11) NOT NULL DEFAULT '0',
  `job_content` varchar(255) COLLATE gbk_bin NOT NULL,
  `job_pre_edu_id` int(11) NOT NULL,
  `job_family_edu_id` int(11) NOT NULL,
  `is_focus` int(1) NOT NULL DEFAULT '0' COMMENT '是否上轮播图, 0不上, 1上',
  `focus_img` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '轮播图图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_job` */

insert  into `t_job`(`buy_count`,`job_publish_time`,`id`,`job_name`,`job_img`,`job_author`,`job_time`,`job_views`,`job_content`,`job_pre_edu_id`,`job_family_edu_id`,`is_focus`,`focus_img`) values (100,'2020-11-06 13:27:57',2,'11','/uploads/images/lifejob/1604640469930.jpg','11','0',0,'<p>1212</p>',2,1,0,'/uploads/images/lifejob/1604640473431.jpg');

/*Table structure for table `t_job_family` */

DROP TABLE IF EXISTS `t_job_family`;

CREATE TABLE `t_job_family` (
  `id` int(11) NOT NULL,
  `job_family_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '家园共育培训',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_job_family` */

insert  into `t_job_family`(`id`,`job_family_name`) values (1,'全部幼小衔接'),(2,'亲子活动案例');

/*Table structure for table `t_job_pre` */

DROP TABLE IF EXISTS `t_job_pre`;

CREATE TABLE `t_job_pre` (
  `id` int(11) NOT NULL,
  `pre_edu_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '学前教师培训',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_job_pre` */

insert  into `t_job_pre`(`id`,`pre_edu_name`) values (1,'学前教育发展最新趋势'),(2,'学前教育基础理论'),(3,'教育活动设计主要策略');

/*Table structure for table `t_live` */

DROP TABLE IF EXISTS `t_live`;

CREATE TABLE `t_live` (
  `buy_count` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `live_title` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '直播标题',
  `live_img` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '直播封面',
  `live_time` varchar(255) COLLATE gbk_bin NOT NULL DEFAULT '0' COMMENT '直播时间',
  `live_author` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '直播作者',
  `live_url` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '直播跳转地址',
  `live_price` float(10,2) NOT NULL DEFAULT '0.00' COMMENT '直播价格',
  `live_person_id` int(11) NOT NULL COMMENT '直播适用人群',
  `live_theme_id` int(11) NOT NULL COMMENT '直播内容主题id',
  `is_focus` int(1) NOT NULL DEFAULT '0' COMMENT '是否上轮播图, 0不上, 1上',
  `focus_img` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '轮播图图片',
  `live_begin_time` time DEFAULT NULL,
  `live_end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_live` */

insert  into `t_live`(`buy_count`,`id`,`live_title`,`live_img`,`live_time`,`live_author`,`live_url`,`live_price`,`live_person_id`,`live_theme_id`,`is_focus`,`focus_img`,`live_begin_time`,`live_end_time`) values (100,2,'直播课名称666','/uploads/images/live/1604552744651.jpg','0','直播课作者','baidu.com',11.00,1,1,1,'/uploads/images/live/1604552748771.jpg','15:38:21','15:38:24'),(300,3,'直播课名称','/uploads/images/live/1604556697355.jpg','0','直播课作者','baidu.com',11.00,1,1,1,'/uploads/images/live/1604556704037.jpg','14:11:26','14:11:26'),(500,4,'1234567890','/uploads/images/live/1604557645650.jpg','0','直播课作者','baidu.com',11.00,1,1,1,'/uploads/images/live/1604557650067.jpg','00:00:47','15:41:39'),(NULL,6,'直播课名称','/uploads/images/live/1604557698349.jpg','0','直播课作者','baidu.com',11.00,1,2,0,'/uploads/images/live/1604557702360.png','14:28:09','14:28:09'),(NULL,7,'直播课名称','/uploads/images/live/1604646977464.jpg','0','直播课作者','baidu.com',11.00,1,1,0,'/uploads/images/live/1604646982055.jpg','04:11:11','04:15:25');

/*Table structure for table `t_live_person` */

DROP TABLE IF EXISTS `t_live_person`;

CREATE TABLE `t_live_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `live_person_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '适用人群',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_live_person` */

insert  into `t_live_person`(`id`,`live_person_name`) values (1,'园长'),(2,'教师'),(3,'家长');

/*Table structure for table `t_live_theme` */

DROP TABLE IF EXISTS `t_live_theme`;

CREATE TABLE `t_live_theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `live_theme_title` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '直播主题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_live_theme` */

insert  into `t_live_theme`(`id`,`live_theme_title`) values (1,'园所管理'),(2,'园所理念'),(3,'园所发展');

/*Table structure for table `t_resource` */

DROP TABLE IF EXISTS `t_resource`;

CREATE TABLE `t_resource` (
  `buy_count` int(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(255) COLLATE gbk_bin NOT NULL,
  `resource_author` varchar(255) COLLATE gbk_bin NOT NULL,
  `resource_views` int(11) NOT NULL,
  `resource_publish_time` varchar(255) COLLATE gbk_bin NOT NULL,
  `resource_content` varchar(255) COLLATE gbk_bin NOT NULL,
  `resource_category_id` int(11) NOT NULL,
  `resource_classes_id` int(11) NOT NULL COMMENT '资源班级',
  `resource_area_id` int(11) NOT NULL COMMENT '资源领域',
  `resource_meta_id` int(11) unsigned NOT NULL COMMENT '资源素材',
  `resource_format_id` int(11) NOT NULL,
  `resource_img` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '资源列表封面图',
  `resource_price` float(10,2) DEFAULT NULL COMMENT '资源的价格',
  `is_focus` int(1) NOT NULL DEFAULT '0' COMMENT '是否上轮播图, 0不上,  1伤 ',
  `focus_img` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '轮播图图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource` */

insert  into `t_resource`(`buy_count`,`id`,`resource_name`,`resource_author`,`resource_views`,`resource_publish_time`,`resource_content`,`resource_category_id`,`resource_classes_id`,`resource_area_id`,`resource_meta_id`,`resource_format_id`,`resource_img`,`resource_price`,`is_focus`,`focus_img`) values (100,1,'1222','1',0,'2020-11-06 14:10:51','1604643039772',1,1,1,1,1,'/uploads/images/resource/1604643028817.jpg',11.00,0,'/uploads/images/resource/1604643032364.png'),(2000,2,'1','1',0,'2020-11-06 14:12:56','1604643176246',1,1,1,2,1,'/uploads/images/resource/1604643166754.jpg',11.00,0,'/uploads/images/resource/1604643170004.jpg');

/*Table structure for table `t_resource_area` */

DROP TABLE IF EXISTS `t_resource_area`;

CREATE TABLE `t_resource_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_name` varchar(255) COLLATE gbk_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_area` */

insert  into `t_resource_area`(`id`,`area_name`) values (1,'健康'),(2,'语言'),(3,'社会'),(4,'科学'),(5,'艺术');

/*Table structure for table `t_resource_category` */

DROP TABLE IF EXISTS `t_resource_category`;

CREATE TABLE `t_resource_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE gbk_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_category` */

insert  into `t_resource_category`(`id`,`category_name`) values (1,'教学小助手'),(2,'亲子小学堂'),(3,'培训教室'),(4,'GT课程');

/*Table structure for table `t_resource_classes` */

DROP TABLE IF EXISTS `t_resource_classes`;

CREATE TABLE `t_resource_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classes_name` varchar(255) COLLATE gbk_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_classes` */

insert  into `t_resource_classes`(`id`,`classes_name`) values (1,'托班'),(2,'小班'),(3,'中班'),(4,'大班');

/*Table structure for table `t_resource_file` */

DROP TABLE IF EXISTS `t_resource_file`;

CREATE TABLE `t_resource_file` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `name` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `uid` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  `tag` varchar(255) COLLATE gbk_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_file` */

insert  into `t_resource_file`(`id`,`url`,`name`,`uid`,`tag`) values (00000000001,'uploads/resource/1604642255363.jpg','lives_con_pic_1.jpg','1604642255363.jpg','1604642259481'),(00000000002,'uploads/resource/1604642852647.jpg','banner_live.jpg','1604642852647.jpg','1604642855179'),(00000000004,'uploads/resource/1604643037790.png','01.png','1604643037790.png','1604643039772'),(00000000005,'uploads/resource/1604643077981.png','01.png','1604643077981.png','1604643079981'),(00000000006,'uploads/resource/1604643174710.jpg','02.jpg','1604643174710.jpg','1604643176246');

/*Table structure for table `t_resource_format` */

DROP TABLE IF EXISTS `t_resource_format`;

CREATE TABLE `t_resource_format` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `format_name` varchar(255) COLLATE gbk_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_format` */

insert  into `t_resource_format`(`id`,`format_name`) values (1,'图片'),(2,'文档'),(3,'音频'),(4,'视频'),(5,'课件');

/*Table structure for table `t_resource_meta` */

DROP TABLE IF EXISTS `t_resource_meta`;

CREATE TABLE `t_resource_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mate_name` varchar(255) COLLATE gbk_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_resource_meta` */

insert  into `t_resource_meta`(`id`,`mate_name`) values (1,'教学设计'),(2,'教学课件');

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '会员名',
  `user_password` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '登录密码',
  `user_phone` varchar(255) COLLATE gbk_bin NOT NULL COMMENT '用户手机号码',
  `user_count_money` float(10,2) DEFAULT NULL COMMENT '用户账户总学习币',
  `user_intro` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '用户介绍',
  `user_icon` varchar(255) COLLATE gbk_bin DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user` */

/*Table structure for table `t_user_account` */

DROP TABLE IF EXISTS `t_user_account`;

CREATE TABLE `t_user_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `account_change_time` varchar(255) COLLATE gbk_bin NOT NULL,
  `account_change_money` float(10,2) NOT NULL,
  `account_change_method` int(1) NOT NULL DEFAULT '0' COMMENT '0代表充值, 1代表支出',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user_account` */

/*Table structure for table `t_user_activities` */

DROP TABLE IF EXISTS `t_user_activities`;

CREATE TABLE `t_user_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `activities_id` int(11) NOT NULL COMMENT '报名活动的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user_activities` */

/*Table structure for table `t_user_fav` */

DROP TABLE IF EXISTS `t_user_fav`;

CREATE TABLE `t_user_fav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `resource_id` int(11) DEFAULT NULL COMMENT '收藏资源id',
  `activities_id` int(11) DEFAULT NULL COMMENT '收藏活动id',
  `live_id` int(11) DEFAULT NULL COMMENT '收藏直播id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user_fav` */

/*Table structure for table `t_user_live` */

DROP TABLE IF EXISTS `t_user_live`;

CREATE TABLE `t_user_live` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `live_id` int(11) NOT NULL COMMENT '直播id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user_live` */

/*Table structure for table `t_user_resource` */

DROP TABLE IF EXISTS `t_user_resource`;

CREATE TABLE `t_user_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '当前用户id',
  `resource_id` int(11) NOT NULL COMMENT '资源id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

/*Data for the table `t_user_resource` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
