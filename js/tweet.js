(function ($, undefined) {
  var kendo = window.kendo,
      Widget = kendo.ui.Widget;

  var Tweet = Widget.extend({

    init: function(element, options) {
      var that = this;
      Widget.fn.init.call(this, element, options);
      element = that.wrapper = that.element;
      options = that.options;
      that._render();
    },

    options: {
      name: "Tweet",
      url: "",
      hideMedia: false,
      hideThread: false,
      align: ""
    },

    _render: function() {
      var that = this,
          element = that.element,
          options = that.options,
          oEmbedUrl = "https://publish.twitter.com/oembed";

      if (options.url) {
        oEmbedUrl += "?url=" + options.url;

        if (options.hideMedia) {
          oEmbedUrl += "&hide_media=1";
        }

        if (options.hideThread) {
          oEmbedUrl += "&hide_thread=1";
        }

        if (options.align) {
          oEmbedUrl += "&align=" + options.align;
        }

        $.ajax({
          url: oEmbedUrl + "&callback=?",
          dataType: "jsonp",
          success: function (data) {
            $(data.html).prependTo(element);
          }
        });
      }
    }
  });

  kendo.ui.plugin(Tweet);

})(window.kendo.jQuery);