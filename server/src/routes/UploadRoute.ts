import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

/**
 * 文件保存配置
 */
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename(req, file, callback) {
    const time = new Date().getTime();
    // 设置后缀名
    const extname = path.extname(file.originalname);
    callback(null, time + extname);
  },
});

const allowedImg = [".jpg", ".png", ".gif", ".bmp", ".svg", ".ico"];

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 限制上传文件最大 1M
  },
  // 配置允许上传的文件类型
  fileFilter(req, file, callback) {
    const extname = path.extname(file.originalname);
    if (allowedImg.includes(extname)) {
      callback(null, true);
    } else {
      callback(new Error(`不允许上传"${extname}"类型文件`), false);
    }
  },
}).single("imgfile"); // 单个文件上传

const router = Express.Router();

router.post("/", (req, res) => {
  upload(req, res, err => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(err.message, res);
    } else {
      // 一切都好
      ResponseHelper.sendData(req.file.filename, res);
    }
  });
});

export default router;