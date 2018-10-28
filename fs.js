let fs = require("fs");
function copy(source, target) {
  let size = 6;
  let position = 0;
  fs.open(source, "r", (err, rfd) => {
    fs.open(target, "w", (err, wfd) => {
      let buffer = Buffer.alloc(size);
      function next() {
        fs.read(rfd, buffer, 0, size, position, (err, byteRead) => {
          if (byteRead > 0) {
            position += byteRead;
            fs.write(wfd, buffer, 0, byteRead, null, (err, data) => {
              next();
            });
          } else {
            fs.close(rfd, () => {});
            fs.fsync(wfd, () =>
              fs.close(wfd, () => {
                console.log("close");
              })
            );
          }
        });
      }
      next();
    });
  });
}
copy("a.md", "b.md");
