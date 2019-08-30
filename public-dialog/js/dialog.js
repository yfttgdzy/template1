function Dialog (options) {
  "use strict";
  if (!(this instanceof Dialog)) {
    return new Dialog(options);
  }
  //必填项type,tip
  var defaults = {
    type: "dialog", //dialog,alert
    tip: "",
    icon: true,
    confirmTip: "",
    okVal: "确定",
    okClass: "btn-blue", //btn-blue,btn-green,btn-white
    ok: function() {},
    cancelVal: "取消",
    cancelClass: "btn-white",
    cancel: function () {},
    close: function () {}
  }
  this.settings = $.extend(defaults,options);
  this.init();
  return this;
}

Dialog.prototype = {
  init: function () {
    var self = this;
    var randomId = Math.floor(Math.random()*(10-1)+1);
    var dialogHtml = '<div class="dialog-box" id="dialog-box'+randomId+'"><div class="dialog-content"><div class="dialog-header"><button class="close-dialog"><span></span></button></div><div class="dialog-body"><div class="dialog-tip-box"><img src="./images/warning-icon.png" alt="" class="dialog-icon"><span class="dialog-tip"></span></div><h4 class="dialog-confirm-tip"></h4></div><div class="dialog-footer"><a href="javacript:void(0)" class="btn-style btn-ok">确定</a><a href="javacript:void(0)" class="btn-style btn-cancel">确定</a></div></div></div>'
    $("body").append(dialogHtml);
    this.dialogBox = $("#dialog-box"+randomId);
    this.closeBtn = $(".close-dialog");
    this.btnOk = $(".btn-ok");
    this.btnCancel = $(".btn-cancel");
    this.icon = $(".dialog-icon");
    this.tip = $(".dialog-tip");
    this.confirmTip = $(".dialog-confirm-tip");
    this.dialogShow();
    
    self.btnOk.on("click",function(e) {
      e.stopPropagation();
      self.settings.ok();
      self.removeDialog();
    })
    self.btnCancel.on("click",function(e) {
      e.stopPropagation();
      self.settings.cancel();
      self.removeDialog();
    })
    self.closeBtn.on("click",function(e) {
      e.stopPropagation();
      self.settings.close();
      self.removeDialog();
    })
  },
  dialogShow: function () {
    // 判断弹框类型
    if (this.settings.type === 'alert') {
      this.btnCancel.hide();
      // this.icon.hide();
    }
    // 判断是否有弹框内容，无则报错
    if (this.settings.tip) {
      this.tip.html(this.settings.tip);
    } else {
      throw new Error("parameter tip is necessary")
    }
    if (!this.settings.icon) {
      this.icon.hide()
    }
    // 判断是否有确认信息
    if (!this.settings.confirmTip) {
      this.confirmTip.hide();
    } else {
      this.confirmTip.html(this.settings.confirmTip).show();
    }
    
    this.btnOk.html(this.settings.okVal).addClass(this.settings.okClass);
    this.btnCancel.html(this.settings.cancelVal).addClass(this.settings.cancelClass);
    this.dialogBox.show();
  },
  removeDialog: function () {
    this.dialogBox.remove();
  }
}