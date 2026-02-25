<template>
  <div class="app-layout">
    <!-- Overlay -->
    <Transition name="overlay-fade">
      <div v-if="sidebarExpanded" class="sidebar-overlay" @click="sidebarExpanded = false" />
    </Transition>

    <!-- ───────────── MAIN BODY ───────────── -->
    <div class="app-body" :class="{ 'sidebar-open': sidebarExpanded }">

     
          <!-- Mark all read -->
          <div class="notif-toolbar" v-if="unreadCount > 0">
            <span class="unread-count">{{ unreadCount }} รายการยังไม่ได้อ่าน</span>
            <button class="btn-mark-all" @click="markAllRead">อ่านทั้งหมด</button>
          </div>

          <!-- Groups -->
          <div v-for="group in filteredGroups" :key="group.label" class="notif-group">

            <!-- Group header -->
            <div class="group-header">
              <span class="group-label">{{ group.label }}</span>
            </div>

            <!-- Notification items -->
            <div
              v-for="item in group.items"
              :key="item.id"
              class="notif-item"
              :class="{ unread: !item.read }"
              @click="markRead(item)"
            >
              <!-- Icon -->
              <div class="notif-icon" :class="item.iconClass">
                <!-- person -->
                <svg v-if="item.icon === 'person'" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <!-- edit -->
                <svg v-else-if="item.icon === 'edit'" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <!-- check -->
                <svg v-else-if="item.icon === 'check'" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <!-- info -->
                <svg v-else-if="item.icon === 'info'" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <!-- alert -->
                <svg v-else-if="item.icon === 'alert'" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>

              <!-- Content -->
              <div class="notif-content">
                <div class="notif-title">{{ item.title }}</div>
                <div class="notif-desc">{{ item.desc }}</div>
                <div class="notif-actions" v-if="item.actions && item.actions.length">
                  <button
                    v-for="action in item.actions"
                    :key="action.label"
                    class="notif-action-btn"
                    @click.stop="action.handler && action.handler()"
                  >{{ action.label }} ›</button>
                </div>
              </div>

              <!-- Right: time + unread dot -->
              <div class="notif-meta">
                <span class="notif-time">{{ item.time }}</span>
                <span v-if="!item.read" class="unread-dot"></span>
              </div>
            </div>

          </div>

          <!-- Empty state -->
          <div v-if="filteredGroups.length === 0" class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <p>ไม่มีการแจ้งเตือน</p>
          </div>

        </div>
      </div>
</template>

<script>
export default {
  name: 'NotificationPage',

  data() {
    return {
         
      // Layout
      sidebarExpanded: false,
      lang: 'TH',
      currentRoute: '/notifications',
      navItems: [
        { icon: 'grid', label: 'โครงการของฉัน',  route: '/projects' },
        { icon: 'bell', label: 'การแจ้งเตือน',    route: '/notifications' },
        { icon: 'file', label: 'รายงาน',           route: '/reports' },
        { icon: 'user', label: 'โปรไฟล์',          route: '/profile' },
      ],

      // Filter
      activeFilter: 'all',
      filterTabs: [
        { key: 'all',    label: 'ทั้งหมด' },
        { key: 'unread', label: 'ยังไม่ได้อ่าน' },
      ],
      // Notifications data
      notifications: [
        // ─── ล่าสุด ───
        {
          id: 1,
          group: 'recent',
          icon: 'person',
          iconClass: 'icon-blue',
          title: 'การตอบรับเข้าร่วมโครงการ',
          desc: 'ผศ.ดร.โอดี (ผู้ร่วมวิจัย) ได้ตอบยืนยันการเข้าร่วมโครงการ "ระบบจัดการขยะอัจฉริยะ" เรียบร้อยแล้ว',
          time: '10นาทีที่แล้ว',
          read: false,
          actions: [{ label: 'ดูสถานะคืมวิจัย' }],
        },
        {
          id: 2,
          group: 'recent',
          icon: 'edit',
          iconClass: 'icon-orange',
          title: 'แจ้งผลการพิจารณา: ให้แก้ไขโครงการRS-2568-000123',
          desc: 'ผศ.ดร. ชานนท์ ส่งข้อเสนอโครงการ "ระบบจัดการขยะอัจฉริยะ" เพื่อขอรับการพิจารณา',
          time: '2ชั่วโมงที่แล้ว',
          read: false,
          actions: [{ label: 'แก้ไขข้อเสนอโครงการ' }],
        },

        // ─── ก่อนหน้านี้ ───
        {
          id: 3,
          group: 'earlier',
          icon: 'check',
          iconClass: 'icon-green',
          title: 'สถานะโครงการเปลี่ยนเป็น: รอเจ้าหน้าที่ตรวจสอบ',
          desc: 'โครงการของผศ.ดร. ชานนท์ ได้รับเลขรหัสโครงการแล้ว',
          time: '1วันที่แล้ว',
          read: true,
          actions: [{ label: 'ติดตามสถานะ' }],
        },
        {
          id: 4,
          group: 'earlier',
          icon: 'info',
          iconClass: 'icon-gray',
          title: 'แจ้งปิดปรับปรุงระบบ',
          desc: 'ระบบจะทำการบำรุงรักษาปรับปรุงช่วงเวลาในคืนวันเสาร์ที่ 15 ก.พ. เวลา 00:00 - 04:00 น.',
          time: '1วันที่แล้ว',
          read: true,
          actions: [],
        },
        {
          id: 5,
          group: 'earlier',
          icon: 'alert',
          iconClass: 'icon-orange',
          title: 'ประธานสำนักแจ้งแก้ไขข้อมูล',
          desc: 'กรุณาปรับปรุง "ความสอดคล้องกลยุทธศาสตร์" เพิ่มเติมก่อนส่งเข้าสู่กระบวนการต่อไป',
          time: '2วันที่แล้ว',
          read: true,
          actions: [{ label: 'แก้ไขข้อมูล' }],
        },
      ],

      
    }
  },

  computed: {
    unreadCount() {
      return this.notifications.filter(n => !n.read).length
    },

    filteredNotifications() {
      if (this.activeFilter === 'unread') {
        return this.notifications.filter(n => !n.read)
      }
      return this.notifications
    },

    filteredGroups() {
      const groups = [
        { key: 'recent',  label: 'ล่าสุด' },
        { key: 'earlier', label: 'ก่อนหน้านี้' },
      ]
      return groups
        .map(g => ({
          label: g.label,
          items: this.filteredNotifications.filter(n => n.group === g.key),
        }))
        .filter(g => g.items.length > 0)
    },
  },

  methods: {
    markRead(item) {
      item.read = true
    },

    markAllRead() {
      this.notifications.forEach(n => { n.read = true })
    },
  },
}
</script>

<style scoped>
/* ══════════════════════════════════
   Layout
══════════════════════════════════ */
.app-layout { display: flex; min-height: 100vh; }

.app-body {
  margin-left: 72px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.app-body.sidebar-open { margin-left: 240px; }

/* ══════════════════════════════════
   Sidebar
══════════════════════════════════ */
.sidebar {
  width: 72px;
  background: #1a1a1a;
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
  justify-content: center;
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
  opacity: 0;
  transition: opacity 0.2s;
}
.sidebar.expanded .sidebar-logo { opacity: 1; }

.logo-text {
  font-weight: 700;
  font-size: 15px;
  color: #c8e6c9;
  letter-spacing: 2px;
  white-space: nowrap;
}

.hamburger-btn {
  flex-shrink: 0;
  width: 72px; height: 60px;
  background: none; border: none;
  color: #aaa;
  display: flex; align-items: center; justify-content: center;
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
.nav-item.active { background: #2a2a2a; color: #c8e6c9; }

.nav-icon-wrap {
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  width: 22px;
}
.nav-label { font-size: 14px; font-weight: 500; color: inherit; }

.sidebar-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 199;
}

.fade-text-enter-active { transition: opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s; }
.fade-text-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.fade-text-enter-from,
.fade-text-leave-to     { opacity: 0; transform: translateX(-8px); }

.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.28s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to     { opacity: 0; }

/* ══════════════════════════════════
   Topbar
══════════════════════════════════ */
.topbar {
  position: fixed;
  top: 0; right: 0;
  height: 60px;
  background: #2d3a2e;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  z-index: 100;
  border-bottom: 1px solid #3a4a3b;
  transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.topbar-right {
  display: flex; align-items: center; gap: 16px; color: #d0d0d0;
}

.lang-switcher { display: flex; align-items: center; gap: 4px; font-size: 14px; }
.lang-switcher span { cursor: pointer; padding: 2px 4px; border-radius: 4px; color: #aaa; transition: color 0.2s; }
.lang-switcher span.active { color: #fff; font-weight: 600; }
.lang-switcher span:hover  { color: #c8e6c9; }
.lang-switcher .divider    { color: #555; cursor: default; }

.bell-btn {
  background: none; border: none;
  color: #c8e6c9; position: relative;
  display: flex; align-items: center; cursor: pointer;
}
.bell-badge {
  position: absolute; top: -2px; right: -2px;
  width: 9px; height: 9px;
  background: #ef5350; border-radius: 50%;
  border: 1.5px solid #2d3a2e;
}

.user-menu {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; padding: 6px 10px;
  border-radius: 8px; transition: background 0.2s;
}
.user-menu:hover { background: rgba(255,255,255,0.08); }

.user-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: #4a7c59;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.caret { font-size: 12px; color: #aaa; }

/* ══════════════════════════════════
   Page
══════════════════════════════════ */
.page-wrapper {
  margin-top: 60px;
  background: #e8eaf0;
  padding: 32px 36px;
  min-height: calc(100vh - 60px);
}

.notif-card {
  background: #fff;
  border-radius: 16px;
  border: 2px solid #5b9bd5;
  overflow: hidden;
  max-width: 900px;
}

/* ══════════════════════════════════
   Notification Header
══════════════════════════════════ */
.notif-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 7px 18px;
  border-radius: 99px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Sarabun', sans-serif;
  background: #f3f4f6;
  color: #6b7280;
  transition: background 0.2s, color 0.2s;
}

.filter-tab.active {
  background: #4a7c59;
  color: #fff;
}

/* Toolbar */
.notif-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 28px 12px;
}

.unread-count { font-size: 13px; color: #9ca3af; }

.btn-mark-all {
  font-size: 13px;
  color: #4a7c59;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Sarabun', sans-serif;
  transition: opacity 0.2s;
}
.btn-mark-all:hover { opacity: 0.7; }

/* ══════════════════════════════════
   Group
══════════════════════════════════ */
.notif-group { margin-bottom: 4px; }

.group-header {
  background: #2a2a2a;
  padding: 12px 28px;
}

.group-label {
  font-size: 20px;
  font-weight: 700;
  color: #e0e0e0;
}

/* ══════════════════════════════════
   Notification Item
══════════════════════════════════ */
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 28px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background 0.15s;
  background: #fff;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: #f9fafb; }
.notif-item.unread { background: #f0faf3; }
.notif-item.unread:hover { background: #e6f7ed; }

/* Icon */
.notif-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-top: 2px;
}

.icon-blue   { background: #dbeafe; color: #1d4ed8; }
.icon-orange { background: #fff7ed; color: #ea580c; }
.icon-green  { background: #dcfce7; color: #16a34a; }
.icon-gray   { background: #f3f4f6; color: #6b7280; }
.icon-red    { background: #fee2e2; color: #dc2626; }

/* Content */
.notif-content { flex: 1; min-width: 0; }

.notif-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  line-height: 1.4;
}

.notif-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 10px;
}

.notif-actions { display: flex; flex-wrap: wrap; gap: 8px; }

.notif-action-btn {
  padding: 5px 14px;
  border-radius: 99px;
  border: none;
  background: #dcfce7;
  color: #15803d;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Sarabun', sans-serif;
  transition: background 0.2s;
}
.notif-action-btn:hover { background: #bbf7d0; }

/* Meta */
.notif-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.notif-time {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
}

.unread-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #ef5350;
}

/* ══════════════════════════════════
   Empty
══════════════════════════════════ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  color: #ccc;
  gap: 12px;
}
.empty-state p { font-size: 15px; color: #9ca3af; }

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
  display: -webkit-box;   line-clamp: 1;  -webkit-line-clamp: 2;
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