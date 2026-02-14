<template>
  <div class="signature-section mt-5">
    <h5 class="font-weight-bold text-dark mb-4">19) การลงนามยืนยันข้อมูลและคำรับรอง *</h5>
    <div class="bg-light p-4 rounded border mb-5 shadow-sm w-100 border-left-primary">
      
      <CRow>
        <CCol md="4" class="text-center mb-4">
          <div class="p-3 bg-white rounded border shadow-sm h-100">
            <h6 class="font-weight-bold text-primary mb-3">หัวหน้าโครงการวิจัย</h6>
            
            <SignaturePad 
              :value="form.mainSignature" 
              @input="updateSignature('mainSignature', $event)" 
            />
            
            <div class="mt-3 font-weight-bold">
              ({{ form.researchers.mainResearcher.name || '................................' }})
            </div>
            <div class="text-muted small mt-1">วันที่: {{ currentDate }}</div>
          </div>
        </CCol>

        <CCol md="4" class="text-center mb-4" v-for="(co, idx) in form.researchers.coResearchers" :key="'sig-co-'+idx">
          <div class="p-3 bg-white rounded border shadow-sm h-100">
            <h6 class="font-weight-bold text-success mb-3">ผู้ร่วมโครงการคนที่ {{ idx + 1 }}</h6>
            
            <SignaturePad 
              :value="co.signature" 
              @input="updateCoSignature(idx, $event)" 
            />
            
            <div class="mt-3 font-weight-bold">({{ co.name || '................................' }})</div>
          </div>
        </CCol>

        <CCol md="4" class="text-center mb-4" v-for="(adv, idx) in form.researchers.advisors" :key="'sig-adv-'+idx">
          <div class="p-3 bg-white rounded border shadow-sm h-100">
            <h6 class="font-weight-bold text-info mb-3">ที่ปรึกษาโครงการวิจัย</h6>
            
            <SignaturePad 
              :value="adv.signature" 
              @input="updateAdvSignature(idx, $event)" 
            />
            
            <div class="mt-3 font-weight-bold">({{ adv.name || '................................' }})</div>
          </div>
        </CCol>
      </CRow>

      <div class="mt-3 p-3 border-top border-dashed text-center">
        <p class="small text-muted mb-0 italic">
          * ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ และยินดีปฏิบัติตามระเบียบของมหาวิทยาลัยทุกประการ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SignaturePad from './SignaturePad.vue';

export default {
  name: 'SignatureSection',
  components: { SignaturePad },
  props: ['form'],
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('th-TH');
    }
  },
  methods: {
    // ฟังก์ชันช่วย Clone และ Emit ข้อมูลกลับไปที่แม่ (ResearchForm.vue)
    emitUpdate(newForm) {
      this.$emit('update:form', newForm);
    },

    // อัปเดตลายเซ็นหัวหน้า
    updateSignature(key, dataUrl) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm[key] = dataUrl;
      this.emitUpdate(newForm);
    },

    // อัปเดตลายเซ็นผู้ร่วมวิจัย
    updateCoSignature(index, dataUrl) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm.researchers.coResearchers[index].signature = dataUrl;
      this.emitUpdate(newForm);
    },

    // อัปเดตลายเซ็นที่ปรึกษา
    updateAdvSignature(index, dataUrl) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm.researchers.advisors[index].signature = dataUrl;
      this.emitUpdate(newForm);
    }
  }
}
</script>

<style scoped>
.border-left-primary { border-left: 6px solid #321fdb !important; }
.border-dashed { border-top: 1px dashed #ced4da !important; }
.italic { font-style: italic; }
</style>