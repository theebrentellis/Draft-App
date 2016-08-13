module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'server/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    nodemon: {
        dev: {
            script: "server.js"
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
//   grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
//   grunt.registerTask('default', ['uglify']);

};