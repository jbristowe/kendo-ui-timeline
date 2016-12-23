(function ($, undefined) {
  var kendo = window.kendo,
      Widget = kendo.ui.Widget;

  var Tweet = Widget.extend({

    init: function(element, options) {
      var that = this;
      Widget.fn.init.call(this, element, options);
      that._render();
    },

    options: {
      name: "Tweet",
      align: "",
      hideMedia: false,
      hideThread: false,
      hideTweet: false,
      lang: "",
      maxWidth: "",
      omitScript: false,
      related: "",
      url: "",
      widgetType: ""
    },

    _render: function() {
      var that = this,
          element = that.element,
          options = that.options,
          oEmbedUrl = "https://publish.twitter.com/oembed";

      if (options.url) {
        oEmbedUrl += "?url=" + options.url;

        if (options.align) {
          oEmbedUrl += "&align=" + options.align;
        }

        if (options.hideMedia) {
          oEmbedUrl += "&hide_media=1";
        }

        if (options.hideThread) {
          oEmbedUrl += "&hide_thread=1";
        }

        if (options.lang) {
          oEmbedUrl += "&lang=" + options.lang;
        }

        if (options.omitScript) {
          oEmbedUrl += "&omit_script=1";
        }

        if (options.related) {
          oEmbedUrl += "&related=" + options.related;
        }

        if (options.widgetType == "video") {
          oEmbedUrl += "&widget_type=video"
          if (options.hideTweet) {
            oEmbedUrl += "&hide_tweet=1"
          }
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