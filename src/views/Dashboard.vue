<template>
  <div class="page-wrapper">
    <CCard class="table-card">
      <CCardBody class="p-0">
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
              @click="goToDetail()">

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
      researchProjects: [
        {
          id: 1,
          projectName: "การพัฒนาระบบ AI เพื่อวิเคราะห์ข้อมูลสุขภาพ",
          projectLeader: "รศ.ดร.สมชาย ใจดี",
          submitDate: "2026-01-10",
          progress: 25,
          activity: "10 sec ago",
        },
        {
          id: 2,
          projectName: "การศึกษาพฤติกรรมผู้บริโภคในยุคดิจิทัล",
          projectLeader: "ผศ.ดร.สุภาวดี แสงทอง",
          submitDate: "2026-01-05",
          progress: 60,
          activity: "5 minutes ago",
        },
        {
          id: 3,
          projectName: "นวัตกรรมพลังงานสะอาดจากวัสดุชีวภาพ",
          projectLeader: "ดร.กิตติศักดิ์ พรหมมา",
          submitDate: "2025-12-28",
          progress: 90,
          activity: "1 hour ago",
        },
        {
          id: 4,
          projectName: "แพลตฟอร์มการเรียนรู้ออนไลน์แบบ Adaptive",
          projectLeader: "ผศ.ดร.วรรณา ศรีสุข",
          submitDate: "2025-12-20",
          progress: 80,
          activity: "Last week",
        },
      ],
    };
  },
  methods: {
    progressColor(value) {
      if (value <= 30) return "danger";
      if (value <= 60) return "warning";
      if (value <= 80) return "primary";
      return "success";
    },

    goToDetail() {
      this.$router.push({ name: 'Research' })
    }

  }
  ,
};
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
</style>
