// Stik-dom - Version: 0.7.0 | From: 1-7-2014
(function( stik ){
  var methods = {},
      modules = {},
      tmpDependencies = {};

  stik.dom = function dom( as, func ){
    if ( !as ) { throw "Stik: DOM needs a name"; }
    if ( !func || typeof func !== "function" ) { throw "Stik: DOM needs a function"; }

    modules[ as ] = stik.injectable({
      module: func,
      resolvable: true
    });
    methods[ as ] = function(){
      var func = modules[ as ].resolve( withDependencies() );
      return func.apply( {}, arguments );
    };

    return methods[ as ];
  };

  function withDependencies(){
    for ( var name in modules ) {
      if ( !tmpDependencies.hasOwnProperty( name ) ) {
        tmpDependencies[ name ] = modules[ name ];
      }
    }

    return tmpDependencies;
  }

  methods.pushDoubles = function pushDoubles( doubles ){
    for ( var name in doubles ) {
      tmpDependencies[ name ] = stik.injectable({
        module: doubles[ name ]
      });
    }
  };

  methods.cleanDoubles = function cleanDoubles(){
    tmpDependencies = {};
  };

  stik.dom.signatures = function signatures(){
    return Object.keys(modules);
  }

  stik.boundary( { as: "$dom", to: methods } );
})( window.stik );

(function( stik ){
  stik.boundary({
    as: "$elm",
    resolvable: true,
    to: function( $template, $dom ){
      var elm = {};
      var methods = stik.dom.signatures();
      var i = methods.length;
      while (i--){
        (function(method){
          elm[method] = function(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift($template);
            return $dom[method].apply({}, args);
          };
        })(methods[i]);
      }
      return elm;
    }
  });

  stik.dom( "hasClass", function(){
    return function hasClass( elm, selector ){
      if ( elm.classList ) {
        return elm.classList.contains( selector );
      } else {
        var className = " " + selector + " ";
        return ( " " + elm.className + " " ).
          replace( /[\t\r\n\f]/g, " " ).
          indexOf( className ) >= 0;
      }
    };
  });

  stik.dom( "removeClass", function( hasClass ){
    return function removeClass( elm, className ){
      var classNames = [];
      if ( isArray( className ) ) {
        classNames = className;
      } else {
        classNames = className.split(" ");
      }

      for (var i = 0; i < classNames.length; i++) {
        if ( elm.classList ) {
          elm.classList.remove( classNames[ i ] );
        } else {
          if ( hasClass( elm, classNames[ i ] ) ){
            var regex = new RegExp( "(^|\\s)?" + classNames[ i ] + "(\\s|$)", "g" );
            elm.className = elm.className.replace( regex, " " ).trim();
          }
        }
      }
    };
  });

  stik.dom( "addClass", function( hasClass ){
    return function addClass( elm, className ){
      var classNames = [];
      if ( isArray( className ) ) {
        classNames = className;
      } else {
        classNames = className.split(" ");
      }

      for (var i = 0; i < classNames.length; i++) {
        if ( !hasClass( elm, classNames[ i ] ) ){
          if ( elm.classList ) {
            elm.classList.add( classNames[ i ] );
          } else {
            elm.className = ( elm.className + " " + classNames[ i ] ).trim();
          }
        }
      }
    };
  });

  stik.dom( "toggleClass", function( hasClass, addClass, removeClass ){
    return function toggleClass( elm, selector, forceAdd ){
      if ( forceAdd === true ) {
        addClass( elm, selector );
      } else if ( forceAdd === false ) {
        removeClass( elm, selector );
      } else if ( hasClass( elm, selector ) ) {
        removeClass( elm, selector );
      } else if ( !hasClass( elm, selector ) ) {
        addClass( elm, selector );
      }
    };
  });

  stik.dom( "hide", function(){
    return function hideElm( elm ){
      elm.style.display = "none";
    };
  });

  stik.dom( "isHidden", function(){
    return function isHidden( elm ) {
      return elm.offsetParent === null;
    }
  });

  stik.dom( "isVisible", function( isHidden ){
    return function isVisible( elm ) {
      return !isHidden( elm );
    }
  });

  stik.dom( "show", function( isHidden ){
    return function showElm( elm ){
      elm.style.display = "block";
    };
  });

  stik.dom( "remove", function(){
    return function removeElm( elm ){
      elm.parentNode.removeChild( elm );
    };
  });

  stik.dom( "parse", function(){
    return function( elmStr ){
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = elmStr;
      if ( tmp.body.children > 1 ) {
        return tmp.body.childNodes;
      } else {
        return tmp.body.firstChild;
      }
    };
  });

  stik.dom( "append", function(){
    return function append( parent, newChild ) {
      if ( typeof newChild === "string" ) {
        var div = document.createElement( "div" );
        div.innerHTML = newChild;

        while ( div.firstChild ) {
          parent.appendChild( div.firstChild );
        }
      } else {
        parent.appendChild( newChild );
      }
    };
  });

  stik.dom( "prepend", function( insertBefore, append ){
    return function prepend( parent, newChild ){
      if ( parent.childNodes.length > 0 ) {
        insertBefore( parent.firstChild, newChild );
      } else {
        append( parent, newChild );
      }
    };
  });

  stik.dom( "insertAfter", function(){
    return function insertAfter( referenceNode, newChild ) {
      if ( typeof newChild === "string" ) {
        referenceNode.insertAdjacentHTML( "afterend", newChild );
      } else {
        referenceNode.parentNode.insertBefore(
          newChild, referenceNode.nextSibling
        );
      }
    };
  });

  stik.dom( "insertBefore", function(){
    return function insertBefore( referenceNode, newChild ){
      if ( typeof newChild === "string" ) {
        referenceNode.insertAdjacentHTML( "beforebegin", newChild );
      } else {
        referenceNode.parentNode.insertBefore(
          newChild, referenceNode
        );
      }
    };
  });

  stik.dom( "data", function(){
    return function data( elm ){
      var attrs = {},
          attr, name;

      for ( attr in elm.attributes ) {
        if ( elm.attributes[ attr ].value ) {
          name = elm.attributes[ attr ].name;
          if (name.match(/^data-/m)) {
            attrs[ parseName( name ) ] =
              elm.attributes[ attr ].value;
          }
        }
      }

      function parseName( name ){
        return toCamelCase( name.match( /(data-)(.+)/ )[ 2 ] );
      }

      function toCamelCase(name){
        return name.replace( /-([a-z])/g, function( match ){
          return match[ 1 ].toUpperCase();
        });
      }

      return attrs;
    };
  });

  stik.dom( "contains", function(){
    return function( elm, child ){
      if ( typeof child === "string" ) {
        return el.querySelector( selector ) !== null;
      } else {
        return elm !== child && elm.contains( child );
      }
    };
  });

  stik.dom( "filter", function(){
    return function( elm, selector ){
      return Array.prototype.filter.call(
        elm.querySelectorAll( selector ), filterFn
      );
    };
  });

  stik.dom( "position", function(){
    return function( elm ){
      return { left: elm.offsetLeft, top: elm.offsetTop };
    }
  });

  stik.dom( "siblings", function(){
    return function( elm ){
      return Array.prototype.filter.call(
        elm.parentNode.children,
        function( child ){
          return child !== elm;
        }
      );
    };
  });

  stik.dom( "find", function(){
    return function( elm, selector ){
      return elm.querySelector( selector );
    };
  });

  stik.dom( "findAll", function(){
    return function( elm, selector ){
      return elm.querySelectorAll( selector );
    };
  });

  stik.dom( "event", function(){
    return function event( elm, type, callback, capture ){
      elm.addEventListener( type, callback, capture || false );
    };
  });

  stik.dom( "click", function( event ){
    return function click( elm, callback, capture ){
      event( elm, "click", callback, capture );
    };
  });

  stik.dom( "doubleClick", function( event ){
    return function doubleClick( elm, callback, capture ){
      event( elm, "dblclick", callback, capture );
    };
  });

  stik.dom( "mouseDown", function( event ){
    return function mouseDown( elm, callback, capture ){
      event( elm, "mousedown", callback, capture );
    };
  });

  stik.dom( "mouseUp", function( event ){
    return function mouseUp( elm, callback, capture ){
      event( elm, "mouseup", callback, capture );
    };
  });

  stik.dom( "mouseMove", function( event ){
    return function( elm, callback, capture ){
      event( elm, "mousemove", callback, capture );
    };
  });

  stik.dom( "mouseOver", function( event ){
    return function( elm, callback, capture ){
      event( elm, "mouseover", callback, capture );
    };
  });

  stik.dom( "mouseOut", function( event ){
    return function( elm, callback, capture ){
      event(elm, "mouseout", callback, capture );
    };
  });

  stik.dom( "abort", function( event ){
    return function( elm, callback, capture ){
      event( elm, "abort", callback, capture );
    };
  });

  stik.dom( "blur", function( event ){
    return function( elm, callback, capture ){
      event( elm, "blur", callback, capture );
    };
  });

  stik.dom( "change", function( event ){
    return function( elm, callback, capture ){
      event( elm, "change", callback, capture );
    };
  });

  stik.dom( "error", function( event ){
    return function( elm, callback, capture ){
      event( elm, "error", callback, capture );
    };
  });

  stik.dom( "focus", function( event ){
    return function( elm, callback, capture ){
      event( elm, "focus", callback, capture );
    };
  });

  stik.dom( "load", function( event ){
    return function( elm, callback, capture ){
      event( elm, "load", callback, capture );
    };
  });

  stik.dom( "reset", function( event ){
    return function( elm, callback, capture ){
      event( elm, "reset", callback, capture );
    };
  });

  stik.dom( "resize", function( event ){
    return function( elm, callback, capture ){
      event( elm, "resize", callback, capture );
    };
  });

  stik.dom( "scroll", function( event ){
    return function( elm, callback, capture ){
      event( elm, "scroll", callback, capture );
    };
  });

  stik.dom( "select", function( event ){
    return function( elm, callback, capture ){
      event( elm, "select", callback, capture );
    };
  });

  stik.dom( "submit", function( event ){
    return function( elm, callback, capture ){
      event( elm, "submit", callback, capture );
    };
  });

  stik.dom( "unload", function( event ){
    return function( elm, callback, capture ){
      event( elm, "unload", callback, capture );
    };
  });

  function isArray( obj ){
    return Object.prototype.toString.call( obj ) === "[object Array]"
  }

  stik.boundary({
    as: "$data",
    resolvable: true,
    to: function( $template, $dom ){
      return $dom.data( $template );
    }
  });
})( window.stik );

(function( stik ){
  stik.dom( "serialize", function(){
    return function serializeForm( form, asObj ){
      var i, j, q;
      if (!form || form.nodeName !== "FORM") {
        return;
      }
      i = j = void 0;
      q = [];
      i = form.elements.length - 1;
      while (i >= 0) {
        if (form.elements[i].name === "") {
          i = i - 1;
          continue;
        }
        switch (form.elements[i].nodeName) {
          case "INPUT":
            switch (form.elements[i].type) {
              case "text":
              case "hidden":
              case "password":
              case "button":
              case "reset":
              case "submit":
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
              case "checkbox":
              case "radio":
                if (form.elements[i].checked) {
                  q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                }
                break;
              case "file":
                break;
            }
            break;
          case "TEXTAREA":
            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            break;
          case "SELECT":
            switch (form.elements[i].type) {
              case "select-one":
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
              case "select-multiple":
                j = form.elements[i].options.length - 1;
                while (j >= 0) {
                  if (form.elements[i].options[j].selected) {
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                  }
                  j = j - 1;
                }
            }
            break;
          case "BUTTON":
            switch (form.elements[i].type) {
              case "reset":
              case "submit":
              case "button":
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            }
        }
        i = i - 1;
      }
      if ( asObj ) {
        var obj = {}, name, value;

        for (var i = 0; i < q.length; i++) {
          name = q[i].split("=")[0];
          value = q[i].split("=")[1];
          obj[name] = value;
        }

        return obj;
      } else {
        return q.join( "&" );
      }
    };
  });
})( window.stik );
