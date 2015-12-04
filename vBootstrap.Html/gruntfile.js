/// <binding AfterBuild='build-js' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({

        clean: ['wwwroot/js', 'wwwroot/css', 'wwwroot/fonts'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/baconjs/dist/',
                    src: ['Bacon.js'],
                    dest: 'wwwroot/js/'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/css/',
                    src: ['**'],
                    dest: 'wwwroot/css/'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/js/',
                    src: ['**'],
                    dest: 'wwwroot/js/'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/fonts/',
                    src: ['**'],
                    dest: 'wwwroot/fonts/'
                }, {
                    expand: true,
                    cwd: 'node_modules/jquery/dist/',
                    src: ['**'],
                    dest: 'wwwroot/js/'
                }, {
                    expand: true,
                    cwd: 'node_modules/jasmine/bin/',
                    src: ['**'],
                    dest: 'test/jasmine/'
                }]
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'wwwroot/css/vBootstrap.css': 'sass/vBootstrap.scss'
                }
            }
        }
    });

    //Add all plugins that your project needs here
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('build-js', ['clean', 'copy', 'sass']);
};