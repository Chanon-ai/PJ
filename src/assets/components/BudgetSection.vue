<template>
  <div class="budget-form-container w-100">
    <input type="file" ref="fileInput" style="display: none" @change="onFilePicked" />

    <div v-for="(cat, ci) in categories" :key="ci" class="mb-5">
      <CCard class="shadow-sm border-0 mb-3 w-100">
        <CCardHeader class="bg-primary text-white py-2 d-flex justify-content-between align-items-center flex-wrap">
          <h6 class="m-0 font-weight-bold">
            <CIcon name="cil-money" class="mr-2"/> {{ cat.title }}
          </h6>
          <div class="d-flex align-items-center mt-2 mt-md-0" style="gap: 10px;">
            <CButton color="light" size="sm" variant="outline" class="text-white border-white" @click="addManualRow(ci)">
              <CIcon name="cil-plus" class="mr-1"/> เพิ่มรายการเอง
            </CButton>
            <CButton color="light" size="sm" variant="outline" class="text-white border-white" @click="triggerFileUpload(ci)">
              <CIcon name="cil-paperclip" class="mr-1"/> แนบเอกสาร
            </CButton>
          </div>
        </CCardHeader>
        
        <CCardBody class="p-3 bg-light">
          <div v-if="cat.options.length > 0" class="mb-3" style="max-width: 500px;">
            <CSelect 
              :options="['', ...cat.options]" 
              :value.sync="cat.selected" 
              @change="addRow(ci)" 
              placeholder="-- เลือกรายการย่อยเพื่อเพิ่มในตาราง --" 
              custom 
              class="shadow-sm border-primary" 
            />
          </div>

          <div class="table-responsive bg-white rounded shadow-sm border overflow-hidden w-100">
            <table class="table table-sm table-bordered table-striped mb-0 align-middle">
              <thead class="bg-dark text-white text-center small font-weight-bold">
                <tr>
                  <th style="width: 25%">รายการ</th>
                  <th style="width: 25%">รายละเอียด/เครื่องคิดเลข (เกณฑ์ มฟล. 2569)</th>
                  <th style="width: 12%">งบรวม (บาท)</th>
                  <th style="width: 10%">งวด 1</th>
                  <th style="width: 10%">งวด 2</th>
                  <th style="width: 10%">งวด 3</th>
                  <th style="width: 40px">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="cat.rows.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted small">ยังไม่มีรายการในหมวดนี้</td>
                </tr>
                <tr v-for="(r, ri) in cat.rows" :key="ri">
                  <td class="px-3 py-2">
                    <div v-if="!r.isManual && !r.fileUrl" class="font-weight-bold text-dark">{{ r.name }}</div>
                    <CInput v-else v-model="r.name" size="sm" class="mb-0" placeholder="ระบุชื่อรายการ..." />
                    
                    <div v-if="r.fileUrl" class="mt-2 d-flex align-items-center flex-wrap" style="gap: 6px;">
                      <span :class="['badge px-2 py-1 text-uppercase shadow-sm', getFileBadgeClass(r.fileName)]" style="font-size: 9px; min-width: 35px; border-radius: 4px;">
                        {{ getFileExtension(r.fileName) }}
                      </span>
                      <CButton color="info" variant="outline" size="sm" class="py-0 px-2 shadow-sm d-flex align-items-center" style="font-size: 10px; height: 20px;" @click="viewFile(r.fileUrl)">
                        <CIcon name="cil-folder" size="sm" class="mr-1"/> ดูไฟล์
                      </CButton>
                      <small class="text-muted d-block w-100 mt-1" style="font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ r.fileName }}</small>
                    </div>
                  </td>

                  <td class="py-2">
                    <div v-if="r.multipliers" class="d-flex align-items-center justify-content-center" style="gap: 5px;">
                      <div v-for="(m, mi) in r.multipliers" :key="mi" class="text-center">
                        <CInput type="number" v-model.number="m.val" size="sm" class="mb-0 text-center shadow-none" style="width: 60px;" @input="calculateRowTotal(r)" />
                        <small class="text-muted d-block" style="font-size: 9px">{{ m.label }}</small>
                      </div>
                    </div>
                    <CInput v-else v-model="r.detail" size="sm" class="mb-0 shadow-none border-info" placeholder="เช่น 500*3+100" @input="calculateManual(r)" />
                  </td>

                  <td class="py-2">
                    <div class="text-right font-weight-bold text-primary py-1 px-2 border rounded bg-light small shadow-none">
                      {{ Number(r.total || 0).toLocaleString() }}
                    </div>
                  </td>

                  <td v-for="p in ['p1', 'p2', 'p3']" :key="p" class="py-2">
                    <CInput type="number" v-model.number="r[p]" size="sm" :class="['mb-0 text-right shadow-none', r.errors[p] ? 'is-invalid-bg text-danger border-danger' : '']" @input="validateInstallments(r, p)" />
                    <small v-if="r.errors[p]" class="text-danger d-block mt-1 font-weight-bold text-center" style="font-size: 8px;">{{ r.errors[p] }}</small>
                  </td>
                  
                  <td class="text-center py-2">
                    <CButton color="danger" variant="ghost" size="sm" @click="removeRow(ci, ri)"><CIcon name="cil-trash"/></CButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </div>

    <CCard class="mt-5 border-primary shadow bg-white w-100 overflow-hidden">
      <CCardBody class="p-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap" style="gap: 20px;">
          <div>
            <h4 class="m-0 font-weight-bold text-dark">สรุปงบประมาณรวมทั้งสิ้น (พ.ศ. 2569)</h4>
            <small class="text-muted">คำนวณอัตโนมัติตามหลักเกณฑ์การตั้งงบประมาณมหาวิทยาลัยแม่ฟ้าหลวง</small>
            <div class="h2 m-0 text-primary font-weight-bold mt-2">
              {{ grandTotal.toLocaleString() }} <small class="text-muted" style="font-size: 14px">บาท</small>
            </div>
          </div>
          <div class="d-flex" style="gap: 12px;">
            <CButton color="danger" variant="outline" class="px-4 py-2 font-weight-bold" @click="resetForm">
              <CIcon name="cil-trash" class="mr-1"/> ล้างฟอร์มทั้งหมด
            </CButton>
            <CButton color="primary" class="px-5 py-2 font-weight-bold shadow" @click="saveDraft">
              <CIcon name="cil-save" class="mr-1"/> บันทึกแบบร่าง
            </CButton>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: "BudgetSection",
  data() {
    return {
      activeCategoryIndex: null,
      categories: [
        this.makeCat("หมวดค่าตอบแทน", ["ค่าตอบแทน – นักศึกษาช่วยงานด้านวิชาการ", "ค่าตอบแทน – นักศึกษาช่วยงานทั่วไป", "ค่าตอบแทน – อาสาสมัคร", "ค่าตอบแทน – ผู้ให้ข้อมูล"]),
        this.makeCat("หมวดค่าใช้สอย", ["ค่าอาหารกลางวัน (120.-)", "ค่าอาหารว่าง (50.-)", "จ้างเหมาวิเคราะห์ทดสอบ (TOR)"]),
        this.makeCat("หมวดค่าเดินทาง", ["ค่าเบี้ยเลี้ยง (350.-/วัน)", "ค่าที่พัก (เหมา 800.-)", "รถยนต์ส่วนบุคคล (4.-/กม.)"]),
        this.makeCat("หมวดค่าวัสดุ", ["ค่าวัสดุสำนักงาน", "ค่าวัสดุคอมพิวเตอร์", "น้ำมันเชื้อเพลิงพาหนะเช่า"]),
        this.makeCat("หมวดค่าสาธารณูปโภค", []),
        this.makeCat("หมวดครุภัณฑ์", [])
      ]
    };
  },
  computed: {
    grandTotal() {
      return this.categories.reduce((sum, c) => sum + c.rows.reduce((s, r) => s + Number(r.total || 0), 0), 0);
    }
  },
  methods: {
    makeCat(title, options = []) { return { title, options, selected: "", rows: [] }; },
    addRow(ci) {
      const cat = this.categories[ci];
      if (!cat.selected) return;
      cat.rows.push(this.newRow(cat.selected, false, null, cat.title));
      cat.selected = "";
    },
    addManualRow(ci) { this.categories[ci].rows.push(this.newRow("", true, null, this.categories[ci].title)); },
    
    newRow(name, isManual, fileName = null, catTitle = "", fileUrl = null) {
      let multipliers = null;
      // อัตรา มฟล. 2569
      if (name.includes("วิชาการ")) multipliers = [{ label: "ชม.", val: 0 }, { label: "คน", val: 0 }, { label: "บาท", val: 60 }];
      else if (name.includes("ทั่วไป")) multipliers = [{ label: "ชม.", val: 0 }, { label: "คน", val: 0 }, { label: "บาท", val: 30 }];
      else if (name.includes("อาหารกลางวัน")) multipliers = [{ label: "มื้อ", val: 0 }, { label: "คน", val: 0 }, { label: "บาท", val: 120 }];
      else if (name.includes("อาหารว่าง")) multipliers = [{ label: "มื้อ", val: 0 }, { label: "คน", val: 0 }, { label: "บาท", val: 50 }];
      else if (name.includes("เบี้ยเลี้ยง")) multipliers = [{ label: "วัน", val: 0 }, { label: "คน", val: 0 }, { label: "บาท", val: 350 }];
      else if (name.includes("รถยนต์ส่วนบุคคล")) multipliers = [{ label: "กม.", val: 0 }, { label: "รอบ", val: 2 }, { label: "บาท", val: 4 }];
      else if (catTitle === "หมวดค่าวัสดุ" || name.includes("จ้างเหมา")) multipliers = [{ label: "หน่วย", val: 0 }, { label: "บาท", val: 0 }];

      return { 
        name, detail: "", p1: 0, p2: 0, p3: 0, total: 0, 
        isManual, fileName, fileUrl, multipliers, 
        errors: { p1: "", p2: "", p3: "" } 
      };
    },

    getFileExtension(filename) { return filename ? filename.split('.').pop() : ""; },
    getFileBadgeClass(filename) {
      const ext = this.getFileExtension(filename).toLowerCase();
      if (ext === 'pdf') return 'badge-danger';
      if (['xls', 'xlsx', 'csv'].includes(ext)) return 'badge-success';
      if (['doc', 'docx'].includes(ext)) return 'badge-primary';
      if (['jpg', 'jpeg', 'png'].includes(ext)) return 'badge-warning';
      return 'badge-secondary';
    },

    calculateManual(row) {
      if (!row.detail) { row.total = 0; return; }
      try {
        const sanitized = row.detail.replace(/[^-+*/().0-9]/g, '');
        if (sanitized) {
          const result = new Function(`return ${sanitized}`)();
          row.total = isFinite(result) ? result : 0;
          row.p1 = 0; row.p2 = 0; row.p3 = 0;
        }
      } catch (e) { /* Ignore error while typing */ }
    },
    calculateRowTotal(row) {
      if (row.multipliers) {
        row.total = row.multipliers.reduce((acc, m) => acc * (Number(m.val) || 0), 1);
        row.p1 = 0; row.p2 = 0; row.p3 = 0;
      }
    },
    validateInstallments(row, field) {
      const sum = Number(row.p1 || 0) + Number(row.p2 || 0) + Number(row.p3 || 0);
      if (sum > row.total) { row.errors[field] = `เกินงบ!`; row[field] = 0; }
      else { row.errors.p1 = ""; row.errors.p2 = ""; row.errors.p3 = ""; }
    },
    triggerFileUpload(ci) { this.activeCategoryIndex = ci; this.$refs.fileInput.click(); },
    onFilePicked(event) {
      const file = event.target.files[0];
      if (file && this.activeCategoryIndex !== null) {
        const fileUrl = URL.createObjectURL(file);
        const cat = this.categories[this.activeCategoryIndex];
        cat.rows.push(this.newRow("", true, file.name, cat.title, fileUrl));
      }
      event.target.value = ""; 
    },
    viewFile(url) { window.open(url, '_blank'); },
    removeRow(ci, ri) {
      const row = this.categories[ci].rows[ri];
      if (row.fileUrl) URL.revokeObjectURL(row.fileUrl);
      this.categories[ci].rows.splice(ri, 1);
    },
    resetForm() {
      this.categories.forEach(c => {
        c.rows.forEach(r => { if (r.fileUrl) URL.revokeObjectURL(r.fileUrl); });
        c.rows = [];
      });
    },
    saveDraft() { alert("บันทึกเรียบร้อย"); }
  }
};
</script>

<style scoped>
/* ธีมขยายเต็มพื้นที่และเส้นคั่นสวยงาม */
.budget-form-container { max-width: 100%; }
.table td .form-control { border: 1px solid #d8dbe0; border-radius: 4px; }
.is-invalid-bg { background-color: #fff5f5 !important; transition: all 0.3s ease; }
.bg-light { background-color: #f8f9fa !important; }
.border-primary { border-color: #321fdb !important; }

/* Badge สีมาตรฐาน Bootstrap */
.badge-danger { background-color: #e55353; color: white; }
.badge-success { background-color: #2eb85c; color: white; }
.badge-primary { background-color: #321fdb; color: white; }
.badge-warning { background-color: #f9b115; color: white; }
.badge-secondary { background-color: #ced4da; color: #4f5d73; }

/* การตกแต่งตารางเพิ่มเติม */
.table thead th { vertical-align: middle; padding: 10px; }
.table-sm td, .table-sm th { padding: 0.5rem; }
</style>