var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var serveStatic = require('serve-static'),
        /**
         * 本地模式: API_NAME配置成 api，DEVELOP_MODE配置为 true
         * 代理模式: API_NAME配置成provider，DEVELOP_MODE配置为 false
         * */
        API_NAME = {
            portal:'/portal/web',
            admin:'/admin/web',
            front:'/front/web'
        },
        proxyRewrite = {
            '^/portal/web/login': '/web/login/',
            '^/portal/web/': '/web/portal/',
            '^/admin/web/': '/web/admin/',
            '^/front/web/': '/web/front/'
        },
        //appConfig = {
        //    portal: 'portal',
        //    admin: 'admin'
        //};
    getReplaceOptions = function () {
        var DEVELOP_MODE = true,
            CONTEXT_PATH = '';
        return {
            patterns: [
                {
                    match: 'DEVELOP_MODE',
                    replacement: DEVELOP_MODE
                },
                {
                    match: 'CONTEXT_PATH',
                    replacement: CONTEXT_PATH
                },
                {
                    match: 'API_NAME',
                    replacement: API_NAME
                }
            ]
        }
    };

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            //copy: {
            //    js: {
            //        expand: true,
            //        cwd: 'src/',
            //        src: ['**/*'],
            //        dest: 'dist/'
            //    }
            //},
            watch: {
                options: {
                    livereload: true
                },
                js: {
                    files: ['*.html', "*.js", "*.json", "*.js",
                        "*.jpg", "*.png", "*.gif", "*.jpeg", "*.css"],
                    tasks: []
                }
            },
            connect: {
                options: {
                    port: '9001',
                    hostname: 'localhost',
                    protocol: 'http',
                    open: false,
                    base: {
                        path: './',
                        options: {
                            index: 'www.youhao.cn:9001/index.html'
                        }
                    },
                    livereload: true
                },
                //options   : {
                //    port: 9009,
                //    // Change this to '0.0.0.0' to access the server from outside.
                //    hostname: '0.0.0.0',
                //
                //    open: {
                //        target: 'http://www.youhao.cn:9009/portal/index.html', // target url to open
                //        callback: function () {
                //        } // called when the app has opened
                //    },
                //    livereload: 35720
                //},
                proxies: [
                    {
                        context: API_NAME.portal, //想代理的请求
                        host: 'localhost',
                        port: '8090',
                        https: false,
                        changeOrigin: true,
                        rewrite: proxyRewrite //想代理到的请求
                    }
                ],
                default: {},
                //livereload : {
                //    options : {
                //        middleware :function (connect){
                //            var arra = [
                //                lrSnippet,
                //                serveStatic(appConfig.portal),
                //                serveStatic(appConfig.admin),
                //                connect().use('/bower_components', serveStatic('./bower_components')),// 静态资源目录的真实路径映射
                //                connect().use('/fonts', serveStatic('./portal/fonts')),
                //                connect().use('/css', serveStatic('./portal/css')),
                //                connect().use('/images', serveStatic('./portal/images')),
                //                connect().use('/js', serveStatic('./portal/js')),
                //                connect().use('/mfs', serveStatic('f:\\')),
                //                proxySnippet
                //            ];
                //            return arra;
                //        }
                //    }
                //}
                proxy: {
                    options: {
                        middleware: function (connect, options) {
                            if (!Array.isArray(options.base)) {
                                options.base = [options.base];
                            }

                            // Setup the proxy
                            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                            // Serve static files.
                            options.base.forEach(function (base) {
                                middlewares.push(serveStatic(base.path, base.options));
                            });

                            // Make directory browse-able.
                            //var directory = options.directory || options.base[options.base.length - 1];
                            // middlewares.push(connect.directory(directory));
                            return middlewares;
                        }
                    }
                }
            }
            //,replace: {
            //    options: getReplaceOptions(),
            //    js: {
            //        expand: true,
            //        cwd: 'dist/js/',
            //        src: ['**/*.js'],
            //        dest: 'dist/js/'
            //    }
            //}
        }
    );

    grunt.registerTask('proxy', '启动代理服务......', function () {
        grunt.task.run([
            //'copy',
            //'replace',
            'configureProxies:proxy',
            'connect:proxy',
            'watch'
        ]);
    });
};