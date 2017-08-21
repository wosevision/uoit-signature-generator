export const LocalPrefix = /localhost/.test(document.location.host) ?
	'http://localhost:8888/uoit-signature-generator/dist/' :
	'';