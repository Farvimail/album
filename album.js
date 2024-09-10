var d = document,
    hrefs = "",
    first_img = "",
    prg = 0,
    s = 0,
    total_pics = 0,
	pert = 4;

var min_height = 0,
    max_height = 0,
    fasele_tallaee = 150; 

	d.getElementsByTagName("table")[0].innerHTML += '<div id="wrappers"> <div id="one"></div> <div id="two"></div> <div id="three"></div><div class="addmore">Add<input class="coutPost" type="text" value="1">Postes </div></div>';

	for(i = 0; i < d.getElementsByTagName("tr").length-pert; i++){
	
		var tr = d.getElementsByTagName("table")[0].getElementsByTagName("tr")[i+pert],
			tr_href = tr.getElementsByTagName("a")[0].innerHTML;
			
		hrefs += tr_href+"|";			
	}

	function addPost(num){
	
		var num_post = num,
			addmore = d.querySelectorAll(".addmore")[0];

        addmore.style.opacity = "1";
		
		if ( num < d.getElementsByTagName("tr").length-pert ){
		
			num_post = num;
		
		}else{
		
			num_post = d.getElementsByTagName("tr").length-pert;
			addmore.style.opacity = "0.5";
			addmore.innerHTML = "All postes is in the page !";
			
		}
		
		for(i = total_pics; i < num_post; i++){	
		
			var tr = d.getElementsByTagName("table")[0].getElementsByTagName("tr")[i+pert],
				alt_num = d.getElementById("wrappers").getElementsByClassName("img").length,
				patt = new RegExp(".jpg"),
				jpg = patt.test(hrefs.split("|")[i].replace(space,"%20").toLowerCase()),
				patt1 = new RegExp(".gif"),
				gif = patt1.test(hrefs.split("|")[i].replace(space,"%20").toLowerCase()),
				patt2 = new RegExp(".png"),
				png = patt2.test(hrefs.split("|")[i].replace(space,"%20").toLowerCase()),
				patt3 = new RegExp(".mp4"),
				mp4 = patt3.test(hrefs.split("|")[i].replace(space,"%20").toLowerCase()),
				space = new RegExp(" ", "g"),
				sharp = new RegExp("#", "g");
				
				if( jpg || png || gif || mp4 ){
					
					total_pics++;
				}

		 
		if(s == 0){
			if( jpg || png || gif ){
				d.getElementById("one").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><img src='+hrefs.split("|")[i].replace(space,"%20")+' class="iframe" id="one" /></div></div>';
			}

			if( mp4 ){
			   d.getElementById("one").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><video controls loop="true" name="media" class="iframe"><source src='+hrefs.split("|")[i].replace(space,"%20").replace(sharp,"%23")+' type="video/mp4"></video></div></div>';
			}
		}

		if(s == 1){
			if( jpg || png || gif ){
				d.getElementById("two").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><img src='+hrefs.split("|")[i].replace(space,"%20")+' class="iframe" id="one"/></div></div>';
			}

			if( mp4 ){
				d.getElementById("two").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><video controls loop="true" name="media" class="iframe"><source src='+hrefs.split("|")[i].replace(space,"%20").replace(sharp,"%23")+' type="video/mp4"></video></div></div>';
			}
		}

		if(s == 2){
		   s = -1;
			if( jpg || png || gif ){
				d.getElementById("three").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><img src='+hrefs.split("|")[i].replace(space,"%20")+' class="iframe" id="one"/></div></div>';
			}

			if( mp4 ){
				d.getElementById("three").innerHTML += '<div class="img '+alt_num+'" onclick="open_popup(this)"><div class="ins '+alt_num+'"><video controls loop="true" name="media" class="iframe"><source src='+hrefs.split("|")[i].replace(space,"%20").replace(sharp,"%23")+' type="video/mp4"></video></div></div>';
			}	
		}

		s++;
		}
		
	}
	
	addPost(2);

	function open_popup(obj){
	
		setTimeout(function(){
			var poput_img_alt = parseInt(popup.getElementsByClassName("ins")[0].classList[1]),
				pop_move = d.getElementsByClassName("pop_move")[0];
				getScrollWidth(poput_img_alt);
		}, 500);

		popup.style.display = "block";
		popup.getElementsByClassName("magnifier-thumb-wrapper")[0].innerHTML = obj.innerHTML;
		console.log(obj.length);
		d.body.style.overflow = "hidden";
        prg = 0;
	}

	function close_popup(){
		popup.style.display = "none";
		
		if ( popup.getElementsByTagName("video")[0] )
		popup.getElementsByTagName("video")[0].parentElement.removeChild(popup.getElementsByTagName("video")[0]);
		
		d.body.style.overflow = "auto";
        prg = 0;
	}

	function go_right(){
        var poput_img_alt = parseInt(popup.getElementsByClassName("ins")[0].classList[1]),
            pop_move = d.getElementsByClassName("pop_move")[0];

        if( poput_img_alt >= wrappers.getElementsByClassName("ins").length-1 )
        poput_img_alt = -1

		popup.getElementsByClassName("magnifier-thumb-wrapper")[0].innerHTML = d.getElementsByClassName(poput_img_alt+1)[0].innerHTML;
        getScrollWidth(poput_img_alt+1);
		prg = 0   
	}

	function go_left(){	
        var poput_img_alt = parseInt(popup.getElementsByClassName("ins")[0].classList[1]),
            pop_move = d.getElementsByClassName("pop_move")[0];

        if( poput_img_alt >= 1 )
		popup.getElementsByClassName("magnifier-thumb-wrapper")[0].innerHTML = d.getElementsByClassName(poput_img_alt-1)[0].innerHTML;
        
		getScrollWidth(poput_img_alt-1);
        prg = 0
	}

	d.getElementById("header").innerHTML = '<p>'+d.getElementById("header").innerHTML+'</p><div id="option"> <div>›</div> <ul class="detials"> <li>All</li> <li>jpg</li> <li>png</li> <li>gif</li> <li>mp4</li> </ul> </div>'

	d.body.innerHTML += '<div id="popup" style="display: block;"><ul id="ballance"><li id="thumb"><div class="pause"></div><a class="magnifier-thumb-wrapper"><div class="ins 0">'+d.getElementsByClassName("0")[0].innerHTML+'</div></a><mgh class="right" onclick="go_right()">›</mgh><span id="exit" onclick="close_popup()">×</span><mgh class="left" onclick="go_left()">‹</mgh><div id="fullscreen"></div><span class="loading"></span><div id="pop_btm_slider"><div class="pop_right"></div><div class="pop_move"></div><div class="pop_left"></div></div></li><li></li></ul> </div>';

	d.getElementsByTagName("style")[0].innerHTML += "body{background:gray; overflow-x: hidden !important;} #table { width: 1000px; display: block; position: relative; }.iframe { width: 100% !important; } .img img { max-width: 100%; height: auto; margin: 0px auto; display: block; margin-bottom: 4px; background-size: contain; background-attachment: fixed; } tr{display:none} .img{cursor:pointer} span.loading { background: rgba(255, 255, 255, 0.4); width: 0%; height: 3px; position: fixed !important; z-index: +9999999999; left: 0%; top: 97.2% !important; box-shadow: 0 0 2px grey; transition: all 0.8s; } div#popup {  width: 100%; height: 100%; background:rgba(158, 158, 158, 0.97); display: block; position: fixed; z-index: +99999999999; top: 0%; left: 0%; }div#popup span { direction: rtl; text-align: right; float: right; margin-right: 3.85%; cursor: pointer; color: #fff; font: 36px 'Open Sans', Helvetica, Arial, sans-serif; margin-top: 1%; position: absolute; top: 2%; right: 0%; text-shadow: 0 0 2px gray; } div#popup img { vertical-align: middle; display: inline-block;} h1 { border-bottom: none; margin-bottom: 4px !important; white-space: pre-line; font-size: 18px; font-family: sans-serif , tahoma , april; font-weight: 100; color: #E8E8E8; background: #909090; width: 100%; height: auto; padding: 12px 0px; margin: 0 auto; left: 0; right: 0; } div#popup mgh { cursor: pointer; direction: ltr; text-align: right; background: #FFFFFF; margin: 0; top: 50%; text-align:center; font-family: tahoma; position: absolute; border-radius: 50%; margin-top:-22px} div#popup mgh.left { left: 16%; width: 13px; height: 14px; padding: 15px; line-height: 48%; font-size: 27px; text-align: center; transition: all 0.6s; } div#popup mgh.right { left: 79.75%; width: 14px; height: 14px; padding: 15px; line-height: 48%; font-size: 27px; transition: all 0.6s;} #wrappers div { background: transparent; display: inline-block; vertical-align: top; padding: 0px; /*margin-top:2px*/} #wrappers { width: 100.03333%; padding: 0px; margin: 0 auto; } .hidden { display: none !important ; } div#popup img { margin-top: 0 !important; } .img video { max-width: 100%; } .block { background: #6F6F6F; width: 100%; padding: 15px 0; color: white; margin: 0px auto; text-align: center; margin-bottom: 120px; cursor: pointer; font-size: 17px; border-radius: 5px; transition: all 0.2s; } .block:hover { background: gray; } .img:active img { transform: scale(0.97); transition: all 0.07s; opacity: 0.9; } ul#ballance li { list-style: none; vertical-align: middle; display: inline-block; } ul#ballance li:nth-child(2) { height: 730px; background: rgba(255, 0, 0, 0.17); /* position: abdiv#popup mgh.left { left: 16%; width: 13px; height: 14px; padding: 15px; line-height: 48%; font-size: 27px; text-align: center; transition: all 0.6s; } solute; */ /* z-index: +99999999; */ width: 0px; margin: 0; } ul#ballance li:nth-child(1) {  background: transparent;  width: 1024px } ul#ballance li:nth-child(1) img, ul#ballance li:nth-child(1) video { width: auto !important; margin: 0 auto; max-width: 100%; max-height: 727px; position: relative; display: block; margin-top:2px !important; } ul#ballance { margin: 0 auto; padding: 0; display: block; position: relative; width: 1024px; z-index: -1; } img:-webkit-full-screen { height: auto; } .circle{ background: rgb(255,255,255); width:50px; height:50px; position:absolute; transform:scale(0); border-radius: 100%; animation: circles 0.5s 1; -webkit-animation: circles 0.5s 1; -moz-animation: circles 0.5s 1; opacity:1; display: none; z-index: +9999999999999999999999 !important; } @keyframes circles{ 100%{ opacity:0; transform:scale(3); } } #fullscreen { width: 49px; height: 49px; background: url('fullscreen.png') no-repeat rgba(255,255,255,1) 0px 0px; position: absolute; z-index: +999; top: 88.5%; right: 3.5%; transform: scale(0.57); border-radius: 7px; cursor: pointer; box-shadow: 0 0 2px grey; opacity: 0.7; } no-repeat; position: absolute; z-index: +999; top: 88.5%; right: 3.9%; transform: scale(0.5); border-radius: 10px; cursor: pointer; box-shadow: 0 0 2px gray; opacity: 0.4} span.loading { background: rgba(255, 255, 255, 0.4); width: 0%; height: 3px; position: fixed !important; z-index: +9999999999; left: 0%; top: 95.2% !important; box-shadow: 0 0 2px gray; transition: all 0.8s} .pause { position: fixed; width: 610px; height: 207px; top: 50%; left: 50%; margin-top: -140px; margin-left: -305px; z-index: +99999999999999; } .toright { opacity:0; left: 90% !important; transition: all 0.6s; direction: rtl; text-align: right;} .toleft { opacity:0; left: 6% !important; transition: all 0.6s;} #pop_btm_slider { background: #6E6E6E; width: 100%; height: 176px; margin-top: -29px; opacity: 0; z-index: +99999; position: fixed; top: 100%; left: 0%; right: 50%; bottom: 50%; /*border-top: solid 5px*/ #636363; transition: all 0.5s 0.1s; } .pop_move { position: fixed; z-index: +9999999; width: 200000px; margin-top: 3px; padding-top: 25px; left: -300px; transition: all 0.5s } #pop_btm_slider .img { width: auto; height: auto; vertical-align: middle; position: relative; z-index: +9999999;} .pop_move .img { display: inline-block; max-height: 300px; } .pop_move .img .ins img, .pop_move .img .ins video { max-height: 145px !important; max_width: 380px !important } div#pop_btm_slider:hover { margin-top: -158px; transition: all 0.5s 0.1s; opacity:1} div#pop_btm_slider:hover .pop_move{padding-top:0} .pop_right, .pop_left { width: 30px; height: 30px; background: url(arrow.png) no-repeat center center; position: fixed; z-index: +999999999999999999999999999; cursor: pointer; margin-top: 27px; opacity: 0; transition: all 0.5s; transform: rotate(45deg); margin-right: 15px; margin-left: 15px; } .pop_left{ transform: rotate(225deg); } .pop_right { right: 0; } div#pop_btm_slider:hover .pop_right, div#pop_btm_slider:hover .pop_left { margin-top: 62px; opacity: 1; transition: all 0.5s 0.1s; } .magnifier-thumb-wrapper .ins{opacity: 1 !important; } mgh::selection{background: transparent} span#exit { border-radius: 50%; background: rgba(255, 0, 0, 0.4); padding: 0 10px; } div#option { float: right; white-space: normal; width: 170px; height: auto; background:hsla(0, 0%, 63%, 0.9) !important; cursor: pointer; position: absolute; right: 8px; top: 8px; z-index: +9999999; } div#option:hover { background:hsla(0, 0%, 64%, 1) !important} ul.detials {padding: 0;margin: 0;display: none;} ul.detials li { list-style: none; left: 0; padding: 7px 0; margin: 0; right: 0; top: 0; text-align: center;font-size: 17px; background: rgba(124, 124, 124, 0.56); display: block; position: relative; font-family: sans-serif , tahoma , april; font-weight: 100; color: #E8E8E8; cursor: pointer; } li { margin: 0; padding: 0; } ul.detials li:nth-child(1) { background: rgba(0, 0, 0, 0.21); } ul.detials li:nth-child(2) { background: rgba(0, 0, 0, 0.14); } ul.detials li:nth-child(3) { background: rgba(0, 0, 0, 0.07); } div#option span { color: white; text-align: center; width: 100px; } div#option div { color: white; text-align: center; transform: rotate(90deg); overflow: hidden; font-size: 26px; width: 28px; margin-left: 68px; height: 45px; } div#option:hover .detials { display: block; } ul.detials li:hover { background: rgba(0, 0, 0, 0.28); } #parentDirLinkBox{display:none !important;} #wrappers #one, #wrappers #two, #wrappers #three { width: 33.06999999999999999999999999%;} .img video { width: 498px !important; } .addmore{ background:hsla(0, 0%, 40%, 0.9) !important; width:100%; padding: 12px 0 !important; color:rgba(255,255,255,.8); text-align:center; margin: 5px auto; font-family:sans-serif; cursor:pointer;} .addmore input{ width: 27px; text-align:center; background:transparent; border:none; color:white; font-family:sans-serif; font-size:16px; font-weight:bold; padding:0; margin:0 4px; outline:none; position:relative; z-index:+9999999} #header p { margin: 0px; text-indent: 30px; } #thumb { top: 0; }";

	function tapeSlider(){

        var pop_btm_slider = d.getElementById("pop_btm_slider"),
            wrappers = d.getElementById("wrappers");

        pop_btm_slider.getElementsByClassName("pop_move")[0].innerHTML = "";
        pop_btm_slider.style.display = "none";

        for(k = 0; k < wrappers.getElementsByClassName("ins").length; k++ ){
            pop_btm_slider.style.display = "block";
            pop_btm_slider.getElementsByClassName("pop_move")[0].innerHTML += '<div class="img" onclick="open_popup(this)">'+wrappers.getElementsByClassName(k)[0].innerHTML+'</div>'
        }

    }

	function getScrollWidth(num){

	   var pop_move = d.getElementsByClassName("pop_move")[0],
		   item = pop_move.getElementsByClassName("ins"),
		   total_width = 0;

	   for(y = 0; y < num; y++){
		   total_width += item[y].scrollWidth;
	   }
	   
	   for(o = 0; o < item.length; o++){
           item[o].style.opacity = "0.7"
	   }

       item[num].style.opacity = "1";
	   pop_move.style.marginLeft = [(-total_width+1067)-(eval((window.getComputedStyle(item[num]).width).replace("px",""))/2)]+"px";

	}

	var popup_img_load;

	if ( d.getElementsByClassName("img")[0].getElementsByTagName("video")[0] ){

		popup_img_load = document.querySelector('video');
        popup_load(); getScrollWidth(0);

	}else{

    	popup_img_load = document.querySelector('img');

	}

	popup_img_load.onload = function(){
	
	  setTimeout(function(){
		 popup_load();  getScrollWidth(0);
	  }, 2500);

	}

    var num_of_tallas = 0,
        afzayesh = 5,
        ballance_end = 0;

    function popup_load(){

    var one = d.getElementById("one"),
        two = d.getElementById("two"),
        three = d.getElementById("three");

    var ballance = setInterval(function(){

    var one_height = parseInt(window.getComputedStyle(one).height),
        two_height = parseInt(window.getComputedStyle(two).height),
        three_height = parseInt(window.getComputedStyle(three).height),
        min_height = 0,
        max_height = 0,
        elm_min_name = "",
        elm_max_name = "",
        rndelm;

        min_height = one_height;
        if( two_height < min_height ){
           min_height = two_height;
        }if( three_height < min_height ){
          min_height = three_height;
        }

        max_height = one_height;
        if( two_height > max_height ){
           max_height = two_height;
        }if( three_height > max_height ){
          max_height = three_height;
        }

        if( max_height == one_height ){
          elm_max_name = one;
        }else if( max_height == two_height ){
          elm_max_name = two;
        }else{
          elm_max_name = three;
        }

        if( min_height == one_height ){
          elm_min_name = one;
        }else if( min_height == two_height ){
          elm_min_name = two;
        }else{
          elm_min_name = three;
        }
        

        var min_elm_height = parseInt(window.getComputedStyle(elm_min_name).height),
            max_elm_height = parseInt(window.getComputedStyle(elm_max_name).height);

        if ( num_of_tallas >= 15 ){

            fasele_tallaee+= afzayesh;

        }

        if( max_elm_height - min_elm_height <= fasele_tallaee || wrappers.getElementsByClassName("img").length <= 3){
            ballance_end = 1;
            num_of_tallas = 0;
        }else{

            num_of_tallas++;
        }

	if( ballance_end == 0 ){

		var block_elm = 0,
			none_elm = 0;

		for( v = 0; v < wrappers.getElementsByClassName("img").length; v++ ){
		 
		   if( d.getElementsByClassName(v)[0].style.display == "block"){
			  block_elm++
		   }

		   if( d.getElementsByClassName(v)[0].style.display == "none"){
			  none_elm++
		   }

		}

		if (block_elm == 0 && none_elm == 0){
		  rndelm = Math.round( Math.random() * Math.round( elm_max_name.getElementsByClassName("img").length/2 ) )+1;
		}else if ( block_elm <= 3 ){
		  rndelm = 1;
alert(ballance_end);
		}else{
		  rndelm = Math.round( Math.random() * Math.round(block_elm/2) )+1
		}
			   
		if( rndelm == undefined )
		rndelm = 1

		newChild = elm_max_name.getElementsByClassName("img")[elm_max_name.getElementsByClassName("img").length-rndelm];
		elm_min_name.appendChild(newChild);
	}

	if ( rndelm <=3 ){

		ballance_end = 1;

	}

        console.log(max_elm_height - min_elm_height+" elm_max_name = "+elm_max_name.id+" , elm_min_name = "+elm_min_name.id+""+ballance_end);  

        },50 );

       function requestFullScreen(element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } 
        }

        function exitFullscreen() {
          if (document.exitFullscreen) {
            d.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            d.webkitExitFullscreen();
          }
        }

        var thumb = d.getElementById("thumb"),
            thumb_full_btn = d.getElementById("fullscreen");

        thumb_full_btn.addEventListener('click', function(e) {
            requestFullScreen(thumb);
        });

        var exit = d.getElementById("exit");

        exit.addEventListener('click', function(e) {
            exitFullscreen(exit);
            close_popup();
        });

        var magnifier_thumb_wrapper = d.querySelectorAll(".magnifier-thumb-wrapper")[0],
            mhr = 0,
            mhr_pause = 0;

        magnifier_thumb_wrapper.onmouseenter = function(){

             mhr = 1; console.log("mouse enter");

        }

        magnifier_thumb_wrapper.onmouseout = function(){

            mhr = 0; console.log("mouse out");

        }

        popup.getElementsByClassName("pause")[0].onmouseenter = function(){
            mhr = 1;
            mhr_pause = 1;
        }

        popup.getElementsByClassName("pause")[0].onmouseout = function(){
            mhr = 0;
            mhr_pause = 0;
        }

        tapeSlider();

        var pop_left = d.getElementsByClassName("pop_left")[0],
            pop_right = d.getElementsByClassName("pop_right")[0],
            pop_move = d.getElementsByClassName("pop_move")[0],
            loading = d.getElementsByClassName("loading")[0];

        pop_left.onclick = function(){
          pop_move.style.marginLeft = parseInt(window.getComputedStyle(pop_move).marginLeft)-700+"px";
          prg = -500;
          loading.style.width = "0%";
          loading.style.opacity = "0";

          setTimeout(function(){
            prg = -200;
            loading.style.opacity = "1"
          }, 1000)
        }

        pop_right.onclick = function(){
          pop_move.style.marginLeft = parseInt(window.getComputedStyle(pop_move).marginLeft)+700+"px";
          prg = -500;
          loading.style.width = "0%";
          loading.style.opacity = "0";

          setTimeout(function(){
            prg = -200;
            loading.style.opacity = "1"
          }, 1000)
        }

        setInterval(function(){
          if( popup.style.display == "block" ){

              if( prg <= 100 ){

                  if( mhr !== 1 )
                  prg += Math.round(Math.random() * 15);

               setTimeout(function(){
                  if ( mhr == 1 ){
                      prg = -200;
                      d.getElementsByClassName("loading")[0].style.width = "0%";
                      d.getElementsByClassName("loading")[0].style.opacity = "0";
                  }
                }, 500);

              }else{
                  go_right(); prg = 0
              }

              var loading = d.getElementsByClassName("loading")[0].style;
              loading.width = prg+"%";
              loading.opacity = "1";

          }else{
              prg = 0;
          }

          var mgh_right = d.getElementsByClassName("right")[0],
              mgh_left = d.getElementsByClassName("left")[0];

          if( mhr_pause == 1 ){
              mgh_right.classList.add("toright");
              mgh_left.classList.add("toleft");
          }

          if( mhr_pause == 0 ){
              mgh_right.classList.remove("toright");
              mgh_left.classList.remove("toleft");
          }


        /*if ( Math.round(window.scrollY) >= Math.round(d.body.scrollHeight - 800) ){

            fir_num+= 3;
            addPost(fir_num);
            tapeSlider();

        }*/

        }, 500);

        var options = d.getElementById("option"),
            detials = d.getElementsByClassName("detials")[0];

        var detials_li = detials.getElementsByTagName("li");

        detials_li[0].onclick = function(){
            block_elm = 0; none_elm = 0;

            tapeSlider();

            for( f = 0; f < wrappers.getElementsByClassName("ins").length; f++ ){

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("img")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "block";
                }

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("video")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.parentElement.style.display = "block"
                }
            }

        }

        detials_li[1].onclick = function(){
            block_elm = 0; none_elm = 0;
     
            for( f = 0; f < wrappers.getElementsByClassName("ins").length; f++ ){

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("video")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.parentElement.style.display = "none";
					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0]);

                    }
                }

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("img")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "block";

                    var ftm = new RegExp(".jpg"),
                        jpg = ftm.test(d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].src.toLowerCase());

                    d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "none";
					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0]);

                    }
                }

                if ( jpg ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "block";
                }
            }
        }

        detials_li[2].onclick = function(){
            block_elm = 0; none_elm = 0;
    
            for( f = 0; f < wrappers.getElementsByClassName("ins").length; f++ ){

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("video")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.parentElement.style.display = "none";
					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0]);

                    }
                }

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("img")[0] ){

                    var ftm = new RegExp(".png"),
                        png = ftm.test(d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].src.toLowerCase());

                    if ( png ){
                        d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "block";
                    }else{
                        d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "none";
					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0]);

                    }
                    }

                }	

            }
        }

        detials_li[3].onclick = function(){
            block_elm = 0; none_elm = 0;
      
            for( f = 0; f < wrappers.getElementsByClassName("ins").length; f++ ){

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("video")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.parentElement.style.display = "none";
					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("video")[0]);

                    }
                }

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("img")[0] ){	

                    var ftm = new RegExp(".gif"),
                        gif = ftm.test(d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].src.toLowerCase());

                    if ( gif ){
                        d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "block";
                    }else{
                        d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "none";

					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0]);

                    }

                    }

                }

            }



        }

        detials_li[4].onclick = function(){
            block_elm = 0; none_elm = 0;
       
            for( f = 0; f < wrappers.getElementsByClassName("ins").length; f++ ){

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("video")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("video")[0].parentElement.parentElement.style.display = "block";
                }

                if ( d.getElementsByClassName(f)[0].getElementsByTagName("img")[0] ){
                    d.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.parentElement.style.display = "none";

					if ( thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement ) {

                    	thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0].parentElement.removeChild(thumb.getElementsByClassName(f)[0].getElementsByTagName("img")[0]);

                    }

                }

            }
        }
    }

    var addmore = d.querySelectorAll(".addmore")[0],
        adm_input = d.querySelectorAll("input")[0],
        fir_num =3;

    addmore.ondblclick = function(){
        fasele_tallaee = 150;
        fir_num+= parseInt(adm_input.value);
        addPost(fir_num);
        tapeSlider();
    }

    addPost(fir_num);
