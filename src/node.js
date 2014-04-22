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
      var regex = new RegExp( "\\b\\s?" + selector + "\\b", "g" );
      elm.className = elm.className.replace( regex, '' );
    }
  };
});

window.stik.dom( "addClass", function( hasClass ){
  return function addClass( elm, selector ){
    if ( !hasClass( elm, selector ) ){
      elm.className = ( elm.className + " " + selector ).trim();
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
    if ( elm.style.display === "none" ) {
      if ( elm.style.removeProperty ) {
        elm.style.removeProperty( "display" );
      } else {
        elm.style.removeAttribute( "display" );
      }
    } else if ( isHidden( elm ) ) {
      elm.style.display = "block";
    }
  };
});

window.stik.dom( "remove", function(){
  return function removeElm( elm ){
    elm.parentNode.removeChild( elm );
  };
});

window.stik.dom( "parse", function(){
  return function( elmStr ){
    var div = document.createElement( "div" );
    div.innerHTML = elmStr;
    if (div.childNodes.length > 1) {
      return div.childNodes;
    } else {
      return div.firstChild;
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
      var div = document.createElement( "div" );
      div.innerHTML = newChild;

      while ( div.firstChild ) {
        referenceNode.parentNode.insertBefore(
          div.firstChild, referenceNode.nextSibling
        );
      }
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
      var div = document.createElement( "div" );
      div.innerHTML = newChild;

      while ( div.firstChild ) {
        referenceNode.parentNode.insertBefore(
          div.firstChild, referenceNode
        );
      }
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

window.stik.boundary({
  as: "$data",
  resolvable: true,
  to: function( $template, $dom ){
    return $dom.data( $template );
  }
});
