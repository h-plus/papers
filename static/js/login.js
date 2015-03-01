(function () {
	// constants
	var CODE_LENGTH_MAX = 13;
	var KEY_CODE_MIN = 49;
	var KEY_CODE_MAX = 90

	// status variables
	var isFetching = false;

	$('#inputCode').keydown(function (event) {
		var code = $(this).val();

		if (code.length >= CODE_LENGTH_MAX && event.keyCode >= KEY_CODE_MIN && event.keyCode <= KEY_CODE_MAX) {
			event.preventDefault();
		}
	});

	$('#inputCode').keyup(function (event) {
		if (isFetching) return;

		var code = $(this).val();

		if (code.length == CODE_LENGTH_MAX) {
			isFetching = true;
			console.log(code);

			checkCode(code, function () {
				isFetching = false;
			});
		}
	});


	// helper functions
	function checkCode(code, callback) {
		setTimeout(function () {
			callback();
		}, 2000);
	}

})();
