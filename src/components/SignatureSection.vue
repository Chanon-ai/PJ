<template>
  <CCard class="shadow-sm w-100 mb-5 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-pencil" class="me-2" /> 19) การลงนามยืนยันข้อมูลและคำรับรอง <span class="required">*</span>
      </h5>
    </CCardHeader>

    <CCardBody class="p-4 bg-white">
      <div class="bg-light p-4 rounded border shadow-sm w-100 border-left-primary">
        <CRow>
          <CCol lg="4" md="6" class="text-center mb-4">
            <div class="p-3 bg-white rounded border shadow-sm h-100 d-flex flex-column">
              <h6 class="font-weight-bold text-primary mb-3">หัวหน้าโครงการวิจัย</h6>

              <div class="flex-grow-1 mb-3">
                <SignaturePad :modelValue="form.researchers.mainResearcher.signature"
                  @update:modelValue="updateMainSignature" />
              </div>
              <div class="mt-auto">
                <div class="font-weight-bold text-dark">
                  ({{ form.researchers.mainResearcher.name || '................................................' }})
                </div>
                <div class="text-muted small mt-1">วันที่: {{ currentDate }}</div>
              </div>
            </div>
          </CCol>

          <CCol lg="4" md="6" class="text-center mb-4" v-for="(co, idx) in form.researchers.coResearchers"
            :key="'sig-co-' + idx">
            <div class="p-3 bg-white rounded border shadow-sm h-100 d-flex flex-column">
              <h6 class="font-weight-bold text-success mb-3">ผู้ร่วมโครงการคนที่ {{ idx + 1 }}</h6>

              <div class="flex-grow-1 mb-3">
                <SignaturePad :modelValue="co.signature" @update:modelValue="val => updateCoSignature(idx, val)" />
              </div>

              <div class="mt-auto">
                <div class="font-weight-bold text-dark">
                  ({{ co.name || '................................................' }})
                </div>
                <div class="text-muted small mt-1">วันที่: {{ currentDate }}</div>
              </div>
            </div>
          </CCol>

          <CCol lg="4" md="6" class="text-center mb-4" v-for="(adv, idx) in form.researchers.advisors"
            :key="'sig-adv-' + idx">
            <div class="p-3 bg-white rounded border shadow-sm h-100 d-flex flex-column">
              <h6 class="font-weight-bold text-info mb-3">ที่ปรึกษาโครงการวิจัย</h6>

              <div class="flex-grow-1 mb-3">
                <SignaturePad :modelValue="adv.signature" @update:modelValue="val => updateAdvSignature(idx, val)" />
              </div>

              <div class="mt-auto">
                <div class="font-weight-bold text-dark">
                  ({{ adv.name || '................................................' }})
                </div>
                <div class="text-muted small mt-1">วันที่: {{ currentDate }}</div>
              </div>
            </div>
          </CCol>
        </CRow>

        <div class="mt-4 p-3 border-top border-dashed text-center">
          <p class="small text-muted mb-0 italic">
            * ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ และยินดีปฏิบัติตามระเบียบของมหาวิทยาลัยทุกประการ
          </p>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import SignaturePad from './SignaturePad.vue';

export default {
  name: 'SignatureSection',
  components: { SignaturePad },
  props: {
    form: { type: Object, required: true }
  },
  emits: ['update:form'],
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('th-TH');
    }
  }, methods: {
    updateMainSignature(val) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm.researchers.mainResearcher.signature = val;
      this.$emit('update:form', newForm);
    }
    ,

    updateCoSignature(index, val) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm.researchers.coResearchers[index].signature = val;
      this.$emit('update:form', newForm);
    },

    updateAdvSignature(index, val) {
      const newForm = JSON.parse(JSON.stringify(this.form));
      newForm.researchers.advisors[index].signature = val;
      this.$emit('update:form', newForm);
    }
  }

}

</script>

<style>
.border-left-primary {
  border-left: 6px solid #321fdb !important;
}

.border-dashed {
  border-top: 1px dashed #ced4da !important;
}

.italic {
  font-style: italic;
}

/* ปรับให้ Card ภายในแถวมีความสูงเท่ากัน */
.h-100 {
  height: 100% !important;
}
</style>