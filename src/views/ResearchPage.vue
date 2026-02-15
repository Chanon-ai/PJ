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
      <GeneralInfoSection v-model:form="form" :budget-types="budgetTypes"
        :research-type-options="researchTypeOptions" />

      <ResearchersSection v-model:form="form" @add-co="addCoResearcher" @remove-co="removeCoResearcher"
        @add-adv="addAdvisor" @remove-adv="removeAdvisor" />

      <ResearchDetailsSection v-model:form="form" :text-fields="textFields" :editor-option="editorOption" />

      <CCard class="shadow-sm w-100 mb-4 border-0">
        <CCardHeader class="bg-primary text-white py-3">
          <h5 class="m-0 font-weight-bold">
            <CIcon name="cil-calendar" class="me-2" /> 12) แผนการดำเนินงาน
          </h5>
        </CCardHeader>
        <CCardBody class="p-4 bg-white">
          <ResearchSection12 />
        </CCardBody>
      </CCard>

      <BudgetOutcomesSection v-model:form="form" :outcomes="outcomes" :editor-option="editorOption" />

      <EthicsSection v-model:form="form" :editor-option="editorOption" @file-upload="handleFileUpload" />
      <SignatureSection :form="form" />

      <FileManagement :files="files" @upload="handleFileUpload2" @remove="removeFile" @open="openFile"
        @replace="triggerReplace" />

      <footer class="bg-white p-4 border-top d-flex justify-content-end shadow-lg sticky-footer">
        <CButton color="danger" variant="outline" class="px-5 font-weight-bold me-3" @click="resetForm">
          <CIcon name="cil-brush" class="me-2" /> ล้างข้อมูล
        </CButton>
        <CButton color="primary" class="px-5 font-weight-bold shadow me-3" @click="submit">
          <CIcon name="cil-save" class="me-2" /> บันทึกแบบเสนอโครงการ
        </CButton>
        <CButton color="info" class="px-4 font-weight-bold text-white" @click="exportPDF">
          <CIcon name="cil-print" class="me-2" /> Export PDF
        </CButton>
      </footer>

    </div>

    <input type="file" ref="replaceInput" style="display:none" @change="replaceFile" />
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

// Import Libs
import html2pdf from "html2pdf.js";

export default {
  name: "ResearchForm",
  components: {
    GeneralInfoSection,
    ResearchersSection,
    ResearchDetailsSection,
    BudgetOutcomesSection,
    EthicsSection,
    FileManagement,
    ResearchSection12,
    SignatureSection
    // หมายเหตุ: quillEditor ถูกย้ายไปลงทะเบียนในคอมโพเนนต์ลูกที่ใช้งานจริงแล้ว 
    // จึงไม่ต้องลงทะเบียนซ้ำที่นี่เพื่อเลี่ยง Error unused component
  },
  data() {
    return {
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
            "โครงการวิจัยที่เสนอมีความสอดคล้องกับคุณวุฒิ หรือสาขาวิชา หรือภาระงาน"
          ]
        },
        {
          label: "ทุนพัฒนานักวิจัย",
          value: "dev",
          children: [
            "การพัฒนาเศรษฐกิจไทยด้วยเศรษฐกิจสร้างคุณค่าและเศรษฐกิจสร้างสรรค์ ให้มีความสามารถในการแข่งขันและพึ่งพาตนเองได้อย่างยั่งยืน พร้อมสู่อนาคต โดยใช้วิทยาศาสตร์ การวิจัย และนวัตกรรม",
            "การยกระดับสังคมและสิ่งแวดล้อม ให้มีการพัฒนาอย่างยั่งยืน สามารถแก้ไข ปัญหาท้าทายและปรับตัวให้ทันต่อ พลวัตการเปลี่ยนแปลงของโลก โดยใช้วิทยาศาสตร์ การวิจัย และนวัตกรรม",
            "การพัฒนาวิทยาศาสตร์ เทคโนโลยี การวิจัยและนวัตกรรม ระดับขั้นแนวหน้าที่ก้าวหน้าล้ำยุค เพื่อสร้างโอกาสใหม่และความพร้อม ของประเทศในอนาคต",
            "การพัฒนากำลังคนและสถาบัน ด้านวิทยาศาสตร์ วิจัยและนวัตกรรม ให้เป็นฐานการขับเคลื่อนการพัฒนาเศรษฐกิจและสังคมของประเทศแบบก้าวกระโดดและอย่างยั่งยืน โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม"
          ]
        },

        {
          label: "ทุนต่อยอดสู่ภาคอุตสาหกรรม",
          value: "industrial",
          children: [
            "การวิจัยและสร้างนวัตกรรมเพื่อเพิ่มขีดความสามารถการแข่งขัน"
          ]
        }, {
          label: "ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์",
          value: "strategic",

        },
      ],
      researchTypeOptions: [
        { value: 'Science', label: 'ด้านวิทยาศาสตร์และเทคโนโลยี' },
        { value: 'Health', label: 'ด้านวิทยาศาสตร์สุขภาพ' },
        { value: 'Social', label: 'ด้านสังคมศาสตร์และมนุญศาสตร์' }
      ],
      textFields: [
        { label: "5) คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6) ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7) วัตถุประสงค์", model: "objective" },
        { label: "8) ทบทวนวรรณกรรม", model: "literature" },
        { label: "9) เอกสารอ้างอิง", model: "reference" },
        { label: "10) วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11) ขอบเขตการวิจัย", model: "scope" }
      ],
      outcomes: {
        newResearcher: ["นำเสนอในการประชุมวิชาการระดับนานาชาติ (Proceedings)", "ตีพิมพ์ในวารสารฐานข้อมูล ก.พ.อ.", "ตีพิมพ์วารสาร TCI กลุ่ม 1 หรือ 2", "อนุสิทธิบัตร/สิทธิบัตร"],
        devResearcher: ["ตีพิมพ์วารสารนานาชาติฐานข้อมูล ก.พ.อ.", "ตีพิมพ์วารสาร TCI กลุ่ม 1 เท่านั้น", "อนุสิทธิบัตร/สิทธิบัตร"],
        strategic: ["ตีพิมพ์วารสารนานาชาติฐานข้อมูล ก.พ.อ.", "ตีพิมพ์วารสาร TCI กลุ่ม 1 เท่านั้น", "อนุสิทธิบัตร/สิทธิบัตร"],
        industrial: ["การยื่นขอจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอฯ)"]
      },
      files: [],
      replaceIndex: null,
      form: {
        titleTH: "", titleEN: "", budgetType: "", budgets: [],
        cooperation: "ไม่มี", cooperationDetail: "", researchType: "",
        selectedOutcomes: [], standards: [],
        humanDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        animalDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "" },
          coResearchers: [], advisors: []
        },
        remark: "", progressReport: "", integration: "", transferLevel: "ไม่มีการนำไปถ่ายทอดสู่สังคม"
      }
    };
  },
  watch: {
    'form.budgetType': function () { this.form.selectedOutcomes = []; }
  },
  methods: {
    addCoResearcher() { this.form.researchers.coResearchers.push({ name: "", affiliation: "", phone: "", email: "", code: "" }); },
    removeCoResearcher(index) { this.form.researchers.coResearchers.splice(index, 1); },
    addAdvisor() { this.form.researchers.advisors.push({ name: "", affiliation: "", phone: "", email: "" }); },
    removeAdvisor(index) { this.form.researchers.advisors.splice(index, 1); },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      type === 'human' ? this.form.humanDetail.file = file : this.form.animalDetail.file = file;
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
        this.$set(this.files, this.replaceIndex, { ...this.files[this.replaceIndex], name: file.name, raw: file });
      }
      this.replaceIndex = null;
    },
    submit() { console.log("Final Form Data:", this.form); alert("บันทึกข้อมูลสำเร็จ"); },
    resetForm() { if (confirm("ล้างข้อมูลทั้งหมด?")) location.reload(); },
    exportPDF() { html2pdf().from(document.body).save("Research_Proposal_RS1.pdf"); }
  }
};
</script>

<style>
.page-bg {
  background: linear-gradient(to bottom,
      #D6F4ED,
      #473472);
}

.sticky-footer {
  position: sticky;
  bottom: 0;
  z-index: 1000;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);
}
</style>