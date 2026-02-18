<template>
  <CCard class="w-100 border-0">
    <CCardBody class="px-4 bg-white">
      <h5 class="font-weight-bold text-dark mb-3">
            <span class="text-primary me-2">|</span> 18) มาตรฐานการวิจัย <span class="required">*</span>
          </h5>
      <div class="bg-light p-4 rounded border shadow-sm w-100 border-left-primary ">
        <div class="ms-3">

          <!-- NONE -->
          <div class="custom-control custom-checkbox2">
            <input type="checkbox" class="custom-control-input" id="std_none" value="none"
              :checked="safeStandards.includes('none')" @change="handleStandardChange('none')">
            <label class="custom-control-label font-weight-bold text-dark" for="std_none"
              style="font-size: 16px; cursor: pointer;">
              ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง /
              การวิจัยที่เกี่ยวข้องกับการงานด้านเทคโนโลยีชีวภาพสมัยใหม่
            </label>
          </div>

          <hr class="border-dashed">

          <!-- HUMAN -->
          <div class="custom-control custom-checkbox2 mb-2">
            <input type="checkbox" class="custom-control-input" id="std_human" value="human"
              :checked="safeStandards.includes('human')" @change="handleStandardChange('human')">
            <label class="custom-control-label font-weight-bold text-primary" for="std_human"
              style="font-size: 17px; cursor: pointer;font-weight: bold;">
              มีการทำวิจัยในมนุษย์
            </label>
          </div>

          <div v-if="safeStandards.includes('human')" class="ms-4 mb-4 p-4 border-left bg-white rounded shadow-none">

            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="h_cert"
                :checked="form.humanDetail?.hasCert || false"
                @change="updateNested('humanDetail', 'hasCert', $event.target.checked)">
              <label class="custom-control-label text-dark" for="h_cert" style="font-size:16px; cursor:pointer;">
                มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์ (แนบสำเนา 1 ชุด)
              </label>
            </div>

            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="h_pending"
                :checked="form.humanDetail?.isPending || false"
                @change="updateNested('humanDetail', 'isPending', $event.target.checked)">
              <label class="custom-control-label text-dark" for="h_pending"
                style="font-size:16px; line-height:1.5; cursor:pointer;">
                ไม่มีหนังสือรับรองจริยธรรมฯ อยู่ระหว่างเสนอคณะกรรมการจริยธรรมการวิจัยในมนุษย์พิจารณา
              </label>
            </div>

            <div v-if="form.humanDetail?.isPending"
              class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border" style="gap:15px;">
              <span class="font-weight-bold text-dark" style="font-size:15px;">
                วันที่ยื่นโครงการ:
              </span>

              <input type="date" :value="form.humanDetail?.applyDate || ''"
                @input="updateNested('humanDetail', 'applyDate', $event.target.value)"
                class="form-control form-control-sm w-auto" style="height:35px;">

              <div class="custom-file-input-wrapper">
                <input type="file" @change="$emit('file-upload', $event, 'human')"
                  class="form-control-file border p-1 rounded bg-white">
              </div>
            </div>

          </div>

          <!-- ANIMAL -->
          <div class="custom-control custom-checkbox2 mb-2">
            <input type="checkbox" class="custom-control-input" id="std_animal" value="animal"
              :checked="safeStandards.includes('animal')" @change="handleStandardChange('animal')">
            <label class="custom-control-label font-weight-bold text-primary" for="std_animal"
              style="font-size:17px; cursor:pointer;font-weight: bold;">
              มีการใช้สัตว์ทดลอง
            </label>
          </div>

          <div v-if="safeStandards.includes('animal')" class="ms-4 p-4 border-left bg-white rounded shadow-none">

            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="animal_cert"
                :checked="form.animalDetail?.hasCert || false"
                @change="updateNested('animalDetail', 'hasCert', $event.target.checked)">
              <label class="custom-control-label text-dark" for="animal_cert" style="font-size:16px; cursor:pointer;">
                มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์ (แนบสำเนา 1 ชุด)
              </label>
            </div>

            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="animal_pending"
                :checked="form.animalDetail?.isPending || false"
                @change="updateNested('animalDetail', 'isPending', $event.target.checked)">
              <label class="custom-control-label text-dark" for="animal_pending"
                style="font-size:16px; line-height:1.5; cursor:pointer;">
                ไม่มีหนังสือรับรองจรรยาบรรณสัตว์ฯ อยู่ระหว่างเสนอคณะกรรมการจรรยาบรรณสัตว์ฯ พิจารณา
              </label>
            </div>

            <div v-if="form.animalDetail?.isPending"
              class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border" style="gap:15px;">
              <span class="font-weight-bold text-dark" style="font-size:15px;">
                วันที่ยื่นโครงการ:
              </span>

              <input type="date" :value="form.animalDetail?.applyDate || ''"
                @input="updateNested('animalDetail', 'applyDate', $event.target.value)"
                class="form-control form-control-sm w-auto" style="height:35px;">

              <div class="custom-file-input-wrapper">
                <input type="file" @change="$emit('file-upload', $event, 'animal')"
                  class="form-control-file border p-1 rounded bg-white">
              </div>
            </div>

          </div>
          <!-- PLANT -->
          <div class="custom-control custom-checkbox2">
            <input type="checkbox" class="custom-control-input" id="std_plant" value="plant"
              :checked="safeStandards.includes('plant')" @change="handleStandardChange('plant')">
            <label class="custom-control-label font-weight-bold text-primary" for="std_plant"
              style="font-size:17px; cursor:pointer;font-weight: bold;">
              มีการเก็บ จัดหา หรือรวบรวมพันธุ์พืช ตามมาตรา 53
            </label>
          </div>
          <div v-if="safeStandards.includes('plant')" class="ms-4 p-4 border-left bg-white rounded shadow-none">

            <!-- มีหนังสือ -->
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="plant_cert"
                :checked="form.plantDetail?.hasCert || false"
                @change="updateNested('plantDetail', 'hasCert', $event.target.checked)">
              <label class="custom-control-label text-dark" for="plant_cert" style="font-size:16px; cursor:pointer;">
                มีหนังสือแจ้งการเก็บ/จัดหา/รวบรวมพันธุ์พืช (แนบสำเนา 1 ชุด)
              </label>
            </div>

            <!-- อยู่ระหว่างดำเนินการ -->
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="plant_pending"
                :checked="form.plantDetail?.isPending || false"
                @change="updateNested('plantDetail', 'isPending', $event.target.checked)">
              <label class="custom-control-label text-dark" for="plant_pending"
                style="font-size:16px; line-height:1.5; cursor:pointer;">
                ไม่มีหนังสือแจ้ง อยู่ระหว่างดำเนินการ
              </label>
            </div>

            <!-- วันที่ + ไฟล์ -->
            <div v-if="form.plantDetail?.isPending"
              class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border" style="gap:15px;">
              <span class="font-weight-bold text-dark" style="font-size:15px;">
                วันที่ยื่นโครงการ:
              </span>

              <input type="date" :value="form.plantDetail?.applyDate || ''"
                @input="updateNested('plantDetail', 'applyDate', $event.target.value)"
                class="form-control form-control-sm w-auto" style="height:35px;">

              <div>
                <input type="file" @change="$emit('file-upload', $event, 'plant')"
                  class="form-control-file border p-1 rounded bg-white">
              </div>
            </div>

          </div>

        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'EthicsSection',

  props: {
    form: { type: Object, required: true }
  },

  emits: ['update:form', 'file-upload'],

  computed: {
    safeStandards() {
      return Array.isArray(this.form.standards)
        ? this.form.standards
        : [];
    }
  },

  methods: {
    updateField(key, value) {
      this.$emit('update:form', {
        ...this.form,
        [key]: value
      });
    },

    handleStandardChange(val) {
      let list = [...this.safeStandards];
      const index = list.indexOf(val);

      if (index > -1) {
        list.splice(index, 1);
      } else {
        if (val === 'none') {
          list = ['none'];
        } else {
          list = list.filter(item => item !== 'none');
          list.push(val);
        }
      }

      this.updateField('standards', list);
    },

    updateNested(parentKey, childKey, value) {
      const parent = this.form[parentKey] || {};
      let updatedNested = { ...parent };
      if (childKey === 'hasCert' && value === true) {
        updatedNested = {
          ...parent,
          hasCert: true,
          isPending: false
        };
      }
      else if (childKey === 'isPending' && value === true) {
        updatedNested = {
          ...parent,
          hasCert: false,
          isPending: true
        };
      }
      else {
        updatedNested = {
          ...parent,
          [childKey]: value
        };
      }

      this.updateField(parentKey, updatedNested);
    }

  }
}
</script>

<style scoped>
.border-left-primary {
  border-left: 6px solid #321fdb !important;
}

.border-left {
  border-left: 3px dashed #ced4da !important;
}

.border-dashed {
  border-top: 1px dashed #ced4da;
}
</style>
