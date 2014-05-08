window.stik.dom( "hasClass", function(){
  return function hasClass( elm, selector ){
    var className = " " + selector + " ";
    return ( " " + elm.className + " " ).
      replace( /[\n\t]/g, " " ).
      indexOf( className ) > -1;
  };
});

window.stik.dom( "removeClass", function( hasClass ){
  return function removeClass( elm, selector ){
    if ( hasClass( elm, selector ) ){
      var regex = new RegExp( "(^|\\s)?" + selector + "(\\s|$)", "g" );
      elm.className = elm.className.replace( regex, '' );
    }
  };
});

window.stik.dom( "addClass", function( hasClass ){
  return function addClass( elm, className ){
    if ( !hasClass( elm, className ) ){
      if ( elm.classList ) {
        elm.classList.add( className );
      } else {
        elm.className = ( elm.className + " " + className ).trim();
      }
    }
  };
});

window.stik.dom( "toggleClass", function( hasClass, addClass, removeClass ){
  return function toggleClass( elm, selector ){
    if ( hasClass( elm, selector ) ) {
      removeClass( elm, selector );
    } else if ( !hasClass( elm, selector ) ) {
      addClass( elm, selector );
    }
  };
});

window.stik.dom( "hide", function(){
  return function hideElm( elm ){
    elm.style.display = "none";
  };
});

window.stik.dom( "isHidden", function(){
  return function isHidden( elm ) {
    // return elm.offsetWidth > 0 && elm.offsetHeight > 0;
    return elm.offsetParent === null;
  }
});

window.stik.dom( "isVisible", function( isHidden ){
  return function isVisible( elm ) {
    return !isHidden( elm );
  }
});

window.stik.dom( "show", function( isHidden ){
  return function showElm( elm ){
    elm.style.display = "block";
  };
});

window.stik.dom( "remove", function(){
  return function removeElm( elm ){
    elm.parentNode.removeChild( elm );
  };
});

window.stik.dom( "parse", function(){
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

window.stik.dom( "append", function(){
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

window.stik.dom( "prepend", function( insertBefore, append ){
  return function prepend( parent, newChild ){
    if ( parent.childNodes.length > 0 ) {
      insertBefore( parent.firstChild, newChild );
    } else {
      append( parent, newChild );
    }
  };
});

window.stik.dom( "insertAfter", function(){
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

window.stik.dom( "insertBefore", function(){
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

window.stik.dom( "data", function(){
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

window.stik.dom( "contains", function(){
  return function( elm, child ){
    if ( typeof child === "string" ) {
      return el.querySelector( selector ) !== null;
    } else {
      return elm !== child && elm.contains( child );
    }
  };
});

window.stik.dom( "filter", function(){
  return function( elm, selector ){
    return Array.prototype.filter.call(
      elm.querySelectorAll( selector ), filterFn
    );
  };
});

window.stik.dom( "position", function(){
  return function( elm ){
    return { left: elm.offsetLeft, top: elm.offsetTop };
  }
});

window.stik.dom( "siblings", function(){
  return function( elm ){
    return Array.prototype.filter.call(
      elm.parentNode.children,
      function( child ){
        return child !== elm;
      }
    );
  };
});

window.stik.boundary({
  as: "$data",
  resolvable: true,
  to: function( $template, $dom ){
    return $dom.data( $template );
  }
});
