const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

// ====== CONFIG ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Missing MONGO_URI in server/.env");
}

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// ====== UPLOADS DIR ======
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ====== DB CONNECT ======
// ✅ บังคับ dbName กันหลุดไป test (ถ้ามึงอยากใช้ test ก็เปลี่ยน "projectDB" เป็น "test")
mongoose
  .connect(MONGO_URI, { dbName: "projectDB" })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
    console.log("✅ DB:", mongoose.connection.name);
    console.log("✅ Host:", mongoose.connection.host);
  })
  .catch((err) => console.error("❌ MongoDB connect error:", err));

// ====== MODEL ======
const researchSchema = new mongoose.Schema(
  {
    titleTH: String,
    titleEN: String,

    budgetType: String,
    researchType: String,
    selectedStrategy: String,

    cooperation: String,
    cooperationDetail: String,

    researchers: Object,

    // ✅ เพิ่มให้ตรงกับ form ฝั่งหน้าเว็บ
    budgetSubTypes: Array,
    budgetData: Object, // section 17

    keywords: String,
    importance: String,
    objective: String,
    literature: String,
    reference: String,
    methodology: String,
    scope: String,

    activities: Array,
    selectedOutcomes: Array,
    standards: Array,
    researchStandard: Array,

    socialTransfer: String,
    progressReport: String,
    integration: String,
    remark: String,

    humanDetail: Object,
    animalDetail: Object,
    plantDetail: Object,

    attachments: Array,

    mainSignature: String,
    advisorSignature: String,
    committeeSignature: String,

    // ✅ เก็บ “บันทึกล่าสุด” เพื่อโชว์หน้า dashboard + หน้า form
    lastActivity: {
      by: String,     // ใครทำ
      role: String,   // บทบาท
      action: String, // CREATE / UPDATE
      at: Date,       // เวลา
      message: String // ทำอะไร
    },
  },
  { timestamps: true }
);

// กัน model ซ้ำตอน reload
const Research =
  mongoose.models.Research || mongoose.model("Research", researchSchema);

// ====== HELPER ======
// ✅ ตอนนี้ยังไม่มี login → ใช้ header ที่ frontend ส่งมา ถ้าไม่มีใช้ชื่อหัวหน้าโครงการแทน
function getActor(req, form) {
  const name =
    req.headers["x-actor-name"] ||
    form?.researchers?.mainResearcher?.name ||
    "Unknown";

  const role =
    req.headers["x-actor-role"] ||
    "หัวหน้าโครงการ";

  return { name, role };
}

// ====== ROUTES ======
app.get("/health", (req, res) => res.json({ ok: true }));

// CREATE แก้ POST /api/research (CREATE) ให้ return lastActivity
app.post(
  "/api/research",
  upload.fields([
    { name: "attachments" },
    { name: "humanFile", maxCount: 1 },
    { name: "animalFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const form = JSON.parse(req.body.form || "{}");

      if (req.files?.attachments) {
        form.attachments = req.files.attachments.map((file) => ({
          name: file.originalname,
          path: `/uploads/${path.basename(file.path)}`,
        }));
      }

      if (req.files?.humanFile && form.humanDetail) {
        form.humanDetail.filePath = `/uploads/${path.basename(
          req.files.humanFile[0].path
        )}`;
      }

      if (req.files?.animalFile && form.animalDetail) {
        form.animalDetail.filePath = `/uploads/${path.basename(
          req.files.animalFile[0].path
        )}`;
      }

      // ✅ lastActivity (CREATE)
      const actor = getActor(req, form);
      const now = new Date();
      form.lastActivity = {
        by: actor.name,
        role: actor.role,
        action: "CREATE",
        at: now,
        message: "บันทึกข้อเสนอโครงการ",
      };

      const doc = await Research.create(form);

      return res.status(201).json({
        message: "Saved successfully",
        id: doc._id,
        lastActivity: doc.lastActivity,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }
);


// UPDATE อัปเดตเอกสาร + เซ็ต lastActivity เป็น UPDATE ส่ง lastActivity กลับไปให้ frontend
app.put(
  "/api/research/:id",
  upload.fields([
    { name: "attachments" },
    { name: "humanFile", maxCount: 1 },
    { name: "animalFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const form = JSON.parse(req.body.form || "{}");

      // attachments
      if (req.files?.attachments) {
        form.attachments = req.files.attachments.map((file) => ({
          name: file.originalname,
          path: `/uploads/${path.basename(file.path)}`,
        }));
      }

      // humanFile
      if (req.files?.humanFile && form.humanDetail) {
        form.humanDetail.filePath = `/uploads/${path.basename(
          req.files.humanFile[0].path
        )}`;
      }

      // animalFile
      if (req.files?.animalFile && form.animalDetail) {
        form.animalDetail.filePath = `/uploads/${path.basename(
          req.files.animalFile[0].path
        )}`;
      }

      // ✅ lastActivity (UPDATE)
      const actor = getActor(req, form);
      const now = new Date();
      form.lastActivity = {
        by: actor.name,
        role: actor.role,
        action: "UPDATE",
        at: now,
        message: "บันทึกข้อเสนอโครงการ",
      };

      // ✅ ต้องเก็บ updated doc แล้วส่ง lastActivity กลับ
      const updated = await Research.findByIdAndUpdate(
        req.params.id,
        { $set: form },
        { new: true }
      );

      return res.json({
        message: "Updated successfully",
        lastActivity: updated?.lastActivity,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }
);
// READ ALL
app.get("/api/research", async (req, res) => {
  try {
    const data = await Research.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get("/api/research/:id", async (req, res) => {
  try {
    const data = await Research.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ====== START ======
app.listen(PORT, () => {
  console.log("BOOT OK - server.js running");
  console.log(`🚀 Server running on port ${PORT}`);
});