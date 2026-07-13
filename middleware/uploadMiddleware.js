import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directories exist
const folders = ['thrm_founders', 'thrm_blogs', 'thrm_clients'];
folders.forEach(folder => {
    const dir = path.join(uploadsDir, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Setup Local Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'thrm_clients';
    const urlPath = (req.baseUrl + req.path).toLowerCase();
    if (urlPath.includes('founder')) folder = 'thrm_founders';
    else if (urlPath.includes('blog') || urlPath.includes('/b')) folder = 'thrm_blogs';
    
    cb(null, path.join(uploadsDir, folder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, uniqueSuffix + '-' + safeName);
  }
});

// Setup Multer with file filtering
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed!'), false);
  }
};

const multerUpload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // Limit: 20MB
});

export const upload = {
    single: (fieldName) => {
        return (req, res, next) => {
            const uploader = multerUpload.single(fieldName);
            uploader(req, res, function (err) {
                if (err) return next(err);
                if (req.file) {
                    let folder = 'thrm_clients';
                    const urlPath = (req.baseUrl + req.path).toLowerCase();
                    if (urlPath.includes('founder')) folder = 'thrm_founders';
                    else if (urlPath.includes('blog') || urlPath.includes('/b')) folder = 'thrm_blogs';
                    
                    req.file.path = `${req.protocol}://${req.get('host')}/uploads/${folder}/${req.file.filename}`;
                }
                next();
            });
        }
    }
};