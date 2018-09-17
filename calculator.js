// dqbach.github.io/calculator-dom/index.html

$(document).ready(function(){
	var bieuthuc_show = '';
	var bieuthuc_hide = '';

	$('button').click (function(){
		var value_button = $(this).text();
		if (value_button == "CE") {
			if (bieuthuc_show[bieuthuc_show.length -1] == '>') {
				bieuthuc_show = bieuthuc_show.substring(0, bieuthuc_show.length - 12);
			} else {
				bieuthuc_show = bieuthuc_show.substring(0, bieuthuc_show.length - 1);
			}
			var n = bieuthuc_hide.length - 1;
			if ((1 <= bieuthuc_hide[n] && bieuthuc_hide[n] <= 9)  || bieuthuc_hide[n] === 0) {
				bieuthuc_hide = bieuthuc_hide.substring(0, bieuthuc_hide.length - 1)
			} else {
				bieuthuc_hide = bieuthuc_hide.substring(0, bieuthuc_hide.length - 2);
			}
		} else if (value_button == "C") {
			bieuthuc_show = "";
			bieuthuc_hide = '';
		} else if (value_button == 'x2') {
			bieuthuc_show += '<sup>2</sup>';
			bieuthuc_hide += ' ^';
		} else if (value_button == 'x!') {
			bieuthuc_show += '!';
			bieuthuc_hide += ' !';
		} else if (value_button == 'căn') {
			bieuthuc_hide += ' √';
			bieuthuc_show += '√';
	    } else if (value_button == '+/-') {

		} else if (value_button == "=") {
			if (bieuthuc_hide[0] == ' '){
				bieuthuc_hide = bieuthuc_hide.slice(1, bieuthuc_hide.length)
			}

			//chuyển biểu thức về dạng hậu tố
			var array_bieuthuc = bieuthuc_hide.split(' ');
			var stack = [];
			var string_bieuthuc = '';
			for (i = 0; i < array_bieuthuc.length; i++) {
				if (array_bieuthuc[i] > 0 || array_bieuthuc[i] === 0) {
					string_bieuthuc += ' ' + array_bieuthuc[i];
				} else {
					if (stack.length == 0) {
						stack.push(array_bieuthuc[i]);
					} else {
						var toan_tu_cuoi = stack.pop();
						stack.push(toan_tu_cuoi);
						var flag = do_uu_tien(array_bieuthuc[i]) - do_uu_tien(toan_tu_cuoi);
						if (flag > 0) {
							stack.push(array_bieuthuc[i]);
						} else {
							while(true) {
								var toan_tu_cuoi = stack.pop();
								var flag1 = do_uu_tien(array_bieuthuc[i]) - do_uu_tien(toan_tu_cuoi);
								if(flag1 <= 0) {
									string_bieuthuc += ' ' + toan_tu_cuoi;
								} else {
									if (stack.length == 0) {
										stack = [array_bieuthuc[i]];
									} else {
										stack.push(toan_tu_cuoi);
										stack.push(array_bieuthuc[i]);
									}	
									break;
								}
							}
						}
					}
				}
			}
			while (stack.length > 0) {
				string_bieuthuc += " " + stack.pop();
			}

			//tính giá trị biểu thức hậu tố
			array_bieuthuc = string_bieuthuc.split(' ');
			stack = [];
			for (i = 0; i < array_bieuthuc.length; i++) {
				if (array_bieuthuc[i] > 0 || array_bieuthuc[i] === 0) {
					stack.push(array_bieuthuc[i]);
				} else {
					var toan_tu_cuoi_cung = Number(stack.pop());
					if (array_bieuthuc[i] == '+') {
						var toan_tu_gan_cuoi_cung = Number(stack.pop());
						stack.push(toan_tu_cuoi_cung + toan_tu_gan_cuoi_cung);
					} else if (array_bieuthuc[i] == '-') {
						var toan_tu_gan_cuoi_cung = stack.pop();
						stack.push(toan_tu_gan_cuoi_cung - toan_tu_cuoi_cung);
					} else if (array_bieuthuc[i] == 'x') {
						var toan_tu_gan_cuoi_cung = stack.pop();
						stack.push(toan_tu_cuoi_cung * toan_tu_gan_cuoi_cung);
					} else if (array_bieuthuc[i] == '/') {
						var toan_tu_gan_cuoi_cung = stack.pop();
						stack.push(toan_tu_gan_cuoi_cung / toan_tu_cuoi_cung);
					} else if (array_bieuthuc[i] == '^') {
						stack.push(toan_tu_cuoi_cung * toan_tu_cuoi_cung);
					} else if (array_bieuthuc[i] == '√') {
						stack.push(Math.sqrt(toan_tu_cuoi_cung));
					} else if (array_bieuthuc[i] == '!') {
						var kq = 1;
						for (var i = 1; i <= toan_tu_cuoi_cung; i++) {
							kq *= i;
						}
						stack.push(kq);
					}
				}
			}
			$('#ketqua').html(bieuthuc_show + ' = ' + stack);
			bieuthuc_show = '';
			bieuthuc_hide = '';
			$('.result').text('');
		} else {
			bieuthuc_show += value_button;
			var n = bieuthuc_hide.length - 1;
			if ((1 <= value_button && value_button <= 9) || Number(value_button) === 0) {
				if ((1 <= bieuthuc_hide[n] && bieuthuc_hide[n] <= 9)  || Number(bieuthuc_hide[n]) === 0) {
					bieuthuc_hide += value_button;
				} else {
					bieuthuc_hide += ' ' + value_button;
				}
			} else {
				bieuthuc_hide += ' ' + value_button;
			} 
		}

		$('.result').html(bieuthuc_show);
	});
});

function do_uu_tien(oper) {
	if (oper == '/' || oper == 'x') {
		return 2;
	} else if (oper == '+' || oper == '-') {
		return 1;
	} else if (oper == '%' || oper == '^' || oper == '!' || oper == '√') {
		return 3;
	}
}

