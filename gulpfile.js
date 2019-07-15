// version: 0.9.19
var gulp = require ('gulp'); // Require gulp
var del = require ('del');
var path = require ('path');

// Sass dependencies
var sass = require ('gulp-sass'); // Compile Sass into CSS
//var minifyCSS = require('gulp-minify-css'); // Minify the CSS
var CleanCSS = require ('gulp-clean-css'); // Minify the CSS (UPDATED TO LATEST)!

var autoprefixer = require ('gulp-autoprefixer'); // Auto prefixe CSS

// Minification dependencies
var htmlmin = require ('gulp-htmlmin'); // Minify HTML
var concat = require ('gulp-concat'); // Join all JS files together to save space
var stripDebug = require ('gulp-strip-debug'); // Remove debugging stuffs
// var uglify = require('gulp-uglify'); // Minify JavaScript
var uglify = require ('gulp-terser'); // Minify JavaScript ES6
var babel = require ('gulp-babel'); // Babel JS ES6
var imagemin = require ('gulp-imagemin'); // Minify images
var gulpImage = require ('gulp-image'); // gulp-image
var fontmin = require ('gulp-fontmin'); // convert fonts
var wait = require ('gulp-wait'); // Wait before next

// Other dependencies
var chalk = require ('chalk');
var es = require ('event-stream');
//var fs = require('fs');
var fs = require ('fs-extra');
var cache = require ('gulp-cached');
var plumber = require ('gulp-plumber');
var gutil = require ('gulp-util'); // gulp utils
var notify = require ('gulp-notify');
var beep = require ('beepbeep');
var fileinclude = require ('gulp-file-include'); // html include
// var index = require('gulp-index'); // Generate index files
var size = require ('gulp-size'); // Get the size of the project
var browserSync = require ('browser-sync'); // Reload the browser on file changes
var gulpTinify = require ('gulp-tinify'); // compress images with TinyPNG
var chokidar = require ('chokidar');
var tinify = require ('tinify');
var shuffle = require ('shuffle-array');

// Generate index file:
var debugDir = path.resolve ('debug');
var buildDir = path.resolve ('build');
var generateIndex = require ('./libs/generate-index');

// Variables:

// TinyPNG Licenses:
// var keyId = 0;
// var tinifyKeys = ["Hi2uw_dMoQ-KVj2dRhmRIqu5uAYPBxfe", "k4-JHNwzo_FQ19L6Esqu410mPlU-t6AV", "k1F9qDtzkBc_y7J9WFVkJ_fQa_uTUQ27", "zQqn3G1JnbGaTqOakEXsRJ5YbnfezPMP","MDh8hTaQ9T0yI9gvsaZP6Lg6e7lyty_m","TbACUv6YaQkWJHcFMg58C_aMO-NHsZrg","ODtIMa5BQO6aCo2pBf7Rr6ckFpqD5tWS","19GvxEdKHXgh1VY57SGbYlYlOCLJXbL5","FYs6UtZWivDP5hyR9Ah0B2K5MbqE9gG4","xCTyAjwvfHEzsQgB3EQtV9NjW-DrM7Ls","02Ddy7lU8cip4OoSUCVKhX1R9NYyEEg9","mogvLTu3D9d7N-impQx4x5C1-sRygGnB","TYFWQ4bSjiLocPmi1wspzDm-7toE53xs","ez8G3b8HpgFB8jER8ToU_qLy6c9ZwsAF","QcSq-7b-gjpPUYrzcMRC4wFlXWNWWB5E","SQUu1J9kZtPr1jXIrMH4jAH4g_pbKGYc","-FbQ_wAEdiW9iOG5esb76YiroBe_8Dwy","alTIg10DpvnD9wiheHw0JozemFeGoSad","BhwgtJLj9SoktGsWqft1N8EO1pIRqYm6","9ZvfmWcotCUA5XOqj0pInJxyUHEuHcru","mQ0_4YzSHXacWykKioDtemY8sgUED1kF","pWFJJnrqQNVJlOLHyU_PWzTa_LFyCVTs","I5VctbVXpWvBkjkIbcUBDT6j4I_KR1-D","kmCPD9t-NHucE9ZURUCw74YZueNm9VX6","wElEZFp26-6DUiWPrtxi7DV_hDLdMFH-","G92PTY8U8CNaWOtz21ehR0uwUkSLUuTb","9ADItvxBBv1uFNJORJzW6aJROmj4PSSX","J_SqF7YEBRYfz3Fwy5GLfZOyQoorxUb4","YxpvoiF2-4vrHhtm31uKyF5R146k11P1","80EgmGqFDIgqnFG6rx0hxPA812f8nGqf","0cCoExOkI3NOuUGn33NgKSeuUPDoy-SA","XjbTO3I2MEYkLhND3VA0evdjfg98qVm0","iTMiO4t826Fk7foWG1rbD8s1M4WS8tYt","ize_7w6oUYOSklTIlI8YfRAq7FogaBx6","Vf3s_EN2WZ29kjrd8JX8r9qiKvb7rOiG","--QiguTk_fTOKv8CvUa1TiA_z4wFnVt8","1IAa8X3Mn1n4cVqNrAGy9PAa0hQlAXLy","b88hMEGqXDjl6R0tI1KvwVS6HngTpd8-","7NmcLgv874GyMSZxTxVA40w5Boj9s9li","xxNoyu-pDu6ikmWKBLMG6DF3SQNhujph","mkWR4NGZ3b1NI18tkJK0lJkOVyDcu8JU","3dRtrTms73CBEfO4Cm2pAr9cel55Z2oz","Vf3s_EN2WZ29kjrd8JX8r9qiKvb7rOiG","OVIv__U4QVsqOL5Gz3zhvi33ALEmRqZl","jLEqyutENQO08vSoHiWb_Z5upVRA_xZW","Cm4OwFOYI0mM_EZK9gogu2NMPAQbaBK_","Bs3UmWkV1kCTuYInCEG-eP6j6kwtcrYv","RcwqiDVz-qfjgz5YI_B8Y8sGPBVmVv9m","yuBekcICOCiHFvQ5Zht9wby6n44optOs","kPSyXSc8_1yDjXftWrHFCo0_t69OAGHQ","EtZ1NiOV0Eo0qDGXShtACK_tO5uuzVki","TTMhPr11fzMO7WAuSjmio3LNKzOoa42X"];
// shuffle(tinifyKeys);
// tinify.key = tinifyKeys[keyId];

var frameworkName = '[' + chalk.hex ('#666666') ('digifast') + ']';

// Tasks -------------------------------------------------------------------- >

cache.caches = {};

var reportError = function (error) {
  var lineNumber = error.cause
    ? 'LINE ' + (error.lineNumber || error.cause.line)
    : error.lineNumber ? 'LINE ' + error.lineNumber : '';

  notify ({
    title: 'Task Failed [' + error.plugin + ']',
    message: 'Error at line [' + lineNumber + '] (See console).',
    sound: 'Sosumi', // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write (error);

  gutil.beep (); // Beep 'sosumi' again

  // Easy error reporting
  //console.log(error.toString());

  // Pretty error reporting
  var report = '';
  var errorChalk = gutil.colors.white.bgRed;

  report += errorChalk ('TASK:') + ' [' + error.plugin + ']\n';
  //if (error.line) { report += chalk('LINE:') + ' ' + error.line + '\n'; }
  if (error.fileName) {
    report += errorChalk ('FILE:') + ' ' + error.fileName + '\n';
  }
  if (lineNumber) {
    report += errorChalk ('LINE:') + ' ' + lineNumber + '\n';
  }
  report += errorChalk ('ERROR:') + ' ' + error.message;
  if (error.cause) {
    report += ' => ' + error.cause.message + '\n';
  }

  console.error (report);

  // Prevent the 'watch' task from stopping
  this.emit ('end');
};

// Task to compile Sass file into CSS, and minify CSS into build directory
var compileSassTask = function () {
  return gulp
    .src ('./src/sass/**/*.scss')
    .pipe (wait (500))
    .pipe (
      plumber ({
        errorHandler: reportError,
      })
    )
    .pipe (sass ())
    .pipe (gulp.dest ('./src/css'))
    .on ('error', reportError)
    .pipe (
      browserSync.reload ({
        stream: true,
      })
    );
};
gulp.task ('sass', compileSassTask);

var copyCssTask = function () {
  return (
    gulp
      .src ('./src/css/**/*.css')
      .pipe (gulp.dest ('./debug/css/'))
      //.pipe(cache('cache'))
      .on ('error', reportError)
      .pipe (
        browserSync.reload ({
          stream: true,
        })
      )
  );
};
gulp.task ('copyCss', copyCssTask);

var compressCssTask = function () {
  return (
    gulp
      .src ('./src/css/**/*')
      .pipe (wait (500))
      .pipe (
        autoprefixer ({
          overrideBrowserslist: ['last 3 versions'],
          cascade: false,
        })
      )
      .pipe (
        CleanCSS (
          {
            debug: true,
            compatibility: '*',
            level: 2,
          },
          function (details) {
            //console.log('Minified CSS: ' + details.name + ': ' + details.stats.originalSize/1000 + ' kB => ' + details.stats.minifiedSize/1000 + ' kB');
          }
        )
      )
      .on ('error', reportError)
      .pipe (gulp.dest ('./build/css/'))
      //.pipe(cache('cache'))
      .on ('error', reportError)
      .pipe (
        browserSync.reload ({
          stream: true,
        })
      )
  );
};
gulp.task ('css', compressCssTask);

// Task to minify new or changed HTML pages
var gulpTaskForHtml = function (callback) {
  return (
    gulp
      .src ('./src/*.html')
      .pipe (
        fileinclude ({
          prefix: '@@',
        })
      )
      //.pipe(minifyHTML())
      .pipe (gulp.dest ('./debug/'))
      .pipe (gulp.dest ('./build/'))
      //.pipe(cache('cache'))
      .on ('error', reportError)
      .pipe (
        browserSync.reload ({
          stream: true,
        })
      )
  );

  /* taskCallback();
  
  function taskCallback(){
    // re-regenerate index.html file:
    generateIndex(debugDir);
    generateIndex(buildDir);
    // callback function:
    if(callback) callback();
  } */
};

gulp.task ('html', gulpTaskForHtml);

// Task to concat, strip debugging and minify JS files
var concatScripts = function () {
  return gulp
    .src ('./src/js/bundle/*.js')
    .pipe (concat ('all.js'))
    .pipe (stripDebug ())
    .pipe (gulp.dest ('./debug/js/bundle'))
    .pipe (uglify ())
    .pipe (gulp.dest ('./build/js/bundle'))
    .on ('end', function () {
      console.log ("All scripts are bundled into 'js/bundle/all.js'");
    });
};
gulp.task ('bundlejs', concatScripts);

var copyScriptTask = function () {
  return gulp.src ('./src/js/**/*').pipe (gulp.dest ('./debug/js')).pipe (
    browserSync.reload ({
      stream: true,
    })
  );
};
gulp.task ('copyScripts', copyScriptTask);

var compileScriptsTask = function () {
  return gulp
    .src ('./src/js/**/*')
    .pipe (
      uglify ({
        warnings: 'verbose',
      })
    )
    .pipe (gulp.dest ('./build/js/'))
    .on ('error', reportError)
    .on ('end', function () {
      console.log ('All scripts were compressed.');
    });
};
gulp.task ('compileScripts', compileScriptsTask);
gulp.task ('minifyjs', compileScriptsTask);

// Task to copy images to build
// 2018-08-11: Turn off for Windows performance optimization
var copyImageTask = function () {
  return gulp
    .src ('./src/images/**/*')
    .pipe (gulp.dest ('./debug/images'))
    .pipe (gulp.dest ('./build/images'))
    .on ('error', reportError)
    .pipe (
      browserSync.reload ({
        stream: true,
      })
    );
};
gulp.task ('images', copyImageTask);

// Task to compress images and copy to build
var compressImageTask = function () {
  // var randomTinyKey = tinifyKeys[Math.floor( tinifyKeys.length*Math.random() )];
  return (
    gulp
      .src ('./src/images/**/*')
      // Use TINYPNG (BEST)
      // .pipe(gulpTinify(randomTinyKey))
      //.on('error', reportError)
      // Use gulp-imagemin -> BAD
      /* .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 7}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ], {
    verbose: true
  })) */
      // Use GULP-IMAGE:
      .pipe (
        gulpImage ({
          // PNG compress:
          pngquant: true,
          optipng: false,
          zopflipng: false,
          // JPG compress:
          jpegRecompress: false,
          mozjpeg: true,
          guetzli: false,
          // GIF & SVG compress:
          gifsicle: true,
          svgo: true,
          // How many images at the time?
          concurrent: 3,
          // Print the logs:
          // quiet: true
        })
      )
      .pipe (gulp.dest ('./build/images'))
      .on ('error', reportError)
      .on ('end', function () {
        // console.log(frameworkName + chalk.yellow(' Framework => Build completed! Check folder "./build" for released files.') );
      })
  );
};
gulp.task ('compressImages', compressImageTask);

// Task to copy "assets" into build
var copyAssetsTask = function () {
  return (
    gulp
      .src ('./src/assets/**/*')
      .pipe (gulp.dest ('./debug/assets'))
      // Use GULP-IMAGE:
      .pipe (
        gulpImage ({
          // PNG compress:
          pngquant: true,
          optipng: false,
          zopflipng: false,
          // JPG compress:
          jpegRecompress: false,
          mozjpeg: true,
          guetzli: false,
          // GIF & SVG compress:
          gifsicle: true,
          svgo: true,
          // How many images at the time?
          concurrent: 3,
          // Print the logs:
          // quiet: true
        })
      )
      .pipe (gulp.dest ('./build/assets'))
      .on ('error', reportError)
      .on ('end', function () {
        console.log (
          frameworkName + chalk.blue (' "/assets"') + ' was synced completely.'
        );
      })
  );
};
gulp.task ('assets', copyAssetsTask);

// Task to copy fonts into build
var fontTask = function () {
  return (
    gulp
      .src ('./src/fonts/**/*')
      .on ('error', reportError)
      .pipe (gulp.dest ('./debug/fonts'))
      .pipe (gulp.dest ('./build/fonts'))
      //.pipe(cache('cache'))
      .on ('error', reportError)
      .pipe (
        browserSync.reload ({
          stream: true,
        })
      )
  );
};
gulp.task ('fonts', fontTask);

// Task to get the size of the app project
gulp.task ('size', function () {
  return gulp
    .src ('./src/**')
    .pipe (
      size ({
        showFiles: true,
      })
    )
    .on ('error', reportError);
});

// Task to get the size of the build project
gulp.task ('build-size', function () {
  return gulp
    .src ('./build/**')
    .pipe (
      size ({
        showFiles: true,
      })
    )
    .on ('error', reportError);
});

// Task to convert fonts:
gulp.task ('convertFonts', function () {
  return gulp
    .src ('./src/ttf-fonts/**')
    .pipe (fontmin ())
    .on ('error', reportError)
    .pipe (gulp.dest ('./debug/fonts'))
    .pipe (gulp.dest ('./build/fonts'));
});

gulp.task ('convertfont', gulp.parallel ('convertFonts'), function () {
  console.log ('Fonts converted!');
});

gulp.task ('watch', function () {
  console.log ('watchTask');
  startWatching ('debug');
});

// Serve application:
// var serveTasks = ['sass', 'copyCss', 'html', 'copyScripts', 'fonts', 'assets', 'images'];
var serveTasks = gulp.series (
  'sass',
  'copyCss',
  'html',
  'copyScripts',
  'fonts',
  'assets',
  'images',
  'watch'
);
gulp.task ('serve', serveTasks, onServeTaskInit);

console.log (
  frameworkName +
    chalk.yellow (' DIGIFAST FRAMEWORK is setting up. Please wait a moment!')
);

function onServeTaskInit () {
  console.log ('onServeTaskInit');
  //
}

// Release build:
// var buildTasks = ['sass', 'css', 'html', 'compileScripts', 'fonts', 'assets', 'compressImages'];
var buildTasks = gulp.series (
  'sass',
  'css',
  'html',
  'compileScripts',
  'fonts',
  'assets',
  'compressImages'
);
gulp.task ('build', buildTasks, onBuildTaskInit);
gulp.task ('release', buildTasks, onBuildTaskInit);

function onBuildTaskInit () {
  // startWatching('build');
}

// DEFAULT TASK - Run all Gulp tasks and serve application
gulp.task ('default', serveTasks);

// SAMSUNG TASK - Put everything in HTML file
// var samsungTasks = ['convertFonts', 'sass', 'css', 'html', 'compileScripts', 'assets', 'fonts', 'compressImages'];
// var samsungTasks = ['styleSamsungTask', 'copyStaticFilesSamsungTask'];
var curTaskDone = 0;
var totalTaskDone = 5;
var styleSamsungTask = function () {
  return gulp
    .src ('./src/sass/**/*.scss')
    .pipe (wait (500))
    .pipe (
      plumber ({
        errorHandler: reportError,
      })
    )
    .pipe (sass ())
    .on ('error', reportError)
    .pipe (gulp.dest ('./src/css'))
    .on ('end', function () {
      // copy compiled CSS to debug
      gulp
        .src ('./src/css/**/*.css')
        .pipe (
          autoprefixer ({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false,
          })
        )
        .pipe (gulp.dest ('./debug/css'))
        .on ('end', checkTaskDone);
    });
};
gulp.task ('styleSamsungTask', styleSamsungTask);

var copyStaticFilesSamsungTask = function () {
  gulp
    .src ('./src/js/**/*')
    .pipe (gulp.dest ('./debug/js/'))
    .on ('error', reportError)
    .on ('end', checkTaskDone);

  gulp
    .src ('./src/assets/**/*')
    .pipe (gulp.dest ('./debug/assets/'))
    .pipe (gulp.dest ('./samsung-debug/assets/'))
    .on ('error', reportError)
    .on ('end', checkTaskDone);

  gulp
    .src ('./debug/fonts/**/*')
    .pipe (gulp.dest ('./samsung-debug/fonts/'))
    .on ('error', reportError)
    .on ('end', checkTaskDone);

  return gulp
    .src ('./src/images/**/*')
    .pipe (gulp.dest ('./debug/images/'))
    .pipe (gulp.dest ('./samsung-debug/images/'))
    .on ('error', reportError)
    .on ('end', checkTaskDone);
};
gulp.task ('copyStaticFilesSamsungTask', copyStaticFilesSamsungTask);

var samsungTasks = gulp.series (
  'styleSamsungTask',
  'copyStaticFilesSamsungTask'
);

// var scriptSamsungTask = function(){
//   gulp.src('./src/js/**/*.js')
//     .pipe(gulp.dest('./debug/js/'))
//     .pipe(gulp.dest('./samsung-debug/js'))
//     .on('error', reportError)
//     .on('end', checkTaskDone);
// };
// gulp.task('scriptSamsungTask', scriptSamsungTask);

function checkTaskDone () {
  curTaskDone++;
  // console.log("-> curTaskDone: " + curTaskDone);
  if (curTaskDone == totalTaskDone) {
    // console.log("All tasks are DONE!");
    watchSamsungDir ();
  }
}

gulp.task ('samsung', samsungTasks);

// Task to build HTML pages for SAMSUNG:
var gulpTaskBuildHtmlSamsung = function (callback) {
  gulp
    .src ('./samsung-debug/*.html')
    .pipe (
      htmlmin ({
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyCSS: true,
        minifyJS: true,
        // removeComments: true
      })
    )
    .on ('error', reportError)
    .pipe (gulp.dest ('./samsung-build/'))
    .on ('end', taskCallback);

  gulp
    .src ('./src/assets/**/*')
    .pipe (gulp.dest ('./samsung-build/assets/'))
    .on ('error', reportError);
  // .on('end', checkTaskDone);

  gulp
    .src ('./debug/fonts/**/*')
    .pipe (gulp.dest ('./samsung-build/fonts/'))
    .on ('error', reportError);
  // .on('end', checkTaskDone);

  return gulp
    .src ('./src/images/**/*')
    .pipe (gulp.dest ('./samsung-build/images/'))
    .on ('error', reportError);
  // .on('end', checkTaskDone);

  function taskCallback () {
    console.log (
      frameworkName + ' -> SAMSUNG HTML files were built successfully!'
    );
    // callback function:
    if (callback) callback ();
  }
};

gulp.task ('samsung-build', gulpTaskBuildHtmlSamsung);

function watchSamsungDir () {
  // get list of CSS & JS files to inject into HTML files:
  var mainJsContent = fs.readFileSync ('src/js/main.js', 'utf8');
  mainJsContent = mainJsContent.substring (
    0,
    mainJsContent.indexOf ('var GLoader')
  );

  // console.log(mainJsContent);
  var indexes = [];
  var files = [];
  // search css files:
  var startIndex = 0;
  searchForFiles ('css');
  // search js files:
  startIndex = 0;
  searchForFiles ('js');

  // check file existed & remove:
  var tmpFiles = [];
  for (var i = 0; i < files.length; i++) {
    var fileSrcUrl = 'debug/' + files[i];
    if (fs.existsSync (fileSrcUrl)) {
      tmpFiles.push (fileSrcUrl);
    }
  }
  files = tmpFiles.slice ();
  // console.log(files);

  // get html files
  var htmlFiles = [];
  fs.readdirSync ('debug').forEach (file => {
    if (file.indexOf ('.html') > -1 && file.indexOf ('index.html') == -1) {
      htmlFiles.push (file);
    }
  });
  // console.log(htmlFiles);

  var curInjectedCount = 0;
  var totalInjectedCount = htmlFiles.length;
  for (i = 0; i < htmlFiles.length; i++) {
    insertScriptsIntoHtml (htmlFiles[i]);
  }

  function insertScriptsIntoHtml (htmlFile) {
    var htmlContent = fs.readFileSync ('debug/' + htmlFile, 'utf8');
    var indexOfBodyEnd = htmlContent.indexOf ('</body>');
    var contentOfBody = htmlContent.substring (0, indexOfBodyEnd);
    var i;

    // Remove "/js/main.js":
    // contentOfBody = contentOfBody.replace('<script src="js/main.js" defer></script>', '');
    // contentOfBody = contentOfBody.replace('<script src="js/main.js"></script>', '');

    // Remove all <script> tag:
    var scriptTags = getAllStringsFromTo (
      contentOfBody,
      '<script src=',
      '</script>',
      true
    );
    for (i = 0; i < scriptTags.length; i++) {
      var scriptTag = scriptTags[i];
      contentOfBody = contentOfBody.replace (scriptTag, '');
    }

    for (i = 0; i < files.length; i++) {
      var fileSrcUrl = files[i];
      var fileSrcType = fileSrcUrl.indexOf ('.css') > -1 ? 'css' : 'js';
      var fileContent = fs.readFileSync (fileSrcUrl, 'utf8');

      contentOfBody += '\n  ';
      contentOfBody += '\n  <!-- From: ' + fileSrcUrl + ' -->';

      if (fileSrcType == 'css') {
        // remove "../":
        fileContent = fileContent.replace (
          new RegExp ('../fonts', 'g'),
          'fonts'
        );
        contentOfBody += '\n  <style>';
      } else {
        contentOfBody += '\n  <script type="text/javascript">';
      }

      contentOfBody += '\n  ' + fileContent;

      if (fileSrcType == 'css') {
        contentOfBody += '\n  </style>';
      } else {
        contentOfBody += '\n  </script>';
      }

      contentOfBody += '\n  ';
    }

    // Inject {page} & get ID of <main> and call {page}.init():
    var shouldCallJsInit = htmlContent.indexOf ('<main id="') > -1;
    if (shouldCallJsInit) {
      var idOfMainTag = getStringFromTo (htmlContent, '<main id="', '"');
      // htmlContent.substring(htmlContent.indexOf('<main id="') + 10, htmlContent.indexOf('"', htmlContent.indexOf('<main id="') + 10));
      console.log ('idOfMainTag: ' + idOfMainTag);

      if (idOfMainTag) {
        contentOfBody +=
          '\n  <!-- PAGE INIT: /js/pages/' + idOfMainTag + '.js -->';
        contentOfBody += '\n  <script type="text/javascript">';

        var mainJsContent = fs.readFileSync (
          'debug/js/pages/' + idOfMainTag + '.js',
          'utf8'
        );
        contentOfBody += '\n  ' + mainJsContent;
        contentOfBody += '\n  ' + idOfMainTag + '.init();';
        contentOfBody += '\n  </script>';
      }
    }

    // end HTML:
    contentOfBody += '\n</body>\n</html>';

    fs.ensureFileSync ('samsung-debug/' + htmlFile);
    fs.writeFileSync ('samsung-debug/' + htmlFile, '');
    fs.writeFileSync ('samsung-debug/' + htmlFile, contentOfBody);

    // Start a server:
    checkInjectionDone ();
  }

  function searchForFiles (type) {
    var index = mainJsContent.indexOf ('"' + type.toLowerCase (), startIndex);

    if (index > -1) {
      var endIndex = mainJsContent.indexOf (
        '.' + type.toLowerCase () + '"',
        index + 1
      );
      var fileUrl = mainJsContent.substring (
        index + 1,
        endIndex + type.length + 1
      );

      files.push (fileUrl);
      indexes.push (index);

      startIndex = index + 1;
      searchForFiles (type);
    }
  }

  function checkInjectionDone () {
    curInjectedCount++;
    if (curInjectedCount >= totalInjectedCount) {
      var samsungDebugDir = path.resolve ('samsung-debug');
      generateIndex (samsungDebugDir);

      browserSync.init ({
        ui: false,
        server: {
          baseDir: 'samsung-debug',
        },
      });
    }
  }
}

function getAllStringsFromTo (content, fromStr, toStr, isIncludeStartAndEnd) {
  if (!isIncludeStartAndEnd) isIncludeStartAndEnd = false;
  var arr = [];
  var si = 0;
  var t = getAmountOfString (fromStr, content);

  for (var i = 0; i < t; i++) {
    var indexOfFromStr = isIncludeStartAndEnd
      ? content.indexOf (fromStr, si)
      : content.indexOf (fromStr, si) + fromStr.length;
    var indexOfToStr = isIncludeStartAndEnd
      ? content.indexOf (toStr, indexOfFromStr) + toStr.length
      : content.indexOf (toStr, indexOfFromStr);
    var word = content.substring (indexOfFromStr, indexOfToStr);
    var wordIndex = content.indexOf (word);
    arr.push (word);
    si = wordIndex + 1;
  }

  return arr;
}

function getStringFromTo (content, fromStr, toStr, isIncludeStartAndEnd) {
  if (!isIncludeStartAndEnd) isIncludeStartAndEnd = false;
  var indexOfFromStr = isIncludeStartAndEnd
    ? content.indexOf (fromStr)
    : content.indexOf (fromStr) + fromStr.length;
  var indexOfToStr = isIncludeStartAndEnd
    ? content.indexOf (toStr, indexOfFromStr) + toStr.length
    : content.indexOf (toStr, indexOfFromStr);
  var str = content.substring (indexOfFromStr, indexOfToStr);
  return str;
}

function getAmountOfString (str, inContent) {
  var regex = new RegExp (str, 'g');
  var count = (inContent.match (regex) || []).length;
  return count;
}

function startWatching (dir, callback) {
  console.log ('startWatching:', dir);

  var chokOptions = {
    usePolling: true,
  };
  var watchDir = dir;

  // gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch ('src/sass/**/*.scss', gulp.series ('sass'));

  var watcher0 = gulp.watch ('src/css/**/*');

  // var watcher1 = gulp.watch('src/*.html', ['html']);
  var watcher1 = gulp.watch ('src/*.html', gulp.parallel ('html'));
  var watcher2 = gulp.watch ('src/common/');
  var watcher3 = gulp.watch ('src/assets/');
  var watcher4 = gulp.watch ('src/js/');
  var watcher5 = gulp.watch ('src/images/');

  var syncHtmlInt;
  watcher1.on ('all', onSyncHTML);
  // watcher2.on('change', onSyncHTML);

  // WORK NOW!
  var isScanningComplete = false;
  var countScannedFolder = 0;
  var totalScannedFolder = 5;

  console.log (frameworkName + ' watcher -> Scanning...');

  // watch "css" folder:
  watcher0.on ('ready', checkScanningComplete);
  watcher0.on ('error', function () {
    console.log ('watcher -> error');
  });
  watcher0.on ('all', onChokChange);

  // watch "common" html folder:
  watcher2.on ('ready', checkScanningComplete);
  watcher2.on ('error', function () {
    console.log ('watcher -> error');
  });
  watcher2.on ('all', onChokChange);

  // watch "assets" folder:
  watcher3.on ('ready', checkScanningComplete);
  watcher3.on ('error', function () {
    console.log ('watcher -> error');
  });
  watcher3.on ('all', onChokChange);

  // watch "js" folder:
  watcher4.on ('ready', checkScanningComplete);
  watcher4.on ('error', function () {
    console.log ('watcher -> error');
  });
  watcher4.on ('all', onChokChange);

  // watch "images" folder:
  watcher5.on ('ready', checkScanningComplete);
  watcher5.on ('error', function () {
    console.log ('watcher -> error');
  });
  watcher5.on ('all', onChokChange);

  function checkScanningComplete () {
    countScannedFolder++;
    if (countScannedFolder == totalScannedFolder) {
      isScanningComplete = true;
      console.log (
        frameworkName +
          chalk.yellow (
            ' DIGIFAST FRAMEWORK IS READY NOW. Happy Coding, Buddy!'
          )
      );

      // Create virtual local server:
      browserSync.init ({
        ui: false,
        server: {
          baseDir: watchDir,
        },
      });
      browserSync.notify (
        "<span color='yellow'>First run: scanning the source code, please wait...</span>",
        10000
      );
    }
  }

  function onChokRaw (event, path, details) {
    if (path.indexOf ('.DS_Store') < 0) {
      //console.log(event, path, details);
      console.log (
        'RAW:',
        event,
        details.path + ' [ID: ' + details.flags + ']'
      );
    }
  }

  //watcher6.on('change', onCompiled);

  function getOldName (path1, path2) {
    var _name = '';
    var path1Arr = path1.split ('/');
    var path2Arr = path2.split ('/');
    path1Arr.forEach (function (folder1, i) {
      var folder2 = path2Arr[i];
      if (folder1 != folder2) {
        _name += folder1;
      }
    });
    return _name;
  }

  function getNewName (path1, path2) {
    var _name = '';
    var path1Arr = path1.split ('/');
    var path2Arr = path2.split ('/');
    path1Arr.forEach (function (folder1, i) {
      var folder2 = path2Arr[i];
      if (folder1 != folder2) {
        _name += folder2;
      }
    });
    return _name;
  }

  function getPathUntilFolder (givenPath, folderName) {
    var _path = givenPath.split ('/' + folderName)[0] + '/' + folderName;
    return _path;
  }

  function onChokChange (event, eventPath) {
    // console.log ('onChokChange:', event, eventPath);
    if (!isScanningComplete) return;

    if (eventPath.indexOf ('.DS_Store') < 0) {
      // ko cần execute nếu là file này
      // console.log (event, eventPath);
      //return;

      // when html in "common" change:
      if (eventPath.indexOf ('common/') > -1) {
        gulpTaskForHtml (function (done) {
          browserSync.reload ();
        });
        return;
      }

      // Simulating the {base: 'src'} used with gulp.src in the scripts task
      var relativePath = path.relative (path.resolve ('src'), eventPath);
      var pathToSrc = path.resolve ('src', relativePath);
      var pathToDebug = path.resolve ('debug', relativePath);
      var pathToBuild = path.resolve ('build', relativePath);

      if (event == 'addDir') {
        //console.log(event + ":", eventPath);
        try {
          fs.ensureDirSync (pathToDebug);
          fs.ensureDirSync (pathToBuild);
        } catch (e) {}
      }

      if (event == 'unlinkDir') {
        fs.removeSync (pathToDebug);
        fs.removeSync (pathToBuild);
      }

      if (event == 'add' || event == 'change') {
        //console.log(event + ":", eventPath);
        var ext = getFileExtension (eventPath);
        var debugDirPath = path.resolve (pathToDebug, '../');
        var buildDirPath = path.resolve (pathToBuild, '../');

        try {
          /* if(watchDir == 'debug'){
            // only copy file - not compress anymore
            copyFileAndMoveTo(eventPath, debugDirPath, buildDirPath);
          } else {
            if(ext == "jpg" || ext == "png" || ext == "gif" || ext == "svg"){
              minifyAndExportImage(eventPath, debugDirPath, buildDirPath, pathToDebug, pathToBuild);
            } 
            else if(ext == "js"){
              minifyAndExportJS(eventPath, debugDirPath, buildDirPath, pathToDebug, pathToBuild);
            } 
            else if(ext == "css"){
              minifyAndExportCSS(eventPath, debugDirPath, buildDirPath, pathToDebug, pathToBuild);
            }
            else {
              copyFileAndMoveTo(eventPath, debugDirPath, buildDirPath);
            }
          } */
          // Minify JS & CSS, the rest is just copying:
          if (ext == 'js') {
            if (eventPath.indexOf ('js/bundle') > -1) {
              bundleAndExportJS ();
            } else {
              minifyAndExportJS (
                eventPath,
                debugDirPath,
                buildDirPath,
                pathToDebug,
                pathToBuild
              );
            }
          } else if (ext == 'css') {
            minifyAndExportCSS (
              eventPath,
              debugDirPath,
              buildDirPath,
              pathToDebug,
              pathToBuild
            );
          } else if (
            ext == 'jpg' ||
            ext == 'png' ||
            ext == 'gif' ||
            ext == 'svg'
          ) {
            minifyAndExportImage (eventPath, debugDirPath, buildDirPath);
          } else {
            copyFileAndMoveTo (eventPath, debugDirPath, buildDirPath);
          }
        } catch (e) {
          console.log ('Something wrong:' + e.message);
        }
      }

      if (event == 'unlink') {
        //console.log(event + ":", eventPath);
        if (fs.existsSync (pathToDebug)) {
          del.sync (pathToDebug);
          console.log (
            frameworkName +
              " Deleted file '" +
              chalk.blue (eventPath) +
              "' from DEBUG completely."
          );
        }
        if (fs.existsSync (pathToBuild)) {
          del.sync (pathToBuild);
          console.log (
            frameworkName +
              " Deleted file '" +
              chalk.blue (eventPath) +
              "' from BUILD completely."
          );
        }
      }

      // end onChokChange
    }
  }

  function createDirectory (path) {
    if (!fs.existsSync (path)) {
      fs.mkdirSync (path);
    }
  }

  function getFileExtension (path) {
    var _arr = path.split ('.');
    var ext = _arr[_arr.length - 1];
    return ext;
  }

  function minifyAndExportCSS (
    srcFilePath,
    debugDirPath,
    buildDirPath,
    pathToDebug,
    pathToBuild
  ) {
    console.log (frameworkName + ' Minifying CSS: ' + chalk.blue (srcFilePath));
    browserSync.notify (
      "<span color='yellow'>Minifying CSS, please wait!</span>",
      5000
    );

    gulp
      .src (srcFilePath)
      .pipe (wait (500))
      .pipe (
        autoprefixer ({
          overrideBrowserslist: ['last 3 versions'],
          cascade: false,
        })
      )
      .pipe (gulp.dest (debugDirPath))
      .pipe (
        CleanCSS (
          {
            debug: true,
            compatibility: '*',
            level: 2,
          },
          function (details) {
            //console.log('Minified CSS: ' + details.name + ': ' + details.stats.originalSize/1000 + ' kB => ' + details.stats.minifiedSize/1000 + ' kB');
          }
        )
      )
      .on ('error', reportError)
      .pipe (gulp.dest (buildDirPath))
      .on ('error', reportError)
      .on ('end', writeLog);

    function writeLog () {
      var oldStats = fs.statSync (srcFilePath);
      //console.log(oldStats);
      var oldSize = Math.round (oldStats.size / 1024 * 100) / 100;
      var newStats = fs.statSync (pathToBuild);
      var newSize = Math.round (newStats.size / 1024 * 100) / 100;
      var optimizedRate =
        Math.round ((1 - newSize / oldSize) * 100 * 100) / 100;

      var paths = pathToDebug.split ('/');
      var fileName = chalk.blue (paths[paths.length - 1]);
      //var frameworkName = "[" + chalk.hex('#666666')('digifast') + "]";
      var savedStr = chalk.green ('-' + optimizedRate + '%');
      console.log (
        frameworkName +
          " Minified CSS: '" +
          fileName +
          "' - Saved: " +
          savedStr +
          ' (' +
          chalk.hex ('#999999') (oldSize + ' kB') +
          ' -> ' +
          newSize +
          ' kB)'
      );

      browserSync.reload ();
    }
  }

  function bundleAndExportJS () {
    console.log (frameworkName + ' Concatting JS files...');
    browserSync.notify (
      "<span color='yellow'>Concatting JS files, please wait!</span>",
      5000
    );

    try {
      gulp
        .src ('src/js/bundle/*.js')
        .pipe (concat ('all.js'))
        .pipe (gulp.dest ('debug/js/bundle/'))
        .pipe (stripDebug ())
        .pipe (uglify ())
        .pipe (gulp.dest ('build/js/bundle/'))
        .on ('end', writeLog);
    } catch (e) {
      //--
    }

    function writeLog () {
      console.log (frameworkName + " Bundled JS: 'all.js'");
      browserSync.reload ();
    }

    //console.log("Minified JS: " + srcFilePath);
  }

  function minifyAndExportJS (
    srcFilePath,
    debugDirPath,
    buildDirPath,
    pathToDebug,
    pathToBuild
  ) {
    console.log (frameworkName + ' Minifying JS: ' + chalk.blue (srcFilePath));
    browserSync.notify (
      "<span color='yellow'>Minifying JS, please wait!</span>",
      5000
    );

    try {
      gulp
        .src (srcFilePath)
        .pipe (gulp.dest (debugDirPath))
        .pipe (
          uglify ({
            warnings: true,
          })
        )
        .on ('error', reportError)
        .pipe (gulp.dest (buildDirPath))
        .on ('end', writeLog);
    } catch (e) {
      //--
    }

    function writeLog () {
      var oldStats = fs.statSync (srcFilePath);
      //console.log(oldStats);
      var oldSize = Math.round (oldStats.size / 1024 * 100) / 100;
      var newStats = fs.statSync (pathToBuild);
      var newSize = Math.round (newStats.size / 1024 * 100) / 100;
      var optimizedRate =
        Math.round ((1 - newSize / oldSize) * 100 * 100) / 100;

      var paths = pathToDebug.split ('/');
      var fileName = chalk.blue (paths[paths.length - 1]);
      var savedStr = chalk.green ('-' + optimizedRate + '%');
      console.log (
        frameworkName +
          " Minified JS: '" +
          fileName +
          "' - Saved: " +
          savedStr +
          ' (' +
          chalk.hex ('#999999') (oldSize + ' kB') +
          ' -> ' +
          newSize +
          ' kB)'
      );

      browserSync.reload ();
    }

    //console.log("Minified JS: " + srcFilePath);
  }

  function minifyAndExportImage (srcFilePath, debugDirPath, buildDirPath) {
    var srcPath = srcFilePath;

    gulp
      .src (srcFilePath)
      .pipe (gulp.dest (debugDirPath))
      // Use GULP-IMAGE:
      .pipe (
        gulpImage ({
          // PNG compress:
          pngquant: true,
          optipng: false,
          zopflipng: false,
          // JPG compress:
          jpegRecompress: false,
          mozjpeg: true,
          guetzli: false,
          // GIF & SVG compress:
          gifsicle: true,
          svgo: true,
          // How many images at the time?
          concurrent: 3,
          // Print the logs:
          // quiet: true
        })
      )
      .pipe (gulp.dest (buildDirPath))
      .on ('error', reportError)
      .on ('end', function () {
        // console.log (
        //   frameworkName +
        //     " File '" +
        //     chalk.blue (srcFilePath) +
        //     "' was copied to DEBUG successfully!"
        // );
        browserSync.reload ();
      });
    // .on ('end', function () {
    //   console.log (
    //     frameworkName +
    //       chalk.yellow (
    //         ' Framework => Build completed! Check folder "./build" for released files.'
    //       )
    //   );
    // });
  }

  function copyFileAndMoveTo (srcFilePath, debugDirPath, buildDirPath) {
    var filePaths = srcFilePath.split ('/');
    var fileName = chalk.blue (filePaths[filePaths.length - 1]);
    console.log (
      frameworkName +
        " Copying file '" +
        chalk.blue (srcFilePath) +
        "' to DEBUG..."
    );

    gulp
      .src (srcFilePath)
      .pipe (gulp.dest (debugDirPath))
      .pipe (gulp.dest (buildDirPath))
      .on ('error', reportError)
      .on ('end', function () {
        console.log (
          frameworkName +
            " File '" +
            chalk.blue (srcFilePath) +
            "' was copied to DEBUG & BUILD successfully!"
        );
        browserSync.reload ();
      });
  }

  function onSyncHTML (filePath) {
    console.log (filePath);
    var filePathFromSrc = path.relative (path.resolve ('src'), filePath);
    syncHTML (filePathFromSrc, function () {
      browserSync.reload ();
    });
  }

  function syncHTML (filePathFromSrc, callback) {
    // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
    var srcFilePath = path.resolve ('src', filePathFromSrc);
    var buildFilePath = path.resolve ('build', filePathFromSrc);
    var debugFilePath = path.resolve ('debug', filePathFromSrc);
    var buildFolderPath = path.resolve (buildFilePath, '../');
    var debugFolderPath = path.resolve (debugFilePath, '../');
    var srcFolderPath = path.resolve (srcFilePath, '../');

    var htmlListSrc = [];
    var htmlListDebug = [];
    var htmlListBuild = [];

    fs.readdirSync (srcFolderPath).forEach (file => {
      if (file.indexOf ('.html') > -1) {
        //console.log(file);
        htmlListSrc.push (file);
      }
    });

    fs.readdirSync (debugFolderPath).forEach (file => {
      if (file.indexOf ('.html') > -1 && file != 'index.html') {
        //console.log(file);
        htmlListDebug.push (file);
        if (htmlListSrc.indexOf (file) < 0) {
          console.log (frameworkName + " '" + file + "' was deleted.");
          del.sync (path.resolve (debugFolderPath, file));
          //console.log(path.resolve(debugFolderPath, file));
        }
      }
    });

    fs.readdirSync (buildFolderPath).forEach (file => {
      if (file.indexOf ('.html') > -1 && file != 'index.html') {
        //console.log(file);
        htmlListBuild.push (file);
        if (htmlListSrc.indexOf (file) < 0) {
          console.log (frameworkName + " '" + file + "' was deleted.");
          del.sync (path.resolve (buildFolderPath, file));
        }
      }

      // Re-generate INDEX.HTML:
      clearTimeout (syncHtmlInt);
      syncHtmlInt = setTimeout (function () {
        generateIndex (debugDir);
        generateIndex (buildDir);

        if (callback) callback ();
      }, 500);
    });
  }
  // -- END --
}
