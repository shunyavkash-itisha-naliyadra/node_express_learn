import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the upload folder path correctly
const uploadPath = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Ensure files are saved in the correct directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `profilePhoto-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

export default upload;
