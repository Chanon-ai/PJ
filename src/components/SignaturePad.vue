<template>
  <div class="signature-container text-center">
    <canvas ref="signatureCanvas" class="border rounded bg-white shadow-sm w-100"
      style="touch-action: none; height: 150px;"></canvas>

    <div class="mt-2 d-flex justify-content-between">
      <CButton color="danger" variant="outline" size="sm" @click="clear">
        <CIcon name="cil-brush" class="me-1" /> ล้างฟอร์ม
      </CButton>
      <CButton color="primary" size="sm" @click="save">
        <CIcon name="cil-check" class="me-1" /> ยืนยันลายเซ็น
      </CButton>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';
import Swal from 'sweetalert2'

export default {
  name: 'SignaturePad',

  props: {
    modelValue: {
      type: String,
      default: null
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      pad: null
    }
  },

  mounted() {
    this.initPad();
    window.addEventListener('resize', this.resizeCanvas);
  },
  watch: {
    modelValue(newVal) {
      if (!this.pad) return;

      if (newVal) {
        this.pad.fromDataURL(newVal);
      } else {
        this.pad.clear();
      }
    }
  },
  methods: {
    initPad() {
      const canvas = this.$refs.signatureCanvas;

      this.pad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 128)'
      });

      this.resizeCanvas();

      if (this.modelValue) {
        this.pad.fromDataURL(this.modelValue);
      }
    },

    resizeCanvas() {
      const canvas = this.$refs.signatureCanvas;

      const data = this.pad?.toData();

      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;

      canvas.getContext("2d").scale(ratio, ratio);

      if (data && data.length) {
        this.pad.fromData(data);
      }
    }
    ,

    clear() {
      this.pad.clear();
      this.$emit('update:modelValue', null);
    },

    save() {
      if (!this.pad || this.pad.isEmpty()) {
        Swal.fire({
          icon: 'warning',
          title: 'ยังไม่ได้ลงลายเซ็น',
          text: 'กรุณาลงลายเซ็นก่อนยืนยัน',
          confirmButtonText: 'ตกลง',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
        return;
      }

      const dataUrl = this.pad.toDataURL('image/png');
      this.$emit('update:modelValue', dataUrl);

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        text: 'บันทึกลายเซ็นแล้ว',
        confirmButtonText: 'เรียบร้อย',
        timer: 1500,
        showConfirmButton: false
      });
    }

  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
  }
}

</script>