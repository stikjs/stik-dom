#Stik DOM

[![Build Status](https://travis-ci.org/stikjs/stik-dom.svg)](https://travis-ci.org/stikjs/stik-dom)
[![Code Climate](https://codeclimate.com/github/stikjs/stik-dom.png)](https://codeclimate.com/github/stikjs/stik-dom)

Introduces a tiny set of DOM manipulation methods to facilitate your daily work with [Stik.js](https://github.com/stikjs/stik.js).

##$elm
Gives you access to all $dom module methods by wrapping the $template module with a delegator object, forwarding method calls to the $dom module while using the right $template for a given context.

###addClass
Adds the specified class to the element.

```javascript
stik.behavior("active-on-focus", function($elm){
  $elm.focus(function(event){
    $elm.addClass("active");
  });
});
```

###removeClass
Removes the specified class from the element.

```javascript
stik.behavior("active-on-focus", function($elm){
  // ...
  $elm.blur(function(event){
    $elm.removeClass("active");
  };
});
```

###hasClass
Checks whether the element has the specified class.

```javascript
stik.behavior("active-on-click", function($elm){
  $elm.click(function(event){
    if ($elm.hasClass("active")) {
      $elm.removeClass("active");
    } else {
      $elm.addClass("active");
    }
  });
});
```

###toggleClass
Toggles the specified class on the element.

```javascript
stik.behavior("active-on-click", function($elm){
  $elm.click(function(event){
    $elm.toggleClass("active");
  });
});
```

###hide
Sets `display:none` on the element.

```javascript
stik.behavior("hideable", function($elm){
  $elm.click(function(event){
    $elm.hide();
  });
});
```

###show
Sets `display:block` on the element.

```javascript
stik.behavior("delayed-display", function($elm){
  setTimeout(function(){
    $elm.show();
  }, 1000);
});
```

###remove
Removes the node from the DOM.

```javascript
stik.behavior("removable", function($elm){
  var removeBtn = $elm.find(".remove");
  removeBtn.click(function(event){
    $elm.remove();
  });
});
```

###append
Append to the current $template.

```javascript
stik.controller("PostsCtrl", "List", function($elm, getPosts){
  getPosts().then(function(posts){
    var view;
    posts.forEach(function(post){
      view = "<span>" + post.content + "</span>";
      $elm.append(view);
    });
  });
});
```

###prepend
Prepend to the current $template.

```javascript
stik.controller("TweetsCtrl", "List", function($elm, getTweets){
  getTweets().then(function(tweets){
    var view;
    tweets.forEach(function(tweet){
      view = "<span>" + tweet.content + "</span>";
      $elm.prepend(view);
    });
  });
});
```

###insertAfter
Insert the new element after the $template.

```javascript
stik.behavior("duplicable", function($elm){
  $elm.click(function(event){
    $elm.insertAfter($elm.template);
  });
});
```

###insertBefore
Insert the new element before the $template.

```javascript
stik.behavior("duplicable", function($elm){
  $elm.click(function(event){
    $elm.insertBefore($elm.template);
  });
});
```

###data
Captures all the `data-*` attributes defined in the template and gives you an object to easily access them.

```html
<div class="lightsaber-clash" data-force="strong" data-direction="downwards"></div>
```

```javascript
stik.behavior("lightsaber-clash", function($elm){
  $elm.data().force // "strong"
  $elm.data().direction // "downwards"
});
```

This module can also be injected as a boundary that would use the current `$template` as the extraction point.

```javascript
stik.behavior("lightsaber-clash", function($data){
  $data.force
  ...
});
```

###find
Finds the first element for a given css selector within the current template. It simply delegates to querySelector.

```javascript
stik.behavior("removable", function($elm){
  var removeBtn = $elm.find(".remove");
  ...
});
```

###findAll
Finds all the elements for a given css selector within the current template. It simply delegates to querySelectorAll.

```javascript
stik.behavior("shine-when-new", function($elm){
  var tweet = $elm.findAll(".new-tweet");
  ...
});
```

###event
A simple shortcut to addEventListener applyed to the current template.

```javascript
stik.behavior("active-on-focus", function($elm){
  $elm.event("focus", function(evt){
    $elm.addClass("active");
  });
});
```

###click
Delegates to addEventListener#click.

```javascript
stik.behavior("active-on-click", function($elm){
  $elm.click(function(event){
    ...
  });
});
```

###doubleClick
Delegates to addEventListener#dblclick.

```javascript
stik.behavior("active-on-double-click", function($elm){
  $elm.doubleClick(function(event){
    ...
  });
});
```

###mouseDown
Delegates to addEventListener#mousedown.

```javascript
stik.behavior("active-on-mouse-down", function($elm){
  $elm.mouseDown(function(event){
    ...
  });
});
```

###mouseUp
Delegates to addEventListener#mouseup.

```javascript
stik.behavior("active-on-mouse-up", function($elm){
  $elm.mouseUp(function(event){
    ...
  });
});
```

###mouseMove
Delegates to addEventListener#mousemove.

```javascript
stik.behavior("active-on-mouse-move", function($elm){
  $elm.mouseMove(function(event){
    ...
  });
});
```

###mouseOver
Delegates to addEventListener#mouseover.

```javascript
stik.behavior("active-on-mouse-over", function($elm){
  $elm.mouseOver(function(event){
    ...
  });
});
```

###mouseOut
Delegates to addEventListener#mouseout.

```javascript
stik.behavior("active-on-mouse-out", function($elm){
  $elm.mouseOut(function(event){
    ...
  });
});
```

###abort
Delegates to addEventListener#abort.

```javascript
stik.behavior("retry-on-abort", function($elm){
  $elm.abort(function(event){
    ...
  });
});
```

###blur
Delegates to addEventListener#blur.

```javascript
stik.behavior("shine-on-blur", function($elm){
  $elm.blur(function(event){
    ...
  });
});
```

###change
Delegates to addEventListener#change.

```javascript
stik.behavior("active-on-change", function($elm){
  $elm.change(function(event){
    ...
  });
});
```

###error
Delegates to addEventListener#mousemove.

```javascript
stik.behavior("active-on-mouse-move", function($elm){
  $elm.mouseMove(function(event){
    ...
  });
});
```

###focus
Delegates to addEventListener#focus.

```javascript
stik.behavior("shine-on-focus", function($elm){
  $elm.focus(function(event){
    ...
  });
});
```

###load
Delegates to addEventListener#load.

```javascript
stik.behavior("active-on-load", function($elm){
  $elm.load(function(event){
    ...
  });
});
```

###reset
Delegates to addEventListener#reset.

```javascript
stik.behavior("activate-on-reset", function($elm){
  $elm.reset(function(event){
    ...
  });
});
```

###resize
Delegates to addEventListener#resize.

```javascript
stik.behavior("reposition-on-resize", function($elm){
  $elm.resize(function(event){
    ...
  });
});
```

###scroll
Delegates to addEventListener#scroll.

```javascript
stik.behavior("activate-on-scroll", function($elm){
  $elm.scroll(function(event){
    ...
  });
});
```

###select
Delegates to addEventListener#select.

```javascript
stik.behavior("shine-on-select", function($elm){
  $elm.select(function(event){
    ...
  });
});
```

###submit
Delegates to addEventListener#submit.

```javascript
stik.behavior("shine-on-reset", function($elm){
  $elm.submit(function(event){
    ...
  });
});
```

###unload
Delegates to addEventListener#unload.

```javascript
stik.behavior("shine-on-unload", function($elm){
  $elm.unload(function(event){
    ...
  });
});
```

##$dom
Every $elm method can be accessed directly using the $dom module. The only caveat is that it doesn't know about the current template so you need to tell it the template that it should be acting upon.

```javascript
stik.behavior("some-behavior", function($template, $dom){
  $dom.addClass($template, "cssClass");
  $dom.hasClass($template, "cssClass");
  $dom.removeClass($template, "cssClass");
  $dom.toggleClass($template);
  $dom.hide($template);
  $dom.show($template);
  $dom.remove($template);
  $dom.append($template, "htmlOrNode");
  $dom.prepend($template, "htmlOrNode");
  $dom.insertAfter($template, "htmlOrNode");
  $dom.insertBefore($template, "htmlOrNode");
  $dom.data($template);
  $dom.find($template, "cssSelector");
  $dom.findAll($template, "cssSelector");
  $dom.event($template, "eventName", function(){});
  $dom.click($template, function(){});
  $dom.doubleClick($template, function(){});
  $dom.mouseUp($template, function(){});
  $dom.mouseMove($template, function(){});
  $dom.mouseOver($template, function(){});
  $dom.mouseOut($template, function(){});
  $dom.abort($template, function(){});
  $dom.blur($template, function(){});
  $dom.change($template, function(){});
  $dom.error($template, function(){});
  $dom.focus($template, function(){});
  $dom.load($template, function(){});
  $dom.reset($template, function(){});
  $dom.resize($template, function(){});
  $dom.scroll($template, function(){});
  $dom.select($template, function(){});
  $dom.submit($template, function(){});
  $dom.unload($template, function(){});
});
```
