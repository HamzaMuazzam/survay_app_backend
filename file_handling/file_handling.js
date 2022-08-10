const multer = require('multer');
const color = require('colors');
exports.initFileUploader = () => {
    let feedFolder;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log("destinication")
            cb(null, `./uploads/${feedFolder}`);
        },
        filename: function (req, file, cb) {
            console.log("filename")
            cb(null, new Date().toISOString() + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {
        console.log(file.mimetype.red)
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            feedFolder = "images/"
            /// TODO true ka mtlb hai write krdo file
            // TODO if you want to store a file to upload and save
            //  then pass <true> as second parameter in callback like below
            //  cb(null, true);
            cb(null, true);
        } else if (file.mimetype === 'video/quicktime' /*|| file.mimetype === 'image/png'*/) {
            feedFolder = "videos/"

            cb(null, true);
        } else if (file.mimetype === 'application/zip' /*|| file.mimetype === 'image/png'*/) {
            feedFolder = "zip_files/"
            cb(null, true);
        } else if (file.mimetype === 'application/octet-stream' /*|| file.mimetype === 'image/png'*/) {
            feedFolder = "zip_files/"

            cb(null, true);
        } else if (file.mimetype === 'application/pdf' /*|| file.mimetype === 'image/png'*/) {
            feedFolder = "pdf_documents/"

            cb(null, true);
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' /*|| file.mimetype === 'image/png'*/) {
            feedFolder = "pdf_documents/"

            cb(null, true);
        } else if (file.mimetype === 'image/svg+xml' /*|| file.mimetype === 'image/png'*/) {

            console.log(req.body)
            feedFolder = "svg_xml/"
            cb(null, true);
        } else {
            /// TODO agr false pass kryn gyn cb ko to file write nhin hogi. cb(null, false);
            console.log(file)
            feedFolder = "public/"
            cb(null, false);
        }
        // TODO if you want to reject a file to upload and save
        //  then pass <false> as second parameter in callback like below
        //  cb(null, false);

    };
    return multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 500
        },
        fileFilter: fileFilter

    });

}

