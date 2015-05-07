/* jshint node: true */
'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  var sourceFiles = ['*.js', 'app/**/*.js'];
  grunt.initConfig({
    jscs: {
      main: sourceFiles
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: {
        src: sourceFiles
      }
    }
  });

  grunt.registerTask('default', ['lint']);
  grunt.registerTask('lint', ['jscs', 'jshint']);
};
