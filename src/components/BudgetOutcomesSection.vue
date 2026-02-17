<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-money" class="me-2" /> 13-17) งบประมาณและผลลัพธ์
      </h5>
    </CCardHeader>
    <CCardBody class="p-4 bg-white">
      <div class="mb-5">
        <h5 class="font-weight-bold text-dark">13) ผลงานตามระยะเวลาการรายงาน</h5>
        <QuillEditor :content="form.progressReport" @update:content="value => updateField('progressReport', value)"
          contentType="html" :options="editorOption" class="mb-4" />
        <h5 class="font-weight-bold mb-4 text-dark border-bottom pb-2">14) ผลลัพธ์ที่คาดว่าจะได้รับ
          (สัมพันธ์กับประเภททุน)</h5>
        <div v-if="form.budgetType" class="subtype-box mt-3 p-3 rounded">

          <template v-if="form.budgetType === 'new'">
            <h6 class="font-weight-bold text-primary mb-3">14.1 ทุนนักวิจัยรุ่นใหม่</h6>
            <div v-for="(opt, idx) in outcomes.newResearcher" :key="'new-' + idx"
              class="custom-control custom-checkbox mb-2">
              <input type="checkbox" class="custom-control-input" :id="'chk1-' + idx" :value="opt.value"
                :checked="(form.selectedOutcomes || []).includes(opt.value)" @change="toggleOutcome(opt.value)">
              <label class="custom-control-label" :for="'chk1-' + idx" style="cursor: pointer;">{{ opt.label }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'dev'">
            <h6 class="font-weight-bold text-success mb-3">14.2 ทุนพัฒนานักวิจัย</h6>
            <div v-for="(opt, idx) in outcomes.devResearcher" :key="'dev-' + idx"
              class="custom-control custom-checkbox mb-2">
              <input type="checkbox" class="custom-control-input" :id="'chk2-' + idx" :value="opt.value"
                :checked="(form.selectedOutcomes || []).includes(opt.value)" @change="toggleOutcome(opt.value)">
              <label class="custom-control-label" :for="'chk2-' + idx" style="cursor: pointer;">{{ opt.label }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'strategic'">
            <h6 class="font-weight-bold text-primary mb-3">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</h6>
            <div v-for="(opt, idx) in outcomes.strategic" :key="'strat-' + idx"
              class="custom-control custom-checkbox mb-2">
              <input type="checkbox" class="custom-control-input" :id="'chk3-' + idx" :value="opt.value"
                :checked="(form.selectedOutcomes || []).includes(opt.value)" @change="toggleOutcome(opt.value)">
              <label class="custom-control-label" :for="'chk3-' + idx" style="cursor: pointer;">{{ opt.label }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'industrial'">
            <h6 class="font-weight-bold text-primary mb-3">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</h6>
            <div v-for="(opt, idx) in outcomes.industrial" :key="'indus-' + idx"
              class="custom-control custom-checkbox mb-2">
              <input type="checkbox" class="custom-control-input" :id="'chk4-' + idx" :value="opt.value"
                :checked="(form.selectedOutcomes || []).includes(opt.value)" @change="toggleOutcome(opt.value)">
              <label class="custom-control-label" :for="'chk4-' + idx" style="cursor: pointer;">{{ opt.label }}</label>
            </div>
          </template>
        </div>
        <div v-else class="alert alert-warning">กรุณาเลือก "ประเภททุน" ในหัวข้อที่ 2 เพื่อเลือกผลลัพธ์</div>
      </div>

      <div class="mb-5">
        <h5 class="font-weight-bold text-dark">15) การบูรณาการงานวิจัย</h5>
        <QuillEditor :content="form.integration" @update:content="value => updateField('integration', value)"
          contentType="html" :options="editorOption" class="mb-4" />


        <h5 class="font-weight-bold text-dark mb-3">16) ระดับการถ่ายทอดสู่สังคม *</h5>
        <div class="subtype-box mt-3 p-3 rounded">
          <div class="ms-3">
            <div v-for="(opt, i) in transferOptions" :key="'trans-' + i" class="radio-item">
              <input type="radio" :id="'trans-' + i" :value="opt.value" :checked="form.socialTransfer === opt.value"
                @change="updateField('socialTransfer', opt.value)">
              <label :for="'trans-' + i" class="text-dark" style="cursor:pointer;">
                {{ opt.label }}
              </label>
            </div>
          </div>
        </div>

        <h5 class="font-weight-bold mb-3 mt-4 text-dark">17) กรอกรายละเอียดงบประมาณ (พ.ศ. 2569)</h5>
        <div class="border rounded bg-white shadow-sm overflow-hidden mb-4">
          <BudgetSection :value="form.budgets" @input="updateField('budgets', $event)" />
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BudgetSection from "@/components/BudgetSection.vue";

export default {
  name: 'BudgetOutcomesSection',
  emits: ['update:form'],
  components: {
    QuillEditor,
    BudgetSection
  },
  props: {
    form: { type: Object, required: true },
    outcomes: { type: Object, required: true },
    editorOption: { type: Object, required: true }
  },
  data() {
    return {
      transferOptions: [
        {
          label: "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือ นานาชาติ",
          value: "16_1"
        },
        {
          label: "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด",
          value: "16_2"
        },
        {
          label: "ไม่มีการนำไปถ่ายทอดสู่สังคม",
          value: "16_3"
        }
      ]

    };
  },
  methods: {
    updateField(key, value) {
      this.$emit('update:form', { ...this.form, [key]: value });
    },
    toggleOutcome(val) {
      let list = Array.isArray(this.form.selectedOutcomes)
        ? [...this.form.selectedOutcomes]
        : [];

      const index = list.indexOf(val);

      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.push(val);
      }

      this.updateField('selectedOutcomes', list);
    }

  }
}
</script>

<style>
.border-left-primary {
  border-left: 6px solid #321fdb !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.radio-item {

  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.radio-item2 {

  display: flex;
  align-items: flex-start;
  gap: 8px;

}

.radio-item2 input[type="radio"] {
  margin-top: 5px;
}

.radio-item input[type="radio"] {
  margin-top: 5px;
}

.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
}

.custom-checkbox input[type="checkbox"] {
  margin-top: 5px;
}

.custom-checkbox2 {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.custom-checkbox2 input[type="checkbox"] {
  margin-top: 8px;
}

input[type="checkbox"],
input[type="radio"] {
  accent-color: #321fdb;
  /* สี */
  transform: scale(1.3);
  /* ขยายขนาด */
  margin-right: 6px;
}
</style>