-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.32-log - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Дамп структуры для таблица smf2.smf_smileys
DROP TABLE IF EXISTS `smf_smileys`;
CREATE TABLE IF NOT EXISTS `smf_smileys` (
  `id_smiley` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL DEFAULT '',
  `filename` varchar(48) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '',
  `smiley_row` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `smiley_order` smallint(5) unsigned NOT NULL DEFAULT '0',
  `hidden` tinyint(4) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_smiley`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы smf2.smf_smileys: 39 rows
/*!40000 ALTER TABLE `smf_smileys` DISABLE KEYS */;
INSERT INTO `smf_smileys` (`id_smiley`, `code`, `filename`, `description`, `smiley_row`, `smiley_order`, `hidden`) VALUES
	(20, ':mrgreen:', 'icon_mrgreen.gif', 'Ржу', 1, 19, 0),
	(5, '>:(', 'angry.gif', 'Злой', 0, 4, 0),
	(9, '???', 'huh.gif', 'Непонимающий', 0, 8, 0),
	(10, '::)', 'rolleyes.gif', 'Строит глазки', 0, 9, 0),
	(12, ':-[', 'embarrassed.gif', 'Обеспокоенный', 0, 11, 0),
	(13, ':-X', 'lipsrsealed.gif', 'Рот на замке', 0, 12, 0),
	(14, ':-\\', 'undecided.gif', 'В замешательстве', 0, 13, 0),
	(15, ':-*', 'kiss.gif', 'Целующий', 0, 14, 0),
	(16, ':\'(', 'cry.gif', 'Плачущий', 0, 15, 0),
	(17, '>:D', 'evil.gif', 'Злой', 0, 16, 1),
	(18, '^-^', 'azn.gif', 'Azn', 0, 17, 1),
	(1, ':)', 'smiley.gif', 'Улыбка', 0, 0, 0),
	(2, ';)', 'wink.gif', 'Подмигивающий', 0, 1, 0),
	(3, ':D', 'cheesy.gif', 'Веселый', 0, 2, 0),
	(4, ';D', 'grin.gif', 'Смеющийся', 0, 3, 0),
	(6, ':(', 'sad.gif', 'Грустный', 0, 5, 0),
	(7, ':o', 'shocked.gif', 'Шокирован', 0, 6, 0),
	(8, '8)', 'cool.gif', 'Крутой', 0, 7, 0),
	(11, ':P', 'tongue.gif', 'Показывает язык', 0, 10, 0),
	(19, 'O0', 'afro.gif', 'Афро', 0, 18, 1),
	(21, ':mad:', 'mad.gif', 'Злой', 1, 20, 0),
	(22, ':alc:', 'alc.gif', 'Пьянка', 1, 21, 0),
	(23, ':ban:', 'ban.gif', 'Бан', 1, 22, 0),
	(24, ':box:', 'box2.gif', 'Бокс', 1, 23, 0),
	(25, ':bud:', 'bud.gif', 'Будённый', 1, 24, 0),
	(26, ':crazy:', 'crazy.gif', 'Псих', 1, 25, 0),
	(27, ':duel:', 'duel.gif', 'Дуэль', 1, 26, 0),
	(28, ':fkr:', 'fkr.gif', 'Ф. Крюгер', 1, 27, 0),
	(29, ':hah:', 'hah.gif', 'Ха-ха-ха', 1, 28, 0),
	(30, ':hlp:', 'hlp.gif', 'Help!', 1, 29, 0),
	(31, ':iq:', 'iq.gif', 'Нечто', 1, 30, 0),
	(32, ':kult:', 'kult.gif', 'Качок', 1, 31, 0),
	(33, ':lam:', 'lam.gif', 'Ламер', 1, 32, 0),
	(34, ':nunu:', 'nunu.gif', 'Ну-ну', 1, 33, 0),
	(35, ':pop:', 'pop.gif', 'Поп', 1, 34, 0),
	(36, ':rev:', 'rev.gif', 'Реверанс', 1, 35, 0),
	(37, ':umn:', 'umn.gif', 'Умник', 1, 36, 0),
	(38, ':vis:', 'vis.gif', 'Виселица', 1, 37, 0),
	(39, ':facepalm:', 'facepalm.gif', 'Рука-Лицо', 1, 38, 0);
/*!40000 ALTER TABLE `smf_smileys` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
