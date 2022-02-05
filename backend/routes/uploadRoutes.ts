import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

interface FileFilterCallback {
  (error: Error): void;
  (error: null, acceptFile: boolean): void;
}

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, 'uploads/');
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(Error('Images only'));
  }
}
const upload = multer({
  storage,
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  if (req.file) {
    res.send(`/${req.file.path.split('-')[1]}`);
    return;
  }
  res.status(500);
  throw new Error('Error saving Image');
});

export default router;
