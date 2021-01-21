function setSession(key,data,f){
	$.post('SetSession?key='+key+'&data='+data,function(d){
		f(d);
	});
}

function getSession(key,f){
	$.post('GetSession?key='+key,function(data){
		f(data);
	});
}

// 异步上传代码
function ajaxUpload(key,fileinputid,callback){
	var formData = new FormData();
	formData.append(key, document.getElementById(fileinputid).files[0]);
	$.ajax({
			url:"uploadIMG",
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

function create(biaoqian){
	return $('<'+biaoqian+'>');
}