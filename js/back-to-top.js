/**
 * Back to top button (Customizer > Extras).
 */
( function() {
	'use strict';

	var button = document.querySelector( '.blover-back-to-top' ),
		page = document.getElementById( 'page' ),
		ticking = false;

	if ( ! button || ! page ) {
		return;
	}

	function update() {
		button.classList.toggle( 'is-visible', window.pageYOffset > window.innerHeight );
		ticking = false;
	}

	window.addEventListener( 'scroll', function() {
		if ( ! ticking ) {
			ticking = true;
			window.requestAnimationFrame( update );
		}
	} );

	button.addEventListener( 'click', function() {
		var reduce = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		// Focus the top of the page so the next Tab reaches the skip link.
		page.setAttribute( 'tabindex', '-1' );
		page.style.outline = 'none';
		page.focus( { preventScroll: true } );
		window.scrollTo( { top: 0, behavior: reduce ? 'auto' : 'smooth' } );
	} );

	page.addEventListener( 'blur', function() {
		page.removeAttribute( 'tabindex' );
		page.style.outline = '';
	} );

	update();
}() );
