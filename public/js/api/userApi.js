module.exports = {
	getCurrentUser : function (successCb,errorCb) {
		$.ajax({
			url: '/api/v1/user/'
		}).done(successCb || empty).fail(errorCb || empty);
	}
}
