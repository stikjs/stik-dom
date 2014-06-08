// Version: 0.4.1 | From: 08-06-2014

(function(window){
  var methods = {},
      modules = {},
      tmpDependencies = {};

  window.stik.dom = function dom( as, func ){
    if ( !as ) { throw "Stik: DOM needs a name"; }
    if ( !func || typeof func !== "function" ) { throw "Stik: DOM needs a function"; }

    modules[ as ] = window.stik.injectable({
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
      tmpDependencies[ name ] = window.stik.injectable({
        module: doubles[ name ]
      });
    }
  };

  methods.cleanDoubles = function cleanDoubles(){
    tmpDependencies = {};
  };

  window.stik.boundary( { as: "$dom", to: methods } );
})(window);

window.stik.dom( "hasClass", function(){
  return function hasClass( elm, selector ){
    var className = " " + selector + " ";
    return ( " " + elm.className + " " ).
      replace( /[\t\r\n\f]/g, " " ).
      indexOf( className ) >= 0;
  };
});

window.stik.dom( "removeClass", function( hasClass ){
  return function removeClass( elm, className ){
    var classNames = [];
    if ( Object.prototype.toString.call( className ) === "[object Array]" ) {
      classNames = className;
    } else {
      classNames = className.split(" ");
    }

    for (var i = 0; i < classNames.length; i++) {
      if ( hasClass( elm, classNames[ i ] ) ){
        var regex = new RegExp( "(^|\\s)?" + classNames[ i ] + "(\\s|$)", "g" );
        elm.className = elm.className.replace( regex, " " ).trim();
      }
    }
  };
});

window.stik.dom( "addClass", function( hasClass ){
  return function addClass( elm, className ){
    var classNames = [];
    if ( Object.prototype.toString.call( className ) === "[object Array]" ) {
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

window.stik.dom( "toggleClass", function( hasClass, addClass, removeClass ){
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

window.stik.dom( "serialize", function(){
  return function serializeForm( form ){
    // https://raw.githubusercontent.com/yurikoval/serialize-form/master/serialize.js
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
    return q.join("&");
  };
});
