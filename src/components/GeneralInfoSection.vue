<template>
  <CCard class="w-100 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-file" class="me-2" /> 1-19) รายละเอียดโครงการ
      </h5>
    </CCardHeader>
    <CCardBody class="p-4 bg-white">
      <CRow>
        <CCol md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3"><span class="text-primary me-2">|</span>1. ชื่อโครงการ <span class="required">*</span></h5>
          <div class="p-3 border rounded bg-light shadow-sm">
            <CFormInput label="ชื่อโครงการ (ภาษาไทย)" :model-value="form.titleTH"
              @update:modelValue="val => updateField('titleTH', val)" placeholder="กรุณาระบุชื่อโครงการภาษาไทย"
              class="mb-3" />
            <CFormInput label="ชื่อโครงการ (ภาษาอังกฤษ)" :model-value="form.titleEN"
              @update:modelValue="val => updateField('titleEN', val)" placeholder="Project Title in English"
              class="mb-0" />
          </div>
        </CCol>

        <CCol md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3">
            <span class="text-primary me-2">|</span>2. ประเภททุน <span class="required">*</span>
          </h5>

          <div class="d-flex flex-column border rounded p-3 bg-white shadow-sm">

            <div v-for="type in budgetTypes" :key="type.value" class="mb-2">
              <!-- Radio หลัก -->
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="budgetType" :id="'type-' + type.value"
                  :value="type.value" v-model="localBudgetType" />

                <label class="form-check-label fw-bold" :for="'type-' + type.value">
                  {{ type.label }}
                </label>
              </div>


              <!-- ข้อย่อย -->
              <transition name="fade">
                <div v-if="form.budgetType === type.value && type.children && type.children.length"
                  class="subtype-box mt-3 p-3 rounded">
                  <div v-for="(child, index) in type.children || []" :key="index" class="subtype-item">

                    <div class="form-check">
                      <input class="form-check-input" type="radio" :name="'subtype-' + type.value"
                        :id="'child-' + type.value + '-' + index" :value="child.value"
                        v-model="localSelectedStrategy" />

                      <label class="subtype-label" :for="'child-' + type.value + '-' + index">
                        {{ child.label }}
                      </label>
                    </div>

                  </div>
                </div>
              </transition>
            </div>
          </div>
        </CCol>


        <CCol lg="12" md="12" class="mb-4">
          <h5 class="font-weight-bold text-dark mb-3"><span class="text-primary me-2">|</span>3. ความร่วมมือ <span class="required">*</span></h5>
          <CFormSelect :options="['ไม่มี', 'มี']" :model-value="form.cooperation"
            @update:modelValue="val => updateField('cooperation', val)" class="shadow-sm" />
          <div v-if="form.cooperation === 'มี'" class="mt-3">
            <CFormInput :model-value="form.cooperationDetail"
              @update:modelValue="val => updateField('cooperationDetail', val)" placeholder="ระบุหน่วยงานที่ร่วมมือ" />

          </div>
        </CCol>

        <CCol lg="12" md="12" class="">
          <h5 class="font-weight-bold text-dark mb-3"><span class="text-primary me-2">|</span>4. ประเภทงานวิจัย <span class="required">*</span></h5>
          <CFormSelect :options="researchTypeOptions" v-model="researchTypeModel" class="shadow-sm" />
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

  emits: ['update:form'],

  computed: {
    localBudgetType: {
      get() {
        return this.form.budgetType
      },
      set(val) {
        this.$emit('update:form', {
          ...this.form,
          budgetType: val,
          selectedStrategy: ""
        })
      }
    },

    localSelectedStrategy: {
      get() {
        return this.form.selectedStrategy
      },
      set(val) {
        this.$emit('update:form', {
          ...this.form,
          selectedStrategy: val
        })
      }
    },

    researchTypeModel: {
      get() {
        return this.form.researchType
      },
      set(val) {
        this.$emit("update:form", {
          ...this.form,
          researchType: val
        })
      }
    }
  },

  methods: {
    updateField(key, value) {
      this.$emit('update:form', {
        ...this.form,
        [key]: value
      })
    }
  }
}


</script>

<style>
.subtype-box {
  background: #f0f0f0;
  border-left: 6px solid #321fdb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.subtype-item {
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.subtype-item:hover {
  background: #eef3ff;
}

.subtype-number {
  font-weight: 600;
  color: #321fdb;
  min-width: 24px;
}

.subtype-label {
  line-height: 1.6;
  cursor: pointer;
  font-size: 0.95rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>