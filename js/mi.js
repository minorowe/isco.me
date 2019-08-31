var windowidth = $(window).width();
// 返回顶部
function scrollTo(name, add, speed) {   
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top + (add || 0)
            }, speed)
        }
    }
}

function goTop(min_height) {
    //获取页面的最小高度，无传入值则默认为300像素
    min_height=min_height?min_height:300;
    //为窗口的scroll事件绑定处理函数
    $(window).scroll(function() {
        //获取窗口的滚动条的垂直位置
        var s = $(window).scrollTop();
        //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐        
        if (s > min_height) {
            $(".rollbar-totop").fadeIn(100);
            document.getElementById("navbox").style.boxShadow = "0px 1px 10px rgba(0, 0, 0, .7)";            
        } else {
            $(".rollbar-totop").fadeOut(200);
            document.getElementById("navbox").style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
        }
        
        var slidercontent = document.getElementById("slidercontent");
        if ( slidercontent != null ) {
            if ( windowidth > 1024 ) {
                document.getElementById("slidercontent").style.backgroundPositionY = -s*2 + "px";
            } else {
                document.getElementById("slidercontent").style.backgroundPositionY = -s*0.5 + "px";
            }
        }
    });
} 
 
$(function() {
    goTop(300);
});

// 失焦Title变化
(function(){
    
    var vendorPrefix=getBrowserPrefix();
    var eventName=visibilityEvent(vendorPrefix);
    document.addEventListener(eventName,visibilityEventCallback);
    
    var oldTitle=document.title;
    function visibilityEventCallback(){
        if(document.hidden){
            oldTitle=document.title;
            document.title="深夜美女电影";
        }else{
            document.title=oldTitle;
        }
    }
    

    /*------------------------ 下面的代码来自网络，用于解决浏览器兼容性问题 ----------------------------------*/
    
    // Get Browser-Specifc Prefix
    function getBrowserPrefix() {
    
          // Check for the unprefixed property.  
          if ('hidden' in document) {
            return null;
        }
    
        // All the possible prefixes.  
        var browserPrefixes = ['moz', 'ms', 'o', 'webkit'];
         
        for (var i = 0; i < browserPrefixes.length; i++) {
            var prefix = browserPrefixes[i] + 'Hidden';
            if (prefix in document) {
              return browserPrefixes[i];
            }  
        }
    
         // The API is not supported in browser.  
         return null;
    }
    
    // Get Browser Specific Hidden Property
    function hiddenProperty(prefix) {
        if (prefix) {
            return prefix + 'Hidden';
        } else {
            return 'hidden';
        }
    }
    
    // Get Browser Specific Visibility State
    function visibilityState(prefix) {
      if (prefix) {
        return prefix + 'VisibilityState';
      } else {
        return 'visibilityState';
      }
    }
    
    // Get Browser Specific Event
    function visibilityEvent(prefix) {
      if (prefix) {
        return prefix + 'visibilitychange';
      } else {
        return 'visibilitychange';
      }
    }    
    
})();

//首页动画
var slider = document.getElementById("slider");
if ( windowidth > 1024 && slider != null ) {
(function(){
const wrapperEl = document.querySelector('.wrapper');
    const numberOfEls = 90;
    const duration = 6000;
    const delay = duration / numberOfEls;

    let tl = anime.timeline({
        duration: delay,
        complete: function() {
            tl.restart();
        }
    });

    function createEl(i) {
        let el = document.createElement('div');
        const rotate = (360 / numberOfEls) * i;
        const translateY = -50;
        const hue = Math.round(360 / numberOfEls * i);
        el.classList.add('el');
        el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
        el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
        tl.add({
            begin: function() {
                anime({
                    targets: el,
                    backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
                    rotate: [rotate + 'deg', rotate + 10 + 'deg'],
                    translateY: [translateY + '%', translateY + 10 + '%'],
                    scale: [1, 1.25],
                    easing: 'easeInOutSine',
                    direction: 'alternate',
                    duration: duration * .1
                });
            }
        });
        wrapperEl.appendChild(el);
    };

    for (let i = 0; i < numberOfEls; i++) createEl(i);

})();
}