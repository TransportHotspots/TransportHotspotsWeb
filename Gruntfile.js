module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
            //pkg : grunt.file.readJSON('package.json'),

            jshint : {
                src : [ 'Gruntfile.js', 'src/main/webapps/resources/js/**/*.js' ]
            },

            clean: {
                app: {
                    files: [{
                        dot: true,
                        src: [
                            'target/transport-hotspots/resources/css/*',
                            'target/transport-hotspots/resources/js/*'
                        ]
                    }]
                }
            },

            ngAnnotate: {
                options: {
                    singleQuotes: true
                },
                app: {
                    files: [{
                        expand: true,
                        cwd: 'src/main/webapp/resources/js',
                        src: ['**/*.js'],
                        dest: 'target/transport-hotspots/resources/js'
                    }]
                }
            },

            copy: {
                css: {
                    files: [{
                        expand: true,
                        cwd: 'src/main/webapp/resources/css',
                        src: ['**/*.*'],
                        dest: 'target/transport-hotspots/resources/css'
                    }]
                },
            },

            concat: {
                devAngular: {
                    src: [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'bower_components/angular-input-stars/angular-input-stars.js'
                    ],
                    dest: 'target/transport-hotspots/resources/js/generated/angularjs-bundle.js',
                    options: {
                        separator: ';'
                    }
                },
                distAngular: {
                    src: [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'bower_components/angular-input-stars/angular-input-stars.js'
                    ],
                    dest: 'target/transport-hotspots/resources/js/generated/angularjs-bundle.js',
                    options: {
                        separator: ';'
                    }
                },
            },

            /*** For local development only ***/
            watch: {
                options: {
                    livereload : true
                },
                js: {
                    files : [ 'src/main/webapp/resources/js/**/*.js', 'src/main/webapp/resources/css/**/*.css' ],
                    tasks : [ 'jshint', 'concat:devAngular', 'copy:css' ]
                }
            }
        }
    );


    // Default Dist task
    grunt.registerTask('default', [ 'clean', 'jshint', 'concat:distAngular', 'ngAnnotate', 'copy:css']);

    // run for dev
    grunt.registerTask('dev', ['concat:devAngular', 'jshint', 'ngAnnotate', 'copy:css', 'watch']);

};
