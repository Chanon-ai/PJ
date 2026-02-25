<template>
  <div class="container-fluid px-0 page-bg min-vh-100">
    <div class="w-100 p-4">
      <div class="d-flex align-items-center mb-4">
        <h3 class="font-weight-bold text-primary mb-0">
          <CIcon name="cil-paperclip" class="me-2 text-primary" size="lg" />
          แนบเอกสารข้อเสนอโครงการวิจัย
        </h3>
      </div>
      <div class="d-flex align-items-center mb-4">
        <h1 class="font-weight-bold text-gray mb-0">แบบเสนอโครงการวิจัย (RS1)</h1>
      </div>
      <ResearchersSection v-model:form="form" :disabled="isReadOnly" @add-co="addCoResearcher" @remove-co="removeCoResearcher"
        @add-adv="addAdvisor" @remove-adv="removeAdvisor" />


      <CCard class="shadow-sm w-100 mb-4 border-0">
        <GeneralInfoSection v-model:form="form" :disabled="isReadOnly" :budget-types="budgetTypes"
          :research-type-options="researchTypeOptions" />

        <ResearchDetailsSection v-model:form="form" :disabled="isReadOnly" :text-fields="textFields" :editor-option="editorOption" />

        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardBody class="p-4 bg-white">
            <ResearchSection12 v-model="form.activities" :disabled="isReadOnly" />
          </CCardBody>
        </CCard>

        <BudgetOutcomesSection v-model:form="form" :disabled="isReadOnly" :outcomes="outcomes" :editor-option="editorOption" />

        <EthicsSection v-model:form="form" :disabled="isReadOnly" :editor-option="editorOption" @file-upload="handleFileUpload" />
        <SignatureSection v-model:form="form" />
        <FileManagement v-model:files="files" :disabled="isReadOnly" @upload="handleFileUpload2" @remove="removeFile" @open="openFile"
          @replace="triggerReplace" />
        <CCard class="shadow-sm w-100 mb-4 border-0 last-activity-card">
          <CCardBody class="p-3 bg-white">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">

              <!-- Left -->
              <div class="d-flex align-items-start gap-3">
                <div class="activity-icon">
                  <CIcon name="cil-history" size="lg" />
                </div>

                <div>
                  <div class="small text-muted mb-1">บันทึกล่าสุด</div>

                  <div v-if="lastActivity" class="fw-bold text-dark">
                    {{ lastActivity.message }}
                    <span class="text-muted fw-normal">โดย</span>
                    <span class="text-primary">{{ lastActivity.by }}</span>
                    <span class="text-muted fw-normal">({{ lastActivity.role }})</span>
                  </div>

                  <div v-else class="text-muted">ยังไม่มีการบันทึก</div>

                  <div v-if="lastActivity" class="mt-2 d-flex align-items-center gap-2 flex-wrap">
                    <span class="badge rounded-pill" :class="badgeClass(lastActivity.action)">
                      {{ badgeText(lastActivity.action) }}
                    </span>
                    <span class="text-muted small">
                      <CIcon name="cil-clock" class="me-1" />
                      {{ formatTimeAgo(lastActivity.at) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right -->
              <div class="text-end ms-auto" v-if="lastActivity">
                <div class="small text-muted">เวลา</div>
                <div class="fw-bold text-dark">{{ formatDateTime(lastActivity.at) }}</div>
              </div>

            </div>
          </CCardBody>
        </CCard>

      </CCard>

      <footer class="bg-white p-4 border-top d-flex justify-content-end shadow-lg sticky-footer flex-wrap gap-2">
        <CButton v-if="!isReadOnly" color="danger" variant="outline" @click="resetForm">
          ล้างข้อมูล
        </CButton>

        <CButton v-if="!isReadOnly" color="primary" @click="submit">
          บันทึกฉบับร่าง
        </CButton>

        <CButton color="info" class="text-white" @click="handleExport">
          Export PDF
        </CButton>

        <CButton v-if="!isReadOnly" color="success" class="text-white" @click="submitProject">
          ยื่นโครงการ
        </CButton>

        <div v-else class="alert alert-info mb-0 py-2">
          <CIcon name="cil-lock-locked" class="me-2" /> เอกสารนี้ถูกยื่นแล้ว ไม่สามารถแก้ไขได้
        </div>
      </footer>

    </div>

    <input type="file" ref="replaceInput" style="display:none" @change="replaceFile" />

    <!-- ซ่อนหน้า Report สำหรับ export -->
    <div style="position:absolute; left:-9999px; top:0;">
      <Report ref="reportComponent" :form="form" />
    </div>
  </div>
</template>

<script>
// Import คอมโพเนนต์ย่อย
import GeneralInfoSection from "@/components/GeneralInfoSection.vue";
import ResearchersSection from "@/components/ResearcherSection.vue";
import ResearchDetailsSection from "@/components/ResearchDetailSection.vue";
import BudgetOutcomesSection from "@/components/BudgetOutcomesSection.vue";
import EthicsSection from "@/components/EthicsSection.vue";
import FileManagement from "@/components/FileManagement.vue";
import ResearchSection12 from "@/components/Section12.vue";
import SignatureSection from "@/components/SignatureSection.vue";
import Swal from 'sweetalert2'
import Report from "@/views/Report.vue";
import html2pdf from "html2pdf.js";

export default {
  props: ['id'],
  name: "ResearchForm",
  components: {
    Report,
    GeneralInfoSection,
    ResearchersSection,
    ResearchDetailsSection,
    BudgetOutcomesSection,
    EthicsSection,
    FileManagement,
    ResearchSection12,
    SignatureSection
  },
  computed: {
    isReadOnly() {
      // ถ้าสถานะเป็น ยื่นแล้ว, กำลังพิจารณา หรือ อนุมัติ จะไม่สามารถแก้ได้
      const lockedStages = ['SUBMITTED', 'IN_REVIEW', 'APPROVED'];
      return lockedStages.includes(this.form.stage);
    }
  },
  data() {

    return {
      lastActivity: null,
      updateBar: { show: false, text: "", at: null },
      updateBarTimer: null,
      editorOption: {
        placeholder: 'พิมพ์เนื้อหาที่นี่...',
        modules: {
          toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean']]
        }
      },
      budgetTypes: [
        {
          label: "ทุนนักวิจัยรุ่นใหม่",
          value: "new",
          children: [
            {
              label: "โครงการวิจัยที่เสนอมีความสอดคล้องกับคุณวุฒิ หรือสาขาวิชา หรือภาระงาน",
              value: "2_1"
            }
          ]
        },
        {
          label: "ทุนพัฒนานักวิจัย",
          value: "dev",
          children: [
            {
              label: "การพัฒนาเศรษฐกิจไทยด้วยเศรษฐกิจสร้างคุณค่าและเศรษฐกิจสร้างสรรค์ ให้มีความสามารถในการแข่งขันและพึ่งพาตนเองได้อย่างยั่งยืน พร้อมสู่อนาคต โดยใช้วิทยาศาสตร์ การวิจัย และนวัตกรรม",
              value: "2_2_1"
            },
            {
              label: "การยกระดับสังคมและสิ่งแวดล้อม ให้มีการพัฒนาอย่างยั่งยืน สามารถแก้ไข ปัญหาท้าทายและปรับตัวให้ทันต่อ พลวัตการเปลี่ยนแปลงของโลก โดยใช้วิทยาศาสตร์ การวิจัย และนวัตกรรม",
              value: "2_2_2"
            },
            {
              label: "การพัฒนาวิทยาศาสตร์ เทคโนโลยี การวิจัยและนวัตกรรม ระดับขั้นแนวหน้าที่ก้าวหน้าล้ำยุค เพื่อสร้างโอกาสใหม่และความพร้อม ของประเทศในอนาคต",
              value: "2_2_3"
            },
            {
              label: "การพัฒนากำลังคนและสถาบัน ด้านวิทยาศาสตร์ วิจัยและนวัตกรรม ให้เป็นฐานการขับเคลื่อนการพัฒนาเศรษฐกิจและสังคมของประเทศแบบก้าวกระโดดและอย่างยั่งยืน โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม",
              value: "2_2_4"
            }
          ]
        },
        {
          label: "ทุนต่อยอดสู่ภาคอุตสาหกรรม",
          value: "industrial",
          children: [
            {
              label: "การวิจัยและสร้างนวัตกรรมเพื่อเพิ่มขีดความสามารถการแข่งขัน",
              value: "2_3_1"
            }
          ]
        },
        {
          label: "ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์",
          value: "strategic",
          children: []
        }
      ],
      researchTypeOptions: [
        { value: '', label: '-- กรุณาเลือก --' },
        { value: 'ด้านวิทยาศาสตร์และเทคโนโลยี', label: 'ด้านวิทยาศาสตร์และเทคโนโลยี' },
        { value: 'ด้านวิทยาศาสตร์สุขภาพ', label: 'ด้านวิทยาศาสตร์สุขภาพ' },
        { value: 'ด้านสังคมศาสตร์และมนุษยศาสตร์', label: 'ด้านสังคมศาสตร์และมนุษยศาสตร์' }
      ],
      textFields: [
        { label: "5. คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6. ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7. วัตถุประสงค์", model: "objective" },
        { label: "8. ทบทวนวรรณกรรม", model: "literature" },
        { label: "9. เอกสารอ้างอิง", model: "reference" },
        { label: "10. วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11. ขอบเขตการวิจัย", model: "scope" }
      ],
      outcomes: {
        newResearcher: [
          { label: "นำเสนอในการประชุมวิชาการระดับนานาชาติ (Proceedings)", value: "14_1_fullpaper" },
          { label: "ตีพิมพ์ในวารสารฐานข้อมูล ก.พ.อ.", value: "14_1_tci" },
          { label: "ตีพิมพ์วารสาร TCI กลุ่ม 1 หรือ 2", value: "14_1_international" },
          { label: "อนุสิทธิบัตร/สิทธิบัตร", value: "14_1_patent" }
        ],
        devResearcher: [
          { label: "ตีพิมพ์วารสารนานาชาติฐานข้อมูล ก.พ.อ.", value: "14_2_international" },
          { label: "ตีพิมพ์วารสาร TCI กลุ่ม 1 เท่านั้น", value: "14_2_tci1" },
          { label: "อนุสิทธิบัตร/สิทธิบัตร", value: "14_2_patent" }
        ]
        ,
        strategic: [
          { label: "ตีพิมพ์วารสารนานาชาติฐานข้อมูล ก.พ.อ.", value: "14_3_international" },
          { label: "ตีพิมพ์วารสาร TCI กลุ่ม 1 เท่านั้น", value: "14_3_tci1" },
          { label: "อนุสิทธิบัตร/สิทธิบัตร", value: "14_3_patent" }
        ]
        ,
        industrial: [
          { label: "การยื่นขอจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอฯ)", value: "14_4_ip" }
        ]
      },

      files: [],
      replaceIndex: null,
      form: {
        titleTH: "",
        titleEN: "",
        budgetType: "",
        selectedStrategy: "",
        cooperation: "ไม่มี",
        cooperationDetail: "",
        researchType: "",
        budgetSubTypes: [],
        selectedOutcomes: [],
        researchStandard: [],
        socialTransfer: "",
        mainSignature: "",
        activities: [],
        humanDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        animalDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        plantDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "", signature: "" },
          coResearchers: [],
          advisors: []
        },
        budgetData: { categories: [], grandTotal: 0 },
        keywords: "",
        importance: "",
        objective: "",
        literature: "",
        reference: "",
        methodology: "",
        scope: "",
        progressReport: "",
        integration: "",
        remark: ""
      }

    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      async handler(id) {
        if (!id) {
          this.initNewForm();
        } else {
          await this.fetchResearchById(id);
        }
      }
    },

    'form.budgetType'(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        this.form.selectedOutcomes = []
      }
    }
  }
  ,
  methods: {
    // 1. ฟังก์ชันตรวจสอบความครบถ้วนของข้อมูล
    validateForm() {
      const f = this.form;
      const errors = [];

      // ตรวจสอบข้อมูลพื้นฐาน
      if (!f.titleTH) errors.push("ชื่อโครงการ (ภาษาไทย)");
      if (!f.titleEN) errors.push("ชื่อโครงการ (ภาษาอังกฤษ)");
      if (!f.budgetType) errors.push("ประเภททุน");
      if (!f.researchType) errors.push("ประเภทงานวิจัย");

      // ตรวจสอบหัวหน้าโครงการ
      const main = f.researchers.mainResearcher;
      if (!main.name || !main.affiliation || !main.email) {
        errors.push("ข้อมูลหัวหน้าโครงการ (ชื่อ, สังกัด, อีเมล)");
      }

      // ตรวจสอบเนื้อหาวิจัย (Rich Text)
      if (!f.keywords) errors.push("คำสำคัญ (Keywords)");
      if (!f.objective) errors.push("วัตถุประสงค์");
      if (!f.methodology) errors.push("วิธีดำเนินการวิจัย");

      // ตรวจสอบแผนงาน
      if (!f.activities || f.activities.length === 0) {
        errors.push("แผนการดำเนินงาน (ต้องมีอย่างน้อย 1 กิจกรรม)");
      }

      if (errors.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'ข้อมูลยังไม่ครบถ้วน',
          html: `<div class="text-start small">กรุณากรอกข้อมูลดังต่อไปนี้:<br><ul class="mt-2">${errors.map(e => `<li>${e}</li>`).join('')}</ul></div>`,
          confirmButtonText: 'ไปกรอกข้อมูล',
          customClass: { confirmButton: 'btn btn-warning' }
        });
        return false;
      }
      return true;
    },

    async submitProject() {
      // 1. ตรวจสอบความครบถ้วนของข้อมูลก่อน
      if (!this.validateForm()) return;

      // 2. แสดงการยืนยันการยื่นโครงการ
      const result = await Swal.fire({
        title: 'ยืนยันการยื่นโครงการ?',
        text: "เมื่อยื่นแล้วจะไม่สามารถแก้ไขข้อมูลได้จนกว่าเจ้าหน้าที่จะส่งกลับ",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ยืนยันการยื่น',
        cancelButtonText: 'ยกเลิก',
        customClass: {
          confirmButton: 'btn btn-success me-2',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false
      });

      if (!result.isConfirmed) return;

      // 3. เริ่มกระบวนการส่งข้อมูลแบบเดียวกับ submit()
      try {
        const id = this.$route.params.id;
        const url = id ? `/api/research/${id}` : `/api/research`;
        const method = id ? "PUT" : "POST";

        // กำหนดสถานะเป็น ยื่นแล้ว
        this.form.stage = 'SUBMITTED';

        const cleanForm = JSON.parse(JSON.stringify(this.form));

        // ล้างค่า file ใน JSON (เพราะต้องส่งแยกทาง FormData)
        if (cleanForm.humanDetail) cleanForm.humanDetail.file = null;
        if (cleanForm.animalDetail) cleanForm.animalDetail.file = null;
        if (cleanForm.plantDetail) cleanForm.plantDetail.file = null;

        const fd = new FormData();
        fd.append("form", JSON.stringify(cleanForm));

        // แนบไฟล์หลัก
        if (Array.isArray(this.files) && this.files.length) {
          this.files.forEach((f) => {
            if (f?.raw) fd.append("attachments", f.raw);
          });
        }

        // แนบไฟล์จริยธรรมวิจัย
        if (this.form?.humanDetail?.file) fd.append("humanFile", this.form.humanDetail.file);
        if (this.form?.animalDetail?.file) fd.append("animalFile", this.form.animalDetail.file);
        if (this.form?.plantDetail?.file) fd.append("plantFile", this.form.plantDetail.file);

        Swal.fire({
          title: "กำลังยื่นโครงการ...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const res = await fetch(url, { method, body: fd });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(data?.error || `Submission failed (${res.status})`);

        // อัปเดตกิจกรรมล่าสุด
        this.lastActivity = data?.lastActivity || {
          message: "ยื่นข้อเสนอโครงการ",
          by: this.form?.researchers?.mainResearcher?.name || "Unknown",
          role: "หัวหน้าโครงการ",
          at: new Date().toISOString(),
        };

        Swal.fire({
          icon: "success",
          title: "ยื่นโครงการสำเร็จ",
          text: "ระบบได้รับการเสนอโครงการวิจัยเรียบร้อยแล้ว",
          confirmButtonText: "กลับสู่หน้าหลัก",
          customClass: { confirmButton: "btn btn-primary" },
        }).then(() => {
          // เมื่อยื่นสำเร็จ ให้กลับไปหน้า Dashboard
          this.$router.push({ name: "Dashboard" });
        });

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "ยื่นโครงการไม่สำเร็จ",
          text: err?.message || "เกิดข้อผิดพลาดในการส่งข้อมูล",
          customClass: { confirmButton: "btn btn-danger" },
        });
      }
    },

    async handleExport() {
      if (this.validateForm()) {
        this.exportPDF();
      }
    },
    addCoResearcher() { this.form.researchers.coResearchers.push({ name: "", affiliation: "", phone: "", email: "", code: "", signature: "" }); },
    removeCoResearcher(index) { this.form.researchers.coResearchers.splice(index, 1); },
    addAdvisor() { this.form.researchers.advisors.push({ name: "", affiliation: "", phone: "", email: "", signature: "" }); },
    removeAdvisor(index) { this.form.researchers.advisors.splice(index, 1); },
    handleFileUpload(event, type) {
      const file = event.target.files[0];

      if (type === 'human') {
        this.form.humanDetail.file = file;
      } else if (type === 'animal') {
        this.form.animalDetail.file = file;
      } else if (type === 'plant') {
        this.form.plantDetail.file = file;
      }
    },
    handleFileUpload2(event) {
      const selectedFiles = Array.from(event.target.files);
      selectedFiles.forEach(file => {
        this.files.push({ name: file.name, datetime: new Date().toLocaleString("th-TH"), note: "", type: "", raw: file });
      });
    },
    openFile(item) { window.open(URL.createObjectURL(item.raw), "_blank"); },
    removeFile(index) { this.files.splice(index, 1); },
    triggerReplace(index) { this.replaceIndex = index; this.$refs.replaceInput.click(); },
    replaceFile(event) {
      const file = event.target.files[0];

      if (file && this.replaceIndex !== null) {
        this.files[this.replaceIndex] = {
          ...this.files[this.replaceIndex],
          name: file.name,
          raw: file,
          datetime: new Date().toLocaleString("th-TH")
        };
      }

      this.replaceIndex = null;
      event.target.value = null;
    }
    ,
    async submit() {
      try {

        const id = this.$route.params.id;
        const url = id ? `/api/research/${id}` : `/api/research`;
        const method = id ? "PUT" : "POST";

        const cleanForm = JSON.parse(JSON.stringify(this.form));
        if (cleanForm.humanDetail) cleanForm.humanDetail.file = null;
        if (cleanForm.animalDetail) cleanForm.animalDetail.file = null;

        if (cleanForm?.budgetData?.categories) {
          cleanForm.budgetData.categories.forEach(cat => {
            (cat.rows || []).forEach(r => {
              r.fileUrl = null;
            });
          });
        }

        const fd = new FormData();
        fd.append("form", JSON.stringify(cleanForm));

        if (Array.isArray(this.files) && this.files.length) {
          this.files.forEach((f) => {
            if (f?.raw) fd.append("attachments", f.raw);
          });
        }

        if (this.form?.humanDetail?.file) {
          fd.append("humanFile", this.form.humanDetail.file);
        }
        if (this.form?.animalDetail?.file) {
          fd.append("animalFile", this.form.animalDetail.file);
        }
        if (this.form?.plantDetail?.file) {
          fd.append("plantFile", this.form.plantDetail.file);
        }

        Swal.fire({
          title: "กำลังบันทึก...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const res = await fetch(url, {
          method,
          body: fd,
        });

        const data = await res.json().catch(() => ({}));
        console.log("SAVE RESPONSE JSON:", JSON.stringify(data, null, 2));
        if (!res.ok) {
          throw new Error(data?.error || `Save failed (${res.status})`);
        }
        this.lastActivity = data?.lastActivity || {
          message: "บันทึกข้อเสนอโครงการ",
          by: this.form?.researchers?.mainResearcher?.name || "Unknown",
          role: "หัวหน้าโครงการ",
          at: new Date().toISOString(),
        };

        this.showUpdateBar(this.lastActivity);
        if (!id && data?.id) {
          this.$router.replace({ name: "Research", params: { id: data.id } });
        }


        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: data?.message || "บันทึกข้อมูลสำเร็จ",
          confirmButtonText: "ตกลง",
          buttonsStyling: false,
          customClass: { confirmButton: "btn btn-primary" },
        });

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ",
          text: err?.message || "มีบางอย่างพัง",
          confirmButtonText: "ปิด",
          buttonsStyling: false,
          customClass: { confirmButton: "btn btn-danger" },
        });
      }
    }

    ,
    resetForm() {
      Swal.fire({
        icon: 'warning',
        title: 'ยืนยันการล้างข้อมูล',
        text: 'คุณต้องการล้างข้อมูลทั้งหมดหรือไม่?',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ล้างเลย',
        cancelButtonText: 'ยกเลิก',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-danger me-2',
          cancelButton: 'btn btn-secondary'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.initNewForm();
          this.$router.replace({ name: "Research" });
        }
      });
    }
    ,
    async exportPDF() {

      await this.$nextTick();
      await new Promise(resolve => setTimeout(resolve, 200));

      const element = this.$refs.reportComponent.$el;

      const opt = {
        margin: 0,
        filename: "Research_RS1.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save();
    },
    async fetchResearchById(id) {
      try {
        const res = await fetch(`http://localhost:5000/api/research/${id}`)
        const data = await res.json()
        this.initNewForm()
        const hasCategories =
          data?.budgetData?.categories &&
          data.budgetData.categories.length > 0

        this.form = {
          ...this.form,
          ...data,
          stage: data.stage || 'DRAFT',
          budgetData: hasCategories
            ? data.budgetData
            : {
              categories: [
                { name: "หมวดที่ 1", rows: [] },
                { name: "หมวดที่ 2", rows: [] },
                { name: "หมวดที่ 3", rows: [] }
              ],
              grandTotal: 0
            },
          selectedOutcomes: data.selectedOutcomes || [],
          activities: data.activities || [],
          researchStandard: data.researchStandard || [],
          progressReport: data.progressReport || "",
          integration: data.integration || "",
          remark: data.remark || ""
        }

        this.lastActivity = data?.lastActivity || null
      } catch (err) {
        console.error(err)
      }
    }
    ,
    formatTimeAgo(date) {
      if (!date) return "-";
      const diff = Date.now() - new Date(date);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return "เมื่อสักครู่";
      if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
      if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
      return `${days} วันที่แล้ว`;
    },
    formatDateTime(date) {
      if (!date) return "-";
      return new Date(date).toLocaleString("th-TH");
    },
    showUpdateBar(act) {
      if (!act) return;
      this.updateBar.text = `${act.message} โดย ${act.by}`;
      this.updateBar.at = act.at;
      this.updateBar.show = true;

      clearTimeout(this.updateBarTimer);
      this.updateBarTimer = setTimeout(() => {
        this.updateBar.show = false;
      }, 4000);
    },
    badgeClass(action) {
      if (action === "CREATE") return "bg-success";
      if (action === "UPDATE") return "bg-primary";
      return "bg-secondary";
    },
    badgeText(action) {
      if (action === "CREATE") return "สร้างใหม่";
      if (action === "UPDATE") return "อัปเดต";
      return action || "กิจกรรม";
    }, initNewForm() {
      this.lastActivity = null;
      this.files = [];

      this.form = {
        stage: 'DRAFT',
        titleTH: "",
        titleEN: "",
        budgetType: "",
        selectedStrategy: "",
        cooperation: "ไม่มี",
        cooperationDetail: "",
        researchType: "",
        budgetSubTypes: [],
        selectedOutcomes: [],
        researchStandard: [],
        socialTransfer: "",
        mainSignature: "",
        activities: [],
        humanDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        animalDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        plantDetail: { hasCert: false, isPending: false, applyDate: '', file: null },

        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "", signature: "" },
          coResearchers: [],
          advisors: []
        },

        budgetData: {
          categories: [
            { name: "หมวดที่ 1", rows: [] },
            { name: "หมวดที่ 2", rows: [] },
            { name: "หมวดที่ 3", rows: [] }
          ],
          grandTotal: 0
        },

        keywords: "",
        importance: "",
        objective: "",
        literature: "",
        reference: "",
        methodology: "",
        scope: "",
        progressReport: "",
        integration: "",
        remark: ""
      };
    }
  }
};
</script>

<style>
.page-bg {
  background: linear-gradient(to bottom,
      #d6c9f3,
      #f1edb4);
}

.sticky-footer {
  position: sticky;
  bottom: 0;
  z-index: 1000;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);
}

.last-activity-card {
  border-left: 5px solid #321fdb;
}

.activity-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(50, 31, 219, 0.1);
  color: #321fdb;
}
</style>