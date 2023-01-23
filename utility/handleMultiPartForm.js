//this is for fs promisses
const { access, mkdir } = require("fs/promises");
//this is for normal functions
const { createWriteStream } = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const multiparty = require("multiparty");
function handleMultiPartForm(req, res, ObjSChema, cDirName, sucessMessage) {
  let count = 0;
  let form = new multiparty.Form();
  //later replace user email with user id
  let useremail = req.user.email;
  let obj = { owner: useremail };
  let dirName = `uploads/${cDirName}`;
  // Errors may be emitted
  // Note that if you are listening to 'part' events, the same error may be
  // emitted from the `form` and the `part`.
  form.on("error", function (err) {
    console.log("Error parsing form: " + err.stack);
  });
  // Parts are emitted when parsing the form
  form.on("part", async function (part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"
    if (part.filename === undefined) {
      // filename is not defined when this is a field and not a file
      let data = "";
      part.on("data", (chunk) => {
        data += chunk;
      });
      part.on("end", () => {
        obj[part.name] = data;
        // Do something with the data
      });
    }
    if (part.filename !== undefined) {
      // filename is  defined when this is a file
      count++;
      // Extract the file extension from the original file name
      const fileExtension = path.parse(part.filename).ext;
      const newFileName = `${v4()}${fileExtension}`;
      obj[part.name] = newFileName;
      try {
        await access("./uploads");
      } catch {
        await mkdir("./uploads");
      }
      try {
        await access(dirName);
      } catch {
        await mkdir(dirName);
      }
      // create a write stream for the destination file
      const writeStream = await createWriteStream(`${dirName}/${newFileName}`);
      part
        .pipe(writeStream)
        .on("close", () => {
          console.log("file written on disk by streaming successfully");
        })
        .on("error", () => {
          res.send({ message: "file could not be saved", isError: true });
        });
    }

    part.on("error", function (err) {
      // decide what to do
      res.send({ message: "file could not be saved", isError: true });
    });
  });
  // Close emitted after form parsed
  form.on("close", async function () {
    let objMongo = new ObjSChema(obj);
    await objMongo.save();
    res.send({
      message: `${sucessMessage} ${count} files Received`,
      obj,
      isError: false,
    });
  });
  // Parse req
  form.parse(req);
}
module.exports = handleMultiPartForm;
