
# VERSION UPDATES

## DIGIFAST Version 1.0.0

* Upgrade `gulp` to `v4.0+`.
* Upgrade jQuery to `version 3.4.1`.
* Upgrade all dependencies.
* CSS: Internet Explorer 10+ compatibility.
* Fix bugs & issues.

## DIGIFAST Version 0.9.19

* Added `gulp samsung` to develop for Samsung Landing Pages and `gulp samsung-build` to build for Samsung Landing Pages.
* Added `gulp bundlejs` -> input: `/src/js/bundle/` -> output: `/debug/js/bundle/all.js` and `/build/js/bundle/all.js`.
* `DUpload` in `js/plugins/digitop/helper.js` now can auto-rotate the image if nescessary!
* Fixed gulp crashed when JS syntax errors (<https://bitbucket.org/digitopvn/digifast-a-frontend-automation-framework-by-digitop/issues/16/crash-gulp-when-save-js-l-i).>
* Fixed `gulp release/build` not copy assets folder (<https://bitbucket.org/digitopvn/digifast-a-frontend-automation-framework-by-digitop/issues/18/gulp-release-ko-ch-p-folder-assets-ko-n-n).>
* Fixed `gulp release` and `gulp build` compress images in `/assets` folder (<https://bitbucket.org/digitopvn/digifast-a-frontend-automation-framework-by-digitop/issues/18/gulp-release-ko-ch-p-folder-assets-ko-n-n).>

## DIGIFAST Version 0.9.18

* Should minify JS & CSS during working with `gulp` now -> output in `/build`.
* Added JS plugins: jszip, jsqr, cryptojs, webfontjs.

## DIGIFAST Version 0.9.17

* Added `gulp convertfont` -> Put `ttf` fonts inside folder `/src/ttf-fonts` -> other fonts will be generated at `/debug/fonts` and `/build/fonts`.
* Added `gulp minifyjs` to minify all javascripts in folder `/src/js/` -> output in `/build/js/`.
* Added `gulp samsung` to work on Samsung landing pages, output in `/samsung-debug` **-> NOT FULLY TEST! Use at your own risk!**
* Added `/src/js/plugins/digitop/helper.js` with some utilities like DUpload, DMath, DArray, DBrowser, DDevice,... (Docs coming soon :D)
* Added `sweetalert2` in `/src/js/plugins/sweetalert2` -> call with `swal("Some message")` or `alert("Some message")`. Docs: <https://sweetalert2.github.io/#examples>
* Removed continue running with `gulp build` or `gulp release`.

## DIGIFAST Version 0.9.16

* Fixed `gulp build` or `gulp release` will open browser for debug.
* Framework speed optimization.

## DIGIFAST Version 0.9.15

### Breaking change: Mọi người tải toàn bộ folder v0.9.15 về để dùng, chứ ko copy file "gulpfile.js" và "package.json" như mấy lần trước nha

* Fixed compile & compress JS in subfolders: <https://bitbucket.org/digitopvn/digifast-a-frontend-automation-framework-by-digitop/issues/7/gulp-release-minify-js-does-not-work-in>
* Fixed compile SASS on Windows: <https://bitbucket.org/digitopvn/digifast-a-frontend-automation-framework-by-digitop/issues/10/window-10>
* Added `gulp build`, similar with `gulp release`.

## DIGIFAST Version 0.9.14

* Removed image compress using `TinyPNG`, replaced by `gulp-image` for better optimization.
* Only compress images when use `gulp release`.
* Added `lazyload` to `/js/main.js`, use `<img data-src="..." />` instead of `<img src="..." />`. Example: `<img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="images/banner01.jpg" />`.
* Fixed re-generate `html` when making changes in `/src/common/*.html`.
* Changed the framework workflow for best optimization of Google Page Speed Insights.
* Fixed minify JS ES6.

## DIGIFAST Version 0.9.13

* Remove compressing code while developing, only compress images, js & css when use `gulp build`.

## DIGIFAST Version 0.9.12

* New `index.html` file - Better interface.
* Fixed links in `index.html`
* Added lazy load to `<img>` tag: `<img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="path/to/image.jpg"/>`

## DIGIFAST Version 0.9.11

* Bỏ tính năng tự động compress images sau 1 khoảng thời gian để optimize.
* Update & nâng cấp bộ SASS.
* Update & nâng cấp bộ Tinify (TinyPNG).
* Add thêm `try catch` để bỏ qua lỗi nếu có.
* Bỏ bớt các dependencies dư.

## DIGIFAST Version 0.9.10

* Sử dụng Imagemin của framework trong quá trình code để compress nhanh hơn.
* Khi `gulp release` mới sử dụng TinyPNG để compress hình -> giảm được nhiều hơn.
* Sync folder "images" và xoá các file dư thừa.

## DIGIFAST Version 0.9.9

* Thêm `path_resource` vào `main.js`.

## DIGIFAST Version 0.9.8

* Sửa lỗi thỉnh thoảng minify JS bị đứng (reporter: **duysach@digitop.vn**).
* Sửa lỗi thỉnh thoảng bị mất file JS trong folder `build`.
* Thêm thông báo về dung lượng sau khi compress JS/CSS/images.

## DIGIFAST Version 0.9.7

* Chuyển sang **TinyPNG** để optimize hình tốt hơn, nếu hết quota license (500 hình/tháng) thì tự động switch sang license khác.
* Cải thiện tính năng copy file & folder giữa [src/debug/build] bằng `fs-extra`.
* Thêm màu cho thông báo lỗi ở Terminal/CMD bằng `chalk`.

## DIGIFAST Version 0.9.6

* Sửa lỗi sync giữa [src/debug/build] khi [compile/add/remove/rename] file & folder.
* Sửa lỗi crash khi copy folder vào thư mục images.
* Update bộ **"sass"** mới của **khuongdinh@digitop.vn**.
* Chuyển watch library từ `gulp.watch` sang `chokidar` để theo dõi thay đổi file.

## DIGIFAST Version 0.9.5

* Sửa lỗi compile chậm đối với các file JS có dung lượng lớn.

## DIGIFAST Version 0.9.4

* Sửa lỗi JS ERROR làm ngưng hoạt động của framework.
* Improve performance: chỉ compile những file nào có thay đổi => tiết kiệm RAM.
* In thông báo lỗi có đường dẫn tới file và dòng code.

## DIGIFAST Version 0.9.3

* Thay phương thức minify CSS tối ưu hơn (plugin: Clean-CSS).
* Thêm tính năng thông báo lỗi nếu GULP bị lỗi ở Terminal.
* Sửa lỗi thỉnh thoảng sau khi biên dịch SASS không thấy thay đổi gì.

===============================

# Cách update lên version mới

* Copy framework version mới nhất ở folder `releases` vào folder `dự án đang làm`.
* Mở Terminal/CMD rồi trỏ tới folder dự án: `cd /path/to/folder`.
* Ở Terminal/CMD gõ lệnh `npm install`.
* Sau đó chạy `gulp` to start / `gulp build` to build.

===============================

# Cách sử dụng

1. Cài đặt NODE JS: <http://nodejs.org>
2. Cài đặt GULP JS: <http://gulpjs.com>
3. Pull source code cuả DIGIFAST mới nhất về máy:
<https://bitbucket.org/digitop-duynguyen/digifast-a-frontend-automation-framework-by-digitop/overview>

0.Copy source folder có version cao nhất trong folder "releases" (VD: digifast-v.0.9.3) ra folder mới trên máy của bạn & rename thành tên dự án chuẩn bị làm.
0.Mở Terminal (hoặc CMD trên Windows), `cd /path/to/project/` tới folder dự án.
0.Cập nhật các modules: `npm install`.
0.Sau khi download xong các modules, chạy lệnh: `gulp`.
0.Bắt đầu code!

===============================

# AVAILABLE FEATURES

1. gulp
2. gulp build
3. gulp release *(same function with `gulp build`)*
4. gulp minifyjs
5. gulp converfont
6. gulp samsung
7. gulp samsung-build
8. gulp bundlejs

===============================

# ROADMAP

1. Build templates để xem bản release đã optimize code: `gulp release` or `gulp build`. **[DONE]**

2. Build templates cho các dự án của Samsung (JS & CSS in-page): `gulp samsung` **[DONE]**

3. Convert font: `gulp convertfont` **[DONE]**

4. Add useful JS plugins: <https://designmodo.com/javascript-plugins/> <https://tympanus.net/codrops/>

5. Build templates để code BackEnd: `gulp build-backend` *(in progress)*
(Convert templates sang backend template engine (twig,...)

## Any question? Please contact: duynguyen@digitop.vn
