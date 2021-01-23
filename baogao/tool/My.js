function setSession(key,data,f){
	$.post('SetSession',{
		key:key,
		data:data
	},function(d){
		f(d);
	});
}

function getSession(key,f){
	$.post('GetSession?key='+key,function(data){
		f(data);
	});
}

// 异步上传文件
function ajaxUpload(posturl,key,fileinputid,callback){
	var formData = new FormData();
	formData.append(key, document.getElementById(fileinputid).files[0]);
	$.ajax({
			url:posturl,
			type:"post",
			data: formData,
			contentType: false,
			processData: false,
			success: function(data) {
				callback(data);
			},
			error:function(data) {
				callback(data);	
			}
	});
}

// 快速点击事件
function ck(select,f){
	$(select).on('click',f);
}
// 事件委托点击
function ckwt(father,child,f){
	$(father).on('click',child,f);
}
function create(biaoqian){
	return $('<'+biaoqian+'>');
}

/** 判断data,如果为true,则弹窗+刷新 */
function ifDataReload(data,alerttext){
	if(data){
		alert(alerttext);
		window.location.reload();
	}
}

/** 判断data,如果为true,则弹窗 */
function ifDataAlert(data,truetext,falsetext){
	if(data){
		alert(truetext);
	}else{
		alert(falsetext);
	}
}