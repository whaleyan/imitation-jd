/*首页*/
//banner------------------------------------------------------
window.onload=function(){
	var oDiv=document.getElementsByClassName('banner')[0];
	var aBtn=oDiv.getElementsByTagName('ol')[0].children;
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	aLi[0].style.opacity=1;
	
	var pBtn=document.getElementById('prevBtn');
	var nBtn=document.getElementById('nextBtn');
	
	
	var n=0;//当前显示图片索引
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发拍照
		aBtn[i].onmouseover=function(){
			if(n!=this.index){
				slideItem(n,this.index);
				n=this.index;
				changeAc();
			}			
			
		};
	};
	
	pBtn.onclick=function(){
		if(n<1){
			n=aLi.length;
			slideItem(0,aLi.length-1);
		}else{
			slideItem(n,n-1);
		};
		n--;
		changeAc();
		
	}

	nBtn.onclick=function(){
		n++;
		if(n>aLi.length-1){
			n=0;
			slideItem(aLi.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		changeAc();
		
	};

	function slideItem(a,b){
		aLi[a].style.display='block';
		aLi[a].style.opacity=1;
		
		aLi[b].style.display='block';
		aLi[b].style.opacity=0;
		
		move(aLi[a],'opacity',0,1000);
		move(aLi[b],'opacity',100,1000,function(){
			aLi[a].style.display='none';
		});
	};
	
	
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='slide_ac';
	}
	

	//自动播放轮播图
	var timer=null;
	 function bannermove(){		
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			if(n>aLi.length-1){
				n=0;
			}
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.opacity="0";
				aBtn[i].className="";
			}
			aLi[n].style.opacity="1";
			aBtn[n].className="slide_ac";
		},2000)
	}
	bannermove();
	oDiv.onmouseover=function(){
		clearInterval(timer)
	}
	oDiv.onmouseout=function(){
		bannermove();
	}
//滚动鼠标显示相应楼层----------------------------------------------------------------
		var f_list=document.getElementById("f_list");
		var f_aLi=f_list.getElementsByTagName("li");
		var afloor=document.getElementsByClassName('floor');

		var arr=[];

		//遍历所有的左边楼层显示
		for (var i = 0; i < afloor.length; i++) {
			var json={};
			json.name="f"+i;
			json.offsetTop=afloor[i].offsetTop;
			arr.push(json);
			afloor[i].index=i;

		}
		//鼠标滚动显示楼
		window.onscroll=function(){
			//显示楼层编号
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if (scrolltop>300) {
				f_list.style.display="block";
			}else{

				f_list.style.display="none";
			};

			//根据楼层滚动位置,显示相应定位编号
			var scroHeight=document.documentElement.offsetHeight || document.body.offsetHeight;

			var last_arr=[];
		
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].offsetTop<scrolltop+500) {
					last_arr.push(arr[i].name);
				}
			};
			//当楼层大于10
			if(last_arr.length>10){
				li_index=last_arr[last_arr.length-1].substr(1,2);
			}else{
				li_index=last_arr[last_arr.length-1].substr(1,1);
			}

			for(var l=0; l<afloor.length; l++){
				f_aLi[l].className='';

			};
			f_aLi[li_index].className='ac';
		}
		//点击编号跳转 到相对楼层
		for (var i = 0; i < afloor.length; i++) {
			f_aLi[i].index=i;
			f_aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				showfloor(start,end);
			}
		}
		//showfloor
		var floortimer
		function showfloor(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(floortimer);
			floortimer=setInterval(function(){
				n++;
				var  a=1-n/count;
				var step_dis=start+dis*(1-a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(floortimer);
				};
			},30)
		};


//菜单显示------------------------------------------------------------------

	var sidebar=document.getElementById('sidebar');
	var sidebarli=sidebar.getElementsByTagName("li");

	var nav=document.getElementById("s_nav");
	var nav_con=nav.getElementsByClassName('nav_con');
	console.log(nav_con);

	var leave_menu=null;//离开右侧 回到左侧

	//删除所有li上的ac
	function del_li_ac(){
		for(var i=0; i<sidebarli.length; i++){
			sidebarli[i].className="";
		};
	}

	for(var i=0 ;i< sidebarli.length ; i++){
		sidebarli[i].index=i;
		//鼠标移入菜单
		sidebarli[i].onmouseover=function(){
			clearTimeout(leave_menu)
			nav.style.display="block";
			del_li_ac();//删除所有li上的ac 
			this.className="nav_ac"//自己增加ac 
			//显示相对应的内容
			for(var i=0; i<nav_con.length; i++){
				nav_con[i].style.display="none";
			};
			nav_con[this.index].style.display="block";

		};
		//鼠标移出菜单
		sidebarli[i].onmouseout=function(){
			clearTimeout(leave_menu)
		
			leave_menu=setTimeout(function(){
				nav.style.display="none";
				del_li_ac();//删除所有li上的ac  
			},200)

		};


	}

	nav.onmouseover=function(ev){
		var oEv=ev||window.event;
		var oEl=oEv.relatedTarget||oEv.fromElement;  
		
		clearTimeout(leave_menu);
		this.style.display="block";
		if( isChild(this,oEl) ){//如果离开的元素还是自己
			return;
		}
	}
	nav.onmouseout=function(ev){
		var oEv=ev||window.event;
		var oEl=oEv.relatedTarget||oEv.toElement;
		
		if(! isChild(this,oEl) ){
			del_li_ac();//删除所有li上的ac  
			this.style.display="none";
			return;
		}
	};
	
	//判断子集	
	function isChild(oParent,obj){
		while(obj){
			if(obj==oParent) return true;
	        obj=obj.parentNode;	
		}	
		// 不是我的子级
		return false;
	};
}