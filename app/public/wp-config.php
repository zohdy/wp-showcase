<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** - Get this infor from your web host ** //
if(file_exists(dirname(__FILE__) . '/local.php')){
	// Local database settings
	define( 'DB_NAME', 'local' );
	define( 'DB_USER', 'root' );
	define( 'DB_PASSWORD', 'root' );
	define( 'DB_HOST', 'localhost' );
} else {
	// Live database settings
	define( 'DB_NAME', '' );
	define( 'DB_USER', '' );
	define( 'DB_PASSWORD', '' );
	define( 'DB_HOST', '' );
}
/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'K6XsChHRE7rSsrkKMyzuLCpyMJ4Z+HwUWf819H7HHvhDyO1/q5+hEi8w4tVDVcwEqAjjKyUnw4jUWS7SmF5YCw==');
define('SECURE_AUTH_KEY',  'oyalq73+aIMYQUasJGpzX9/Xr8wenIPb/FZaK9ih+vLjuDqPGdgEtsOHmzNQ1JLBuFQ48oFMb65uu52n/MCQCg==');
define('LOGGED_IN_KEY',    'cNiWAONNATULroFJ2/u5a//0WC3wDECG3RnLsy8pJjiuiQ2DEeX7kjGDtP+leqCV7ozRCnMKygyfAbsUvCkVMw==');
define('NONCE_KEY',        'Ueuy6ogPdDhhaKzdj+fbenwWegAeX5UlXRH+/QOmM+lgHZTxTVd04ZVccVlwP1CEVViiLGbThQ96ryKhQKuzMA==');
define('AUTH_SALT',        'vhal8m1OO57/1oFB6mOfIRV6hi/e3reNsbm2p11B1RtHctF2uEHSQqnyZOicovx/INFUctLSNaXPGJFiaIoPlw==');
define('SECURE_AUTH_SALT', 'VZwoIpkDO+zYVeu9FB0CzgLNBMwTo/iOiXmwQfWhF1cPh5xZMCItGugYk8NUG6Ra0kcrP9v7+gBh29K84ZASDQ==');
define('LOGGED_IN_SALT',   'FetIGEEpqits2JabFVETZlU8YiSdAXUg58fVLylruH7VY5REti13PGwF4LZfqUdVvI7gLSnpDCeRBm/4VJGMCA==');
define('NONCE_SALT',       'jOXSyP4kMFVTD+Tib26Xqw0kHVX0s36SG7grxSiGSCLMcN1gjR0VtB6hmDDdO3MD7I87QQ4E+idoU3vh64fWlg==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';





/* Inserted by Local by Flywheel. See: http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy */
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) {
	$_SERVER['HTTPS'] = 'on';
}

/* Inserted by Local by Flywheel. Fixes $is_nginx global for rewrites. */
if ( ! empty( $_SERVER['SERVER_SOFTWARE'] ) && strpos( $_SERVER['SERVER_SOFTWARE'], 'Flywheel/' ) !== false ) {
	$_SERVER['SERVER_SOFTWARE'] = 'nginx/1.10.1';
}
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
