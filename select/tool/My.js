// 跨域请求IP
var crossIP = 'http://123.57.201.106:28081/';

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

// 解析vue数组
function parseVueArr(arr) {
	return JSON.parse(JSON.stringify(arr));
}

// 模拟getsession
function fakeGetSession(data,f){
	f(data);
}

// 显示时间到div中
function showTime(div){
	// 加载当前时间
	var date = new Date();
	var time = date.getUTCFullYear()+'年'+(date.getUTCMonth()+1)+'月'+date.getUTCDate()+'日  '+date.getHours()+'时'+date.getUTCMinutes()+'分'+date.getUTCSeconds()+'秒';
	$(div).text(time);
	
	setInterval(()=>{
		var date = new Date();
		var time = date.getUTCFullYear()+'年'+(date.getUTCMonth()+1)+'月'+date.getUTCDate()+'日  '+date.getHours()+'时'+date.getUTCMinutes()+'分'+date.getUTCSeconds()+'秒';
		$(div).text(time);
	},1000);
}

// 日期转换成yyyy-MM-dd
function formatDateToYYYY(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
}

// 解析日期成年月日时分秒字符串
function formData(date){
	 return date.getUTCFullYear()+'年'+(date.getUTCMonth()+1)+'月'+date.getUTCDate()+'日  '+date.getHours()+'时'+date.getUTCMinutes()+'分'+date.getUTCSeconds()+'秒';
}


// 判断传进来的数组是否有空,如果没有空的，则返回true
function checkNoNullReturn(arr){
	var flag = true;
	for(var i=0;i<arr.length;i++){
		if(arr[i]=='' || arr[i] == null){
			flag=false;
			break;
		}
	}
	return flag;
}


function checkNoNull(arr,f){
	var flag = true;
	for(var i=0;i<arr.length;i++){
		if(arr[i]=='' || arr[i] == null){
			flag=false;
			break;
		}
	}
	f(flag);
}

// 数组去重
function quchong(arr){
	var arr2=[];
	
	for(var i=0; i<arr.length;i++){
		if(arr2.indexOf(arr[i]) == -1){
			arr2.push(arr[i]);
		}
	}
	return arr2;
}

// 将接收的数据存为文件
function saveDataAsFile(){
	var eleLink = document.createElement('a');
	eleLink.download = 'hhh.xls'; 
	eleLink.style.display = 'none';
	var blob = new Blob([data]); 
	eleLink.href = URL.createObjectURL(blob); 
	document.body.appendChild(eleLink); 
	eleLink.click(); 
	// 然后移除 
	document.body.removeChild(eleLink); 
}

// 发送请求下载二进制文件
function sendPostSaveFile(url,formData,fname,type){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = 'blob';
	xhr.onload = function (e) {
		if (this.status == 200) {
			var blob = this.response;
			var filename = fname;
		   
			 var a = document.createElement('a');
			 blob.type = type;
			 var url = createObjectURL(blob);
			 
			 a.href = url;
			 a.download = filename;
			 a.click();
			 window.URL.revokeObjectURL(url);
			
		}
	};
	xhr.send(formData);
	//文件类型对照：
	// ‘doc’ => ‘application/msword’,
	// ‘bin’ => ‘application/octet-stream’,
	// ‘exe’ => ‘application/octet-stream’,
	// ‘so’ => ‘application/octet-stream’,
	// ‘dll’ => ‘application/octet-stream’,
	// ‘pdf’ => ‘application/pdf’,
	// ‘ai’ => ‘application/postscript’,
	// ‘xls’ => ‘application/vnd.ms-excel’,
	// ‘ppt’ => ‘application/vnd.ms-powerpoint’,
	// ‘dir’ => ‘application/x-director’,
	// ‘js’ => ‘application/x-javascript’,
	// ‘swf’ => ‘application/x-shockwave-flash’,
	// ‘xhtml’ => ‘application/xhtml+xml’,
	// ‘xht’ => ‘application/xhtml+xml’,
	// ‘zip’ => ‘application/zip’,
	// ‘mid’ => ‘audio/midi’,
	// ‘midi’ => ‘audio/midi’,
	// ‘mp3’ => ‘audio/mpeg’,
	// ‘rm’ => ‘audio/x-pn-realaudio’,
	// ‘rpm’ => ‘audio/x-pn-realaudio-plugin’,
	// ‘wav’ => ‘audio/x-wav’,
	// ‘bmp’ => ‘image/bmp’,
	// ‘gif’ => ‘image/gif’,
	// ‘jpeg’ => ‘image/jpeg’,
	// ‘jpg’ => ‘image/jpeg’,
	// ‘png’ => ‘image/png’,
	// ‘css’ => ‘text/css’,
	// ‘html’ => ‘text/html’,
	// ‘txt’ => ‘text/plain’,
	// ‘xsl’ => ‘text/xml’,
	// ‘xml’ => ‘text/xml’,
	// ‘mpeg’ => ‘video/mpeg’,
	// ‘mpg’ => ‘video/mpeg’,
	// ‘avi’ => ‘video/x-msvideo’,
	// ‘movie’ => ‘video/x-sgi-movie’,
}

function createObjectURL(object) { return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object); }

// 向后端传递对象
function uploadClass(path,obj,f){
	$.ajax({type : "POST",
	        url : path,
	        contentType:"application/json",
	        dataType: "JSON",
	        data : JSON.stringify(obj),
	
	        success : function(data){
				f(data)
	        },
	        error: function(data) {
				f(data)
	        }
	       });
}

// 异步跨域请求===========================================================
function crossPost(interface,data,cb){
	$.post(crossIP+interface,data,(data)=>{
		cb(data);
	})
}


function setSessionCross(key,data,f){
	$.post(crossIP+'SetSession',{
		key:key,
		data:data
	},function(d){
		f(d);
	});
}

function getSessionCross(key,f){
	$.post(crossIP+'GetSession?key='+key,function(data){
		f(data);
	});
}

function redirect(html){
	window.location=html;
}


function mycopy(selector) {
	$(selector)[0].select();
	document.execCommand("Copy");
}

 
Array.prototype.del = function(dx){ 
	if(isNaN(dx)||dx>this.length){return false;} 
	this.splice(dx,1); 
} 
