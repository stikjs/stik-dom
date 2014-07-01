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
  $elm.click(function(){
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
  $elm.click(function(){
    $elm.toggleClass("active");
  });
});
```

###hide
Sets `display:none` on the element.

```javascript
stik.behavior("hideable", function($elm){
  $elm.click(function(){
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

###append
Append to the current $template.

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
  $dom.data($template).force // "strong"
  $dom.data($template).direction // "downwards"
});
```

This module can also be injected as a boundary that would use the current `$template` as the extraction point.

```javascript
stik.behavior("lightsaber-clash", function($data){
  $data.force
  ...
});
```

##
