<template>
  <div class="page-wrapper">
    <!-- Action Buttons -->
    <div class="d-flex justify-content-end mb-3 gap-2">
      <!-- Floating Buttons -->
      <div class="floating-buttons">
        <CButton color="primary" class="fab-btn" @click="onSearch">
          <i class="bi bi-search"></i>
        </CButton>

        <CButton color="primary" class="fab-btn" @click="onAdd">
          <i class="bi bi-plus-lg"></i>
        </CButton>
      </div>


    </div>
    <CCard class="table-card">
      <CCardBody class="p-3">
        <CTable hover class="align-middle w-100">

          <!-- Header -->
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style="width: 35%">
                ชื่อโครงการวิจัย / หัวหน้าโครงการ
              </CTableHeaderCell>
              <CTableHeaderCell style="width: 15%">
                วันที่ยื่น
              </CTableHeaderCell>
              <CTableHeaderCell style="width: 25%">
                สถานะ
              </CTableHeaderCell>
              <CTableHeaderCell style="width: 15%" class="ms-5">
                Activity
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <!-- Body -->
          <CTableBody>
            <CTableRow v-for="(item, index) in researchProjects" :key="item.id || index" class="clickable-row"
              @click="goToDetail(item.id)">
              <!-- Project -->
              <CTableDataCell>
                <div class="project-title">
                  {{ item.projectName }}
                </div>
                <div class="project-leader">
                  {{ item.projectLeader }}
                </div>
              </CTableDataCell>

              <!-- Submit Date -->
              <CTableDataCell>
                {{ item.submitDate }}
              </CTableDataCell>

              <!-- Progress -->
              <CTableDataCell>
                <div class="d-flex justify-content-between mb-2">
                  <strong>{{ item.progress }}%</strong>
                </div>
                <CProgress :value="item.progress" :color="progressColor(item.progress)" :height="8" />
              </CTableDataCell>

              <!-- Activity -->
              <CTableDataCell class="ms-5">
                <div class="small text-muted mb-1">
                  บันทึกล่าสุด
                </div>
                <strong class="activity-text">
                  {{ item.activity }}
                </strong>
              </CTableDataCell>

            </CTableRow>
          </CTableBody>

        </CTable>
      </CCardBody>
    </CCard>


  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      researchProjects: []
    };
  },

  async mounted() {
    await this.fetchResearch()
  },

  methods: {

    async fetchResearch() {
      try {
        const res = await fetch("http://localhost:5000/api/research")
        const data = await res.json()
        this.researchProjects = data.map(item => ({
          id: item._id,
          projectName: item.titleTH,
          projectLeader: item.researchers?.mainResearcher?.name || "-",
          submitDate: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("th-TH")
            : "-",
          progress: 50,
          activity: item.updatedAt
            ? this.formatTimeAgo(item.updatedAt)
            : "-"
        }))
      } catch (err) {
        console.error(err)
      }
    },

    progressColor(value) {
      if (value <= 30) return "danger";
      if (value <= 60) return "warning";
      if (value <= 80) return "primary";
      return "success";
    },

    goToDetail(id) {
      this.$router.push({ name: 'Research', params: { id } })
    }
    ,
    onAdd() {
      this.$router.push({ name: 'Research' })
    },
    formatTimeAgo(date) {
      const diff = Date.now() - new Date(date)
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return "เมื่อสักครู่"
      if (minutes < 60) return `${minutes} นาทีที่แล้ว`
      if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`
      return `${days} วันที่แล้ว`
    }

  }
}

</script>

<style>
.clickable-row {
  cursor: pointer;
}

.page-wrapper {
  background: linear-gradient(135deg, #eef4ff, #f8fbff);
  padding: 40px;
  min-height: 100vh;
}

/* Card */
.table-card {
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(13, 110, 253, 0.08);
  overflow: hidden;
}

/* Table spacing */
.table-card table {
  font-size: 0.9rem;
}

.table-card table th,
.table-card table td {
  padding: 1.3rem 1.5rem;
  vertical-align: middle;
}

thead tr {
  background: linear-gradient(90deg, #0d6efd, #3d8bfd);
}

thead th {
  color: #ffffff;
  border: none;
  font-weight: 600;
}


.table-card tbody tr {
  border-bottom: 1px solid #f1f3f9;
  transition: all 0.2s ease;
}

.table-card tbody tr:hover {
  background-color: #f4f8ff;
  transform: scale(1.002);
}

.project-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.project-leader {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Activity */
.activity-text {
  font-size: 0.95rem;
  color: #1f2d3d;
}

/* Progress */
:deep(.progress) {
  border-radius: 12px;
  background-color: #edf2ff;
}

:deep(.progress-bar) {
  border-radius: 12px;
  transition: width 0.6s ease;
}

.action-btn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.floating-buttons {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 12px;
  z-index: 999;
}

.fab-btn {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.25);
  transition: all 0.2s ease;
  text-shadow:
    0.5px 0 currentColor,
    -0.5px 0 currentColor,
    0 0.5px currentColor,
    0 -0.5px currentColor;
}

.fab-btn:hover {
  transform: translateY(-3px);
}
</style>
