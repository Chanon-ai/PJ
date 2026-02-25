require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const multer = require('multer')
const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json({ limit: '50mb' }))

console.log("MONGO_URI =", process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const researchSchema = new mongoose.Schema({

  titleTH: String,
  titleEN: String,
  budgetType: String,
  researchType: String,
  selectedStrategy: String,

  cooperation: String,
  cooperationDetail: String,

  researchers: Object,

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

  budgetData: Object,

  humanDetail: Object,
  animalDetail: Object,
  plantDetail: Object,
  attachments: Array,
  mainSignature: String,
  advisorSignature: String,
  committeeSignature: String,


}, { timestamps: true })

const Research = mongoose.model('Research', researchSchema)

app.post(
  '/api/research',
  upload.fields([
    { name: 'attachments' },
    { name: 'humanFile', maxCount: 1 },
    { name: 'animalFile', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const form = JSON.parse(req.body.form)
      if (req.files.attachments) {
        form.attachments = req.files.attachments.map(file => ({
          name: file.originalname,
          path: file.path
        }))
      }

      if (req.files.humanFile && form.humanDetail) {
        form.humanDetail.filePath = req.files.humanFile[0].path
      }

      if (req.files.animalFile && form.animalDetail) {
        form.animalDetail.filePath = req.files.animalFile[0].path
      }


      const newResearch = new Research(form)
      await newResearch.save()

      res.json({ message: "Saved successfully" })

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
)
app.put(
  '/api/research/:id',
  upload.fields([
    { name: 'attachments' },
    { name: 'humanFile', maxCount: 1 },
    { name: 'animalFile', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const form = JSON.parse(req.body.form)
      if (req.files.attachments) {
        form.attachments = req.files.attachments.map(file => ({
          name: file.originalname,
          path: file.path
        }))
      }
      if (req.files.humanFile && form.humanDetail) {
        form.humanDetail.filePath = req.files.humanFile[0].path
      }
      if (req.files.animalFile && form.animalDetail) {
        form.animalDetail.filePath = req.files.animalFile[0].path
      }

      const updated = await Research.findByIdAndUpdate(
        req.params.id,
        form,
        { returnDocument: 'after', runValidators: true }
      )
      res.json({ message: "Updated successfully" })

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
)


app.get('/api/research', async (req, res) => {
  const data = await Research.find().sort({ createdAt: -1 })
  res.json(data)
})

app.get('/api/research/:id', async (req, res) => {
  const data = await Research.findById(req.params.id)
  res.json(data)
})


app.listen(5000, () => {
  console.log("Server running on port 5000")
})
