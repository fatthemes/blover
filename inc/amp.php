<?php
/**
 * AMP support
 * 
 * @package blover
 */
add_action( 'amp_post_template_css', 'blover_amp_additional_css_styles' );

function blover_amp_additional_css_styles( $amp_template ) {
	?>
	body {
		font-family: 'Amiri', 'Merriweather', 'Times New Roman', Times, Serif;
	}
	a, a:visited {
		color: #000;
	}
	.amp-wp-header {
		background-color: #fff;
		border-bottom: 1px solid #ddd;
		box-shadow: 0 1px 4px #ddd;
	}
	.amp-wp-header a {
		color: #000;
	}
	.amp-wp-header .amp-wp-site-icon {
		background-color: #ccc;
	}
	.amp-wp-title {
		font-family: 'Amiri', 'Merriweather', 'Times New Roman', Times, Serif;
	}
	.amp-wp-meta, .amp-wp-header div, .wp-caption-text, .amp-wp-tax-category, .amp-wp-tax-tag, .amp-wp-comments-link, .amp-wp-footer p, .back-to-top {
		font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif;
	}
	.amp-wp-comments-link a {
		border-color: #000;
		border-width: 1px;
		border-radius: 0;
		color: #000;
		font-weight: normal;
		text-transform: uppercase;
	}
	<?php
}

add_action( 'amp_post_template_head', 'blover_amp_post_template_head' );

function blover_amp_post_template_head() {
	?>
	<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
	<?php
}
