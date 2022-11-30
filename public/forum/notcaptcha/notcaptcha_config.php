<?php
/*
* Based on myWebNotCaptcha 1.2 for Wordpress
* Created by WebJema 2009
* notcaptcha.webjema.com
*
* Simple Machines Forum(R) modification by fr3aker
*/

if (!defined('SMF'))
	die('Hacking attempt...');

# gallery folder
$modSettings['notCaptcha']['notcaptcha_imgdir'] = 'notcaptcha/gallery';

# angles of images, you should not add additional angles
$modSettings['notCaptcha']['notcaptcha_angles'] = array(0, 60, 90, 135, 180, 225, 270, 300);

# NOTCAPTCHA image size (width and height)
$modSettings['notCaptcha']['imagesize'] = 50;

# NOTCAPTCHA colors (RGB, 0-255)
$modSettings['notCaptcha']['notcaptcha_delim_color'] = array(0, 0, 0);

# JPEG quality of NOTCAPTCHA image (bigger is better quality, but larger file (image) size). The maximum value is 100
$modSettings['notCaptcha']['notcaptcha_jpeg_quality'] = 75;

// background color
$modSettings['notCaptcha']['nc_back_r'] = 255;
$modSettings['notCaptcha']['nc_back_g'] = 255;
$modSettings['notCaptcha']['nc_back_b'] = 255;

// add noise dots to images; can be true or false; false=disable
$modSettings['notCaptcha']['nc_addnoise'] = false;

// key to encrypt cookies with, enter something random here
$modSettings['notCaptcha']['nc_cookie_enc'] = 'ò0ìdHgbéûµµ3I}$|°úUú"R@ö^° Ü{2òz7z§@VjG:.î=d';

/* end of notcaptcha_config.php */
?>