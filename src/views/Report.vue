<template>
  <div id="report-area" class="report-container">

    <!-- รหัสเอกสาร -->
    <div class="doc-code">RS-01</div>

    <!-- หัวกระดาษ -->
    <div class="text-center">
      <div class="sub-title">
        แบบเสนอโครงการวิจัย <br>
        ประกอบการของบประมาณงานวิจัยของมหาวิทยาลัยแม่ฟ้าหลวงประจำปีงบประมาณ พ.ศ.2569
      </div>
    </div>

    <!-- ประเภททุน -->
    <div class="checkbox-line">
      <span :class="check(form.budgetType === 'ทุนวิจัยทั่วไป')">☐</span> ทุนนักวิจัยใหม่
      &nbsp;&nbsp;&nbsp;
      <span :class="check(form.budgetType === 'ทุนพัฒนานักวิจัย')">☐</span> ทุนพัฒนานักวิจัย
      &nbsp;&nbsp;&nbsp;
      <span :class="check(form.budgetType === 'ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย')">☐</span>
      ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย
      &nbsp;&nbsp;&nbsp;
      <br>
      <span
        :class="check(form.budgetType === 'ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัฒกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ')">☐</span>
      ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัฒกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ
    </div>

    <!-- 1 -->
    <div class="section">
      <div class="section-title">1. ชื่อโครงการ</div>
      <div><strong>(ภาษาไทย)</strong> {{ form.titleTH }}</div>
      <div class="line"></div>
      <div><strong>(ภาษาอังกฤษ)</strong> {{ form.titleEN }}</div>
      <div class="line"></div>
    </div>

    <!-- 2 -->
    <div class="section">
      <div class="section-title">
        2. ระบบความสอดคล้องของโครงการวิจัยกับประเด็นยุทธศาสตร์การวิจัยมหาวิทยาลัยแม่ฟ้าหลวง
      </div>
      <!-- 1.1 -->
      <div class="option">
        <div class="group-title">1.ทุนนักวิจัยใหม่</div>
        <label>
          <input type="checkbox" value="strategy_1" :checked="form.researchType === 'strategy_1'"
            @change="selectOnlyOne('strategy_1')" />
          1.โครงการวิจัยที่เสนอมีความสอดคล้องกับคณะวิชา หรือสาขาวิชา หรือภาระงาน
        </label>
      </div>

      <!-- 2.1 -->
      <div class="option">
        <div class="group-title">2.ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย</div>
        <label>
          <input type="checkbox" value="strategy_1" :checked="form.researchType === 'strategy_1'"
            @change="selectOnlyOne('strategy_1')" />
          2.1 การพัฒนาเศรษฐกิจไทยด้วยเศรษฐกิจสร้างคุณค่าและเศรษฐกิจสร้างสรรค์
          ให้มีความสามารถในการแข่งขันและพึ่งพาตนเองได้อย่างยั่งยืน
          พร้อมมูลค่าเพิ่ม โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม
        </label>
      </div>

      <!-- 2.2 -->
      <div class="option">
        <label>
          <input type="checkbox" value="strategy_2" :checked="form.researchType === 'strategy_2'"
            @change="selectOnlyOne('strategy_2')" />
          2.2 การยกระดับสังคมและสิ่งแวดล้อม ให้มีการพัฒนาอย่างยั่งยืน
          สามารถแก้ไขปัญหาท้าทายและปรับตัวได้ทันต่อพลวัตการเปลี่ยนแปลงของโลก
          โดยใช้วิทยาศาสตร์ การวิจัย และนวัตกรรม
        </label>
      </div>

      <!-- 2.3 -->
      <div class="option">
        <label>
          <input type="checkbox" value="strategy_3" :checked="form.researchType === 'strategy_3'"
            @change="selectOnlyOne('strategy_3')" />
          2.3 การพัฒนาวิทยาศาสตร์ เทคโนโลยี การวิจัยและนวัตกรรม
          ระดับขั้นแนวหน้าที่ก้าวหน้าล้ำยุค
          เพื่อสร้างโอกาสใหม่และความพร้อมของประเทศในอนาคต
        </label>
      </div>

      <!-- 2.4 -->
      <div class="option">
        <label>
          <input type="checkbox" value="strategy_4" :checked="form.researchType === 'strategy_4'"
            @change="selectOnlyOne('strategy_4')" />
          2.4 การพัฒนากำลังคนและสถาบัน ด้านวิทยาศาสตร์ วิจัยและนวัตกรรม
          ให้เป็นฐานการขับเคลื่อนการพัฒนาเศรษฐกิจและสังคมของประเทศ
          แบบก้าวกระโดดและอย่างยั่งยืน
        </label>
      </div>

      <!-- 3.1 -->
      <div class="option">
        <div class="group-title">3.ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัฒกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ</div>
        <label>
          <input type="checkbox" value="strategy_1" :checked="form.researchType === 'strategy_1'"
            @change="selectOnlyOne('strategy_1')" />
          3.1 การวิจัยและสร้างนวัตกรรมเพื่อเพิ่มขีดความสามารถการแข่งขันภาคอุตสาหกรรม
        </label>
      </div>
    </div>


    <!-- 3 -->
    <div class="section">
      <div class="section-title">3. ความร่วมมือ</div>
      <div>
        {{ form.cooperation }}
        <span v-if="form.cooperation === 'มี'">
          ({{ form.cooperationDetail }})
        </span>
      </div>
    </div>

    <!-- 4-11 -->
    <div class="section" v-for="(field, index) in contentSections" :key="index">
      <div class="section-title">{{ field.title }}</div>
      <div class="line-block" v-html="form[field.model]"></div>
    </div>

    <!-- 12 -->
    <div class="section">
      <div class="section-title">12. แผนการดำเนินงาน</div>
      <div class="line-block">ตามเอกสารแนบ</div>
    </div>

    <!-- 13 -->
    <div class="section">
      <div class="section-title">13. ผลงานตามระยะเวลาการรายงาน</div>
      <div class="line-block" v-html="form.progressReport"></div>
    </div>

    <!-- 14 -->
    <div class="section">
      <div class="section-title">14. ผลลัพธ์ที่คาดว่าจะได้รับ</div>
      <div>
        <span v-for="(item, i) in form.expectedResults" :key="i">
          ✔ {{ item }} &nbsp;&nbsp;
        </span>
      </div>
    </div>

    <!-- 15 -->
    <div class="section">
      <div class="section-title">15. การบูรณาการงานวิจัย</div>
      <div class="line-block" v-html="form.integration"></div>
    </div>

    <!-- 16 -->
    <div class="section">
      <div class="section-title">16. ระดับการถ่ายทอดสู่สังคม</div>
      <div>{{ form.transferLevel }}</div>
    </div>

    <!-- 17 -->
    <div class="section">
      <div class="section-title">17. งบประมาณ</div>
      <div class="line-block">รายละเอียดงบประมาณตามเอกสารแนบ</div>
    </div>

    <!-- 18 -->
    <div class="section">
      <div class="section-title">18. มาตรฐานการวิจัย</div>
      <div>
        <span :class="check(form.ethics?.human)">☐</span> การวิจัยในมนุษย์
        &nbsp;&nbsp;
        <span :class="check(form.ethics?.animal)">☐</span> การวิจัยสัตว์ทดลอง

      </div>
    </div>

    <!-- 19 -->
    <div class="section">
      <div class="section-title">19. หมายเหตุ</div>
      <div class="line-block" v-html="form.remark"></div>
    </div>

  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "ResearchReport",

  data() {
    return {
      form: {
        titleTH: "",
        titleEN: "",
        budgetType: "",
        budgets: [],
        cooperation: "",
        cooperationDetail: "",
        researchType: "",
        selectedOutcomes: [],
        standards: [],
        humanDetail: {
          hasCert: false,
          isPending: false,
          applyDate: "",
          file: null
        },
        animalDetail: {
          hasCert: false,
          isPending: false,
          applyDate: "",
          file: null
        },
        researchers: {
          mainResearcher: {
            name: "",
            affiliation: "",
            phone: "",
            email: "",
            code: ""
          },
          coResearchers: [],
          advisors: []
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
        transferLevel: "",
        remark: ""
      },

      // ✅ เพิ่มอันนี้กลับเข้าไป
      contentSections: [
        { title: "4. คำสำคัญ (Keywords)", model: "keywords" },
        { title: "5. ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { title: "6. วัตถุประสงค์", model: "objective" },
        { title: "7. ทบทวนวรรณกรรม", model: "literature" },
        { title: "8. เอกสารอ้างอิง", model: "reference" },
        { title: "9. วิธีดำเนินการวิจัย", model: "methodology" },
        { title: "10. ขอบเขตการวิจัย", model: "scope" }
      ]
    };
  },
mounted() {
  const data = localStorage.getItem("reportData");
  if (data) {
    this.form = JSON.parse(data);
    console.log(this.form.importance);
  }
}
,

  methods: {
    check(condition) {
      return condition ? "checked" : "";
    },

    generatePDF() {
      const element = document.getElementById("report-area");

      html2pdf()
        .set({
          margin: 0,
          filename: "Research_Proposal_RS1.pdf",
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
          }
        })
        .from(element)
        .save();
    }
  }
};
</script>


<style scoped>
.report-container {
  width: 210mm;
  min-height: 297mm;
  padding: 30mm;
  margin: auto;
  background: white;
  font-family: "TH Sarabun New", serif;
  font-size: 20px;
  line-height: 1.8;
  position: relative;
}

.doc-code {
  position: absolute;
  right: 30mm;
  top: 20mm;
}

.text-center {
  text-align: center;
}

.sub-title {
  font-size: 22px;
  font-weight: bold;
  color: #000000;
}


.section {
  margin-top: 20px;
}



.line {
  border-bottom: 1px dotted #000;
  margin: 5px 0 10px 0;
}

.line-block {
  margin-top: 5px;
}

.checkbox-line {
  margin-top: 20px;
}

.checked {
  font-weight: bold;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000000;
}

.group-title {
  font-weight: bold;
  font-size: 20px;
  color: #000000;
}

.option {
  margin-bottom: 15px;
}
</style>
