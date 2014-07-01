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
    return function parse( elmStr ){
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
    return function contains( elm, child ){
      if ( typeof child === "string" ) {
        return el.querySelector( selector ) !== null;
      } else {
        return elm !== child && elm.contains( child );
      }
    };
  });

  stik.dom( "filter", function(){
    return function filter( elm, selector ){
      return Array.prototype.filter.call(
        elm.querySelectorAll( selector ), filterFn
      );
    };
  });

  stik.dom( "position", function(){
    return function position( elm ){
      return { left: elm.offsetLeft, top: elm.offsetTop };
    }
  });

  stik.dom( "siblings", function(){
    return function siblings( elm ){
      return Array.prototype.filter.call(
        elm.parentNode.children,
        function( child ){
          return child !== elm;
        }
      );
    };
  });

  stik.dom( "find", function(){
    return function find( elm, selector ){
      return elm.querySelector( selector );
    };
  });

  stik.dom( "findAll", function(){
    return function findAll( elm, selector ){
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
    return function mouseMove( elm, callback, capture ){
      event( elm, "mousemove", callback, capture );
    };
  });

  stik.dom( "mouseOver", function( event ){
    return function mouseOver( elm, callback, capture ){
      event( elm, "mouseover", callback, capture );
    };
  });

  stik.dom( "mouseOut", function( event ){
    return function mouseOut( elm, callback, capture ){
      event(elm, "mouseout", callback, capture );
    };
  });

  stik.dom( "abort", function( event ){
    return function abort( elm, callback, capture ){
      event( elm, "abort", callback, capture );
    };
  });

  stik.dom( "blur", function( event ){
    return function blur( elm, callback, capture ){
      event( elm, "blur", callback, capture );
    };
  });

  stik.dom( "change", function( event ){
    return function change( elm, callback, capture ){
      event( elm, "change", callback, capture );
    };
  });

  stik.dom( "error", function( event ){
    return function error( elm, callback, capture ){
      event( elm, "error", callback, capture );
    };
  });

  stik.dom( "focus", function( event ){
    return function focus( elm, callback, capture ){
      event( elm, "focus", callback, capture );
    };
  });

  stik.dom( "load", function( event ){
    return function load( elm, callback, capture ){
      event( elm, "load", callback, capture );
    };
  });

  stik.dom( "reset", function( event ){
    return function reset( elm, callback, capture ){
      event( elm, "reset", callback, capture );
    };
  });

  stik.dom( "resize", function( event ){
    return function resize( elm, callback, capture ){
      event( elm, "resize", callback, capture );
    };
  });

  stik.dom( "scroll", function( event ){
    return function scroll( elm, callback, capture ){
      event( elm, "scroll", callback, capture );
    };
  });

  stik.dom( "select", function( event ){
    return function select( elm, callback, capture ){
      event( elm, "select", callback, capture );
    };
  });

  stik.dom( "submit", function( event ){
    return function submit( elm, callback, capture ){
      event( elm, "submit", callback, capture );
    };
  });

  stik.dom( "unload", function( event ){
    return function unload( elm, callback, capture ){
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
