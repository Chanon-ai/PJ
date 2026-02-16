<template>
  <div class="page-wrapper">
    <button class="export-btn" @click="generatePDF" style="font-weight: 700 ;">
      📄 Export PDF
    </button>

    <div id="report-area" class="report-container">

      <!-- รหัสเอกสาร -->
      <div class="doc-code">RS-01</div>

      <!-- หัวกระดาษ -->

      <div class="head-title">
        แบบเสนอโครงการวิจัย <br>ประกอบการของบประมาณงานวิจัยของมหาวิทยาลัยแม่ฟ้าหลวงประจำปีงบประมาณ พ.ศ.2569
      </div>


      <!-- ประเภททุน -->
      <div class="checkbox-line">

        <span class="checkbox-item">
          {{ check(form.budgetType === 'new') }} ทุนนักวิจัยใหม่
        </span>

        <span class="checkbox-item">
          {{ check(form.budgetType === 'dev') }} ทุนพัฒนานักวิจัย
        </span>

        <span class="checkbox-item">
          {{ check(form.budgetType === 'strategic') }}
          ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย
        </span>

        <span class="checkbox-item">
          {{ check(form.budgetType === 'industrial') }}
          ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัตกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ
        </span>

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
      <div class="section" v-if="form.activities && form.activities.length">
        <div class="sub-title">12. แผนการดำเนินงาน</div>
        <div class="group-title ms-3">ระยะเวลาที่ทำการวิจัย {{ maxMonths }} เดือน</div>
        <table class="gantt-print-table">
          <thead>
            <tr>
              <!-- ซ้าย -->
              <th class="col-activity" rowspan="2">กิจกรรมวิจัย</th>
              <!-- กลาง -->
              <th :colspan="maxMonths">
                เดือนที่ ({{ totalYearsText }})
              </th>
              <!-- ขวา -->
              <th class="col-owner" rowspan="2">ผู้รับผิดชอบ</th>
            </tr>
            <tr>
              <!-- เดือน 1 - maxMonths -->
              <th v-for="m in maxMonths" :key="m" :style="{ width: monthWidth + 'px' }">
                {{ m }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(act, index) in form.activities" :key="index">
              <td class="col-activity">
                {{ act.name }}
              </td>
              <td v-for="(month, i) in act.months" :key="i" :style="{ width: monthWidth + 'px' }">
                <span v-if="month">●</span>
              </td>
              <td class="col-owner">
                {{ act.owner }}
              </td>
            </tr>
          </tbody>
        </table>
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
        <div class="sub-title">
          17. งบประมาณ
        </div>
        <div v-if="budgetData" class="budget-table-section">
          <table class="budget-print-table">
            <thead>
              <tr>
                <th>หมวด</th>
                <th>รายการ</th>
                <th>รวม (บาท)</th>
                <th>งวด 1</th>
                <th>งวด 2</th>
                <th>งวด 3</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(cat, ci) in budgetData.categories" :key="ci">
                <tr v-for="(row, ri) in cat.rows" :key="ri">
                  <td>{{ cat.title }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ Number(row.total).toLocaleString() }}</td>
                  <td>{{ row.p1 }}</td>
                  <td>{{ row.p2 }}</td>
                  <td>{{ row.p3 }}</td>
                </tr>
              </template>
            </tbody>
          </table>

          <div class="budget-grand-total">
            รวมทั้งสิ้น {{ budgetData.grandTotal.toLocaleString() }} บาท
          </div>
        </div>
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
      <!-- หน้าลงนาม -->
      <div class="signature-page">

        <!-- แถวบน -->
        <div class="signature-row">

          <!-- ที่ปรึกษา -->
          <div class="signature-box" v-if="form.researchers.advisors.length">
            <div class="sign-label">ลงชื่อ</div>


            <img v-if="form.researchers.advisors[0].signature" :src="form.researchers.advisors[0].signature"
              class="sign-img" />

            <div class="dot-line-sign">
              ({{ form.researchers.advisors[0].name }})
            </div>

            <div>ที่ปรึกษาโครงการวิจัย</div>
            <div>วันที่ {{ currentThaiDate }}</div>
          </div>

          <!-- หัวหน้า -->
          <div class="signature-box">
            <div class="sign-label">ลงชื่อ</div>

            <img v-if="form.mainSignature" :src="form.mainSignature" class="sign-img" />

            <div class="dot-line-sign">
              ({{ form.researchers.mainResearcher.name }})
            </div>

            <div>หัวหน้าโครงการวิจัย</div>
            <div>วันที่ {{ currentThaiDate }}</div>
          </div>

        </div>

        <!-- แถวล่าง -->
        <div class="signature-row" v-for="(co, index) in form.researchers.coResearchers" :key="index">
          <div class="signature-box">
            <div class="sign-label">ลงชื่อ</div>

            <img v-if="co.signature" :src="co.signature" class="sign-img" />

            <div class="dot-line-sign">
              ({{ co.name }})
            </div>

            <div>ผู้ร่วมโครงการวิจัย</div>
            <div>วันที่ {{ currentThaiDate }}</div>
          </div>
        </div>
      </div>


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
        standards: [],
        mainSignature: "",
        activities: [],
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
  }
  ,
  mounted() {
    const data = localStorage.getItem("reportData")

    if (data) {
      const parsed = JSON.parse(data)

      let mapped = []

      if (parsed.standards?.includes('none')) {
        mapped.push('18_none')
      }

      if (parsed.standards?.includes('human')) {
        mapped.push('18_human')

        if (parsed.humanDetail?.hasCert) {
          mapped.push('18_human_certified')
        }

        if (parsed.humanDetail?.isPending) {
          mapped.push('18_human_pending')
        }
      }

      if (parsed.standards?.includes('animal')) {
        mapped.push('18_animal')

        if (parsed.animalDetail?.hasCert) {
          mapped.push('18_animal_certified')
        }

        if (parsed.animalDetail?.isPending) {
          mapped.push('18_animal_pending')
        }
      }

      this.form = {
        ...this.form,
        ...parsed,
        mainSignature: parsed.mainSignature || "",
        researchers: {
          ...this.form.researchers,
          ...parsed.researchers
        },
        researchStandard: mapped
      }

    }
    const budget = localStorage.getItem("budgetData");
    if (budget) {
      this.budgetData = JSON.parse(budget);
    }

  },
  methods: {
    check(condition) {
      return condition ? '☑' : '☐'
    },
    async generatePDF() {
      const element = document.getElementById("report-area");
      const button = document.querySelector(".export-btn");

      button.style.display = "none";
      element.classList.add("export-mode");

      // ⭐ รอ DOM render ให้เสร็จก่อน
      await this.$nextTick();

      // ⭐ รอให้รูปโหลดเสร็จ
      const images = element.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = img.onerror = resolve;
          });
        })
      );

      const opt = {
        margin: [5, 10, 5, 25],
        filename: "Research_Proposal_RS1.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        }
      };

      await html2pdf().set(opt).from(element).save();

      button.style.display = "block";
      element.classList.remove("export-mode");
    }




  },
  computed: {
    currentThaiDate() {
      return new Date().toLocaleDateString("th-TH");
    },

    maxMonths() {
      if (!this.form.activities || !this.form.activities.length) return 0
      return this.form.activities[0].months.length
    },
    monthWidth() {
      if (!this.maxMonths) return 20
      const totalAvailable = 400
      return Math.floor(totalAvailable / this.maxMonths)
    },
    totalYearsText() {
      if (!this.maxMonths) return ''
      if (this.maxMonths === 6) return 'ครึ่งปี'
      if (this.maxMonths === 12) return '1 ปี'
      if (this.maxMonths === 24) return '2 ปี'

      return (this.maxMonths / 24).toFixed(1) + ' ปี'
    }


  }


};
</script>


<style scoped>
/* พื้นหลังรอบนอก */
.page-wrapper {
  background: #f0f2f5;
  min-height: 100vh;
  padding: 40px 0;
}

/* แถบปุ่มด้านบน */
.export-bar {
  position: fixed;
  top: 20px;
  right: 40px;
  z-index: 999;
}

.export-btn {
  position: fixed;
  top: 20px;
  right: 40px;
  z-index: 999;
  background: linear-gradient(135deg, #1428e2, #0b0636);
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(22, 119, 255, 0.25);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Hover */
.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(22, 119, 255, 0.35);
}

/* กดแล้ว */
.export-btn:active {
  transform: translateY(0px);
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
}


/* กระดาษ A4 */
.report-container {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  margin: auto;
  background: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-family: "TH Sarabun New", serif;
  font-size: 18px;
  line-height: 1.6;
  box-sizing: border-box;
  position: relative;
}

.export-mode {
  box-shadow: none !important;
  border-radius: 0 !important;
  margin: 0 auto !important;
  padding: 10mm;
}

@page {
  size: A4;
  margin: 0;
}

.checkbox-line {
  margin-top: 20px;
  margin-left: 50px;
}

.checkbox-item {
  display: inline-block;
  margin-right: 25px;
  /* ⭐ ระยะห่างแนวนอน */
  margin-bottom: 8px;
  /* ⭐ ระยะห่างกรณีขึ้นบรรทัดใหม่ */
}

.doc-code {
  position: absolute;
  right: 40mm;
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
  margin-top: 15px;
  padding-left: 15px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.option,
.sub-option {
  page-break-inside: avoid;
  break-inside: avoid;
}

.section-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000000;
  margin-left: -20px;
}

.head-title {
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 50px;
  color: #000000;
  margin-left: -40px;
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

.signature-page {
  margin-top: 10px;
  page-break-inside: avoid;
}

.signature-row {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.signature-box {
  width: 45%;
  /* จาก 30% เป็น 45% */
  position: relative;
  height: 150px;
  text-align: center;
}


.sign-label {
  margin-bottom: 20px;
  font-weight: bold;
}

.sign-img {
  max-height: 65px;
  object-fit: contain;
  margin: 0 auto;
}


.dot-line-sign {
  border-bottom: 1px dotted #000;
  padding-bottom: 2px;
  margin-bottom: 2px;
  line-height: 1.2;
}

.gantt-print-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}



.gantt-print-table th,
.gantt-print-table td {
  border: 1px solid #000;
  padding: 3px;
  text-align: center;
}

.col-activity {
  width: 100px;
  line-height: 0.8;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
}

.col-owner {
  width: 100px;
  line-height: 0.8;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
}

.budget-print-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 16px;
}

.budget-print-table th,
.budget-print-table td {
  border: 1px solid #000;
  padding: 5px;
  text-align: center;
}

.budget-grand-total {
  text-align: right;
  font-weight: bold;
  margin-top: 10px;
}
</style>
