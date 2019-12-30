'use strict';

module.exports = function(grunt) {
    // Define the configuration for all tasks

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
   //  require('jit-grunt')(grunt);

    // Inform the jit grunt configuration that useminPrepare task depends on the usemin package
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]


                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy : {
            html: {
                files: [{
                    // for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    // for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,  // enable dynamic expansion
                    cwd: './',  // src matches are relative to this path
                    src: ['img/*.{png, jpg, gif}'],
                    dest: 'dist'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['search-lost-pet.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        // Concat
        concat: {
            options: {
                separator: ';'
            },
            //dist configuration is provided by useminPrepare
            dist: {}
        },

        //Uglify
        uglify: {
            //dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        //Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev: release hashes (md5) all assets (images, js and css)
                // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative path
        usemin: {
            html: ['dist/search-lost-pet.html'],
            options: {
                assetDirs: ['dist', 'dist/css', 'dist/js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {  // dictionary of files
                    'dist/search-lost-pet.html': 'dist/search-lost-pet.html',

                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch'])
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'

    ])
}