
fis.set('base.static', '/public');
fis.set('new date', Date.now());

// fis3 模块化开发支持

fis.config.set('settings.preprocessor.browserify', {
    browserify: {
        // debug: true,
    },
    bower: false,
    es2015: {
        enable: true,
        presets: ['es2015','react', 'stage-2']
    }
});

fis.config.media('prod').set('settings.preprocessor.browserify', {
    browserify: {
        // debug: false,
        paths: ['libs/', 'components/', 'components/component/']
    }
});

// 启用相对路径
fis.media('prod').hook('relative');
fis.media('prod').match('**', {
    relative: true
});

fis.match(/^\/assets\/images\/(.*)$/,{
    release: '/${base.static}/images/$1'
});

fis.match(/^\/libs\/(.*)$/,{
    // release: false
});
fis.match(/^\/assets\/js\/(flexible)\.js$/,{
    release: '/${base.static}/$1'
});

fis.match(/^\/components\/(.*)$/,{
    // release: false
});

//page里的页面发布到根目录
fis.media('prod').match(/^\/components\/page\/([^\/]+)\/\1\.html$/,{
    release: '/$1',
    // relative: '/'
});
fis.media('prod').match(/^\/components\/component\/([^\/]+)\/\1\.html$/,{
    release: '/$1',
    // relative: '/'
});

fis.match('main.js', {
    preprocessor: fis.plugin('browserify'),
    release: '/${base.static}/$0'
});

// scss编译
fis.match('**/*.scss', {
    rExt: 'css', //from scss to css
    parser: fis.plugin('node-sass')
});


fis.match('*.{css,less,scss}', {
    // preprocessor: fis.plugin('autoprefixer', {
    //     "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    //     "cascade": true
    // })
})

fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        // resourceType: 'mod',
        // userInlineMap: true //资源映射表内嵌
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', { // css sprites
        layout: 'matrix', // 排列方式
        margin: '15' // 间距
    })
}).match('**/*.{css,scss,less}', {
    query: '?=t' + fis.get('new date'),
    packTo: '/${base.static}/all.css' // 所有的css打成一个包
});

//生产环境下CSS、JS压缩合并

    // .match('libs/*.js',{
    //     packTo: '/pkg/common.js'
    // })
    // .match('components/**/*.js',{
    //     packTo: '/pkg/app.js'
    // })
fis.media('prod')
    .match('**.js', {
        query: '?=t' + fis.get('new date'),
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.scss', {
        query: '?=t' + fis.get('new date'),
        optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', { type: 'pngquant' })
    }).match('mock/**', {
        release: false
    });