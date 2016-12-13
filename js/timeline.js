(function ($, undefined) {
  var kendo = window.kendo,
      Widget = kendo.ui.Widget,
      CHANGE = "change";

  var Timeline = Widget.extend({

    init: function(element, options) {
      var that = this;
      Widget.fn.init.call(this, element, options);
      that.template = kendo.template(that.options.template || that._getDefaultTemplate());
      that._dataSource();
    },

    options: {
      name: "Timeline",
      autoBind: true,
      template: ""
    },

    _getDefaultTemplate: function() {
      return `# for (var i = 0; i < data.length; i++) { #
        # if (i == 0 || data[i].date.getYear() > data[i - 1].date.getYear()) { #
        <h1 id="timeline-header-#= data[i].date.getFullYear() #" style="font-size: 40px; text-align: center;">#= data[i].date.getFullYear() #</h1>
        <section id="cd-timeline" class="cd-container">
        # } #
        # if (!data[i].type || data[i].type == undefined) { continue; } #
        <div id="timeline-block-#= i #" class="cd-timeline-block">
          <div class="cd-timeline-img cd-picture bounce-in"><i class="k-font-icon k-i-calendar" aria-hidden="true"></i></div>
          <div class="cd-timeline-content bounce-in">
            <div class="list-group">
              # if (data[i].notesUrl) { #
              <a href="http://www.telerik.com/support/whats-new/kendo-ui/release-history/#= data[i].notesUrl #">
              # } #
              <h2>#= data[i].title #</h2>
              # if (data[i].notesUrl || data[i].youTubeId) { #
              </a>
              # } #
              # if (data[i].version) { #
              <span class="cd-timeline-content-version">#= data[i].version #</span>
              # } #
              # if (data[i].description) { #
              <p class="cd-timeline-content-description">#= data[i].description #</p>
              # } #
              # if (data[i].tweetUrl) { #
              <div id="timeline-tweet-#= i #" data-role="tweet" data-url="#= data[i].tweetUrl #"></div>
              # } #
              # if (data[i].youTubeId) { #
              <p><iframe id="timeline-video-#= i #" width="100%" height="315" src="https://www.youtube.com/embed/#= data[i].youTubeId #" frameborder="0" allowfullscreen></iframe></p>
              # } #
            </div>
            # if (data[i].imageUrl) { #
            <p><img class="timeline-image" src="#= data[i].imageUrl #" /></p>
            # } #
            <span class="cd-date">#= kendo.toString(data[i].date, "m") #</span>
          </div>
        </div>
        # if (i == data.length - 1 || data[i].date.getYear() < data[i + 1].date.getYear()) { #
      </section>
        # } #
      # } #`;
    },

    _dataSource: function() {
      var that = this;

      that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

      that.dataSource.bind(CHANGE, function() {
        that.refresh();
      });

      if (that.options.autoBind) {
        that.dataSource.fetch();
      }
    },

    refresh: function() {
      var that = this,
          view = that.dataSource.view(),
          html = kendo.render(that.template, view);

      var template = kendo.template(that.template);
      var result = template(view);

      that.element.append(result);
      kendo.init(that.element);
    }
  });

  kendo.ui.plugin(Timeline);

})(window.kendo.jQuery);