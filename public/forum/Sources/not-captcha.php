<?php
/*
    Based on myWebNotCaptcha 1.2 for Wordpress
    Created by WebJema 2009
    notcaptcha.webjema.com
*/

/*  Copyright (C) 2011 fr3aker

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

if (!defined('SMF'))
	die('Hacking attempt...');

function notCaptcha_CheckRequires() {
	global $txt;

	$ok = true;
	// Test for some required things, print error message if not OK.
	if ( !extension_loaded('gd') || !function_exists('gd_info') ) {
		echo $txt['notcaptcha_gd_not_enabled'];
		$ok = false;
	}
	if ( !function_exists('imagepng') OR !function_exists("imagejpeg") OR !function_exists("imagegif")) {
		echo $txt['notcaptcha_jpegpnggif'];
		$ok = false;
	}
	
	return $ok;
} // notCaptcha_CheckRequires

function notCaptcha_AddCss() {
	global $boardurl, $modSettings;

	echo '
	<!-- NotCaptcha HEAD start -->
	<script type="text/javascript">
		var PLUGIN_URL = "'.$modSettings['notCaptcha']['url'].'";
	</script>
	<script type="text/javascript" src="'.$modSettings['notCaptcha']['url'].'trackbar.js"></script>
	<script type="text/javascript">
	function refresh_security_image() {

		var blank = new String("'.$modSettings['notCaptcha']['url'].'blank.gif");
		document.getElementById("imgonePict").src = blank;
		document.getElementById("imgtwoPict").src = blank;
		document.getElementById("imgthreePict").src = blank;

		var new_url1 = new String("'.$boardurl.'/index.php?action=notCaptcha&amp;i=1&amp;f=");
		var new_url2 = new String("'.$boardurl.'/index.php?action=notCaptcha&amp;i=2&amp;f=");
		var new_url3 = new String("'.$boardurl.'/index.php?action=notCaptcha&amp;i=3&amp;f=");

		// we need a random new url so this refreshes
		new_url1 = new_url1 + Math.floor(Math.random() * 1000);
		new_url2 = new_url2 + Math.floor(Math.random() * 1000);
		new_url3 = new_url3 + Math.floor(Math.random() * 1000);

		document.getElementById("imgonePict").src = new_url1;
		document.getElementById("imgtwoPict").src = new_url2;
		document.getElementById("imgthreePict").src = new_url3;
	}
	</script>
	
	<style type="text/css">
	#captchaImgDiv img {padding:0;margin:0;border:0;display:inline;float:none}
	#captchaImgDiv td {padding:0;margin:0;border:0}
	#captchaImgDiv div {padding:0;margin:0;border:0}
	#captchaImgDiv span {padding:0;margin:0;border:0}
	.imgunit {
		width:'.$modSettings['notCaptcha']['imagesize'].'px;
		height:'.$modSettings['notCaptcha']['imagesize'].'px;
		overflow:hidden;
		padding:0;
		margin:0;
		margin-left:'.round((($modSettings['notCaptcha']['anglescnt']-1)*10-$modSettings['notCaptcha']['imagesize'])/2).'px;
		position: relative; /* IE fix */
	}
	.imgunit img {padding:0;margin:0;position:relative}
	.captchablock {width:'.(($modSettings['notCaptcha']['anglescnt']-1)*10+4).'px; float:left; padding:2px; margin:0;}
	.captchablock img {padding:0;margin:0;border:0;display: inline;}
	/* Reset */
	table.trackbar div, table.trackbar td {margin:0; padding:0;}
	table.trackbar {border-collapse:collapse;border-spacing:0;}
	table.trackbar img{border:0;display: inline;}
	
	/* Styles */
	table.trackbar {width:'.(($modSettings['notCaptcha']['anglescnt']-1)*10).'px; background:repeat-x url('.$modSettings['notCaptcha']['url'].'imgtrackbar/b_bg_on.gif) top left;}
	table.trackbar .l {width:1%; text-align: right; font-size: 1px; background:repeat-x url('.$modSettings['notCaptcha']['url'].'imgtrackbar/b_bg_off.gif) top left;}
	table.trackbar .l div {position:relative; width:0; text-align: right; z-index:500; white-space:nowrap;}
	table.trackbar .l div img {cursor:pointer;}
	table.trackbar .l div span {position:absolute;top:-12px; right:6px; z-index:1000; font:11px tahoma; color:#000;}
	table.trackbar .l div span.limit {text-align:left; position:absolute;top:-12px; right:100%; z-index:100; font:11px tahoma; color:#D0D0D0;}
	table.trackbar .r {position:relative; width:1%; text-align: left; font-size: 1px; background:repeat-x url('.$modSettings['notCaptcha']['url'].'imgtrackbar/b_bg_off.gif) top right; cursor:default;}
	table.trackbar .r div {position:relative; width:0; text-align: left; z-index:500; white-space:nowrap;}
	table.trackbar .r div img {cursor:pointer;}
	table.trackbar .r div span {position:absolute;top:-12px; left:6px; z-index:1000; font:11px tahoma; color:#000;}
	table.trackbar .r div span.limit {position:absolute;top:-12px; left:100%; z-index:100; font:11px tahoma; color:#D0D0D0;}
	table.trackbar .c {font-size:1px; width:100%;}
	</style>
	<!-- NotCaptcha HEAD end -->
	';
} // notCaptcha_AddCss

// this function adds the captcha to the comment form
function notCaptcha_AddToRegisterForm() {
	global $txt, $boardurl, $modSettings;

	// Test for some required things, print error message right here if not OK.
	if (!notCaptcha_CheckRequires())
		return false;

	// the captch html
	echo '
		<script language="javascript" type="text/javascript">
			//<![CDATA[
			document.write(\'<div style="clear:both;">\');
			function setCaptchaValue(id, val) {
				document.getElementById(id+"Field").value = val/10;
				val = -val/10*'.$modSettings['notCaptcha']['imagesize'].' - (val/10);
				document.getElementById(id+"Pict").style.left = val + "px";
			}

			document.write(\'<div class="captchablock">\');
			document.write(\'<div id="imgoneUnit" class="imgunit"><img id="imgonePict" src="'.$boardurl.'/index.php?action=notCaptcha&i=1" alt="" /></div>\');
			document.write(\'<input type="hidden" id="imgoneField" name="imgoneField" value="0" />\');

			trackbar.getObject(\'imgone\').init({
				onMove : function() {
					setCaptchaValue(\'imgone\', this.leftValue);
				},
				dual : false, // two intervals
				width : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // px
				roundUp: 10,
				leftLimit : 0, // unit of value
				leftValue : 0, // unit of value
				rightLimit : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				rightValue : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				clearLimits: 1,
				clearValues: 1 });

			document.write(\'</div>\');

			document.write(\'<div class="captchablock">\');
			document.write(\'<div id="imgtwoUnit" class="imgunit"><img id="imgtwoPict" src="'.$boardurl.'/index.php?action=notCaptcha&i=2" alt="" /></div>\');
			document.write(\'<input type="hidden" id="imgtwoField" name="imgtwoField" value="0">\');

			trackbar.getObject(\'imgtwo\').init({
				onMove : function() {
					setCaptchaValue(\'imgtwo\', this.leftValue);
				},
				dual : false, // two intervals
				width : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // px
				roundUp: 10,
				leftLimit : 0, // unit of value
				leftValue : 0, // unit of value
				rightLimit : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				rightValue : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				clearLimits: 1,
				clearValues: 1 });

			document.write(\'</div>\');

			document.write(\'<div class="captchablock">\');
			document.write(\'<div id="imgthreeUnit" class="imgunit"><img id="imgthreePict" src="'.$boardurl.'/index.php?action=notCaptcha&i=3" alt="" /></div>\');
			document.write(\'<input type="hidden" id="imgthreeField" name="imgthreeField" value="0">\');

			trackbar.getObject(\'imgthree\').init({
				onMove : function() {
					setCaptchaValue(\'imgthree\', this.leftValue);
				},
				dual : false, // two intervals
				width : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // px
				roundUp: 10,
				leftLimit : 0, // unit of value
				leftValue : 0, // unit of value
				rightLimit : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				rightValue : '.(($modSettings['notCaptcha']['anglescnt']-1)*10).', // unit of value
				clearLimits: 1,
				clearValues: 1 });

			document.write(\'</div>\');
			document.write(\'</div>\');
			document.write(\'<div style="clear:both"><small>'.$txt['notcaptcha_move_em'].'</small><br />\');
			document.write(\'<small><b style="cursor:pointer; padding:2px; border-bottom: 1px dashed" onclick="refresh_security_image()">'.$txt['notcaptcha_reload'].'</b></small></div>\');
			// -->
			</script>';	

	echo '<img src="'.$modSettings['notCaptcha']['url'].'blank.gif" width="1" height="1" alt="" />
			<noscript>'.$txt['notcaptcha_nojs'].'</noscript>';

} // notCaptcha_AddToRegisterForm

// this function checks the captcha posted
function notCaptcha_CheckRegisterPostNew() {

	// check if notCaptcha has already been solved, but something other went wrong
	// cookie check is a workaround for some bug
	if (isset($_SESSION['nc_solved']) AND !isset($_COOKIE['nc_answer_1']))
		return;

	global $modSettings;

	if(isset($_SESSION['nc_solved']))
		unset($_SESSION['nc_solved']);

	if (empty($_POST['imgoneField']) AND empty($_POST['imgtwoField']) AND empty($_POST['imgthreeField']))
		return('notcaptcha_error_notdone');

	if (!isset($_SESSION['nc_session']) || $_SESSION['nc_session'] != session_id()) {
		$_SESSION['nc_session'] = session_id();
		return('notcaptcha_error_session');
	}

	if (!isset($_SESSION['nc_tries']))
		$_SESSION['nc_tries'] = 0;

	if ($_SESSION['nc_tries'] > 3) {
		$_SESSION['nc_tries']++;
		setcookie('nc_answer_1','',time() - 3600);
		setcookie('nc_answer_2','',time() - 3600);
		setcookie('nc_answer_3','',time() - 3600);
		return('notcaptcha_error_toomuch');
	}
	
	if (!isset($_COOKIE['nc_answer_1']) OR !isset($_COOKIE['nc_answer_2']) OR !isset($_COOKIE['nc_answer_3']))
		return('notcaptcha_error_cookie');
   
	if (empty($_REQUEST['imgoneField'])) $_POST['imgoneField'] = 0;
	if (empty($_REQUEST['imgtwoField'])) $_POST['imgtwoField'] = 0;
	if (empty($_REQUEST['imgthreeField'])) $_POST['imgthreeField'] = 0;

	$img1_md5 = md5($_SESSION['nc_session'].$_POST['imgoneField'].$modSettings['notCaptcha']['nc_cookie_enc']);
	$img2_md5 = md5($_SESSION['nc_session'].$_POST['imgtwoField'].$modSettings['notCaptcha']['nc_cookie_enc']);
	$img3_md5 = md5($_SESSION['nc_session'].$_POST['imgthreeField'].$modSettings['notCaptcha']['nc_cookie_enc']);

	if (($img1_md5 == $_COOKIE['nc_answer_1']) &&
	   ($img2_md5 == $_COOKIE['nc_answer_2']) &&
	   ($img3_md5 == $_COOKIE['nc_answer_3'])) {
		// ok can continue
		setcookie('nc_answer_1','',time() - 3600);
		setcookie('nc_answer_2','',time() - 3600);
		setcookie('nc_answer_3','',time() - 3600);
		unset($_SESSION['nc_tries']);
		unset($_SESSION['nc_used_images']);
		$_SESSION['nc_solved'] = 1;
	} else {
		$_SESSION['nc_tries']++;
		return('notcaptcha_error_fail');
	}
} // notCaptcha_CheckRegisterPostNew

function notCaptcha_RegistrationDone() {
	unset($_SESSION['nc_solved']);
	unset($_SESSION['nc_session']);
} // notCaptcha_RegistrationDone

global $boardurl, $boarddir;

$modSettings['notCaptcha']['url'] = $boardurl.'/notcaptcha/';
$modSettings['notCaptcha']['path'] = $boarddir.'/notcaptcha';

require_once($modSettings['notCaptcha']['path'].'/notcaptcha_config.php');

$modSettings['notCaptcha']['anglescnt'] = count($modSettings['notCaptcha']['notcaptcha_angles']);

if ($context['current_action'] == 'register')
	$_SESSION['nc_session'] = session_id();

?>