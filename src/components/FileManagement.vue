<template>
  <div class="container-fluid p-0 mt-4">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4 bg-white">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="mb-1 font-weight-bold text-dark">
              อัปโหลดเอกสารประกอบ
            </h5>
            <div class="small text-muted">
              เลือกประเภทเอกสารก่อน แล้วอัปโหลดไฟล์ หรือกด Browse
            </div>
          </div>

          <button
            type="button"
            class="btn btn-outline-dark font-weight-bold"
            @click="$refs.fileInput.click()"
          >
            <CIcon name="cil-paperclip" class="me-1"/>
            เลือกไฟล์เพื่ออัปโหลด
          </button>

          <input
            type="file"
            ref="fileInput"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            style="display: none"
            @change="$emit('upload', $event)"
          />
        </div>

        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0">
            <thead class="bg-primary">
              <tr>
                <th style="width:25%">ประเภทเอกสาร</th>
                <th style="width:25%">ชื่อไฟล์</th>
                <th style="width:15%">วัน-เวลาที่อัปโหลด</th>
                <th style="width:20%">หมายเหตุ</th>
                <th style="width:15%" class="text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in files"
                :key="item.id || item.name || index"
              >
                <!-- ประเภทเอกสาร -->
                <td>
                  <select
                    :value="item.type"
                    @change="updateFile(index, 'type', $event.target.value)"
                    class="form-control form-control-sm"
                  >
                    <option disabled value="">
                      -- เลือกประเภท --
                    </option>
                    <option>หลักฐานการผ่านการอบรมมาตรฐานการวิจัยในมนุษย์</option>
                    <option>หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยทางชีวภาพ</option>
                    <option>หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยห้องปฏิบัติการ</option>
                    <option>หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยการดำเนินการต่อสัตว์ฯ</option>
                    <option>อื่น ๆ</option>
                  </select>
                </td>

                <!-- ชื่อไฟล์ -->
                <td class="align-middle">
                  <a
                    href="#"
                    @click.prevent="$emit('open', item)"
                    class="text-primary font-weight-bold"
                    style="cursor:pointer;"
                  >
                    <CIcon name="cil-file" class="me-1"/>
                    {{ item.name }}
                  </a>
                </td>

                <!-- วันที่ -->
                <td class="text-muted small align-middle">
                  {{ item.datetime }}
                </td>

                <!-- หมายเหตุ -->
                <td>
                  <input
                    type="text"
                    :value="item.note"
                    @input="updateFile(index, 'note', $event.target.value)"
                    class="form-control form-control-sm"
                    placeholder="พิมพ์หมายเหตุ..."
                  />
                </td>

                <!-- จัดการ -->
                <td class="text-center align-middle">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-info me-2"
                    @click="$emit('replace', index)"
                  >
                    <CIcon name="cil-settings" class="me-1"/>
                    แก้ไขไฟล์
                  </button>

                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="$emit('remove', index)"
                  >
                    <CIcon name="cil-trash" class="me-1"/>
                    ลบ
                  </button>
                </td>
              </tr>

              <tr v-if="files.length === 0">
                <td colspan="5" class="text-center py-5 text-muted italic">
                  -- ยังไม่มีการอัปโหลดเอกสารประกอบ --
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileManagement",

  props: {
    files: {
      type: Array,
      default: () => []
    }
  },

  emits: [
    'upload',
    'open',
    'replace',
    'remove',
    'update:files'
  ],

  methods: {
    updateFile(index, key, value) {
      const updatedFiles = [...this.files];
      updatedFiles[index] = {
        ...updatedFiles[index],
        [key]: value
      };

      this.$emit('update:files', updatedFiles);
    }
  }
};
</script>

<style scoped>
.table th {
  font-weight: 600;
  font-size: 14px;
}

.btn-outline-info,
.btn-outline-danger {
  padding: 2px 8px;
}
</style>
