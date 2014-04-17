stik.dom( "hasClass", function(){
  return function hasClass( elm, selector ){
    var className = " " + selector + " ";
    return ( " " + elm.className + " " ).
      replace( /[\n\t]/g, " " ).
      indexOf( className ) > -1;
  };
});

stik.dom( "removeClass", function( hasClass ){
  return function removeClass( elm, selector ){
    if ( hasClass( elm, selector ) ){
      var regex = new RegExp( "\\b\\s?" + selector + "\\b", "g" );
      elm.className = elm.className.replace( regex, '' );
    }
  };
});

stik.dom( "addClass", function( hasClass ){
  return function addClass( elm, selector ){
    if ( !hasClass( elm, selector ) ){
      elm.className = ( elm.className + " " + selector ).trim();
    }
  };
});

stik.dom( "toggleClass", function( hasClass, addClass, removeClass ){
  return function toggleClass( elm, selector ){
    if ( hasClass( elm, selector ) ) {
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

stik.dom( "show", function(){
  return function showElm( elm ){
    if ( elm.style.removeProperty ) {
      elm.style.removeProperty( "display" );
    } else {
      elm.style.removeAttribute( "display" );
    }
  };
});

stik.dom( "remove", function(){
  return function removeElm( elm ){
    elm.parentNode.removeChild( elm );
  };
});

stik.dom( "parse", function(){
  return function( elmStr ){
    var div = document.createElement( "div" );
    div.innerHTML = elmStr;
    if (div.childNodes.length > 1) {
      return div.childNodes;
    } else {
      return div.firstChild;
    }
  }
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

stik.dom( "insertBefore", function( ){
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
