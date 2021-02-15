function EventTracker(trackingUrl) {
  function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
    var tracker = this;
    var ref = getParameterByName('ref');
    this.trackingUrl = trackingUrl;
    this.track = function(data) {
      fetch(this.trackingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, {ref: ref}, data))
      })
    }
    this.trackAllLinks = function() {
      var links = document.getElementsByTagName("a");
      for(var i = 0; i < links.length; i++) {
        var link = links[i];
        link.onclick= function() {
          tracker.track({
            type: 'link',
            destination: this.href
          })
        }
      }
    }
    return this
}

