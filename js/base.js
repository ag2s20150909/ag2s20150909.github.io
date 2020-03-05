function search_onkeyup(obj) {
	   if (event.keyCode == 13) {
	           search();
	      }
	    }
	    
function search(){
        var msg=document.getElementById("search").value;
         Android.showToast("开始转到"+msg)
        Android.search(msg);
    }


function getwebsource(){
Android.showToast("开始查看源码");
var html=document.documentElement.outerHTML;
Android.viewSource(html);
}






