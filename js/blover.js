
(function($){
     'use strict';

$(document).ready(function($) {

   var $bloverSecondary = $('#secondary');

  if(typeof $.fn.theiaStickySidebar === 'function'){
      $bloverSecondary.theiaStickySidebar({
        additionalMarginTop: 126 //Number(bloverCustomScript.fatNavbarHeight)
      });
  }

if (typeof $.fn.slick === 'function'){

var $bloverFeaturedSliderImage = $('.blover-featured-slider-wrapper');

$bloverFeaturedSliderImage.show();
// // Slick slider
$('.blover-featured-slider').slick({
  infinite: true,
  autoplay: Boolean(blover.home_page_slider_autoplay),
  autoplaySpeed: Number(blover.home_page_slider_play_speed),
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        //variableWidth: false
      }
    }
  ]
});
}

// Top search panelchange image url to placeholder url in xml
var $bloverSearchPanel = $('.blover-search-panel');
var $bloverSearchToggle = $('.search-toggle');

	// aria-expanded is the state, so clicks during the slide animation stay in sync.
	var bloverSearchPanelToggle = function() {
	    var open = $bloverSearchToggle.attr( 'aria-expanded' ) !== 'true';

	    $bloverSearchToggle.attr( 'aria-expanded', String( open ) );
	    $bloverSearchPanel.slideToggle(250).css('z-index', open ? '1001' : '');

	    if ( open ) {
		$bloverSearchPanel.promise().done( function() {
		    $bloverSearchPanel.find( '.search-field' ).trigger( 'focus' );
		});
	    } else {
		$bloverSearchToggle.trigger( 'focus' );
	    }
	};

	$bloverSearchToggle.on( 'click', bloverSearchPanelToggle );
	$('.blover-search-panel-close').on( 'click', bloverSearchPanelToggle );

	// Open a dropdown leftwards when it would run past the right edge of the window.
	var bloverSubmenuFlip = function( li ) {
	    var $submenu = $( li ).children( 'ul' );
	    var $parentItem = $( li ).parent().closest( 'li' );
	    if ( $submenu.length ) {
		var rect = li.getBoundingClientRect();
		var width = $submenu.outerWidth();
		var flip = rect.left + width > document.documentElement.clientWidth;
		if ( $parentItem.length ) {
		    // Under a submenu that already opened leftwards, keep going left while there is room.
		    flip = rect.right + width > document.documentElement.clientWidth || ( $parentItem.hasClass( 'blover-submenu-flip' ) && $parentItem.parent().closest( 'li' ).length > 0 && rect.left >= width );
		}
		$( li ).toggleClass( 'blover-submenu-flip', flip );
	    }
	};

	$( '#top-navigation' ).on( 'mouseenter', 'li', function() {
	    bloverSubmenuFlip( this );
	});

	// Whether focus came from the keyboard; browsers without :focus-visible count all focus.
	var bloverFocusVisible = function( el ) {
	    try {
		return el.matches( ':focus-visible' );
	    } catch ( err ) {
		return true;
	    }
	};

	// Hold a dropdown open while keyboard focus is inside its item (style.css expects .focus).
	$( '#top-navigation' ).on( 'focusin focusout', function( e ) {
	    var $items = $( e.target ).parents( 'li' ).toggleClass( 'focus', e.type === 'focusin' && bloverFocusVisible( e.target ) );

	    if ( e.type === 'focusin' ) {
		// Outer menus first, so each one is open and placed before the next is measured.
		$( $items.get().reverse() ).each( function() {
		    bloverSubmenuFlip( this );
		});
	    }
	});


//Sticky menu
var $bloverSiteNavigation = $('#top-navigation');
var $bloverWpAdminBar = $('#wpadminbar');
var lastScrollTop = 0; //, delta = 5;
    $(window).scroll(function(){
      
      var $bloverAdminBarHeight = $bloverWpAdminBar.height();
      var $bloverAdminBarPosistionValue = $bloverWpAdminBar.css('position');
      var st = $(this).scrollTop();
      if($bloverAdminBarHeight > 0 ){
	if($bloverAdminBarPosistionValue === 'fixed') {
	    if ( st > $bloverAdminBarHeight ) {
	      $bloverSiteNavigation.css( 'top', $bloverAdminBarHeight + 'px' );

	     if (st > $bloverAdminBarHeight + 70) {
		 $bloverSiteNavigation.css( 'top', $bloverAdminBarHeight + 'px' );
	      if (st > lastScrollTop){
		  $bloverSiteNavigation.slideUp(100);
	      } else {
		  $bloverSiteNavigation.slideDown(200);
	      }
	     } else {
		 $bloverSiteNavigation.slideDown(200);
	     }
	   } else {
	     $bloverSiteNavigation.css( 'top', $bloverAdminBarHeight + 'px' );
	   }
	}
      } else {
	  $bloverSiteNavigation.css( 'top', '0' );
	 if (st > 70) {

	  if (st > lastScrollTop){
	      $bloverSiteNavigation.slideUp(100);
	  } else {
	      $bloverSiteNavigation.slideDown(200);
	  }
	 } else {
	     $bloverSiteNavigation.slideDown(200);
	 }
      }
     lastScrollTop = st;
    });

	// When the top bar items don't fit on one row, tighten their spacing first, then fall back to the hamburger menu.
	var bloverTopBarFit = function() {
	    if ( ! $bloverSiteNavigation.is( ':visible' ) || $bloverSiteNavigation.is( ':animated' ) ) {
		return;
	    }
	    $bloverSiteNavigation.addClass( 'blover-top-bar-collapsed' );
	    var collapsedHeight = $bloverSiteNavigation.outerHeight();
	    $bloverSiteNavigation.removeClass( 'blover-top-bar-collapsed blover-top-bar-compact' );
	    if ( $bloverSiteNavigation.outerHeight() > collapsedHeight * 1.5 ) {
		$bloverSiteNavigation.addClass( 'blover-top-bar-compact' );
		$bloverSiteNavigation.toggleClass( 'blover-top-bar-collapsed', $bloverSiteNavigation.outerHeight() > collapsedHeight * 1.5 );
	    }
	};
	bloverTopBarFit();
	$(window).on( 'load resize', bloverTopBarFit );

	var button, closeButton, menu, bgmenu;

	button = $( '#left-navbar-toggle' );
        bgmenu = $('.left-sidebar-bg');
        menu = $('#left-sidebar');
        closeButton = $('.left-sidebar-close');
        button.on( 'click', function() {
                            bloverMenuToggle();
                        });

        closeButton.on( 'click', function() {
                            bloverMenuToggle();
                        });

        bgmenu.on( 'click', function() {
                            bloverMenuToggle();
                        });

	// Visible, enabled elements inside a panel that can take keyboard focus.
	var bloverFocusable = function( $panel ) {
	    return $panel.find( 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])' ).filter( ':visible:not(:disabled)' );
	};

        var bloverMenuToggle = function(){
	    // aria-expanded is the state, so clicks during the slide animation stay in sync.
	    var open = button.attr( 'aria-expanded' ) !== 'true';

	    button.attr( 'aria-expanded', String( open ) );
            menu.toggle('slide', {direction: 'left' } , 150);
            bgmenu.fadeToggle(500);

	    if ( open ) {
		menu.promise().done( function() {
		    bloverFocusable( menu ).first().trigger( 'focus' );
		});
	    } else {
		button.trigger( 'focus' );
	    }
        };

	// Escape closes the open panel; Tab and Shift+Tab stay inside it.
	$( document ).on( 'keydown', function( e ) {
	    var $panel, $items, first, last;

	    if ( button.attr( 'aria-expanded' ) === 'true' ) {
		$panel = menu;
	    } else if ( $bloverSearchToggle.attr( 'aria-expanded' ) === 'true' ) {
		$panel = $bloverSearchPanel;
	    } else {
		return;
	    }

	    if ( e.key === 'Escape' || e.keyCode === 27 ) {
		if ( $panel === menu ) {
		    bloverMenuToggle();
		} else {
		    bloverSearchPanelToggle();
		}
	    } else if ( e.key === 'Tab' || e.keyCode === 9 ) {
		$items = bloverFocusable( $panel );
		first = $items.get( 0 );
		last = $items.get( -1 );

		if ( ! first ) {
		    e.preventDefault();
		} else if ( ! $.contains( $panel[0], document.activeElement ) ) {
		    e.preventDefault();
		    first.focus();
		} else if ( e.shiftKey && document.activeElement === first ) {
		    e.preventDefault();
		    last.focus();
		} else if ( ! e.shiftKey && document.activeElement === last ) {
		    e.preventDefault();
		    first.focus();
		}
	    }
	});

    var $bloverMenuPlusLeft = $('#left-sidebar .expand-submenu');

    $bloverMenuPlusLeft.on( 'click', function(){

	if( $(this).hasClass('submenu-expanded')) {
            $(this).css({'transform': 'none'}).removeClass('submenu-expanded').prop('title', blover.expandText).attr({'aria-expanded': 'false', 'aria-label': blover.expandSubmenuText});
	    $(this).parent().children('ul').hide();
        } else {
            $(this).css({'transform': 'rotate(45deg)'}).addClass('submenu-expanded').prop('title', blover.closeText).attr({'aria-expanded': 'true', 'aria-label': blover.collapseSubmenuText});
	    $(this).parent().children('ul').show();
        }

    });

    var $bloverDate = new Date();
    var $bloverDay = $bloverDate.getDate();
    var $bloverFullYear = $bloverDate.getFullYear();
    var $bloverDayOfWeek = blover.days[$bloverDate.getDay()];
    var $bloverMonth = blover.months[$bloverDate.getMonth()];

    var $bloverFullDate = $bloverDayOfWeek + ', ' + $bloverMonth + ' ' + $bloverDay + ', ' + $bloverFullYear;

    $('#today-date').append($bloverFullDate);

  $('.posts-navigation').hide();

  var $bloverContainer = $('.masonry-container');

  if (typeof Masonry === 'function'){

    if ( $('body').hasClass('woocommerce') && $('ul').hasClass('products') ) {
      var $bloverWooProductsContainer = $('ul.products');
      imagesLoaded( document.querySelector('ul.products'), function() {
        $(function(){
            $bloverWooProductsContainer.masonry({
              itemSelector: 'li.product'
            });
        });
      });
    } else {
      imagesLoaded( document.querySelector('.masonry-container'), function() {
        $(function(){
            $bloverContainer.masonry({
              itemSelector: '.masonry'
            });
        });
      });
    }
  }
// Below the 62em grid breakpoint the sidebar stacks under the posts, so infinite scroll would keep pushing it away.
var bloverPagination = ( blover.pagination === 'infinite' && ! window.matchMedia( '(min-width: 62em)' ).matches ) ? 'ajax' : blover.pagination;

if ( bloverPagination === 'infinite' ) {
  if (typeof $.infinitescroll === 'function'){

    $bloverContainer.infinitescroll({

        navSelector  : '.posts-navigation', // selector for the paged navigation (it will be hidden)
        nextSelector : '.nav-previous > a', // selector for the NEXT link (to page 2)
        itemSelector : '.masonry', // selector for all items you'll retrieve
        loading: {
                finished: undefined,
                finishedMsg: '',
                img: blover.getTemplateDirectoryUri + '/slick/ajax-loader.gif',
                msg: null,
                msgText: blover.loadingText,
                selector: null,
                speed: 'fast',
                start: undefined
            }

        }, function( newElements ) {
            // hide new items while they are loading
            var $newElems = $( newElements ).css({ opacity: 0 });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
              // show elems now they're ready
              $newElems.animate({ opacity: 1 });
              $bloverContainer.masonry( 'appended', $newElems, true );
            });
        }
    );
  }
}

if( bloverPagination === 'ajax' ) {
       // The number of the next page to load (/page/x/).
	var pageNum = parseInt(blover.startPage, 10) + 1;

	// The maximum number of pages the current query can return.
	var max = parseInt(blover.maxPages, 10);

	// The link of the next page of posts.
	var nextLink = blover.nextLink;

/**
 * Replace the traditional navigation with our own,
 * but only if there is at least one page of new posts to load.
 */
    if(pageNum <= max) {
	// Insert the "More Posts" link.
	$('#primary:not(.woocommerce)').append('<p id="blover-load-more"><a class="btn btn-secondary" href="#">' + blover.loadMoreText + '</a></p>');

	// Remove the traditional navigation.
	$('.navigation').remove();
    }
 /*
 * Load new posts when the link is clicked.
 */
var $bloverLoadMore = $('#blover-load-more a');

$bloverLoadMore.on( 'click', function() {

        // Are there more posts to load?
	if(pageNum <= max) {

                $(this).css('opacity', '0').css('transition', '0');

                $.ajax({
                    url: nextLink,
                    cache: false,
                    dataType: 'html',
                    success: function(response) {

                var result = $(response).find('.masonry');

		if (typeof Masonry === 'function'){

                    result = $( result ).css({ opacity: 0 });

                    $bloverContainer.append( result ).imagesLoaded(function(){
                        result.animate({ opacity: 1 });
                        $bloverContainer.masonry( 'appended', result, true );
                            if(typeof $.fn.theiaStickySidebar === 'function'){
                                $bloverSecondary.theiaStickySidebar({
                                  additionalMarginTop: 105
                                });
                            }
                        pageNum++;
                        nextLink = nextLink.replace(/\/page\/[0-9]*/, '/page/'+ pageNum).replace(/paged=[0-9]*/, 'paged='+ pageNum);
                            if(pageNum <= max) {
                                    $bloverLoadMore.css('opacity', '1').text( blover.loadMoreText );
                            } else {
                                    $bloverLoadMore.css('opacity', '1').text( blover.noMorePostsText );
                            }
                    });
                }


        }
        });
        } else {
			$bloverLoadMore.append('');
		}
                return false;

});
}

$bloverContainer.on( 'click', '.blover-jp-sharing-toggle', function(){
  $(this).siblings('.comments-link').toggle();
  $(this).toggle().siblings('.blover-jp-sharing').toggle('slide', {direction: 'right' } , 400, 'linear').siblings('.blover-jp-sharing-close').toggle();
  $(this).siblings('.blover-jp-sharing-close').toggle();
});

$bloverContainer.on( 'click', '.blover-jp-sharing-close', function(){
  $(this).toggle().siblings('.blover-jp-sharing').toggle('slide', {direction: 'right' } , 400, 'linear');
  $(this).siblings('.blover-jp-sharing-toggle').toggle();
  $(this).siblings('.comments-link').fadeToggle(1000);
});

});
})(jQuery);
