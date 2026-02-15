<template>
  <div id="report-area" class="report-container">

    <!-- รหัสเอกสาร -->
    <div class="doc-code">RS-01</div>

    <!-- หัวกระดาษ -->
    <div class="text-center">
      <div class="head-title">
        แบบเสนอโครงการวิจัย <br>
        ประกอบการของบประมาณงานวิจัยของมหาวิทยาลัยแม่ฟ้าหลวงประจำปีงบประมาณ พ.ศ.2569
      </div>
    </div>

    <!-- ประเภททุน -->
    <div class="checkbox-line">
      <span>{{ check(form.budgetType === 'new') }}</span> ทุนนักวิจัยใหม่
      <span>{{ check(form.budgetType === 'dev') }}</span> ทุนพัฒนานักวิจัย
      <span>{{ check(form.budgetType === 'strategic') }}</span>
      ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย
      <span>{{ check(form.budgetType === 'industrial') }}</span>
      ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัตกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ

    </div>

    <!-- 1 -->
    <div class="section">
      <div class="section-title">1. ชื่อโครงการ</div>
      <div class="group-title">
        <div><strong>(ภาษาไทย)</strong>
          <div class="line">{{ form.titleTH }}</div>
        </div>
        <div><strong>(ภาษาอังกฤษ)</strong>
          <div class="line">{{ form.titleEN }}</div>
        </div>
      </div>
    </div>

    <!-- 2 -->
    <div class="section">
      <div class="section-title">
        2. ระบุความสอดคล้องของโครงการวิจัยกับประเด็นยุทธศาสตร์การวิจัยมหาวิทยาลัยแม่ฟ้าหลวง
      </div>
      <!-- 2.1 -->
      <div class="group-title">
        1. ประเภททุนนักวิจัยใหม่
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_1') }}</span>
        1. โครงการวิจัยที่เสนอสอดคล้องกับคุณวุฒิ หรือสาขาวิชา หรือภาระงาน
      </div>

      <!-- 2.2 -->
      <div class="group-title">
        2. ประเภททุนพัฒนานักวิจัย และทุนที่สอดคล้องกับยุทธศาสตร์การวิจัยและนวัตกรรมภายใต้กรอบวิจัยยุทธศาสตร์ชาติ
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_2_1') }}</span>
        1. การพัฒนาเศรษฐกิจไทยด้วยเศรษฐกิจสร้างคุณค่าและเศรษฐกิจสร้างสรรค์
        ให้มีความสามารถในการแข่งขันและพึ่งพาตนเองได้อย่างยั่งยืน พร้อมสู่อนาคต
        โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_2_2') }}</span>
        2. การยกระดับสังคมและสิ่งแวดล้อม ให้มีการพัฒนาอย่างยั่งยืน
        สามารถแก้ไขปัญหาท้าทายและปรับตัวได้ทันต่อพลวัตการเปลี่ยนแปลงของโลก
        โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_2_3') }}</span>
        3. การพัฒนาวิทยาศาสตร์ เทคโนโลยี การวิจัยและนวัตกรรม
        ระดับขั้นแนวหน้าที่ก้าวหน้าล้ำยุค เพื่อสร้างโอกาสใหม่และความพร้อม
        ของประเทศในอนาคต
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_2_4') }}</span>
        4. การพัฒนากำลังคนและสถาบัน ด้านวิทยาศาสตร์ วิจัยและนวัตกรรม
        ให้เป็นฐานการขับเคลื่อนการพัฒนาเศรษฐกิจและสังคมของประเทศแบบก้าวกระโดด
        และอย่างยั่งยืน โดยใช้วิทยาศาสตร์ การวิจัยและนวัตกรรม
      </div>

      <!-- 2.3 -->
      <div class="group-title">
        3. ประเภททุนต่อยอดสู่อุตสาหกรรม
      </div>

      <div class="option">
        <span>{{ check(form.selectedStrategy === '2_3_1') }}</span>
        1. การวิจัยและสร้างนวัตกรรมเพื่อเพิ่มขีดความสามารถการแข่งขัน
      </div>
    </div>


    <!-- ส่วน ก -->
    <div class="section">
      <div class="section-title">
        ส่วน ก : สาระสำคัญของข้อเสนอโครงการวิจัย
      </div>

      <div class="sub-title">1. คณะผู้วิจัย</div>

      <!-- 1.1 หัวหน้าโครงการ -->
      <div class="field-line">1.1 หัวหน้าโครงการวิจัย</div>
      <div class="field-line">
        ชื่อ-สกุล
        <span class="dot-line">
          {{ form.researchers.mainResearcher.name }}
        </span>
      </div>

      <div class="field-line">
        สังกัดหน่วยงาน
        <span class="dot-line">
          {{ form.researchers.mainResearcher.affiliation }}
        </span>
      </div>

      <div class="field-line">
        เบอร์โทรศัพท์ที่ติดต่อได้
        <span class="dot-line">
          {{ form.researchers.mainResearcher.phone }}
        </span>
      </div>

      <div class="field-line">
        E-mail address
        <span class="dot-line">
          {{ form.researchers.mainResearcher.email }}
        </span>
      </div>

      <div class="field-line">
        คิดเป็นสัดส่วนการวิจัยร้อยละ
        <span class="dot-line">
          {{ form.researchers.mainResearcher.code }}
        </span>
      </div>

      <!-- 1.2 ผู้ร่วมวิจัย -->
      <div v-for="(co, index) in form.researchers.coResearchers" :key="index">
        <div class="field-line">
          1.{{ index + 2 }} ผู้ร่วมโครงการวิจัย
        </div>

        <div class="field-line">
          ชื่อ-สกุล
          <span class="dot-line">{{ co.name }}</span>
        </div>

        <div class="field-line">
          สังกัดหน่วยงาน
          <span class="dot-line">{{ co.affiliation }}</span>
        </div>

        <div class="field-line">
          เบอร์โทรศัพท์ที่ติดต่อได้
          <span class="dot-line">{{ co.phone }}</span>
        </div>

        <div class="field-line">
          E-mail address
          <span class="dot-line">{{ co.email }}</span>
        </div>

        <div class="field-line">
          คิดเป็นสัดส่วนการวิจัยร้อยละ
          <span class="dot-line">{{ co.code }}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="sub-title">2. ที่ปรึกษาโครงการวิจัย</div>

      <div v-for="(advisor, index) in form.researchers.advisors" :key="index">

        <div class="field-line">
          ชื่อ-สกุล
          <span class="dot-line">{{ advisor.name }}</span>
        </div>

        <div class="field-line">
          สังกัดหน่วยงาน
          <span class="dot-line">{{ advisor.affiliation }}</span>
        </div>

        <div class="field-line">
          เบอร์โทรศัพท์ที่ติดต่อได้
          <span class="dot-line">{{ advisor.phone }}</span>
        </div>

        <div class="field-line">
          E-mail address
          <span class="dot-line">{{ advisor.email }}</span>
        </div>

      </div>
    </div>


    <!-- 3 -->
    <div class="section">
      <div class="sub-title">3. ความร่วมมือ</div>
      <div class="field-line">
        {{ form.cooperation }}
        <span v-if="form.cooperation === 'มี'">
          ({{ form.cooperationDetail }})
        </span>
      </div>
    </div>

    <div class="section">
      <div class="sub-title">4. ประเภทของงานวิจัย</div>
      <div class="field-line">
        {{ form.researchType }}
      </div>
    </div>


    <!-- 4-11 -->
    <div class="section" v-for="(field, index) in contentSections" :key="index">
      <div class="sub-title ">{{ field.title }}</div>
      <div class="field-line" v-html="form[field.model]"></div>
    </div>

    <!-- 12 -->
    <div class="section">
      <div class="sub-title">12. แผนการดำเนินงาน</div>
      <div class="field-line">ตามเอกสารแนบ</div>
    </div>

    <!-- 13 -->
    <div class="section">
      <div class="sub-title">13. ผลงานตามระยะเวลาการรายงานความก้าวหน้าของงานวิจัย</div>
      <div class="field-line" v-html="form.progressReport"></div>
    </div>

    <!-- 14 -->
    <div class="section">
      <div class="sub-title">14. ผลลัพธ์ที่คาดว่าจะได้รับ</div>

      <!-- 14.1 -->
      <div class="group-title">14.1 ทุนนักวิจัยรุ่นใหม่</div>
      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_1_fullpaper')) }}</span>
        นำเสนอในการประชุมวิชาการระดับนานาชาติ โดยต้องเป็นบทความฉบับสมบูรณ์ (Full paper)
        ที่ได้รับการตีพิมพ์ในรายงานสืบเนื่องจากการประชุม (Proceedings) หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_1_tci')) }}</span>
        ตีพิมพ์ในวารสารทางวิชาการที่มีรายชื่ออยู่ในฐานข้อมูล ตามประกาศ ก.พ.อ.
        เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการ สำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562 หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_1_international')) }}</span>
        ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล
        TCI กลุ่มที่ 1 หรือ กลุ่มที่ 2 หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_1_patent')) }}</span>
        อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอ)
      </div>


      <!-- 14.2 -->
      <div class="group-title">14.2 ทุนพัฒนานักวิจัย</div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_2_international')) }}</span>
        ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูล
        ตามประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการ
        สำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562 หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_2_tci1')) }}</span>
        ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล
        TCI กลุ่มที่ 1 เท่านั้น หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_2_patent')) }}</span>
        อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอ)
      </div>


      <!-- 14.3 -->
      <div class="group-title">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_3_international')) }}</span>
        ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูล
        ตามประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการ
        สำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562 หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_3_tci1')) }}</span>
        ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล
        TCI กลุ่มที่ 1 เท่านั้น หรือ
      </div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_3_patent')) }}</span>
        อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอ)
      </div>


      <!-- 14.4 -->
      <div class="group-title">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</div>

      <div class="option">
        <span>{{ check(form.selectedOutcomes.includes('14_4_ip')) }}</span>
        การยื่นจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอ)
      </div>
    </div>



    <!-- 15 -->
    <div class="section">
      <div class="sub-title">15. การบูรณาการงานวิจัย</div>
      <div class="field-line" v-html="form.integration"></div>
    </div>

    <!-- 16 -->
    <div class="section">
      <div class="sub-title">
        16. ระดับการถ่ายทอดสู่สังคม
      </div>

      <div class="option">
        <span>{{ check(form.socialTransfer === '16_1') }}</span>
        สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือ นานาชาติ
      </div>

      <div class="option">
        <span>{{ check(form.socialTransfer === '16_2') }}</span>
        สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด
      </div>

      <div class="option">
        <span>{{ check(form.socialTransfer === '16_3') }}</span>
        ไม่มีการนำไปถ่ายทอดสู่สังคม
      </div>

    </div>


    <!-- 17 -->
    <div class="section">
      <div class="sub-title">17. งบประมาณ</div>
      <div class="field-line">รายละเอียดงบประมาณตามเอกสารแนบ</div>
    </div>

    <!-- 18 -->
    <div class="section">
      <div class="sub-title">
        18. มาตรฐานการวิจัย
      </div>

      <!-- ไม่มีการวิจัยในมนุษย์ -->
      <div class="option">
        <span>{{ check(form.researchStandard && form.researchStandard.includes('18_none')) }}</span>
        ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง / การวิจัยที่เกี่ยวข้องกับงานด้านเทคโนโลยีชีวภาพสมัยใหม่
      </div>

      <!-- มีการทำวิจัยในมนุษย์ -->
      <div class="option">
        <span>{{ check(form.researchStandard.includes('18_human')) }}</span>
        มีการทำวิจัยในมนุษย์
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_human_certified')) }}</span>
        มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์ (แนบสำเนา 1 ชุด)
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_human_pending')) }}</span>
        ไม่มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์ อยู่ระหว่างเสนอคณะกรรมการจริยธรรมการวิจัยในมนุษย์พิจารณา
        วันที่ยื่นโครงการ {{ form.humanDetail.applyDate }}
      </div>

      <!-- มีการใช้สัตว์ทดลอง -->
      <div class="option">
        <span>{{ check(form.researchStandard.includes('18_animal')) }}</span>
        มีการใช้สัตว์ทดลอง
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_animal_certified')) }}</span>
        มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์ (แนบสำเนา 1 ชุด)
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_animal_pending')) }}</span>
        ไม่มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์
        อยู่ระหว่างเสนอคณะกรรมการจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์
        วันที่ยื่นโครงการ {{ form.animalDetail.applyDate }}
      </div>

      <!-- พันธุ์พืช -->
      <div class="option">
        <span>{{ check(form.researchStandard.includes('18_plant')) }}</span>
        มีการเก็บ จัดหา หรือรวบรวมพันธุ์พืชพื้นเมืองทั่วไปและพันธุ์พืชป่าหรือส่วนหนึ่งส่วนใดของพันธุ์พืช เห็ด รา
        เพื่อการศึกษา ทดลอง หรือวิจัย ตามมาตรา 53 แห่งพระราชบัญญัติคุ้มครองพันธุ์พืช พ.ศ. 2542
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_plant_certified')) }}</span>
        มีหนังสือแจ้งการเก็บ จัดหา หรือรวบรวมพันธุ์พืชฯ ตามมาตรา 53 แห่งพระราชบัญญัติคุ้มครองพันธุ์พืช พ.ศ. 2542
        (แนบสำเนา 1 ชุด)
      </div>

      <div class="sub-option">
        <span>{{ check(form.researchStandard.includes('18_plant_pending')) }}</span>
        ไม่มีหนังสือแจ้งการเก็บ จัดหา หรือรวบรวมพันธุ์พืชฯ อยู่ระหว่างดำเนินการ
        วันที่ยื่นโครงการ {{ form.plantDetail.applyDate }}
      </div>


    </div>


    <!-- 19 -->
    <div class="section">
      <div class="sub-title">19. หมายเหตุ</div>
      <div class="field-line" v-html="form.remark"></div>
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

        selectedOutcomes: [],
        titleTH: "",
        titleEN: "",
        budgetType: "",
        budgetSubTypes: [],
        cooperation: "",
        cooperationDetail: "",
        researchType: "",
        researchStandard: [],
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
        plantDetail: {
          hasCert: false,
          isPending: false,
          applyDate: "",
          file: null
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
        socialTransfer: "",
        remark: "",
        selectedStrategy: ""
      },

      contentSections: [
        { title: "5. คำสำคัญ (Keywords)", model: "keywords" },
        { title: "6. ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { title: "7. วัตถุประสงค์", model: "objective" },
        { title: "8. ทบทวนวรรณกรรม", model: "literature" },
        { title: "9. เอกสารอ้างอิง", model: "reference" },
        { title: "10. วิธีดำเนินการวิจัย", model: "methodology" },
        { title: "11. ขอบเขตการวิจัย", model: "scope" }
      ]
    };
  },
  mounted() {
    const data = localStorage.getItem("reportData")

    if (data) {
      const parsed = JSON.parse(data)

      this.form = {
        ...this.form,
        ...parsed,
        researchStandard: parsed.researchStandard || [],
        selectedOutcomes: parsed.selectedOutcomes || []
      }

      console.log("Loaded Report:", this.form)
    }
  },
  methods: {
    check(condition) {
      return condition ? '☑' : '☐'
    },
    generatePDF() {
      const element = document.getElementById("report-area");

      const opt = {
        margin: [10, 10, 10, 10],
        filename: "Research_Proposal_RS1.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 4, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().set(opt).from(element).save();
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


.line {
  border-bottom: 1px dotted #000;
  margin: 5px 0 10px 0;
}

.checkbox-line {
  margin-top: 20px;
  margin-left: 50px;
}

.checked {
  font-weight: bold;
}

.group-title {
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  margin-left: 15px;
}

.option {
  margin-bottom: 10px;
  margin-left: 25px;
}

.sub-option {
  margin-left: 50px;
  margin-bottom: 8px;
  text-align: justify;
}

.sub-section-title {
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}

.sub-topic {
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
}

.dot-line {
  display: inline-block;
  border-bottom: 1px dotted #000;
  min-width: 60%;
  padding-left: 5px;
}

.section {
  margin-top: 20px;
  padding-left: 20px;
  page-break-inside: avoid;
}

.section-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000000;
  margin-left: -20px;
}

.head-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
  color: #000000;
  margin-left: -20px;
}

.sub-title {
  font-size: 21px;
  font-weight: bold;
  color: #000000;
}

.line-block {
  margin-top: 5px;
  text-align: justify;
  text-indent: 30px;
}

.field-line {
  margin-bottom: 8px;
  padding-left: 15px;
}

@media print {
  .report-container {
    padding: 20mm;
  }
}

.option,
.sub-option {
  page-break-inside: avoid;
}
</style>
