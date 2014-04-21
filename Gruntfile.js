module.exports = function(grunt){
  var srcFiles = [
    'src/module.js',
    'src/node.js',
    'src/form.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '// Version: <%= pkg.version %> | From: <%= grunt.template.today("dd-mm-yyyy") %>\n\n'
    },
    jasmine: {
      src: [
        'node_modules/stik-core.js/stik-core.js',
        'node_modules/stik-labs.js/stik-labs.js'
      ].concat(srcFiles),
      options: {
        specs: [
          'specs/*_spec.js'
        ]
      }
    },
    concat: {
      options: {
        separator: '\n',
        banner: '<%= meta.banner %>'
      },
      src: {
        src: srcFiles,
        dest: '<%= pkg.name %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        mangle: false
      },
      stik: {
        files: {
         'stik-dom.min.js': ['stik-dom.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('pack', ['concat', 'uglify']);
};
