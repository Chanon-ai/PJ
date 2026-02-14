<template>
  <div class="signature-container text-center">
    <canvas ref="signatureCanvas" class="border rounded bg-white shadow-sm w-100" style="touch-action: none; height: 150px;"></canvas>
    
    <div class="mt-2 d-flex justify-content-between">
      <CButton color="secondary" variant="outline" size="sm" @click="clear">
        <CIcon name="cil-refresh" class="mr-1"/> ล้างฟอร์ม
      </CButton>
      <CButton color="primary" size="sm" @click="save">
        <CIcon name="cil-check" class="mr-1"/> ยืนยันลายเซ็น
      </CButton>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';

export default {
  name: 'SignaturePad',
  props: ['value'], // รับค่า Base64 เกเดิม (ถ้ามี)
  data() {
    return {
      pad: null
    }
  },
  mounted() {
    this.initPad();
    window.addEventListener('resize', this.resizeCanvas);
  },
  methods: {
    initPad() {
      const canvas = this.$refs.signatureCanvas;
      this.pad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 128)' // สีน้ำเงินเข้มสไตล์ปากกาลูกลื่น
      });
      this.resizeCanvas();
    },
    resizeCanvas() {
      const canvas = this.$refs.signatureCanvas;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      this.pad.clear(); // ล้างข้อมูลเดิมเมื่อมีการ Resize (เพื่อป้องกันเส้นเพี้ยน)
    },
    clear() {
      this.pad.clear();
      this.$emit('input', null); // แจ้งแม่ว่าลบชื่อออกแล้ว
    },
    save() {
      if (this.pad.isEmpty()) {
        alert("กรุณาลงลายเซ็นก่อนยืนยัน");
        return;
      }
      const dataUrl = this.pad.toDataURL(); // แปลงเป็น Base64
      this.$emit('input', dataUrl); // ส่งค่ากลับไปบันทึกใน form
      alert("บันทึกลายเซ็นแล้ว");
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas);
  }
}
</script>