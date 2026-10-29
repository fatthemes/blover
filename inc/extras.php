<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package blover
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function blover_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	if ( get_theme_mod( 'blover_wide_alignment', 0 ) && blover_is_no_sidebar_layout() ) {
		$classes[] = 'blover-wide-alignment';
	}

	if ( get_theme_mod( 'blover_back_to_top', 0 ) ) {
		$classes[] = 'blover-has-back-to-top';
	}

	return $classes;
}
add_filter( 'body_class', 'blover_body_classes' );

/**
 * Whether the current post or page is shown without a sidebar.
 *
 * @return bool
 */
function blover_is_no_sidebar_layout() {
	if ( is_page_template( 'template-page-nosidebar.php' ) ) {
		return true;
	}

	if ( is_singular( 'post' ) ) {
		return ! get_theme_mod( 'single_post_sidebar', 1 ) || ! is_active_sidebar( 'sidebar-1' );
	}

	return is_page() && ! is_page_template() && ! is_active_sidebar( 'sidebar-1' );
}

/**
 * Turn on the Extras features for new activations, without touching saved settings.
 */
function blover_set_new_activation_defaults() {
	$mods = get_theme_mods();

	// Known limit: a returning Blover user who never saved these settings also gets them on.
	foreach ( array( 'blover_wide_alignment', 'blover_back_to_top', 'blover_author_box' ) as $mod ) {
		if ( ! is_array( $mods ) || ! array_key_exists( $mod, $mods ) ) {
			set_theme_mod( $mod, 1 );
		}
	}
}
add_action( 'after_switch_theme', 'blover_set_new_activation_defaults' );
