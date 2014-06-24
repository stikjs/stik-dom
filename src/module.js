(function(stik){
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
})(window.stik);
