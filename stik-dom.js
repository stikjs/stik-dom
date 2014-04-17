// Version: 1.0.0 | From: 17-04-2014

(function(){
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
}());

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

window.stik.dom( "show", function(){
  return function showElm( elm ){
    if ( elm.style.removeProperty ) {
      elm.style.removeProperty( "display" );
    } else {
      elm.style.removeAttribute( "display" );
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

window.stik.dom( "insertBefore", function( ){
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

window.stik.labs.dom = function domLab( spec ){
  if ( !spec ) { throw "Stik: Helper Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Helper Lab needs a name"; }

  var env = {},
      boundary = window.stik.labs.boundary( { name: "$dom" } );

  env.run = function run( doubles ){
    var methods = boundary.run( doubles );
    methods.pushDoubles( doubles );
    return function(){
      return methods[ spec.name ].apply( {}, arguments );
    };
  };

  return env;
};
