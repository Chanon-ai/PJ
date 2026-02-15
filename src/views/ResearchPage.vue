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
          <ResearchSection12 v-model="form.activities" />
        </CCardBody>
      </CCard>

      <BudgetOutcomesSection v-model:form="form" :outcomes="outcomes" :editor-option="editorOption" />

      <EthicsSection v-model:form="form" :editor-option="editorOption" @file-upload="handleFileUpload" />
      <SignatureSection v-model:form="form" />


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
import Swal from 'sweetalert2'


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
        { label: "5) คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6) ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7) วัตถุประสงค์", model: "objective" },
        { label: "8) ทบทวนวรรณกรรม", model: "literature" },
        { label: "9) เอกสารอ้างอิง", model: "reference" },
        { label: "10) วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11) ขอบเขตการวิจัย", model: "scope" }
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
        standards: [],
        researchStandard: [],
        socialTransfer: "",
        mainSignature: "",
        activities: [],
        humanDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        animalDetail: { hasCert: false, isPending: false, applyDate: '', file: null },
        plantDetail: { applyDate: '' },

        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "" },
          coResearchers: [],
          advisors: []
        },
        budgetData: null,
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

    'form.budgetType': function () { this.form.selectedOutcomes = []; }
  },
  methods: {
    addCoResearcher() { this.form.researchers.coResearchers.push({ name: "", affiliation: "", phone: "", email: "", code: "", signature: "" }); },
    removeCoResearcher(index) { this.form.researchers.coResearchers.splice(index, 1); },
    addAdvisor() { this.form.researchers.advisors.push({ name: "", affiliation: "", phone: "", email: "", signature: "" }); },
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
    submit() {
      console.log("Final Form Data:", this.form);

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        text: 'บันทึกข้อมูลสำเร็จ',
        confirmButtonText: 'ตกลง',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      });
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
          location.reload();
        }
      });
    }
    ,
    exportPDF() {
      this.$nextTick(() => {
        localStorage.setItem("reportData", JSON.stringify(this.form))
        this.$router.push("/report")
      })
    }




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