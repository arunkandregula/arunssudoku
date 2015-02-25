module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
  	properties: {
            DIST_DIR: 'dist',
            SRC_DIR: 'app/src',
            APP_DIR: 'app',
            VENDOR_DIR: 'app/components',
            STYLES_DIR : 'app/styles'
        },
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
    	  js : {
    	  	src : ['<%= properties.SRC_DIR %>/**/*.js'],
    	  	dest : '<%= properties.DIST_DIR %>/app.js'
    	  },
    	  options: {
            transform: ['hbsfy']
          }
    },
    clean: {
            dist: ['<%= properties.DIST_DIR %>']
    },
    compass : {  
            dist : { 
                options : {
                  sassDir : './app/styles',
                  cssDir: './dist/stylesheets'
                }
            }
    },
    watch: {
            options: {
                livereload: 9002
            },
            src: {
                files: [
                    '<%= properties.APP_DIR %>/src/**/*.js',
                    '<%= properties.APP_DIR %>/templates/**/*.hbs',
                    '<%= properties.APP_DIR %>/styles/**/*.scss',
                    '<%= properties.APP_DIR %>/index.html'

                ],
                tasks: ['browserify','concatcss','copy:index']
            }
    },
    connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dist'
                }
            }
    },
    copy: {
            index: {
                files: [
                    {
                        dest: '<%= properties.DIST_DIR %>',
                        cwd: '<%= properties.APP_DIR %>/',
                        src: ['index.html'],
                        expand: true
                    }
                ]
            }
    },
    concat : {
            
            vendor : {
                src : [
                    '<%= properties.VENDOR_DIR %>/jquery-1.7.2.min.js'
                ],
                dest : '<%= properties.DIST_DIR %>/vendor.js'
            },
            appcss : {
                src : [
                    '<%= properties.DIST_DIR %>/stylesheets/**/*.css'
                ],
                dest : '<%= properties.DIST_DIR %>/app.css'
            }
            

        }


      });

  grunt.registerTask('concatcss',['compass:dist','concat:appcss']);
  grunt.registerTask('default', ['browserify','concat:vendor','concatcss','copy:index','connect:server','watch']);
  

}