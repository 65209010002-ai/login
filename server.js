const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const db = require("./db"); // import จาก db.js
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { json } = require("stream/consumers");
const JWT_SECRET = "123456"; // ❗ควรเก็บไว้ใน .env ในระบบจริง
const port = 7000;
// เปิดให้เข้าถึงไฟล์ใน /uploads ผ่าน URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

// เพื่อเปิดให้ เว็บแอปหรือ API ของเรา สามารถรับคำขอ (request) จากเว็บอื่น ๆ ได้
app.use(cors());


  
    
    // ดึงtoken จากheader
    function authenticateToken(req, res, next) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]; // Bearer token

      if (!token) return res.status(401).json({ message: "Missing token" });

        //  ตัวตรวจสอบความถูกต้อง token 
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
      });
    }




app.post("/login", async (req, res) => {
  try {
    console.log("user/pass:", req.body);
    const { email, password } = req.body;
    const [row] = await db.execute(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );
    console.log("length=", row.length);
    console.log("length=", row);
    if (row.length === 0) {
      // ไม่มี user ใน database
      return res
        .status(200)
        .json({ status: 0, message: "user/pass ไม่ถูกต้อง" });
    }


   
    const user = row[0];
    
    // สร้างtoken
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("token", token);

    res.status(200).json({
      status: "ok",
      token: token, 
      row: row,
    });
  } catch (error) {
    console.error("error:", error.message);
    res.status(500).send({
      msg: "error",
      detail: error.message,
    });
  }
});

// ตั้งค่า multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // โฟลเดอร์เก็บไฟล์
  },
  filename: (req, file, cb) => {
    const uniqueName =
      "std-it68" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // จำกัดขนาด 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("เฉพาะไฟล์ .jpg .jpeg .png .gif เท่านั้น"));
    }
  },
});

// เพิ่มผู้ใช้ พร้อมอัปโหลดรูปภาพ
app.post("/add-user", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ msg: "กรุณาอัปโหลดภาพ" });
    }
    const image = req.file.filename;
    const { email, password, status } = req.body;

    const [result] = await db.execute(
      "INSERT INTO user (email, password, status, image) VALUES (?, ?, ?, ?)",
      [email, password, status, image]
    );
    res.status(200).send({
      id: result.insertId,
      msg: "ok",
    });
  } catch (error) {
    console.error("add user:", error.message);
    res.status(500).send({
      msg: "error",
      detail: error.message,
    });
  }
});

// แก้ไขผู้ใช้ รองรับกรณีไม่มีการอัปโหลดรูปใหม่
app.post("/edit-user/:id", upload.single("photo"), async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, status, photoName } = req.body;
    console.log(" body =", req.body);
    console.log(" req.file =", req.file);

    // ใช้รูปใหม่ถ้ามี ไม่งั้นใช้รูปเดิม
    const image = req.file ? req.file.filename : photoName;

    const [result] = await db.execute(
      "UPDATE user SET email=?, password=?, status=?, image=? WHERE id=?",
      [email, password, status, image, id]
    );

    res.status(200).send({ status: "ok", จำนวนUPDATE: result.affectedRows });
  } catch (error) {
    console.error("edit user:", error.message);
    res.status(500).send({ msg: "error", detail: error.message });
  }
});

// ลบผู้ใช้
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM user WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.status(200).send({
        status: "DELETE OK",
        จำนวนDELETE: result.affectedRows,
      });
    } else {
      res.status(404).send({
        status: "NOT Id",
        จำนวนDELETE: result.affectedRows,
      });
    }
  } catch (error) {
    console.error("delete user:", error.message);
    res.status(500).send({
      msg: "error",
      detail: error.message,
    });
  }
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
app.get("/", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    res.json({
      rows: rows,
      status: "ok",
    });
  } catch (error) {
    res.status(500).send({
      msg: "error",
      detail: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
