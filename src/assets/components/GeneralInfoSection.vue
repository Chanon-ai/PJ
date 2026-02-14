<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-file" class="mr-2" /> 1-4) ข้อมูลทั่วไปของโครงการ
      </h5>
    </CCardHeader>
    <CCardBody class="p-4 bg-white">
      <CRow>
        <CCol md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3">1) ชื่อโครงการ *</h5>
          <div class="p-3 border rounded bg-light shadow-sm">
            <CInput 
              label="ชื่อโครงการ (ภาษาไทย)" 
              :value="form.titleTH" 
              @input="updateField('titleTH', $event)"
              placeholder="กรุณาระบุชื่อโครงการภาษาไทย"
              class="mb-3" 
            />
            <CInput 
              label="ชื่อโครงการ (ภาษาอังกฤษ)" 
              :value="form.titleEN" 
              @input="updateField('titleEN', $event)"
              placeholder="Project Title in English"
              class="mb-0" 
            />
          </div>
        </CCol>

        <CCol md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3">2) ประเภททุน *</h5>
          <div class="d-flex flex-wrap border rounded p-3 bg-white shadow-sm" style="gap: 20px;">
            <div v-for="type in budgetTypes" :key="type.value" class="custom-control custom-radio">
              <input 
                class="custom-control-input" 
                type="radio" 
                :id="'type-' + type.value" 
                :value="type.label"
                :checked="form.budgetType === type.label"
                @change="updateField('budgetType', type.label)"
              >
              <label class="custom-control-label font-weight-bold" :for="'type-' + type.value" style="cursor: pointer;">
                {{ type.label }}
              </label>
            </div>
          </div>
        </CCol>

        <CCol lg="6" md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3">3) ความร่วมมือ *</h5>
          <CSelect 
            :options="['ไม่มี', 'มี']" 
            :value="form.cooperation" 
            @update:value="updateField('cooperation', $event)"
            class="shadow-sm" 
          />
          <div v-if="form.cooperation === 'มี'" class="mt-3">
            <CInput 
              label="รายละเอียดความร่วมมือ" 
              :value="form.cooperationDetail"
              @input="updateField('cooperationDetail', $event)"
              placeholder="ระบุหน่วยงานที่ร่วมมือ" 
            />
          </div>
        </CCol>

        <CCol lg="6" md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3">4) ประเภทงานวิจัย *</h5>
          <CSelect 
            :options="researchTypeOptions" 
            :value="form.researchType" 
            @update:value="updateField('researchType', $event)"
            class="shadow-sm" 
          />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'GeneralInfoSection',
  props: {
    form: { type: Object, required: true },
    budgetTypes: { type: Array, required: true },
    researchTypeOptions: { type: Array, required: true }
  },
  methods: {
    updateField(key, value) {
      // ส่ง Object form ใหม่กลับไปยังคอมโพเนนต์แม่ เพื่อรักษา One-Way Data Flow
      this.$emit('update:form', { ...this.form, [key]: value });
    }
  }
}
</script>