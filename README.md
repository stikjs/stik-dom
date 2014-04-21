#Stik DOM

[![Build Status](https://travis-ci.org/stikjs/stik-dom.svg)](https://travis-ci.org/stikjs/stik-dom)
[![Code Climate](https://codeclimate.com/github/stikjs/stik-dom.png)](https://codeclimate.com/github/stikjs/stik-dom)

###addClass
Adds the specified class to the element.

```javascript
stik.behavior("active-on-focus", function($template, $dom){
  $template.onfocus = function(){
    $dom.addClass($template, "active");
  };
});
```

###removeClass
Removes the specified class from the element.

```javascript
stik.behavior("active-on-focus", function($template, $dom){
  // ...
  $template.onblur = function(){
    $dom.removeClass($template, "active");
  };
});
```

###hasClass
Checks whether the element has the specified class.

```javascript
stik.behavior("active-on-click", function($template, $dom){
  $template.addEventListener "click", function(){
    if ($dom.hasClass($template, "active")) {
      $dom.removeClass($template, "active");
    } else {
      $dom.addClass($template, "active");
    }
  };
});
```

###toggleClass
Toggles the specified class on the element.

```javascript
stik.behavior("active-on-click", function($template, $dom){
  $template.addEventListener "click", function(){
    $dom.toggleClass($template, "active");
  };
});
```

###data
Captures all the `data-*` attributes defined in the template and gives you an object to easily access them.

```html
<div class="lightsaber-clash" data-force="strong" data-direction="downwards"></div>
```

```javascript
stik.behavior("lightsaber-clash", function($template, $dom){
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
