<template>
  <div class="card shadow-sm mt-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-1 font-weight-bold">อัปโหลดเอกสาร</h5>
        <button type="button" class="btn btn-outline-dark" @click="$emit('trigger-upload')">
          <CIcon name="cil-paperclip" class="mr-1"/> อัปโหลดไฟล์
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['files']
}
</script>