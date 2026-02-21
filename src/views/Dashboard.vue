<template>
  <div class="app-layout">

    <!-- ───────────── SIDEBAR ───────────── -->
    <aside class="sidebar" :class="{ expanded: sidebarExpanded }">

      <!-- Header: Logo + hamburger -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="logo-text">LOGO</span>
        </div>
        <button class="hamburger-btn" @click="sidebarExpanded = !sidebarExpanded">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Subtitle -->
      <div class="sidebar-subtitle">
        <Transition name="fade-text">
          <span v-if="sidebarExpanded">ระบบพิจารณาข้อเสนอโครงการ</span>
        </Transition>
      </div>

      <!-- Nav items -->
      <nav class="sidebar-nav">
        <a
          v-for="item in navItems"
          :key="item.route"
          href="#"
          class="nav-item"
          :class="{ active: currentRoute === item.route }"
          :title="!sidebarExpanded ? item.label : ''"
          @click.prevent="currentRoute = item.route"
        >
          <span class="nav-icon-wrap">
            <!-- Grid icon -->
            <svg v-if="item.icon === 'grid'" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
            <!-- Bell icon -->
            <svg v-else-if="item.icon === 'bell'" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <!-- File icon -->
            <svg v-else-if="item.icon === 'file'" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </span>

          <Transition name="fade-text">
            <span v-if="sidebarExpanded" class="nav-label">{{ item.label }}</span>
          </Transition>
        </a>
      </nav>
    </aside>

    <!-- Overlay (กดปิด sidebar) -->
    <Transition name="overlay-fade">
      <div v-if="sidebarExpanded" class="sidebar-overlay" @click="sidebarExpanded = false" />
    </Transition>

    <!-- ───────────── MAIN BODY ───────────── -->
    <div class="app-body" :class="{ 'sidebar-open': sidebarExpanded }">

      <!-- ───────── TOPBAR ───────── -->
      <header class="topbar" :style="{ left: sidebarExpanded ? '240px' : '72px' }">

        <div class="topbar-right">
          <!-- Language switcher -->
          <div class="lang-switcher">
            <span
              v-for="l in ['TH', 'EN']"
              :key="l"
              :class="{ active: lang === l }"
              @click="lang = l"
            >{{ l }}</span>
            <span class="divider">|</span>
          </div>

          <!-- Bell -->
          <div class="notif-dropdown-wrap">
  <button class="bell-btn" @click="notifOpen = !notifOpen">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
    <span class="bell-badge" v-if="unreadCount > 0"></span>
  </button>

  <Transition name="dropdown">
    <div v-if="notifOpen" class="dropdown-panel">

      <div class="dp-header">
        <span class="dp-title">การแจ้งเตือน</span>
        <span class="dp-unread" v-if="unreadCount > 0">{{ unreadCount }} ใหม่</span>
      </div>

      <div class="dp-list">
        <div
          v-for="item in notifications.slice(0, 5)"
          :key="item.id"
          class="dp-item"
          :class="{ unread: !item.read }"
          @click="item.read = true; notifOpen = false; $router.push({ name: 'Notifications' })"
        >
          <div class="dp-icon" :class="item.iconClass">
            <svg v-if="item.icon === 'person'" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <svg v-else-if="item.icon === 'edit'" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <svg v-else-if="item.icon === 'check'" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <svg v-else-if="item.icon === 'info'" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <svg v-else-if="item.icon === 'alert'" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>

          <div class="dp-content">
            <div class="dp-item-title">{{ item.title }}</div>
            <div class="dp-item-desc">{{ item.desc }}</div>
            <div class="dp-item-time">{{ item.time }}</div>
          </div>

          <span v-if="!item.read" class="dp-dot"></span>
        </div>
      </div>

      <div class="dp-footer">
        <button class="dp-view-all" @click="notifOpen = false; $router.push({ name: 'Notifications' })">
          ดูทั้งหมด
        </button>
      </div>

    </div>
  </Transition>

  <div v-if="notifOpen" class="dp-backdrop" @click="notifOpen = false" />
</div>
          <!-- User avatar -->
          <div class="user-menu">
            <div class="user-avatar">👤</div>
            <span class="caret">▾</span>
          </div>
        </div>
      </header>

      <!-- ───────── PAGE CONTENT ───────── -->
      <div class="page-wrapper">

        <!-- Floating Buttons -->
        <div class="floating-buttons">
          <CButton color="primary" class="fab-btn" @click="onSearch">
            <i class="bi bi-search"></i>
          </CButton>
          <CButton color="primary" class="fab-btn" @click="onAdd">
            <i class="bi bi-plus-lg"></i>
          </CButton>
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
                  <CTableHeaderCell style="width: 15%">
                    Activity
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <!-- Body -->
              <CTableBody>
                <CTableRow
                  v-for="(item, index) in researchProjects"
                  :key="item.id || index"
                  class="clickable-row"
                  @click="goToDetail(item.id)"
                >
                  <CTableDataCell>
                    <div class="project-title">{{ item.projectName }}</div>
                    <div class="project-leader">{{ item.projectLeader }}</div>
                  </CTableDataCell>

                  <CTableDataCell>{{ item.submitDate }}</CTableDataCell>

                  <CTableDataCell>
                    <div class="d-flex justify-content-between mb-2">
                      <strong>{{ item.progress }}%</strong>
                    </div>
                    <CProgress :value="item.progress" :color="progressColor(item.progress)" :height="8" />
                  </CTableDataCell>

                  <CTableDataCell>
                    <div class="small text-muted mb-1">บันทึกล่าสุด</div>
                    <strong class="activity-text">{{ item.activity }}</strong>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>

            </CTable>
          </CCardBody>
        </CCard>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',

  data() {
    return {
      // Sidebar / Topbar state
      sidebarExpanded: false,
      lang: 'TH',
      currentRoute: '/projects',
      navItems: [
        { icon: 'grid', label: 'โครงการของฉัน', route: '/projects' },
        { icon: 'bell', label: 'การแจ้งเตือน',  route: '/notifications' },
        { icon: 'file', label: 'รายงาน',         route: '/reports' },
      ],

      // Table data
      researchProjects: [],

    // ── Notification dropdown ──
    notifOpen: false,
    notifications: [
      {
        id: 1, icon: 'person', iconClass: 'icon-blue',
        title: 'การตอบรับเข้าร่วมโครงการ',
        desc: 'ผศ.ดร.โอดี ยืนยันการเข้าร่วม "ระบบจัดการขยะอัจฉริยะ" แล้ว',
        time: '10 นาทีที่แล้ว', read: false,
      },
      {
        id: 2, icon: 'edit', iconClass: 'icon-orange',
        title: 'แจ้งผลการพิจารณา: ให้แก้ไข RS-2568-000123',
        desc: 'ส่งข้อเสนอโครงการเพื่อขอรับการพิจารณาใหม่',
        time: '2 ชั่วโมงที่แล้ว', read: false,
      },
      {
        id: 3, icon: 'check', iconClass: 'icon-green',
        title: 'สถานะโครงการเปลี่ยนเป็น: รอตรวจสอบ',
        desc: 'โครงการได้รับเลขรหัสโครงการแล้ว',
        time: '1 วันที่แล้ว', read: true,
      },
      {
        id: 4, icon: 'info', iconClass: 'icon-gray',
        title: 'แจ้งปิดปรับปรุงระบบ',
        desc: 'ระบบจะปิดปรับปรุงคืนวันเสาร์ที่ 15 ก.พ. 00:00–04:00 น.',
        time: '1 วันที่แล้ว', read: true,
      },
      {
        id: 5, icon: 'alert', iconClass: 'icon-orange',
        title: 'ประธานสำนักแจ้งแก้ไขข้อมูล',
        desc: 'กรุณาปรับปรุง "ความสอดคล้องกลยุทธศาสตร์" ก่อนส่งต่อ',
        time: '2 วันที่แล้ว', read: true,
      },
    ],
  }
},

  async mounted() {
    await this.fetchResearch()
  },

  methods: {
    async fetchResearch() {
      try {
        const res  = await fetch('http://localhost:5000/api/research')
        const data = await res.json()
        this.researchProjects = data.map(item => ({
          id:           item._id,
          projectName:  item.titleTH,
          projectLeader: item.researchers?.mainResearcher?.name || '-',
          submitDate:   item.createdAt
            ? new Date(item.createdAt).toLocaleDateString('th-TH')
            : '-',
          progress: 50,
          activity: item.updatedAt ? this.formatTimeAgo(item.updatedAt) : '-',
        }))
      } catch (err) {
        console.error(err)
      }
    },

    progressColor(value) {
      if (value <= 30) return 'danger'
      if (value <= 60) return 'warning'
      if (value <= 80) return 'primary'
      return 'success'
    },

    goToDetail(id) {
      this.$router.push({ name: 'Research', params: { id } })
    },

    onAdd() {
      this.$router.push({ name: 'Research' })
    },

    onSearch() {
      // implement search logic
    },

    formatTimeAgo(date) {
      const diff    = Date.now() - new Date(date)
      const minutes = Math.floor(diff / 60000)
      const hours   = Math.floor(diff / 3600000)
      const days    = Math.floor(diff / 86400000)
      if (minutes < 1)  return 'เมื่อสักครู่'
      if (minutes < 60) return `${minutes} นาทีที่แล้ว`
      if (hours   < 24) return `${hours} ชั่วโมงที่แล้ว`
      return `${days} วันที่แล้ว`
    },
  },
}
</script>

<style scoped>
/* ═══════════════════════════════════
   CSS Variables
═══════════════════════════════════ */
:root {
  --sidebar-width:  72px;
  --sidebar-expanded-width: 240px;
  --topbar-height:  60px;
  --sidebar-bg:     #1a1a1a;
  --topbar-bg:      #2d3a2e;
  --accent:         #4a7c59;
  --accent-light:   #c8e6c9;
}

/* ═══════════════════════════════════
   Layout
═══════════════════════════════════ */
.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-body {
  margin-left: 72px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-body.sidebar-open {
  margin-left: 240px;
}

/* ═══════════════════════════════════
   Sidebar
═══════════════════════════════════ */
.sidebar {
  width: 72px;
  background: #574964;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  z-index: 200;
  border-right: 1px solid #2a2a2a;
  overflow: hidden;
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.expanded { width: 240px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;   /* เพิ่มบรรทัดนี้ */
  height: 60px;
  background: #111;
  border-bottom: 1px solid #2a2a2a;
  flex-shrink: 0;
}

.sidebar-logo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-text {
  font-weight: 700;
  font-size: 15px;
  color: #c8e6c9;
  letter-spacing: 2px;
  white-space: nowrap;
}

.hamburger-btn {
  flex-shrink: 0;
  width: 72px;
  height: 60px;
  background: none;
  border: none;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
}
.hamburger-btn:hover { color: #c8e6c9; }

.sidebar-subtitle {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  flex-shrink: 0;
  border-bottom: 1px solid #242424;
}
.sidebar-subtitle span {
  font-size: 11.5px;
  color: #6a8c6b;
  white-space: nowrap;
  font-weight: 500;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 10px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 46px;
  border-radius: 10px;
  padding: 0 12px;
  color: #888;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  transition: background 0.2s, color 0.2s;
}
.nav-item:hover,
.nav-item.active {
  background: #2a2a2a;
  color: #c8e6c9;
}

.nav-icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
  color: inherit;
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 199;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.28s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to     { opacity: 0; }

/* Fade-text transition */
.fade-text-enter-active { transition: opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s; }
.fade-text-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.fade-text-enter-from,
.fade-text-leave-to     { opacity: 0; transform: translateX(-8px); }

/* ═══════════════════════════════════
   Topbar
═══════════════════════════════════ */
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  background: #28293D;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  z-index: 100;
  border-bottom: 1px solid #3a4a3b;
  transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #d0d0d0;
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.lang-switcher span {
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  color: #4b6791;
  transition: color 0.2s;
}
.lang-switcher span.active { color: #000000; font-weight: 600; }
.lang-switcher span:hover  { color: #CADEFC; }
.lang-switcher .divider    { color: #555; cursor: default; }

.bell-btn {
  background: none;
  border: none;
  color: #494949;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.bell-badge {
  position: absolute;
  top: -2px; right: -2px;
  width: 9px; height: 9px;
  background: #ff0000;
  border-radius: 50%;
  border: 1.5px solid #ff0000;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s;
}
.user-menu:hover { background: rgba(255,255,255,0.08); }

.user-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: #DEFCF9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.caret { font-size: 12px; color: #474646; }

/* ═══════════════════════════════════
   Page content (ของเดิม)
═══════════════════════════════════ */
.page-wrapper {
  margin-top: 60px;
  background: linear-gradient(0deg, #fee9ce, #B2A6BE);
  padding: 40px;
  min-height: calc(100vh - 60px);
}

.clickable-row { cursor: pointer; }

.table-card {
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(13, 110, 253, 0.08);
  overflow: hidden;
}

.table-card table { font-size: 0.9rem; }

.table-card table th,
.table-card table td {
  padding: 1.3rem 1.5rem;
  vertical-align: middle;
}

thead tr {  
  background: #ffffff;
  border-bottom: 2px solid #e5e7eb; 
}
thead th { color: #111827;
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.table-card tbody tr {
  border-bottom: 1px solid #f1f3f9;
  transition: all 0.2s ease;
}
.table-card tbody tr:hover {
  background-color: #f4f8ff;
  transform: scale(1.002);
}

.project-title  { font-size: 1rem; font-weight: 600; color: #111827; }
.project-leader { font-size: 0.8rem; color: #6b7280; }
.activity-text  { font-size: 0.95rem; color: #1f2d3d; }

:deep(.progress)     { border-radius: 12px; background-color: #edf2ff; }
:deep(.progress-bar) { border-radius: 12px; transition: width 0.6s ease; }

.floating-buttons {
  position: fixed;
  bottom: 30px; right: 30px;
  display: flex;
  gap: 12px;
  z-index: 999;
}

.fab-btn {
  width: 50px; height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.25);
  transition: all 0.2s ease;
}
.fab-btn:hover { transform: translateY(-3px); }

/* ══ Notification Dropdown ══ */
.notif-dropdown-wrap { position: relative; }

.bell-btn {
  background: none; border: none;
  color: #c8e6c9; position: relative;
  display: flex; align-items: center;
  cursor: pointer; padding: 4px;
  border-radius: 8px;
  transition: background 0.2s;
}
.bell-btn:hover { background: rgba(255,255,255,0.1); }

.bell-badge {
  position: absolute; top: 2px; right: 2px;
  width: 9px; height: 9px;
  background: #ef5350; border-radius: 50%;
  border: 1.5px solid #2d3a2e;
}

.dp-backdrop {
  position: fixed; inset: 0; z-index: 149;
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: 360px;
  background: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  z-index: 150;
  overflow: hidden;
  border: 1px solid #2a2a2a;
}

.dropdown-panel::before {
  content: '';
  position: absolute;
  top: -8px; right: 18px;
  width: 16px; height: 16px;
  background: #1e1e1e;
  border-left: 1px solid #2a2a2a;
  border-top: 1px solid #2a2a2a;
  transform: rotate(45deg);
  border-radius: 2px;
}

.dp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #2a2a2a;
}
.dp-title { font-size: 16px; font-weight: 700; color: #e0e0e0; }
.dp-unread {
  font-size: 12px; font-weight: 600; color: #fff;
  background: #ef5350; padding: 2px 10px; border-radius: 99px;
}

.dp-list {
  max-height: 320px; overflow-y: auto;
  scrollbar-width: thin; scrollbar-color: #333 transparent;
}
.dp-list::-webkit-scrollbar { width: 4px; }
.dp-list::-webkit-scrollbar-thumb { background: #333; border-radius: 99px; }

.dp-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #2a2a2a;
  cursor: pointer; transition: background 0.15s;
  position: relative;
}
.dp-item:last-child { border-bottom: none; }
.dp-item:hover { background: #252525; }
.dp-item.unread { background: #1a2820; }
.dp-item.unread:hover { background: #1e3025; }

.dp-icon {
  flex-shrink: 0; width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-top: 2px;
}
.icon-blue   { background: #1e3a5f; color: #60a5fa; }
.icon-orange { background: #3d2408; color: #fb923c; }
.icon-green  { background: #14301e; color: #4ade80; }
.icon-gray   { background: #2a2a2a; color: #9ca3af; }

.dp-content { flex: 1; min-width: 0; }
.dp-item-title {
  font-size: 13px; font-weight: 600; color: #e0e0e0;
  line-height: 1.4; margin-bottom: 3px;
  display: -webkit-box;  line-clamp: 1;   -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.dp-item-desc {
  font-size: 12px; color: #777; line-height: 1.4; margin-bottom: 5px;
  display: -webkit-box;   line-clamp: 1;  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; overflow: hidden;
}
.dp-item-time { font-size: 11px; color: #555; }

.dp-dot {
  flex-shrink: 0; width: 8px; height: 8px;
  border-radius: 50%; background: #ef5350; margin-top: 6px;
}

.dp-footer {
  padding: 12px 20px;
  border-top: 1px solid #2a2a2a;
}
.dp-view-all {
  width: 100%; padding: 10px;
  background: #2a2a2a; border: none; border-radius: 10px;
  color: #c8e6c9; font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: 'Sarabun', sans-serif;
  transition: background 0.2s;
}
.dp-view-all:hover { background: #333; }

.dropdown-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.dropdown-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }
</style>