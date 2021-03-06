module.exports = function(grunt) {

    // files to be minified and combined
    var cssFiles = [
        'public/css/bootstrap.css'
    ];

    // this is where all the grunt configs will go
    grunt.initConfig({
        // read the package.json
        // pkg will contain a reference to out pakage.json file use of which we will see later
        pkg: grunt.file.readJSON('package.json'),


        "mocha-server": {
            testServer: {
                src: 'testing/server/api/users.js',
                options: {
                    ui: 'bdd',
                    require: [
                        'should'
                    ]
                }
            }

        },

        testClient: {
            src: 'testing/client/*.js',
            options: {
                ui: 'tdd',
                require: [
                    'should'
                ]
            }
        },

        // configuration for the cssmin task
        // note that this syntax and options can found on npm page of any grunt plugin/task
        cssmin: {
            // options for css min task
            options:{
                // banner to be put on the top of the minified file using package name and todays date
                // note that we are reading our project name using pkg.name i.e name of our project
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            combine: {
                // options for combining files
                // we have defined cssFiles variable to hold our file names at the top
                files: {
                    // here key part is output file which will our <package name>.min.css
                    // value part is set of input files which will be combined/minified
                    'public/css/bethere.min.css': cssFiles
                }
            }
        }

    }); // end of configuring the grunt task

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-server-mocha');

    // Default task(s).
    grunt.registerTask('default', ['cssmin']);
    // cssmin task
    grunt.registerTask('buildcss', ['cssmin']);

};