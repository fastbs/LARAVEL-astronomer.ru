<?php

/**
 * Simple Machines Forum (SMF)
 *
 * @package SMF
 * @author Simple Machines http://www.simplemachines.org
 * @copyright 2011 Simple Machines
 * @license http://www.simplemachines.org/about/smf/license.php BSD
 *
 * @version 2.0
 */

########## Maintenance ##########
# Note: If $maintenance is set to 2, the forum will be unusable!  Change it to 0 to fix it.
$maintenance = 0;		# Set to 1 to enable Maintenance Mode, 2 to make the forum untouchable. (you'll have to make it 0 again manually!)
$mtitle = 'Технические работы';		# Title for the Maintenance Mode message.
$mmessage = 'Форум будет доступен в ближайшее время';		# Description of why the forum is in maintenance mode.

########## Forum Info ##########
$mbname = ' Форум проектов ISON и LFVN ';		# The name of your forum.
$language = 'russian-utf8';		# The default language file set for the forum.
$boardurl = 'http://laravel.loc/forum';		# URL to your forum's folder. (without the trailing /!)
$webmaster_email = 'admin@astronomer.ru';		# Email address to send emails from. (like noreply@yourdomain.com.)
$cookiename = 'SMFCookie973';		# Name of the cookie to set for authentication.

########## Database Info ##########
$db_type = 'mysql';
$db_server = '127.0.0.1';
$db_name = 'lfvn';
$db_user = 'root';
$db_passwd = 'root';
$ssi_db_user = '';
$ssi_db_passwd = '';
$db_prefix = 'smf_';
$db_persist = 0;
$db_error_send = 1;

########## Directories/Files ##########
# Note: These directories do not have to be changed unless you move things.
$boarddir = 'C:/WWW/domains/laravel.loc/public/forum';		# The absolute path to the forum's folder. (not just '.'!)
$sourcedir = 'C:/WWW/domains/laravel.loc/public/forum/Sources';		# Path to the Sources directory.
$cachedir = 'C:/WWW/domains/laravel.loc/public/forum/cache';		# Path to the cache directory.

########## Error-Catching ##########
# Note: You shouldn't touch these settings.
$db_last_error = 0;


# Make sure the paths are correct... at least try to fix them.
if (!file_exists($boarddir) && file_exists(dirname(__FILE__) . '/agreement.txt'))
	$boarddir = dirname(__FILE__);
if (!file_exists($sourcedir) && file_exists($boarddir . '/Sources'))
	$sourcedir = $boarddir . '/Sources';
if (!file_exists($cachedir) && file_exists($boarddir . '/cache'))
	$cachedir = $boarddir . '/cache';

$image_proxy_secret = '306c874dca7f15a24d81';
$image_proxy_maxsize = 5190;
$image_proxy_enabled = 0;
$auth_secret = '128c9feebce3643b3325ba8189d8bb3982a17b6778b7b148934e752cd8db9e28';
$db_character_set = 'utf8';
?>