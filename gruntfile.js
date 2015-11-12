module.exports = function(grunt) {
  grunt.initConfig({
    destination: process.env.DEST,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      all: {
        files: ['*.*'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    ngconstant: {
      options: {
        name: 'config',
        dest: 'config.js',
      },
      dist: {
        constants: {
          secret: {
            serverUrl: process.env.SERVER_URL || 'https://bookmarkpack-server.herokuapp.com',
            googleClientId: process.env.GOOGLE_CLIENT_ID || '935284992833-m3ck8tviors0nbt9qtoqsnucsid7a9v0.apps.googleusercontent.com',
            facebookClientId: process.env.FACEBOOK_CLIENT_ID || '1537545373172672'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.registerTask('server', "Serve your app", [
    'connect:server', 'watch'
  ]);
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('build', ['ngconstant']);

};
