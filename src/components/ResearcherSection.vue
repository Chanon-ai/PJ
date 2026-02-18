<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-people" class="me-2" /> ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย
      </h5>
    </CCardHeader>
    <CCardBody class="p-4">
      <h5 class="font-weight-bold mb-4 text-dark">คณะผู้วิจัย</h5>

      <div class="border rounded p-4 mb-4 bg-light shadow-sm w-100">
        <h6 class="font-weight-bold text-primary mb-3 border-bottom pb-2">
          <CIcon name="cil-user" class="me-2" /> 1.1 หัวหน้าโครงการวิจัย
        </h6>
        <CRow>
          <CCol lg="4" md="6">
            <CFormInput :model-value="form.researchers.mainResearcher.name"
              @update:modelValue="val => updateMain('name', val)">

              <template #label>
                ชื่อ-สกุล <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="4" md="6">
            <CFormInput :model-value="form.researchers.mainResearcher.affiliation"
              @update:modelValue="val => updateMain('affiliation', val)">
              <template #label>
                สังกัดหน่วยงาน <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="4" md="6">
            <CFormInput :model-value="form.researchers.mainResearcher.phone"
              @update:modelValue="val => updateMain('phone', val)">

              <template #label>
                เบอร์โทรศัพท์ <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="6" md="6">
            <CFormInput :model-value="form.researchers.mainResearcher.email"
              @update:modelValue="val => updateMain('email', val)">

              <template #label>
                E-mail <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="6" md="12">
            <CFormInput :model-value="form.researchers.mainResearcher.code" type="number"
              @update:modelValue="val => updateMain('code', val)">

              <template #label>
                สัดส่วนการวิจัย (%) <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
        </CRow>
      </div>

      <div class="border rounded p-4 mb-4 bg-white shadow-sm border-primary w-100">
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h6 class="font-weight-bold text-primary mb-0">
            <CIcon name="cil-people" class="me-2" /> 1.2 ผู้ร่วมโครงการวิจัย (ถ้ามี)
          </h6>
          <CButton color="primary" size="sm" variant="outline" @click="addCoResearcher">
            <CIcon name="cil-plus" /> เพิ่มผู้ร่วม
          </CButton>
        </div>
        <div v-for="(r, idx) in form.researchers.coResearchers" :key="'co-' + idx"
          class="border rounded p-3 mb-3 bg-light position-relative w-100">
          <div class="d-flex justify-content-between mb-3">
            <span class="badge bg-primary d-flex align-items-center justify-content-center px-3">คนที่ {{ idx + 1
            }}</span>
            <CButton color="danger" size="sm" variant="ghost" class="border border-danger"
              @click="removeCoResearcher(idx)">
              <CIcon name="cil-trash" />  ลบ
            </CButton>
          </div>
          <CRow>
            <CCol lg="4" md="6">
              <CFormInput :model-value="r.name" @update:modelValue="val => updateCo(idx, 'name', val)">
                <template #label>
                  ชื่อ-สกุล <span class="required">*</span>
                </template>
              </CFormInput>
            </CCol>
            <CCol lg="4" md="6">
              <CFormInput :model-value="r.affiliation" @update:modelValue="val => updateCo(idx, 'affiliation', val)">
                <template #label>
                  สังกัดหน่วยงาน <span class="required">*</span>
                </template>
              </CFormInput>
            </CCol>
            <CCol lg="4" md="6">
              <CFormInput :model-value="r.phone" @update:modelValue="val => updateCo(idx, 'phone', val)">
                <template #label>
                  เบอร์โทรศัพท์ <span class="required">*</span>
                </template>
              </CFormInput>
            </CCol>
            <CCol lg="6" md="6">
              <CFormInput :model-value="r.email" @update:modelValue="val => updateCo(idx, 'email', val)">
                <template #label>
                  E-mail <span class="required">*</span>
                </template>
              </CFormInput>
            </CCol>
            <CCol lg="6" md="12">
              <CFormInput :model-value="r.code" type="number" @update:modelValue="val => updateCo(idx, 'code', val)">
                <template #label>
                  สัดส่วนการวิจัย (%) <span class="required">*</span>
                </template>
              </CFormInput>
            </CCol>
          </CRow>
        </div>
        <div v-if="form.researchers.coResearchers.length === 0" class="text-center text-muted py-4">
          <em>-- ยังไม่มีข้อมูลผู้ร่วมโครงการ --</em>
        </div>
      </div>

      <div class="border rounded p-4 mb-4 bg-white shadow-sm border-info w-100">
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h5 class="font-weight-bold text-dark mb-0">ที่ปรึกษาโครงการวิจัย (ถ้ามี)</h5>
        <CButton color="info" size="sm" variant="outline" @click="addAdvisor">
          <CIcon name="cil-plus" /> เพิ่มที่ปรึกษา
        </CButton>
      </div>
      <div v-for="(adv, idx) in form.researchers.advisors" :key="'adv-' + idx"
        class="border rounded p-4 mb-3 bg-light shadow-sm border-info w-100">
        <div class="d-flex justify-content-between mb-3">
            <span class="badge bg-info d-flex align-items-center justify-content-center px-3">คนที่ {{ idx + 1
            }}</span>
            <CButton color="danger" size="sm" variant="ghost" class="border border-danger"
              @click="removeAdvisor(idx)">
              <CIcon name="cil-trash" />  ลบ
            </CButton>
          </div>
        <CRow>
          <CCol lg="4" md="6">
            <CFormInput :model-value="adv.name" @update:modelValue="val => updateAdv(idx, 'name', val)">

              <template #label>
                ชื่อ-สกุล <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="4" md="6">
            <CFormInput :model-value="adv.affiliation" @update:modelValue="val => updateAdv(idx, 'affiliation', val)">
              <template #label>
                สังกัดหน่วยงาน <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="4" md="6">
            <CFormInput :model-value="adv.phone" @update:modelValue="val => updateAdv(idx, 'phone', val)">
              <template #label>
                เบอร์โทรศัพท์ <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
          <CCol lg="12">
            <CFormInput :model-value="adv.email" @update:modelValue="val => updateAdv(idx, 'email', val)">

              <template #label>
                E-mail <span class="required">*</span>
              </template>
            </CFormInput>
          </CCol>
        </CRow>
      </div>
      <div v-if="form.researchers.advisors.length === 0" class="text-center text-muted py-4">
          <em>-- ยังไม่มีข้อมูลที่ปรึกษาโครงการ --</em>
        </div>
      </div>
      
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'ResearcherSection',
  props: {
    form: { type: Object, required: true }
  },
  emits: [
    'update:form',
    'add-co',
    'remove-co',
    'add-adv',
    'remove-adv'
  ],

  methods: {
    // อัปเดตข้อมูลหัวหน้าโครงการ
    updateMain(key, value) {
      const updatedForm = JSON.parse(JSON.stringify(this.form));
      updatedForm.researchers.mainResearcher[key] = value;
      this.$emit('update:form', updatedForm);
    },
    // อัปเดตข้อมูลผู้ร่วมวิจัย
    updateCo(idx, key, value) {
      const updatedForm = JSON.parse(JSON.stringify(this.form));
      updatedForm.researchers.coResearchers[idx][key] = value;
      this.$emit('update:form', updatedForm);
    },
    // อัปเดตข้อมูลที่ปรึกษา
    updateAdv(idx, key, value) {
      const updatedForm = JSON.parse(JSON.stringify(this.form));
      updatedForm.researchers.advisors[idx][key] = value;
      this.$emit('update:form', updatedForm);
    },
    // เพิ่ม/ลบ รายการ (ใช้ Event ส่งไปที่แม่จัดการอาร์เรย์)
    addCoResearcher() { this.$emit('add-co'); },
    removeCoResearcher(idx) { this.$emit('remove-co', idx); },
    addAdvisor() { this.$emit('add-adv'); },
    removeAdvisor(idx) { this.$emit('remove-adv', idx); }
  }
}
</script>
<style>
.required {
  color: red;
}
</style>