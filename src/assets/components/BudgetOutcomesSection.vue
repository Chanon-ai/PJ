<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-money" class="mr-2" /> 13-17) งบประมาณและผลลัพธ์
      </h5>
    </CCardHeader>
    <CCardBody class="p-4 bg-white">
      <div class="mb-5">
        <h5 class="font-weight-bold text-dark">13) ผลงานตามระยะเวลาการรายงาน</h5>
        <quill-editor 
          :value="form.progressReport" 
          @input="updateField('progressReport', $event)"
          :options="editorOption" 
          class="mb-4" 
        />

        <h5 class="font-weight-bold mb-4 text-dark border-bottom pb-2">14) ผลลัพธ์ที่คาดว่าจะได้รับ (สัมพันธ์กับประเภททุน)</h5>
        <div v-if="form.budgetType" class="p-4 border rounded bg-light shadow-sm mb-4 border-left-primary">
          
          <template v-if="form.budgetType === 'ทุนนักวิจัยรุ่นใหม่'">
            <h6 class="font-weight-bold text-primary mb-3">14.1 ทุนนักวิจัยรุ่นใหม่</h6>
            <div v-for="(opt, idx) in outcomes.newResearcher" :key="'new-'+idx" class="custom-control custom-checkbox mb-2">
              <input 
                type="checkbox" class="custom-control-input" :id="'chk1-' + idx" :value="opt"
                :checked="form.selectedOutcomes.includes(opt)"
                @change="toggleOutcome(opt)"
              >
              <label class="custom-control-label" :for="'chk1-' + idx" style="cursor: pointer;">{{ opt }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'ทุนพัฒนานักวิจัย'">
            <h6 class="font-weight-bold text-success mb-3">14.2 ทุนพัฒนานักวิจัย</h6>
            <div v-for="(opt, idx) in outcomes.devResearcher" :key="'dev-'+idx" class="custom-control custom-checkbox mb-2">
              <input 
                type="checkbox" class="custom-control-input" :id="'chk2-' + idx" :value="opt"
                :checked="form.selectedOutcomes.includes(opt)"
                @change="toggleOutcome(opt)"
              >
              <label class="custom-control-label" :for="'chk2-' + idx" style="cursor: pointer;">{{ opt }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์'">
            <h6 class="font-weight-bold text-primary mb-3">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</h6>
            <div v-for="(opt, idx) in outcomes.strategic" :key="'strat-'+idx" class="custom-control custom-checkbox mb-2">
              <input 
                type="checkbox" class="custom-control-input" :id="'chk3-' + idx" :value="opt"
                :checked="form.selectedOutcomes.includes(opt)"
                @change="toggleOutcome(opt)"
              >
              <label class="custom-control-label" :for="'chk3-' + idx" style="cursor: pointer;">{{ opt }}</label>
            </div>
          </template>

          <template v-else-if="form.budgetType === 'ทุนต่อยอดสู่ภาคอุตสาหกรรม'">
            <h6 class="font-weight-bold text-primary mb-3">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</h6>
            <div v-for="(opt, idx) in outcomes.industrial" :key="'indus-'+idx" class="custom-control custom-checkbox mb-2">
              <input 
                type="checkbox" class="custom-control-input" :id="'chk4-' + idx" :value="opt"
                :checked="form.selectedOutcomes.includes(opt)"
                @change="toggleOutcome(opt)"
              >
              <label class="custom-control-label" :for="'chk4-' + idx" style="cursor: pointer;">{{ opt }}</label>
            </div>
          </template>
        </div>
        <div v-else class="alert alert-warning">กรุณาเลือก "ประเภททุน" ในหัวข้อที่ 2 เพื่อเลือกผลลัพธ์</div>
      </div>

      <div class="mb-5">
        <h5 class="font-weight-bold text-dark">15) การบูรณาการงานวิจัย</h5>
        <quill-editor 
          :value="form.integration" 
          @input="updateField('integration', $event)"
          :options="editorOption" 
          class="mb-4" 
        />

        <h5 class="font-weight-bold text-dark mb-3">16) ระดับการถ่ายทอดสู่สังคม *</h5>
        <div class="bg-light p-4 rounded border mb-5 shadow-sm w-100 border-left-primary">
          <div class="ml-3">
            <div v-for="(opt, i) in transferOptions" :key="'trans-' + i" class="custom-control custom-radio mb-3">
              <input 
                type="radio" :id="'trans-' + i" :value="opt" 
                :checked="form.transferLevel === opt"
                @change="updateField('transferLevel', opt)"
                class="custom-control-input"
              >
              <label class="custom-control-label text-dark" :for="'trans-' + i" style="cursor: pointer;">
                {{ opt }}
              </label>
            </div>
          </div>
        </div>

        <h5 class="font-weight-bold mb-3 text-dark">17) กรอกรายละเอียดงบประมาณ (พ.ศ. 2569)</h5>
        <div class="border rounded bg-white shadow-sm overflow-hidden mb-4">
          <BudgetSection :value="form.budgets" @input="updateField('budgets', $event)" />
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import BudgetSection from "@/components/BudgetSection.vue";

export default {
  name: 'BudgetOutcomesSection',
  components: {
    quillEditor,
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
        "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือนานาชาติ",
        "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด",
        "ไม่มีการนำไปถ่ายทอดสู่สังคม"
      ]
    };
  },
  methods: {
    // อัปเดตข้อมูลทั่วไป
    updateField(key, value) {
      this.$emit('update:form', { ...this.form, [key]: value });
    },
    // จัดการการเลือก Checkbox ผลลัพธ์หลายตัว
    toggleOutcome(val) {
      let list = [...this.form.selectedOutcomes];
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

<style scoped>
.border-left-primary {
  border-left: 6px solid #321fdb !important;
}
.bg-light {
  background-color: #f8f9fa !important;
}
</style>