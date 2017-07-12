rm -rf build/*
buble src -o build
webpack
uglifyjs dist/labcoat.js > dist/labcoat.min.js