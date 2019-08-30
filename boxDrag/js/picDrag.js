;(function () {
  var BoxDrag = function () {
    var _self = this;
    var startClientX, startClientY, left, top, moveClientX, moveClientY, canMove = false;
    var box = document.querySelector(".box");
    var boxWidth = box.offsetWidth;
    var boxHeight = box.offsetHeight;
    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");
    var rRotate = document.querySelector(".rRotate");
    var lRotate = document.querySelector(".lRotate");
    var zoomS = document.querySelector(".zoomS");
    var zoomL = document.querySelector(".zoomL");
    var activeItem = document.querySelector(".pic-item.active img");
    var btnList = document.querySelector(".btn-list");
    this.list = document.querySelectorAll('.pic-item');
    
    prevBtn.addEventListener("click", prev);// 上一张图片
    nextBtn.addEventListener("click", next);// 下一张图片
    rRotate.addEventListener("click", turnRight);// 右旋转
    lRotate.addEventListener("click", turnLeft);// 左旋转
    zoomS.addEventListener("click", zoomSmall);// 在放大的基础上缩小
    zoomL.addEventListener("click", zoomLarge);// 在缩小的基础上放大
    // 拖动
    function drag() {
      var activeItem = document.querySelector(".pic-item.active img");
      activeItem.addEventListener('mousedown',function(e){
        e.preventDefault();
        left = parseInt(getComputedStyle(e.target).left);
        top = parseInt(getComputedStyle(e.target).top);
        startClientX = e.clientX;
        startClientY = e.clientY;
        box.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function(e){
          btnList.removeAttribute("style");
          box.removeEventListener('mousemove',move)
        });
      });
    }
    drag();
    
    function prev () {
      switchImg(-1);
    }
    function next () {
      switchImg(1);
    }
    function switchImg (num) {
      var index = curindex(_self.list);
      if (num > 0) {
        if (index === _self.list.length -1) {
          return
        }
      }else {
        if (index === 0) {
          return
        }
      }
      _self.list.forEach(function (v, k) {
        v.children[0].removeAttribute("style");
        if (v.classList.contains('active')) {
          v.classList.remove("active");
        }
      })
      if (num > 0) {
        _self.list[index+1].classList.add("active");
      }else {
        _self.list[index-1].classList.add("active");
      }
      drag();
    }
    
    function turnRight (e) {
      rotateImg(1);
    }
    function turnLeft (e) {
      rotateImg(-1);
    }
    function rotateImg (num) {
      var index = curindex(_self.list);
      if (_self.list[index].children[0].getAttribute("style") && _self.list[index].children[0].getAttribute("style").indexOf('rotate') !== -1) {
        var reg = /rotate\(.*deg\)/i;
        var rotateDeg = parseFloat(_self.list[index].children[0].getAttribute("style").match(reg)[0].match(/-?\d+/g)[0]);
        if (num > 0) {
          rotateDeg += 90;
        } else {
          rotateDeg -= 90;
        }
        if ((Math.abs(rotateDeg)/90)%2 !== 0) {
          _self.list[index].children[0].style.cssText = "transform: translate(-50%,-50%) rotate("+rotateDeg+"deg);max-width:"+boxHeight+"px;max-height:"+boxWidth+"px;";
        }else {
          _self.list[index].children[0].style.cssText = "transform: translate(-50%,-50%) rotate("+rotateDeg+"deg);max-width:"+boxWidth+"px;max-height:"+boxHeight+"px;";
        }
      }else{
        if (num > 0) {
          _self.list[index].children[0].style.cssText = "transform: translate(-50%,-50%) rotate(90deg);max-width:"+boxHeight+"px;max-height:"+boxWidth+"px;";
        } else {
          _self.list[index].children[0].style.cssText = "transform: translate(-50%,-50%) rotate(-90deg);max-width:"+boxHeight+"px;max-height:"+boxWidth+"px;";
        }
      }
    }
    function zoomSmall (e) {
      var index = curindex(_self.list);
      var naturalWidth = _self.list[index].children[0].naturalWidth;
      var naturalHeight = _self.list[index].children[0].naturalHeight;
      var transformStyle = _self.list[index].children[0].style.transform;
      if (transformStyle) {
        var reg = /rotate\(.*deg\)/i;
        var rotateDeg = parseFloat(transformStyle.match(reg)[0].match(/-?\d+/g)[0]);
         if ((Math.abs(rotateDeg)/90)%2 !== 0) {
          _self.list[index].children[0].style.cssText = 'transform:' + transformStyle + ';width:auto;height:auto;max-width:'+boxHeight+'px;max-height:'+boxWidth+'px;'
        }else {
          _self.list[0].children[0].style.cssText = 'transform:' + transformStyle + ';width:auto;height:auto;max-width:'+boxWidth+'px;max-height:'+boxHeight+'px;'
        }
      }else{
        _self.list[index].children[0].style.cssText = 'width:auto;height:auto;max-width:'+boxWidth+'px;max-height:'+boxHeight+'px;'
      }
    }
    function zoomLarge (e) {
      var index = curindex(_self.list);
      var naturalWidth = _self.list[index].children[0].naturalWidth;
      var naturalHeight = _self.list[index].children[0].naturalHeight;
      var transformStyle = _self.list[index].children[0].style.transform;
      // transformStyle = transformStyle ? transformStyle : '';
      // _self.list[index].children[0].style.cssText = transformStyle+'width:' + (naturalWidth * 2) + 'px;height:' + (naturalHeight * 2) + 'px;max-width:none;max-height:none;'
      if (transformStyle) {
        _self.list[index].children[0].style.cssText = 'transform:' + transformStyle + ';width:' + (naturalWidth * 2) + 'px;height:' + (naturalHeight * 2) + 'px;max-width:none;max-height:none;'
      }else{
        _self.list[index].children[0].style.cssText = 'width:' + (naturalWidth*2) + 'px;height:' + (naturalHeight*2) + 'px;max-width:none;max-height:none;'
      }
    }
    function move (e) {
      btnList.style.display = "none";
      moveClientX = e.clientX;
      moveClientY = e.clientY;
      var disTop = top + moveClientY - startClientY;
      var disLeft = left + moveClientX - startClientX;
      var oldStyle = e.target.getAttribute("style");
      oldStyle = oldStyle ? oldStyle : '';
      if (e.target.tagName === 'IMG') {
        e.target.style.cssText = oldStyle + 'left:'+disLeft+'px;top:'+disTop+'px;';
      }else {
        console.log(e);
      }
    }
    // 获取indeX值
    function curindex (list) {
      for (var i=0; i<list.length; i++) {
        if (list[i].classList.contains('active')) {
          return i;
        }
      }
    }
  }
  window.BoxDrag = BoxDrag;
  return BoxDrag;
})()