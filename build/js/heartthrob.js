/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function() {
	$.fn.clickToggle = function(func1, func2) {
		var funcs = [func1, func2]
		this.data('toggleclicked', 0)
		this.click(function() {
			var data = $(this).data()
			var tc = data.toggleclicked
			$.proxy(funcs[tc], this)()
			data.toggleclicked = (tc + 1) % 2
		})
		return this
	}

	var domain = location.host
	var domainIndex = window.location.href.indexOf(domain)
	var longAppName = window.location.href.slice(domainIndex + domain.length + 1)

	$(`a[href='/${longAppName}']`).addClass('active')

	/* Menu event */
	$(document).click(function() {
		$('.menu').slideUp('fast')
	})

	openMenu = function(env, menu) {
		env.stopPropagation()
		$(menu).next('.menu').slideToggle('fast')
	}

	$('.nav-top-menus a.child').click(function() {
		closeMenus(this)
	})

	$('.nav-bottom-menus a.child').click(function() {
		closeMenus(this)
	})

	var menustate = getCookie('hb-menustate')
	if (menustate) {
		minNav(true)
	}

	$('.nav-action').clickToggle(
		function() {
			if (menustate) {
				maxNav(true)
			} else {
				minNav(true)
			}
		},
		function() {
			if (menustate) {
				minNav(true)
			} else {
				maxNav(true)
			}
		}
	)

	$('header .search a').clickToggle(
		function() {
			$('header .search a').addClass('searchactived', function() {
				$('header .search input')
					.effect('slide', { direction: 'right', mode: 'show' }, 300)
					.focus()
			})
		},
		function() {
			$('header .search input').effect(
				'slide',
				{ direction: 'right', mode: 'hide' },
				300,
				function() {
					$('header .search a').removeClass('searchactived')
				}
			)
		}
	)

	$('.user-img').each(function() {
		if (!this.firstElementChild) {
			var nome = this.nextSibling.nodeValue.trim()
			$('.user-img').append('<span>' + getIntials(nome) + '</span>')
		}
	})

	$('.cards-actions .card').click(function() {
		$('.cards-actions .card').removeClass('opened', 300)
		$(this).addClass('opened', 300)
	})

	if ($('.nav ul li ul li a').hasClass('active')) {
		$('.nav a.active').parent().parent().parent().css('background', '#555')
		$('.nav.light a.active')
			.parent()
			.parent()
			.parent()
			.css('background', '#d9d9d9')
		$('.nav a.active').parent().parent().show()
	}

	dialog = function(env) {
		if (!env.cancel) {
			env.cancel = 'Cancel'
		}

		var buttons
		if (env.confirm && env.action) {
			buttons =
				'<a class="btn close" onclick="closeDialog();">' +
				env.cancel +
				'</a> <a class="btn btn-primary" onclick="' +
				env.action +
				'">' +
				env.confirm +
				'</a>'
		} else {
			buttons =
				'<div class="right"><a class="btn btn-primary close" onclick="closeDialog();">' +
				env.cancel +
				'</a></div>'
		}

		var html =
			'<div class="alert-modal"><div id=\'dialog52895\' class="alert"><h3>' +
			env.title +
			'</h3><p>' +
			env.description +
			'</p>' +
			buttons +
			'</div></div>'

		$('html').append(html)
		$('.alert-modal').addClass('show-alert')
	}
	closeDialog = function() {
		$('.alert-modal').removeClass('show-alert')
	}
})

function minNav(cookie) {
	if (cookie) {
		setCookie('hb-menustate', true)
	}

	$('.nav:not(.middle) a.child').addClass('closed')
	$('.nav:not(.middle) a').css('color', 'transparent')
	$('.nav:not(.middle) a').css('overflow', 'hidden')
	$('.nav:not(.middle) a i').css('color', '#fff')
	$('.nav:not(.middle).light a i').css('color', '#000')
	$('.nav:not(.middle)').animate({ width: '65px' }, 300, function() {
		$('content').css('width', 'calc(100% - 65px)')
		$('content content').css('width', 'calc(100% - 150px)')
		$('content .left + content').css('width', 'calc(100% - 260px)')
		$('.toolbar').css('width', 'calc(100% - 65px)')
	})
}

function maxNav(cookie) {
	if (cookie) {
		setCookie('hb-menustate', false)
	}

	var menu = $('.nav-action').parent().parent()
	$('.nav:not(.middle)').animate({ width: '250px' }, 250, function() {
		$('.nav:not(.middle) a.child').removeClass('closed')
		$('.nav:not(.middle) a').css('color', '#fff')
		$('.nav:not(.middle).light a').css('color', '#000')
		$('.nav:not(.middle) a').css('overflow', 'auto')
		$('.nav:not(.middle) a.child:after').css('', 'block')
		$('.toolbar').css('width', 'calc(100% - 250px)')
		$('content').css('width', 'calc(100% - 250px)')
		$('content content').css('width', 'calc(100% - 150px)')
		$('content .left + content').css('width', 'calc(100% - 260px)')
	})
}

function closeMenus(menu) {
	$('.nav-top-menus li ul').slideUp('fast')
	$('.nav-bottom-menus li ul').slideUp('fast')

	if ($(menu).next('ul').is(':hidden')) {
		$(menu).next('ul').slideDown('fast')
	}
}

function getIntials(towork) {
	towork = removeAcento(towork)
		.replace(/\W*(\w)\w*/g, '$1')
		.toUpperCase()
		.trim()
	return towork[0] + towork[towork.length - 1]
}

function removeAcento(text) {
	text = text.toLowerCase()
	text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
	text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
	text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
	text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
	text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
	text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
	return text
}

function addNotification() {
	const placeholder = '#notifications span'
	let itens = 1

	if ($(placeholder).text()) {
		itens = parseInt($(placeholder).text(), 10) + 1
	} else {
		$('#notifications').append('<span></span>')
	}

	if (itens < 10) {
		$(placeholder).html('').append(itens)
	} else {
		$(placeholder).html('').append('9+')
	}
}

function addNotificationNum(number) {
	campo = '#notifications span'
	itens = number

	if ($(campo).text()) {
		itens = parseInt($(campo).text(), 10) + number
	} else {
		$('#notifications').append('<span></span>')
	}

	if (itens < 10) {
		$(campo).html('').append(itens)
	} else {
		$(campo).html('').append('9+')
	}
}

function clearNotification() {
	$('#notifications span').remove('')
}

function goToStep(destiny, origin) {
	$('#' + origin).removeClass('opened', 650)
	$('#' + destiny).addClass('opened', 650)
}

function setDone(destiny) {
	$('#' + destiny).addClass('view-done', 100)
}

function setWarning(destiny) {
	$('#' + destiny).addClass('view-warning', 650)
}

function setCookie(name, value, days) {
	var expires = ''
	if (days) {
		var date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
function getCookie(name) {
	var nameEQ = name + '='
	var ca = document.cookie.split(';')
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]
		while (c.charAt(0) === ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}

function checkStrength(password, output) {
	var strength = 0

	if (password.length < 6) {
		$('#' + output).removeClass()
		$('#' + output).addClass('validator short')
		$('#' + output).html('Senha muito curta')
	}

	if (password.length > 7) strength += 1
	if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
	if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
	if (password.match(/([!,%,&,@@,#,$,^,*,?,_,~])/)) strength += 1
	if (
		password.match(/(.*[!,%,&,@@,#,$,^,*,?,_,~].*[!,%,&,@@,#,$,^,*,?,_,~])/)
	) {
		strength += 1
	}
	if (strength < 2) {
		$('#' + output).removeClass()
		$('#' + output).addClass('validator weak')
		$('#' + output).html(
			'Sua senha está fraca, é preciso adicionar ao menos uma letra maíscula, minúscula, número ou caracter especial.'
		)
	} else if (strength === 2) {
		$('#' + output).removeClass()
		$('#' + output).addClass('validator good')
		$('#' + output).html(
			'Tente adicionar ao menos uma letra maíscula, minúscula, número ou caracter especial.'
		)
	} else {
		$('#' + output).removeClass()
		$('#' + output).addClass('validator strong')
		$('#' + output).html('Sua senha está forte')
	}

	if (password.length === 0) {
		$('#' + output)
			.removeClass()
			.html('')
	}
}

function checkPasswordMatch(input, output) {
	var password = $('#password').val()
	var confirmPassword = $(input).val()

	if (password !== confirmPassword) {
		$('#' + output)
			.addClass('validator')
			.html('As senhas estão diferentes, por favor, tente novamente')
	} else {
		$('#' + output)
			.removeClass('validator')
			.html('')
	}
}

function allTheSame(array) {
	var first = array[0]
	return array.every(function(element) {
		return element === first
	})
}

function pesquisarCep(value) {
	var cep = value.replace(/\D/g, '')
	if (cep !== '') {
		var validacep = /^[0-9]{8}$/
		if (validacep.test(cep)) {
			var script = document.createElement('script')
			script.src =
				'https://viacep.com.br/ws/' + cep + '/json/?callback=preencherdados'
			document.body.appendChild(script)
		} else {
			console.error('Formato de CEP inválido: ' + cep)
		}
	}
}

function preencherdados(content) {
	if (!('erro' in content)) {
		document.getElementById('rua').value = content.logradouro
		document.getElementById('bairro').value = content.bairro
		document.getElementById('cidade').value = content.localidade
	}
}
