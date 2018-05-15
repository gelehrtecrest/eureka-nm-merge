$(function() {
	$('#merge').click(function(e) {

		let kugiri = "、"
		let name_kugiri = "[";
		let time_kugiri = "]"
		let hour_min_kugiri = ":";

		// 旧データの保存
		let nm_data1 = $("#log1").val();
		if(nm_data1 == ""){
			alert("古いログデータが空です。");
			return;
		}
		let nm_data1_array = nm_data1.split(kugiri);
		let nm_data_result_obj = {};
		let nm_data_result_names = [];
		for(let i = 0; i < nm_data1_array.length; i++){
			let nm_name = nm_data1_array[i].split(name_kugiri)[0];
			let nm_time = nm_data1_array[i].split(name_kugiri)[1].split(time_kugiri)[0];
			// 旧データがない場合
			if(nm_time=="--:--"){
			} else {
				// 旧データがある場合
				nm_data_result_obj[nm_name] = nm_time;
				nm_data_result_names.push(nm_name);
			}
		}

		// 更新データの組み込み
		let nm_data2 = $("#log2").val();
		if(nm_data2 == ""){
			alert("最近のデータが空です。");
			return;
		}
		let nm_data2_array = nm_data2.split(kugiri);
		for(let i = 0; i < nm_data2_array.length; i++){
			let nm_name2 = nm_data2_array[i].split(name_kugiri)[0];
			let nm_time2 = nm_data2_array[i].split(name_kugiri)[1].split(time_kugiri)[0];
			// 更新データ部分が空の場合
			if(nm_time2=="--:--"){
				// 更新しない
			} else {
				// 更新あるかも
				// 既にデータがあるなら、データ比較
				if(nm_data_result_obj[nm_name2] != null){
					let nm_time1 = nm_data_result_obj[nm_name2];
					let nm_time1_hour = parseInt(nm_time1.split(hour_min_kugiri)[0]);
					let nm_time2_hour = parseInt(nm_time2.split(hour_min_kugiri)[0]);
					// どちらも0時~6時のデータ
					if(nm_time1_hour >= 0 &&
						nm_time1_hour <= 6 &&
						nm_time2_hour >= 0 &&
						nm_time2_hour <= 6){
						// 単純比較
						// 更新データの方が新しい場合
						if(nm_time1_hour < nm_time2_hour){
							// 更新
							nm_data_result_obj[nm_name2] = nm_time2;
							// NMリスト更新
							let tmp = [];
							for(let j = 0; j < nm_data_result_names.length; j++){
								if(nm_data_result_names[j] != nm_name2){
									tmp.push(nm_data_result_names[j]);
								}
							}
							tmp.push(nm_name2);
							nm_data_result_names = tmp;
						} else if(nm_time1_hour == nm_time2_hour){
							// 時が同じ場合
							let nm_time1_min = parseInt(nm_time1.split(hour_min_kugiri)[1]);
							let nm_time2_min = parseInt(nm_time2.split(hour_min_kugiri)[1]);
							// 更新データが新しい場合
							if(nm_time1_min < nm_time2_min){
								// 更新
								nm_data_result_obj[nm_name2] = nm_time2;
								// NMリスト更新
								let tmp = [];
								for(let j = 0; j < nm_data_result_names.length; j++){
									if(nm_data_result_names[j] != nm_name2){
										tmp.push(nm_data_result_names[j]);
									}
								}
								tmp.push(nm_name2);
								nm_data_result_names = tmp;
							}
						}
					} else if(nm_time1_hour >= 18 &&
						nm_time1_hour <= 24 &&
						nm_time2_hour >= 18 &&
						nm_time2_hour <= 24){
						// どちらも18時~24時のデータ
						// 単純比較
						// 更新データの方が新しい場合
						if(nm_time1_hour < nm_time2_hour){
							// 更新
							nm_data_result_obj[nm_name2] = nm_time2;
							// NMリスト更新
							let tmp = [];
							for(let j = 0; j < nm_data_result_names.length; j++){
								if(nm_data_result_names[j] != nm_name2){
									tmp.push(nm_data_result_names[j]);
								}
							}
							tmp.push(nm_name2);
							nm_data_result_names = tmp;
						} else if(nm_time1_hour == nm_time2_hour){
							// 時が同じ場合
							let nm_time1_min = parseInt(nm_time1.split(hour_min_kugiri)[1]);
							let nm_time2_min = parseInt(nm_time2.split(hour_min_kugiri)[1]);
							// 更新データが新しい場合
							if(nm_time1_min < nm_time2_min){
								// 更新
								nm_data_result_obj[nm_name2] = nm_time2;
								// NMリスト更新
								let tmp = [];
								for(let j = 0; j < nm_data_result_names.length; j++){
									if(nm_data_result_names[j] != nm_name2){
										tmp.push(nm_data_result_names[j]);
									}
								}
								tmp.push(nm_name2);
								nm_data_result_names = tmp;
							}
						}
					} else if(nm_time1_hour >= 18 &&
						nm_time1_hour <= 24 &&
						nm_time2_hour >= 0 &&
						nm_time2_hour <= 6){
						// 更新データが0時をまたいでいる場合
						// 確実に更新する
						nm_data_result_obj[nm_name2] = nm_time2;
						// NMリスト更新
						let tmp = [];
						for(let j = 0; j < nm_data_result_names.length; j++){
							if(nm_data_result_names[j] != nm_name2){
								tmp.push(nm_data_result_names[j]);
							}
						}
						tmp.push(nm_name2);
						nm_data_result_names = tmp;
					} else if(nm_time1_hour >= 0 &&
						nm_time1_hour <= 6 &&
						nm_time2_hour >= 18 &&
						nm_time2_hour <= 24){
						// 更新データが0時をまたいでいる場合
						// 更新しない
					} else {
						// それ以外=0時またぎが無い場合
						// 単純比較
						// 更新データの方が新しい場合
						if(nm_time1_hour < nm_time2_hour){
							// 更新
							nm_data_result_obj[nm_name2] = nm_time2;
							// NMリスト更新
							let tmp = [];
							for(let j = 0; j < nm_data_result_names.length; j++){
								if(nm_data_result_names[j] != nm_name2){
									tmp.push(nm_data_result_names[j]);
								}
							}
							tmp.push(nm_name2);
							nm_data_result_names = tmp;
						} else if(nm_time1_hour == nm_time2_hour){
							// 時が同じ場合
							let nm_time1_min = parseInt(nm_time1.split(hour_min_kugiri)[1]);
							let nm_time2_min = parseInt(nm_time2.split(hour_min_kugiri)[1]);
							// 更新データが新しい場合
							if(nm_time1_min < nm_time2_min){
								// 更新
								nm_data_result_obj[nm_name2] = nm_time2;
								// NMリスト更新
								let tmp = [];
								for(let j = 0; j < nm_data_result_names.length; j++){
									if(nm_data_result_names[j] != nm_name2){
										tmp.push(nm_data_result_names[j]);
									}
								}
								tmp.push(nm_name2);
								nm_data_result_names = tmp;
							}
						}
					}
				} else {
					// 更新データしかない場合は更新
					// 更新
					nm_data_result_obj[nm_name2] = nm_time2;
					// NMリスト更新
					nm_data_result_names.push(nm_name2);
				}
			}
		}

		// マージデータの作成
		let merge_result = "";
		for(let i = nm_data_result_names.length-1; i >= 0; i--){
			if(merge_result == ""){
				merge_result = nm_data_result_names[i] + name_kugiri + nm_data_result_obj[nm_data_result_names[i]] + time_kugiri;
			} else {
				merge_result = nm_data_result_names[i] + name_kugiri + nm_data_result_obj[nm_data_result_names[i]] + time_kugiri + kugiri + merge_result;
			}
		}
		$("#logresult").val(merge_result);
	});
});
