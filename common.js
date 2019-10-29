/* common */
$(document).ready(function() {
	if($('.mask').length>0) {
		$(".mask").mask("8 (999) 999-99-99");
	}
	//$('input, select').styler();
	var ff;
	$('input[type=text]').focus(function() {
		if($(this).attr('data-place')==$(this).val()) {
			$(this).val('');
		}
		$(this).addClass('ac');
	});
	$('input[type=text]').blur(function() {
		if($(this).val()=='') {
			$(this).val($(this).attr('data-place'));
		}
		$(this).removeClass('ac');
	});
	$('textarea').focus(function() {
		if($(this).attr('data-place')==$(this).val()) {
			$(this).val('');
		}
		$(this).addClass('ac');
	});
	$('textarea').blur(function() {
		ff=$(this).attr('data-place');
		if($(this).val().length==0) {
			$(this).val(ff);
		}
		$(this).removeClass('ac');
	});
	function ress() {
		$('.ct-pg').height($(window).height()-$('#header').innerHeight());
		$('.ep2').css({'line-height':($(window).height()-$('#header').innerHeight()-$('.foot-line').innerHeight())+'px'});
		$('.ep3').css({'line-height':($(window).height()-$('#header').innerHeight()-$('.foot-line').innerHeight())+'px'});
	}
	ress();
	$(window).resize(function() {
		ress();
	});
	$(window).load(function() {
		ress();
	});
	$(window).load(function() {
		$('input[type=text]').each(function() {
			$(this).attr('data-place',$(this).val());
		});
		$('textarea').each(function() {
			$(this).attr('data-place',$(this).val());
		});
	});
});
// from: https://learn.javascript.ru/article/cookie/cookie.js
	// возвращает cookie с именем name, если есть, если нет, то undefined
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// устанавливает cookie с именем name и значением value
	// options - объект с свойствами cookie (expires, path, domain, secure)
	function setCookie(name, value, options) {
		options = options || {};

		var expires = options.expires;

		if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		var updatedCookie = name + "=" + value;

		for (var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}

		document.cookie = updatedCookie;
	}

	// удаляет cookie с именем name
	function deleteCookie(name) {
		setCookie(name, "", {
			expires: -1
		})
	}

	// get current browser location
	var urlString = window.location.href;

	var url = new URL(urlString);
	var PAR = url.searchParams.get('PAR');

	// check if PAR exists
	if (PAR !== null) {
		// create expiration time
		var expirationDate = new Date;
		// current date + 30 days
		expirationDate.setDate(expirationDate.getDate() + 30);
		// save PAR to cookie
		setCookie('par', PAR, {expires: expirationDate})
	}

/* Скрипт замены ссылок */
$(document).ready(function() {
    $('a[href*=".jambocasino.com"]').each(function() {
        var $clickedLink = $(this),
            clickedLinkURL = $clickedLink.attr('href'), // get URL from clicked link [href] attr
            customURL = new URL(clickedLinkURL); // parse href from clicked link

        // get PAR from cookies
        var PAR = getCookie('par');
        if (typeof PAR !== 'undefined') {
            // parse clicked URL by URL class (from Mozilla)
            customURL.searchParams.append('PAR', PAR);

            // if PAR exists in cookie - replace links
            $clickedLink.attr('href', customURL.href);
        }
    });
});
