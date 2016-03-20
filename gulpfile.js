var FS             = require('fs');
var Path           = require('path');
var Globby         = require('globby');
var Gulp           = require('gulp');
var ChildProcess   = require('child_process');

var tsConfigPath = Path.join(__dirname, 'tsconfig.json');

/**
 * 遍历所有的ts文件， 定义到tsconfig.js 中
 */
Gulp.task('sync-config', function(cb) {
    FS.readFile(tsConfigPath, function(err, data) {
        if (err) { throw err; }
        
        data = data.toString();
        if (!data) {
            cb(new Error(tsConfigPath + ' file is empty!'));
            return;
        }
        
        data = JSON.parse(data);
        
        Globby(data.filesGlob)
            .then(function(paths) {
                
                data.files = paths;
                FS.writeFile(tsConfigPath, JSON.stringify(data, null, "    "), function(err) {
                    if (err) { throw err; }
                    cb(err);
                });
        })
    })
});

/**
 * 编译TypeScript
 */
Gulp.task('debug', ['sync-config'], function(cb) {
    cb();
    
    ChildProcess.exec('rm -rf dist/*', function(err) {
        if (err) { throw err }
    });
    
    ChildProcess.exec('./node_modules/.bin/tsc -w', function(err, stdout, stderr) {
        cb(err);
    });
});
    
Gulp.task('build', ['sync-config'], function(cb) {
    ChildProcess.exec('rm -rf dist/*', function(err) {
        if (err) { throw err }
    });
    
    ChildProcess.exec('./node_modules/.bin/tsc', function(err, stdout, stderr) {
        cb(err);
    });
    
})