<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-library" class="mr-2" /> 5-11) รายละเอียดเนื้อหาโครงการวิจัย
      </h5>
    </CCardHeader>
    <CCardBody class="p-4 bg-white">
      <div v-for="(field, i) in textFields" :key="'text-' + i"
        :class="['mb-5 pb-4', i < textFields.length - 1 ? 'border-bottom' : '']">

        <h5 class="font-weight-bold text-dark mb-3">
          <span class="text-primary mr-2">|</span> {{ field.label }}
        </h5>

        <div class="border rounded shadow-sm overflow-hidden">
          <quill-editor 
            :value="form[field.model]" 
            @input="onEditorInput(field.model, $event)"
            :options="editorOption" 
             
          />
        </div>

      </div>
    </CCardBody>
  </CCard>
</template>

<script>
// นำเข้า Editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'ResearchDetailSection',
  components: {
    quillEditor
  },
  props: {
    // รับข้อมูลจาก ResearchForm.vue
    form: { type: Object, required: true },
    textFields: { type: Array, required: true },
    editorOption: { type: Object, required: true }
  },
  methods: {
    /**
     * จัดการการแก้ไขเนื้อหาใน Editor
     * สร้างสำเนาข้อมูลใหม่และส่งกลับไปอัปเดตที่คอมโพเนนต์แม่ผ่าน .sync
     */
    onEditorInput(modelName, value) {
      const updatedForm = { 
        ...this.form, 
        [modelName]: value 
      };
      this.$emit('update:form', updatedForm);
    }
  }
}
</script>

<style scoped>
/* ปรับแต่งเส้นคั่นและระยะห่างเพื่อให้เข้ากับธีม */
.border-bottom {
  border-bottom: 1px solid #ebedef !important;
}

.text-primary {
  color: #321fdb !important;
}

/* ลบขอบ Editor เพื่อให้เนียนไปกับกล่อง Shadow ที่ครอบอยู่ */
::v-deep .ql-toolbar.ql-snow, 
::v-deep .ql-container.ql-snow {
  border: none !important;
}
</style>