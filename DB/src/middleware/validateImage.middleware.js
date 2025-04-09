const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');  // ใช้ไลบรารี uuid สำหรับสร้าง UUID v4

// กำหนดตำแหน่งและวิธีการจัดเก็บไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/images');  // โฟลเดอร์เก็บไฟล์
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // นามสกุลไฟล์
        const filename = uuidv4() + ext;  // สร้า งชื่อไฟล์ด้วย UUID
        cb(null, filename);
    }
});

// การตรวจสอบไฟล์
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // จำกัดขนาดไฟล์ไม่เกิน 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;  // ตรวจสอบชนิดไฟล์
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);  // ไฟล์ถูกต้อง
        } else {
            cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'), false);  // ไฟล์ไม่ถูกต้อง
        }
    }
}).single('image');  // 'image' คือตัว name ของ input field ในฟอร์ม

// Middleware สำหรับอัปโหลดไฟล์
const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();  // หากไฟล์อัปโหลดสำเร็จ
    });
};

module.exports = {uploadImage, upload, storage};

