window.onload=function () {

// //显示菜单-----------------------	
// 	var all_wares=document.getElementById("all_wares");

// 	var sidebar=document.getElementById('sidebar');
// 	var sidebarli=sidebar.getElementsByTagName("li");

// 	var nav=document.getElementById("s_nav");
// 	var nav_con=nav.getElementsByClassName('nav_con');
// 	console.log(nav_con);

// 	all_wares.onmouseover=function(){		
// 		sidebar.style.display="block";		
// 	}
// 	all_wares.onmouseout=function(){	
// 		clearTimeout(leave_menu)
// 		leave_menu=setTimeout(function(){
// 			sidebar.style.display="none";
		
// 		},200)

// 	}

// 	var leave_menu=null;//离开右侧 回到左侧

// 	//删除所有li上的ac
// 	function del_li_ac(){
// 		for(var i=0; i<sidebarli.length; i++){
// 			sidebarli[i].className="";
// 		};
// 	}

// 	for(var i=0 ;i< sidebarli.length ; i++){
// 		sidebarli[i].index=i;
// 		//鼠标移入菜单
// 		sidebarli[i].onmouseover=function(){
// 			clearTimeout(leave_menu)
// 			nav.style.display="block";
// 			del_li_ac();//删除所有li上的ac 
// 			this.className="nav_ac"//自己增加ac 
// 			//显示相对应的内容
// 			for(var i=0; i<nav_con.length; i++){
// 				nav_con[i].style.display="none";
// 			};
// 			nav_con[this.index].style.display="block";

// 		};
// 		//鼠标移出菜单
// 		sidebarli[i].onmouseout=function(){
// 			clearTimeout(leave_menu)
		
// 			leave_menu=setTimeout(function(){
// 				nav.style.display="none";
// 				del_li_ac();//删除所有li上的ac  
// 			},200)

// 		};


// 	}

// 	nav.onmouseover=function(ev){
// 		var oEv=ev||window.event;
// 		var oEl=oEv.relatedTarget||oEv.fromElement;  
		
// 		clearTimeout(leave_menu);
// 		this.style.display="block";
// 		if( isChild(this,oEl) ){//如果离开的元素还是自己
// 			return;
// 		}
// 	}
// 	nav.onmouseout=function(ev){
// 		var oEv=ev||window.event;
// 		var oEl=oEv.relatedTarget||oEv.toElement;
		
// 		if(! isChild(this,oEl) ){
// 			del_li_ac();//删除所有li上的ac  
// 			this.style.display="none";
// 			return;
// 		}
// 	};
	
// 	//判断子集	
// 	function isChild(oParent,obj){
// 		while(obj){
// 			if(obj==oParent) return true;
// 	        obj=obj.parentNode;	
// 		}	
// 		// 不是我的子级
// 		return false;
// 	};

//图片切换，放大------------------------------------

	var s_img=document.getElementById('smaillimg')//小图
	var a_imglist=s_img.getElementsByTagName('img');
	var oDiv1=document.getElementById('i_list');//中图
	var m_img=oDiv1.getElementsByTagName('img');
	var oSpan=oDiv1.getElementsByTagName('span')[0];
	var oDiv2=document.getElementById('bigImg');//大图
	var show_bigimg=oDiv2.getElementsByTagName('img');
	var pre=document.getElementById('pre');
	var next=document.getElementById('next');

	console.log(show_bigimg);
	var n=0
	

	//鼠标滑过放大图片
	oDiv1.onmousemove=function(ev){
		oSpan.style.display=oDiv2.style.display='block';
		oDiv2.style.border="1px"+" "+"solid"+" "+"#ccc";
		var oEv=ev||event;
		
		//获取滚动条  chrome不识别 documentElement.scrollTop
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		//鼠标在span的中心位置
		var l=oEv.clientX-oDiv1.offsetLeft-oSpan.offsetWidth/2; 
		var t=oEv.clientY+scrollTop-oDiv1.offsetTop-oSpan.offsetHeight/2;


		//限制span移动范围
		if(l<0)l=0;
		if(l>=oDiv1.offsetWidth-oSpan.offsetWidth){
			l=oDiv1.offsetWidth-oSpan.offsetWidth;
		}

		if(t<0)t=0;
		if(t>=oDiv1.offsetHeight-oSpan.offsetHeight){
			t=oDiv1.offsetHeight-oSpan.offsetHeight;
		}
		//span移动位置
		oSpan.style.left=l+'px';
		oSpan.style.top=t+'px';		
		//图片移动比例
		var l_rate=l / (oDiv1.offsetWidth-oSpan.offsetWidth);
		var t_rate=t / (oDiv1.offsetHeight-oSpan.offsetHeight);	

		for (var i = 0; i < show_bigimg.length; i++) {					
			show_bigimg[i].style.left= (oDiv2.offsetWidth-show_bigimg[i].offsetWidth)*l_rate +'px'; //外box 减 内部大图片，为负值
			show_bigimg[i].style.top= (oDiv2.offsetHeight-show_bigimg[i].offsetHeight)*t_rate +'px';		
		}
		
	};
	//图片切换---
	for (var i = 0; i < a_imglist.length; i++) {
		a_imglist[i].index=i;
		
		a_imglist[i].onmouseover=function(){
			n=this.index;
			for (var j = 0; j < a_imglist.length; j++) {
				a_imglist[j].className="";
				m_img[j].style.display=show_bigimg[j].style.display="none";
			}
			a_imglist[this.index].className="img_hover";
			m_img[this.index].style.display=show_bigimg[this.index].style.display="block";
			

		}
	
		// pre.onclick=function(){
			
		// 	a_imglist[this.index].className="img_hover";
		// 	m_img[this.index].style.display=show_bigimg[this.index].style.display="block";	
		// };
		// next.onclick=function(){
			
		// 	a_imglist[this.index].className="img_hover";
		// 	m_img[this.index].style.display=show_bigimg[this.index].style.display="block";		
		// };

	}
	oDiv1.onmouseout=function(){
		oSpan.style.display=oDiv2.style.display='none';	
	};
	
}