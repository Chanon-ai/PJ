<template>
  <div class="section-12-container w-100">
    <div class="mb-4">
      <div class="btn-group shadow-sm">
        <CButton 
          v-for="d in [6, 12, 24]" :key="d"
          :color="duration === d ? 'primary' : 'secondary'" 
          variant="outline"
          @click="changeDuration(d)"
          class="px-4 py-2 font-weight-bold"
        >
          {{ d === 12 ? '1 ปี (12 เดือน)' : d === 24 ? '2 ปี (24 เดือน)' : d + ' เดือน' }}
        </CButton>
      </div>
    </div>

    <div class="gantt-container shadow-sm rounded border w-100 overflow-auto">
      <div class="gantt-table">
        
        <div class="gantt-row header-row sticky-top">
          <div class="cell fixed-left sticky-col bg-primary text-white font-weight-bold text-center">กิจกรรม</div>
          <div class="gantt-months-area d-flex">
            <div 
              v-for="m in duration" 
              :key="'h-' + m" 
              class="month-cell header bg-primary text-white font-weight-bold text-center small border-right border-white-50"
            >
              ด.{{ m }}
            </div>
          </div>
          <div class="cell fixed-right sticky-col bg-primary text-white font-weight-bold text-center">ผู้รับผิดชอบ</div>
        </div>

        <div v-for="(act, index) in activities" :key="'row-' + index" class="gantt-row content-row">
          
          <div class="cell fixed-left sticky-col bg-white align-items-stretch">
            <div class="input-wrapper w-100 h-100">
              <textarea 
                v-model="act.name" 
                placeholder="ระบุกิจกรรม..." 
                class="auto-grow-input"
                @input="autoResize"
              ></textarea>
            </div>
          </div>

          <div class="gantt-months-area d-flex bg-white">
            <div 
              v-for="(checked, mIndex) in act.months" 
              :key="'cell-' + index + '-' + mIndex"
              class="month-cell d-flex align-items-center justify-content-center border-right"
              :class="{ 'bg-selected': checked }"
              @click="toggleMonth(index, mIndex)"
            >
              <div v-if="checked" class="check-indicator bg-primary"></div>
            </div>
          </div>

          <div class="cell fixed-right sticky-col bg-white d-flex align-items-stretch">
            <div class="d-flex w-100 align-items-center">
              <textarea 
                v-model="act.owner" 
                placeholder="ผู้รับผิดชอบ" 
                class="auto-grow-input flex-grow-1"
                @input="autoResize"
              ></textarea>
              <CButton 
                v-if="activities.length > 1"
                color="danger" 
                variant="ghost" 
                size="sm" 
                class="ml-1 p-1"
                @click="removeActivity(index)"
              >
                <CIcon name="cil-trash" size="sm"/>
              </CButton>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="mt-3 d-flex justify-content-start">
      <CButton color="info" size="sm" variant="outline" @click="addActivity" class="px-3 font-weight-bold">
        <CIcon name="cil-plus" class="mr-1"/> เพิ่มกิจกรรมใหม่
      </CButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResearchSection12",
  data() {
    return {
      duration: 12,
      activities: [
        { name: "", owner: "", months: Array(12).fill(false) }
      ]
    };
  },
  methods: {
    changeDuration(newDuration) {
      this.duration = newDuration;
      this.activities.forEach(act => {
        const currentMonths = act.months;
        if (currentMonths.length < newDuration) {
          act.months = [...currentMonths, ...Array(newDuration - currentMonths.length).fill(false)];
        } else {
          act.months = currentMonths.slice(0, newDuration);
        }
      });
    },
    addActivity() {
      this.activities.push({
        name: "",
        owner: "",
        months: Array(this.duration).fill(false)
      });
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleMonth(actIndex, mIndex) {
      this.$set(this.activities[actIndex].months, mIndex, !this.activities[actIndex].months[mIndex]);
    },
    autoResize(event) {
      const element = event.target;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  }
};
</script>

<style scoped>
.gantt-container {
  width: 100%;
  max-height: 600px;
  position: relative;
  border: 1px solid #ced4da;
}

.gantt-table {
  display: flex;
  flex-direction: column;
  min-width: 1200px; /* บังคับความกว้างเพื่อให้เลื่อนแนวนอนได้ถ้าเดือนเยอะ */
}

/* แถว: หัวใจสำคัญคือ align-items: stretch */
.gantt-row {
  display: flex;
  border-bottom: 1px solid #ced4da;
  align-items: stretch; 
  min-height: 50px;
}

.header-row {
  position: sticky;
  top: 0;
  z-index: 10;
}

.cell {
  padding: 10px;
  display: flex;
  border-right: 1px solid #ced4da;
}

/* คอลัมน์ล็อกตำแหน่ง */
.sticky-col {
  position: sticky;
  z-index: 5;
}

.fixed-left {
  left: 0;
  width: 220px;
  min-width: 220px;
  border-right: 2px solid #321fdb;
}

.fixed-right {
  right: 0;
  width: 220px;
  min-width: 220px;
  border-left: 2px solid #321fdb;
}

/* ส่วนเดือน */
.gantt-months-area {
  flex-grow: 1;
}

.month-cell {
  flex: 1;
  min-width: 35px;
  cursor: pointer;
  border-right: 1px solid #ebedef;
  transition: background 0.2s;
}

.month-cell.header {
  height: 50px;
  padding-top: 10px;
}

.month-cell:hover {
  background-color: #f8f9fa;
}

/* ช่องพิมพ์ข้อความที่ขยายความสูงได้เอง */
.auto-grow-input {
  width: 100%;
  border: none;
  background: transparent;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  overflow: hidden;
  height: 100%;
  color: #4f5d73;
}

.auto-grow-input:focus {
  outline: none;
  background: #fdfdfd;
}

/* สีเมื่อเลือกเดือน */
.bg-selected {
  background-color: rgba(50, 31, 219, 0.15) !important;
}

.check-indicator {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(50, 31, 219, 0.3);
}

.border-white-50 {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
</style>