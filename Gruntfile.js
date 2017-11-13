
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({

        addtextdomain: {
            options: {
                //i18nToolsPath: '/home/patryk/public_html/wpdev/trunk/tools/i18n', // Path to the i18n tools directory.
                //textdomain: 'pencil',    // Project text domain.
                updateDomains: true  // List of text domains to replace.
            },
            target: {
                files: {src: [
                    '*.php',
                    '**/*.php',
                    '!node_modules/**',
                    '!tests/**',
                    '!vendor/**'
                ]}
            }
        },

        makepot: {
            target: {
                options: {
                    cwd: '',                          // Directory of files to internationalize.
                    domainPath: '/languages',         // Where to save the POT file.
                    exclude: [],                      // List of files or directories to ignore.
                    include: [],                      // List of files or directories to include.
                    mainFile: '',                     // Main project file.
                    potComments: '',                  // The copyright at the beginning of the POT file.
                    potFilename: '',                  // Name of the POT file.
                    potHeaders: {
                        poedit: true,                 // Includes common Poedit headers.
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    },                                // Headers to add to the generated POT file.
                    processPot: null,                 // A callback function for manipulating the POT file.
                    type: 'wp-theme',                // Type of project (wp-plugin or wp-theme).
                    updateTimestamp: true,             // Whether the POT-Creation-Date should be updated without other changes.
                    updatePoFiles: false              // Whether to update PO files in the same directory as the POT file.
                }
            }
        },

        postcss: {
            options: {
              //map: true, // inline sourcemaps

              processors: [
                //require("postcss-import")(),
                //require("postcss-url")(),
                //require('postcss-cssnext')(),
                require('autoprefixer')({browsers: ['> 1%' , 'Last 2 versions']}), // add vendor prefixes
                require('postcss-discard-duplicates')()
                //require('cssnano')(), // minify the result
                //require('rtlcss')() // right to left
                //require("postcss-browser-reporter")(),
                //require("postcss-reporter")(),
              ]
            },
            dist: {
              src: 'style.css'
            }
        },

        wpcss: {
            target: {
                options: {
                    commentSpacing: true // Whether to clean up newlines around comments between CSS rules.
                    //config: ''           // Which CSSComb config to use for sorting properties.
                },
                files: {'style.css' : 'style.css'}
                //files: {'rtl.css' : 'rtl.css'}
            }
        }
    });

    //grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-postcss' );
    grunt.loadNpmTasks( 'grunt-wp-css' );
    //grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    //grunt.loadNpmTasks( 'grunt-rtlcss' );
    //grunt.loadNpmTasks( 'grunt-perfbudget' );
    //grunt.loadNpmTasks( 'grunt-pagespeed' );
    //grunt.loadNpmTasks( 'grunt-sass' );
    //grunt.loadNpmTasks( 'grunt-contrib-watch' );
    //grunt.loadNpmTasks( 'grunt-uncss' );
    //grunt.registerTask('default', [ 'watch']);
    grunt.registerTask('default', [ 'addtextdomain', 'makepot', 'postcss', 'wpcss']);

};
