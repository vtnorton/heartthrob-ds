/**
 * Generate caption for all images on your page.
 * @param   conf    Configuration object. Expects:
     * subscriptionKey		(string)	Your Azure Cognitive Service Subscription key.
     * uriBase 				(String)    Uri base of you Azure Cognitive Service.
     * language     		(String)    Language of your website.
     * imageWithEmptyAlt	(Boolean)   Set this as true if you want to generate caption for images that you have already put a alt that is empty.
     * localProjectWarning	(Boolean)   Captions is available only if your images could be found online, if that is the case, than you can put a false value here.
 */
// eslint-disable-next-line no-unused-vars
function hVision (conf) {
	// eslint-disable-next-line no-redeclare
	var conf = conf || {}
	var defaults = {
		subscriptionKey: '',
		uriBase: '',
		language: 'en',
		imageWithEmptyAlt: false,
		localProjectWarning: true
	}

	for (var key in defaults) {
		if (typeof conf[key] !== 'boolean') {
			conf[key] = conf[key] || defaults[key]
		}
	}

	if (conf.localProjectWarning && !window.location.hostname.startsWith('http')) {
		console.warn('heartthrob-vision: your project/images must be online to have caption in your images. More info at: https://heartthrob.vtnorton.com/vision')
	} else {
		var images = document.querySelectorAll('img')
		images.forEach(function (element) {
			if (!element.hasAttribute('alt')) {
				hProcessImage(element, conf)
			} else {
				var caption = element.getAttribute('alt').trim()
				if (!caption && conf.imageWithEmptyAlt) {
					hProcessImage(element, conf)
				}
			}
		})
	}
}

function hProcessImage (img, conf) {
	var sourceImageUrl = hGetImageSource(img)

	var data = '{"url": ' + '"' + sourceImageUrl + '"}'
	var headers = new Headers()

	headers.append('Content-Type', 'application/json')
	headers.append('Ocp-Apim-Subscription-Key', conf.subscriptionKey)

	fetch(conf.uriBase + '?visualFeatures=Description&details=&language=' + conf.language, {
		method: 'POST',
		headers: headers,
		body: data
	}).then(function (response) {
		if (!response.ok) {
			throw Error(response.statusText)
		}
		img.setAttribute('alt', response.description.captions[0].text)
		console.log(JSON.stringify(response, null, 2))
	}).catch(function (error) {
		// TODO: get the error code from the response
		console.log('There was an error with your request. Check if you are not using a local image. Error: ' + error)
	})
}

function hGetImageSource (img) {
	var sourceImageUrl = img.getAttribute('src')

	if (!sourceImageUrl.startsWith('http')) {
		var domain = location.host
		var domainIndex = window.location.href.indexOf(domain)
		var longAppName = window.location.href.slice(domainIndex + domain.length)
		var directoryAppName = longAppName.substring(0, longAppName.lastIndexOf('/'))

		if (sourceImageUrl.startsWith('./')) {
			sourceImageUrl = sourceImageUrl.replace('./', '')
		}

		if (sourceImageUrl.startsWith('..')) {
			var count = sourceImageUrl.split('../').length - 1

			for (var i = 0; i < count; i++) {
				sourceImageUrl = sourceImageUrl.replace('../', '')
				directoryAppName = directoryAppName.substring(0, directoryAppName.lastIndexOf('/'))
			}
		}

		if (sourceImageUrl.startsWith('/')) {
			sourceImageUrl = directoryAppName + sourceImageUrl
		} else {
			sourceImageUrl = directoryAppName + '/' + sourceImageUrl
		}
	}

	return sourceImageUrl
}
