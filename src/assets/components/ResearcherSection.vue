<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-people" class="mr-2" /> ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย
      </h5>
    </CCardHeader>
    <CCardBody class="p-4">
      <h5 class="font-weight-bold mb-4 text-dark">1) คณะผู้วิจัย</h5>

      <div class="border rounded p-4 mb-4 bg-light shadow-sm w-100">
        <h6 class="font-weight-bold text-primary mb-3 border-bottom pb-2">
          <CIcon name="cil-user" class="mr-2" /> 1.1 หัวหน้าโครงการวิจัย
        </h6>
        <CRow>
          <CCol lg="4" md="6">
            <CInput label="ชื่อ-นามสกุล *" :value="form.researchers.mainResearcher.name" @input="updateMain('name', $event)" />
          </CCol>
          <CCol lg="4" md="6">
            <CInput label="สังกัดหน่วยงาน *" :value="form.researchers.mainResearcher.affiliation" @input="updateMain('affiliation', $event)" />
          </CCol>
          <CCol lg="4" md="6">
            <CInput label="เบอร์โทรศัพท์ *" :value="form.researchers.mainResearcher.phone" @input="updateMain('phone', $event)" />
          </CCol>
          <CCol lg="6" md="6">
            <CInput label="E-mail address *" :value="form.researchers.mainResearcher.email" type="email" @input="updateMain('email', $event)" />
          </CCol>
          <CCol lg="6" md="12">
            <CInput label="สัดส่วนการวิจัย (%) *" :value="form.researchers.mainResearcher.code" type="number" @input="updateMain('code', $event)" />
          </CCol>
        </CRow>
      </div>

      <div class="border rounded p-4 mb-4 bg-white shadow-sm border-success w-100">
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h6 class="font-weight-bold text-success mb-0">
            <CIcon name="cil-people" class="mr-2" /> 1.2 ผู้ร่วมโครงการวิจัย (ถ้ามี)
          </h6>
          <CButton color="success" size="sm" variant="outline" @click="addCoResearcher">
            <CIcon name="cil-plus" /> เพิ่มผู้ร่วม
          </CButton>
        </div>
        <div v-for="(r, idx) in form.researchers.coResearchers" :key="'co-' + idx"
          class="border rounded p-3 mb-3 bg-light position-relative w-100">
          <div class="d-flex justify-content-between mb-3">
            <span class="badge badge-success px-3">คนที่ {{ idx + 1 }}</span>
            <CButton color="danger" size="sm" variant="ghost" @click="removeCoResearcher(idx)">
              <CIcon name="cil-trash" />
            </CButton>
          </div>
          <CRow>
            <CCol lg="4" md="6">
              <CInput label="ชื่อ-นามสกุล *" :value="r.name" @input="updateCo(idx, 'name', $event)" />
            </CCol>
            <CCol lg="4" md="6">
              <CInput label="สังกัดหน่วยงาน *" :value="r.affiliation" @input="updateCo(idx, 'affiliation', $event)" />
            </CCol>
            <CCol lg="4" md="6">
              <CInput label="เบอร์โทรศัพท์ *" :value="r.phone" @input="updateCo(idx, 'phone', $event)" />
            </CCol>
            <CCol lg="6" md="6">
              <CInput label="E-mail *" :value="r.email" @input="updateCo(idx, 'email', $event)" />
            </CCol>
            <CCol lg="6" md="12">
              <CInput label="สัดส่วนการวิจัย (%) *" :value="r.code" type="number" @input="updateCo(idx, 'code', $event)" />
            </CCol>
          </CRow>
        </div>
        <div v-if="form.researchers.coResearchers.length === 0" class="text-center text-muted py-4">
          <em>-- ยังไม่มีข้อมูลผู้ร่วมโครงการ --</em>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h5 class="font-weight-bold text-dark mb-0">2) ที่ปรึกษาโครงการวิจัย (ถ้ามี)</h5>
        <CButton color="info" size="sm" variant="outline" @click="addAdvisor">
          <CIcon name="cil-plus" /> เพิ่มที่ปรึกษา
        </CButton>
      </div>
      <div v-for="(adv, idx) in form.researchers.advisors" :key="'adv-' + idx"
        class="border rounded p-4 mb-3 bg-light shadow-sm border-info w-100">
        <div class="d-flex justify-content-between mb-3 align-items-center">
          <h6 class="font-weight-bold text-info mb-0">ที่ปรึกษาคนที่ {{ idx + 1 }}</h6>
          <CButton color="danger" size="sm" variant="ghost" @click="removeAdvisor(idx)">
            <CIcon name="cil-trash" />
          </CButton>
        </div>
        <CRow>
          <CCol lg="4" md="6">
            <CInput label="ชื่อ-นามสกุล *" :value="adv.name" @input="updateAdv(idx, 'name', $event)" />
          </CCol>
          <CCol lg="4" md="6">
            <CInput label="สังกัดหน่วยงาน *" :value="adv.affiliation" @input="updateAdv(idx, 'affiliation', $event)" />
          </CCol>
          <CCol lg="4" md="6">
            <CInput label="เบอร์โทรศัพท์ *" :value="adv.phone" @input="updateAdv(idx, 'phone', $event)" />
          </CCol>
          <CCol lg="12">
            <CInput label="E-mail address *" :value="adv.email" @input="updateAdv(idx, 'email', $event)" />
          </CCol>
        </CRow>
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