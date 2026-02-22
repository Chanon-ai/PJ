<template>
  <div class="app-shell">

    <!-- ═══════════════════════════════════════════
         SIDEBAR - แก้ไขให้หายไปจริงๆ ไม่กินพื้นที่
    ════════════════════════════════════════════ -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <!-- Brand -->
      <div class="sidebar-brand">
        <div class="brand-logo">
          <!-- <span class="brand-flame">🔥</span> -->
           <img src="/PJ/src/assets/logo.svg" height="60px" class="pt-2 pb-2">
        </div>
        <div class="brand-text" v-show="!sidebarCollapsed">
          <div class="brand-title">MFU</div>
          <div class="brand-sub">Research System</div>
        </div>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <div
          v-for="item in navItems"
          :key="item.key"
          class="nav-item"
          :class="{ active: activeNav === item.key }"
          @click="handleNav(item)"
          :title="sidebarCollapsed ? item.label : ''"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-show="!sidebarCollapsed">{{ item.label }}</span>
          <span
            v-if="item.badge && !sidebarCollapsed"
            class="nav-badge"
          >{{ item.badge }}</span>
        </div>
      </nav>

      <!-- Logout -->
      <div class="sidebar-footer">
        <div class="nav-item logout-btn" @click="onLogout">
          <span class="nav-icon">🚪</span>
          <span class="nav-label">ออกจากระบบ</span>
        </div>
      </div>
    </aside>

    <!-- ═══════════════════════════════════════════
         MAIN AREA - ขยายเต็มที่เมื่อ sidebar หาย
    ════════════════════════════════════════════ -->
    <div class="main-area" :class="{ 'full-width': sidebarCollapsed }">

      <!-- Top Header -->
      <header class="top-header">
        <button
          class="hamburger"
          :class="{ 'is-open': !sidebarCollapsed }"
          @click="sidebarCollapsed = !sidebarCollapsed"
          aria-label="toggle sidebar"
        >
          <span class="hb-line hb-line1"></span>
          <span class="hb-line hb-line2"></span>
          <span class="hb-line hb-line3"></span>
        </button>
        <span class="header-title">{{ currentNavLabel }}</span>
        <div class="header-right">
          <span class="header-user">👤 นักวิจัย</span>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-content">

        <!-- Summary strip (read-only, no filter click) -->
        <div class="summary-strip mb-4">
          <div
            v-for="s in stageSummary"
            :key="s.key"
            class="strip-card"
            :class="[`strip-${s.key}`, { 'strip-active': activeFilter === s.key }]"
            @click="toggleFilter(s.key)"
          >
            <span class="strip-icon">{{ s.icon }}</span>
            <span class="strip-count">{{ s.count }}</span>
            <span class="strip-label">{{ s.label }}</span>
          </div>
        </div>

        <!-- Table -->
        <div class="panels-row">

          <!-- Main Table Card -->
          <div class="panel-table">
            <div class="table-card-header">
              <div class="d-flex align-items-center gap-2">
                <span class="header-grid-icon">⊞</span>
                <span class="table-card-title">Advanced <em>CDataTable</em> application</span>
              </div>
              <div class="d-flex gap-2">
                <button class="btn-quick btn-success" @click="continueDraft">📝 ร่างล่าสุด</button>
                <button class="btn-quick btn-gray"    @click="exportPDF">📄 Export PDF</button>
              </div>
            </div>

            <!-- Filter bar (Image 1 style) -->
            <div class="filter-bar">
              <div class="filter-left">
                <label class="filter-label">Filter:</label>
                <input v-model="searchText"  type="text"   placeholder="type string…" class="f-input f-text" />
                <select v-model="stageFilter" class="f-input f-select">
                  <option value="">ทุกสถานะ</option>
                  <option value="DRAFT">ร่าง</option>
                  <option value="SUBMITTED">ยื่นแล้ว</option>
                  <option value="NEED_REVISION">ต้องแก้ไข</option>
                  <option value="IN_REVIEW">กำลังพิจารณา</option>
                  <option value="APPROVED">อนุมัติ</option>
                </select>
              </div>
              <div class="filter-right">
                <label class="filter-label">Items per page:</label>
                <select v-model="perPage" class="f-input f-perpage">
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                </select>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="state-box">
              <div class="spinner"></div>
              <div class="state-text">กำลังโหลดข้อมูล…</div>
            </div>

            <!-- Empty -->
            <div v-else-if="filteredItems.length === 0" class="state-box">
              <div style="font-size:2.2rem">📭</div>
              <div class="state-text">ไม่พบโครงการวิจัย</div>
            </div>

            <!-- Table -->
            <div v-else class="table-wrapper">
              <table class="data-table">
                <thead>
                  <!-- Sortable headers -->
                  <tr class="thead-row">
                    <th class="th-sort" @click="sortBy('projectName')">
                      ชื่อโครงการวิจัย / หัวหน้าโครงการ
                      <span class="sort-ic">{{ sortIcon('projectName') }}</span>
                    </th>
                    <th class="th-sort" @click="sortBy('submitDate')">
                      วันที่ยื่น
                      <span class="sort-ic">{{ sortIcon('submitDate') }}</span>
                    </th>
                    <th class="th-sort" @click="sortBy('stageLabel')">
                      สถานะ
                      <span class="sort-ic">{{ sortIcon('stageLabel') }}</span>
                    </th>
                    <th>ขั้นตอนถัดไป</th>
                    <th class="th-sort" @click="sortBy('activityMeta')">
                      Activity
                      <span class="sort-ic">{{ sortIcon('activityMeta') }}</span>
                    </th>
                    <th class="th-sort" @click="sortBy('stageLabel')">
                      <span class="sort-ic">↕</span>
                    </th>
                  </tr>
                  <!-- Sub-filter row -->
                  <tr class="thead-sub">
                    <th><input v-model="colFilter.projectName" class="col-fi" /></th>
                    <th><input v-model="colFilter.submitDate"  class="col-fi" /></th>
                    <th><input v-model="colFilter.stage"       class="col-fi" /></th>
                    <th></th><th></th><th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in paginatedItems"
                    :key="item.id || i"
                    class="tbody-row"
                  >
                    <td>
                      <div class="td-title">{{ item.projectName }}</div>
                      <div class="td-sub">{{ item.projectLeader }}</div>
                    </td>
                    <td><span class="td-date">{{ item.submitDate }}</span></td>
                    <td>
                      <span class="badge" :class="`badge-${item.stageBadgeColor}`">
                        {{ item.stageLabel }}
                      </span>
                    </td>
                    <td><span class="td-next">{{ item.nextAction }}</span></td>
                    <td>
                      <div class="td-act-msg">{{ item.activityMessage }}</div>
                      <div class="td-act-meta">{{ item.activityMeta }}</div>
                    </td>
                    <td class="td-right">
                      <button class="btn-show" @click.stop="goToDetail(item.id)">Show</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagi-bar">
              <button class="pg-btn" :disabled="currentPage === 1" @click="currentPage = 1">«</button>
              <button class="pg-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
              <button
                v-for="p in visiblePages"
                :key="p"
                class="pg-btn"
                :class="{ 'pg-active': p === currentPage }"
                @click="currentPage = p"
              >{{ p }}</button>
              <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
              <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages">»</button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <button class="fab" title="สร้างโครงการใหม่" @click="onAdd">＋</button>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      sidebarCollapsed: false,
      activeNav: "dashboard",
      allProjects: [],
      loading: true,
      searchText: "",
      stageFilter: "",
      activeFilter: "",
      perPage: 10,
      currentPage: 1,
      sortKey: "",
      sortDir: 1,
      colFilter: { projectName: "", submitDate: "", stage: "" },

      navItems: [
        { key: "dashboard",   label: "Dashboard",      icon: "📊", route: null         },
        { key: "attachments", label: "เอกสารแนบ",      icon: "📎", route: "Attachments" },
        { key: "manual",      label: "คู่มือ / เกณฑ์", icon: "📘", route: "Manual"      },
      ],
    };
  },

  async mounted() {
    await this.fetchResearch();
  },

  watch: {
    searchText()  { this.currentPage = 1; },
    stageFilter() { this.currentPage = 1; },
    activeFilter(){ this.currentPage = 1; },
    perPage()     { this.currentPage = 1; },
    colFilter: { deep: true, handler() { this.currentPage = 1; } },
  },

  computed: {
    currentNavLabel() {
      return this.navItems.find(n => n.key === this.activeNav)?.label || "Dashboard";
    },

    stageSummary() {
      return [
        { key: "DRAFT",         label: "ร่าง",           icon: "📝" },
        { key: "SUBMITTED",     label: "ยื่นแล้ว",       icon: "📤" },
        { key: "NEED_REVISION", label: "ต้องแก้ไข",     icon: "⚠️"  },
        { key: "IN_REVIEW",     label: "กำลังพิจารณา",  icon: "🔍" },
        { key: "APPROVED",      label: "อนุมัติ",        icon: "✅" },
      ].map(s => ({
        ...s,
        count: this.allProjects.filter(p => p.stage === s.key).length,
      }));
    },

    nextActionItems() {
      return this.allProjects.filter(p => p.stage === "NEED_REVISION" || p.stage === "DRAFT");
    },

    filteredItems() {
      let list = [...this.allProjects];
      if (this.activeFilter) list = list.filter(p => p.stage === this.activeFilter);
      if (this.stageFilter)  list = list.filter(p => p.stage === this.stageFilter);
      if (this.searchText) {
        const q = this.searchText.toLowerCase();
        list = list.filter(p =>
          (p.projectName   || "").toLowerCase().includes(q) ||
          (p.projectLeader || "").toLowerCase().includes(q)
        );
      }
      if (this.colFilter.projectName) {
        const q = this.colFilter.projectName.toLowerCase();
        list = list.filter(p =>
          (p.projectName   || "").toLowerCase().includes(q) ||
          (p.projectLeader || "").toLowerCase().includes(q)
        );
      }
      if (this.colFilter.submitDate) {
        list = list.filter(p => (p.submitDate || "").includes(this.colFilter.submitDate));
      }
      if (this.colFilter.stage) {
        const q = this.colFilter.stage.toLowerCase();
        list = list.filter(p => (p.stageLabel || "").toLowerCase().includes(q));
      }
      if (this.sortKey) {
        list.sort((a, b) =>
          (a[this.sortKey] || "").toString()
            .localeCompare((b[this.sortKey] || "").toString(), "th") * this.sortDir
        );
      }
      return list;
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.perPage) || 1;
    },

    paginatedItems() {
      const s = (this.currentPage - 1) * this.perPage;
      return this.filteredItems.slice(s, s + this.perPage);
    },

    visiblePages() {
      const range = [];
      const s = Math.max(1, this.currentPage - 2);
      const e = Math.min(this.totalPages, this.currentPage + 2);
      for (let i = s; i <= e; i++) range.push(i);
      return range;
    },
  },

  methods: {
    async fetchResearch() {
      this.loading = true;
      try {
        const res  = await fetch("http://localhost:5000/api/research");
        const data = await res.json();
        this.allProjects = data.map(item => this.mapItem(item));
        // Update nav badge for NEED_REVISION
        const nrCount = this.allProjects.filter(p => p.stage === "NEED_REVISION").length;
        if (nrCount > 0) this.navItems[0].badge = nrCount;
      } catch (err) {
        console.error("fetchResearch error:", err);
        this.allProjects = [];
      } finally {
        this.loading = false;
      }
    },

    mapItem(item) {
      const stage      = this.inferStage(item);
      const nextAction = this.inferNextAction(stage);
      const { message, meta } = this.getLastActivityText(item);
      return {
        id:              item._id,
        projectName:     item.titleTH || "(ไม่มีชื่อ)",
        projectLeader:   item.researchers?.mainResearcher?.name || "-",
        submitDate:      this.formatDate(item.createdAt),
        stage,
        stageLabel:      this.stageLabel(stage),
        stageBadgeColor: this.stageBadgeColor(stage),
        nextAction,
        activityMessage: message,
        activityMeta:    meta,
      };
    },

    inferStage(item) {
      if (item.stage) return item.stage;
      if (item.revisionRequested === true) return "NEED_REVISION";
      const la = item.lastActivity;
      if (la?.action === "CREATE") {
        if (Math.abs(new Date(item.updatedAt) - new Date(item.createdAt)) < 60000)
          return "DRAFT";
      }
      if (la?.action === "UPDATE") return "SUBMITTED";
      return "DRAFT";
    },

    inferNextAction(stage) {
      return {
        DRAFT:         "กรอกข้อมูลให้ครบและบันทึก",
        SUBMITTED:     "รอเจ้าหน้าที่ตรวจสอบ",
        NEED_REVISION: "แก้ไขตามข้อเสนอแนะและส่งใหม่",
        IN_REVIEW:     "รอผลการพิจารณา",
        APPROVED:      "ผ่านการพิจารณาแล้ว",
      }[stage] || "-";
    },

    stageLabel(stage) {
      return {
        DRAFT:         "ร่าง",
        SUBMITTED:     "ยื่นแล้ว",
        NEED_REVISION: "ต้องแก้ไข",
        IN_REVIEW:     "กำลังพิจารณา",
        APPROVED:      "อนุมัติ",
      }[stage] || stage;
    },

    stageBadgeColor(stage) {
      return {
        DRAFT:         "secondary",
        SUBMITTED:     "info",
        NEED_REVISION: "warning",
        IN_REVIEW:     "primary",
        APPROVED:      "success",
      }[stage] || "dark";
    },

    getLastActivityText(item) {
      const la = item.lastActivity;
      if (la?.message) {
        return {
          message: la.message,
          meta:    `${la.by || ""} • ${this.formatTimeAgo(la.at || item.updatedAt)}`,
        };
      }
      return { message: "บันทึกล่าสุด", meta: this.formatTimeAgo(item.updatedAt) };
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric", month: "short", day: "numeric",
      });
    },

    formatTimeAgo(date) {
      if (!date) return "-";
      const diff    = Date.now() - new Date(date);
      const minutes = Math.floor(diff / 60000);
      const hours   = Math.floor(diff / 3600000);
      const days    = Math.floor(diff / 86400000);
      if (minutes < 1)  return "เมื่อสักครู่";
      if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
      if (hours   < 24) return `${hours} ชั่วโมงที่แล้ว`;
      return `${days} วันที่แล้ว`;
    },

    sortBy(key) {
      if (this.sortKey === key) this.sortDir *= -1;
      else { this.sortKey = key; this.sortDir = 1; }
    },

    sortIcon(key) {
      if (this.sortKey !== key) return "↕";
      return this.sortDir === 1 ? "↑" : "↓";
    },

    toggleFilter(key) {
      this.activeFilter = this.activeFilter === key ? "" : key;
      this.stageFilter  = "";
    },

    handleNav(item) {
      this.activeNav = item.key;
      if (item.route) this.$router.push({ name: item.route });
    },

    goToDetail(id) { this.$router.push({ name: "Research", params: { id } }); },
    goToEdit(id)   { this.$router.push({ name: "Research", params: { id } }); },
    onAdd()        { this.$router.push({ name: "Research" }); },

    continueDraft() {
      const draft = this.allProjects.find(p => p.stage === "DRAFT");
      draft
        ? this.$router.push({ name: "Research", params: { id: draft.id } })
        : this.$router.push({ name: "Research" });
    },

    exportPDF() { this.$router.push("/report"); },

    onLogout() {
      // Clear session/token if needed, then redirect to login
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
/* ═══════════════════════════════════════
   CSS Variables
═══════════════════════════════════════ */
:root {
  --sb-bg:      #7b0d0d;
  --sb-bg2:     #5a0a0a;
  --sb-text:    #f5cece;
  --sb-active:  rgba(255,255,255,0.18);
  --sb-hover:   rgba(255,255,255,0.10);
  --sb-width:   210px;
  --sb-mini:    58px;
  --blue:       #1d4ed8;
  --blue-light: #eff6ff;
  --yellow:     #f59e0b;
}

/* ═══════════════════════════════════════
   Shell layout - แก้ไขหลัก
═══════════════════════════════════════ */
.app-shell {
  display: flex;
  min-height: 100vh;
  background: #f0f4ff;
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  position: relative; /* สำหรับ positioning ของ sidebar */
}

/* ═══════════════════════════════════════
   SIDEBAR - แก้ไขให้หายไปจริงๆ ไม่กินพื้นที่
═══════════════════════════════════════ */
.sidebar {
  width: 210px; /* กำหนด width คงที่แทนการใช้ variable */
  min-height: 100vh;
  background: linear-gradient(180deg, #7b0d0d 0%, #5a0909 100%);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 3px 0 20px rgba(0,0,0,0.22);
  position: relative;
  z-index: 100;
  
  /* เปลี่ยนจาก transform เป็น margin-left เพื่อให้หายไปจริงๆ */
  margin-left: 0;
  transition: margin-left 0.32s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: margin-left, width;
}

.sidebar.collapsed {
  margin-left: -210px; /* เลื่อนออกไปทางซ้ายเท่ากับความกว้างตัวเอง */
  width: 0; /* หด width เป็น 0 */
  box-shadow: none;
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.10);
  overflow: hidden;
  flex-shrink: 0;
}
.brand-logo {
  width: 34px; height: 34px;
  background: rgba(255,255,255,0.15);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.brand-title { font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.2; }
.brand-sub   { font-size: 0.65rem; color: rgba(255,255,255,0.55); letter-spacing: 0.03em; }

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: 10px 0;
  overflow: hidden;
}

/* Nav items — stagger fade-in when sidebar opens */
.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 16px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  color: rgba(255,255,255,0.75);
  animation: navFadeIn 0.3s ease both;
}

/* Stagger each nav item */
.sidebar-nav .nav-item:nth-child(1) { animation-delay: 0.06s; }
.sidebar-nav .nav-item:nth-child(2) { animation-delay: 0.12s; }
.sidebar-nav .nav-item:nth-child(3) { animation-delay: 0.18s; }

@keyframes navFadeIn {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Reset animation when collapsed so it replays on open */
.sidebar.collapsed .nav-item { animation: none; }

.nav-item:hover  { background: rgba(255,255,255,0.10); color: #fff; }
.nav-item.active {
  background: rgba(255,255,255,0.18);
  color: #fff;
  font-weight: 600;
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: #fbbf24;
  border-radius: 0 3px 3px 0;
}
.nav-icon  { font-size: 1.05rem; flex-shrink: 0; width: 22px; text-align: center; }
.nav-label { font-size: 0.85rem; }
.nav-badge {
  margin-left: auto;
  background: #ef4444;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  border-radius: 20px;
  padding: 1px 7px;
  min-width: 20px;
  text-align: center;
}

/* Footer */
.sidebar-footer {
  border-top: 1px solid rgba(255,255,255,0.10);
  padding: 6px 0;
  overflow: hidden;
  flex-shrink: 0;
}
.logout-btn { color: rgba(255,255,255,0.6); }
.logout-btn:hover { color: #fca5a5; background: rgba(239,68,68,0.18) !important; }

/* ═══════════════════════════════════════
   MAIN AREA - ขยายเต็มที่อัตโนมัติ
═══════════════════════════════════════ */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  /* ไม่ต้องกำหนด margin-left เพราะ flex: 1 จะจัดการให้เอง */
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}

/* เมื่อ sidebar หายไป main-area จะขยายเต็มที่อัตโนมัติ */
.main-area.full-width {
  /* flex: 1 ทำงานอยู่แล้ว ไม่ต้องกำหนดอะไรเพิ่ม */
}

/* ═══════════════════════════════════════
   TOP HEADER
═══════════════════════════════════════ */
.top-header {
  height: 52px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  flex-shrink: 0;
}

/* ── Animated hamburger ─── */
.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  transition: background 0.15s;
  flex-shrink: 0;
}
.hamburger:hover { background: #f1f5f9; }

.hb-line {
  display: block;
  width: 20px;
  height: 2px;
  background: #475569;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.3s cubic-bezier(0.4, 0, 0.2, 1),
              width     0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* Open state → animate to X */
.hamburger.is-open .hb-line1 {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.is-open .hb-line2 {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.is-open .hb-line3 {
  transform: translateY(-7px) rotate(-45deg);
}

.header-title  { font-weight: 600; color: #1e293b; font-size: 0.92rem; }
.header-right  { margin-left: auto; }
.header-user   { font-size: 0.82rem; color: #64748b; }

/* ═══════════════════════════════════════
   PAGE CONTENT
═══════════════════════════════════════ */
.page-content {
  padding: 24px 28px;
  flex: 1;
}

/* ── Summary Strip ───────────────────── */
.summary-strip {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.strip-card {
  flex: 1;
  min-width: 110px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(29,78,216,0.07);
  padding: 16px 12px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.18s ease;
  user-select: none;
}
.strip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(29,78,216,0.13);
  border-color: #3b82f6;
}
.strip-card.strip-active { border-color: #1d4ed8; background: #eff6ff; }
.strip-card.strip-NEED_REVISION { border-left: 4px solid var(--yellow); }
.strip-card.strip-NEED_REVISION.strip-active { background: #fffbeb; border-color: var(--yellow); }

.strip-icon  { font-size: 1.45rem; }
.strip-count { font-size: 1.85rem; font-weight: 700; color: #1e3a8a; line-height: 1; }
.strip-label { font-size: 0.7rem; color: #64748b; }

/* ═══════════════════════════════════════
   PANELS ROW (equal height)
═══════════════════════════════════════ */
.panels-row {
  display: flex;
  gap: 18px;
  align-items: stretch; /* ← KEY for equal height */
}

/* ── Table Panel ─────────────────────── */
.panel-table {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(29,78,216,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-card-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 13px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.header-grid-icon  { font-size: 1rem; color: #3b82f6; }
.table-card-title  { font-size: 0.88rem; color: #374151; }
.table-card-title em { font-style: normal; color: #1d4ed8; font-weight: 600; }

/* Quick buttons */
.btn-quick {
  border: none;
  border-radius: 7px;
  font-size: 0.76rem;
  padding: 4px 11px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.15s;
}
.btn-quick:hover { opacity: 0.85; }
.btn-success { background: #16a34a; color: #fff; }
.btn-gray    { background: #64748b; color: #fff; }

/* ── Filter Bar ──────────────────────── */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  gap: 10px;
  flex-wrap: wrap;
  border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
}
.filter-left, .filter-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-label { font-size: 0.8rem; color: #374151; white-space: nowrap; }
.f-input {
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 0.8rem;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
}
.f-input:focus { border-color: #3b82f6; }
.f-text    { width: 170px; }
.f-select  { width: 130px; }
.f-perpage { width: 62px; }

/* ── State boxes ─────────────────────── */
.state-box  { text-align: center; padding: 48px 20px; }
.state-text { font-size: 0.85rem; color: #94a3b8; margin-top: 8px; }
.spinner {
  width: 34px; height: 34px;
  border: 3px solid #dbeafe;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
  margin: 0 auto;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Table ───────────────────────────── */
.table-wrapper { overflow-x: auto; flex: 1; }
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.845rem;
}

.thead-row th {
  background: #fff;
  color: #374151;
  font-weight: 600;
  padding: 10px 13px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  text-align: left;
}
.th-sort { cursor: pointer; }
.th-sort:hover { background: #eff6ff; color: #1d4ed8; }
.sort-ic { font-size: 0.7rem; color: #94a3b8; margin-left: 3px; }

.thead-sub th {
  background: #f8fafc;
  padding: 5px 13px 6px;
  border-bottom: 1px solid #e2e8f0;
}
.col-fi {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 0.77rem;
  height: 24px;
  background: #fff;
  outline: none;
}
.col-fi:focus { border-color: #3b82f6; }

.tbody-row td {
  padding: 10px 13px;
  border-bottom: 1px solid #f1f5f9;
  background: #fff;
  vertical-align: middle;
}
.tbody-row:hover td { background: #f0f7ff; }

.td-title    { font-weight: 600; color: #1e293b; font-size: 0.86rem; line-height: 1.3; }
.td-sub      { font-size: 0.74rem; color: #64748b; margin-top: 2px; }
.td-date     { font-size: 0.8rem; color: #475569; white-space: nowrap; }
.td-next     { font-size: 0.77rem; color: #475569; }
.td-act-msg  { font-size: 0.79rem; font-weight: 500; color: #1e293b; }
.td-act-meta { font-size: 0.72rem; color: #94a3b8; margin-top: 2px; }
.td-right    { text-align: right; }

/* Badge */
.badge {
  display: inline-block;
  font-size: 0.73rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  color: #fff;
}
.badge-secondary { background: #64748b; }
.badge-info      { background: #0ea5e9; }
.badge-warning   { background: #f59e0b; color: #1a1a2e; }
.badge-primary   { background: #2563eb; }
.badge-success   { background: #16a34a; }
.badge-dark      { background: #1e293b; }

/* Show button */
.btn-show {
  border: 1px solid #3b82f6;
  background: transparent;
  color: #3b82f6;
  border-radius: 5px;
  font-size: 0.76rem;
  padding: 3px 12px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-show:hover { background: #3b82f6; color: #fff; }

/* ── Pagination ──────────────────────── */
.pagi-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;
}
.pg-btn {
  min-width: 30px; height: 30px;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #3b82f6;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.14s;
  padding: 0 6px;
}
.pg-btn:hover:not(:disabled) { background: #eff6ff; border-color: #3b82f6; }
.pg-btn:disabled { color: #cbd5e1; cursor: default; }
.pg-active {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
  color: #fff !important;
  font-weight: 700;
}

/* ── FAB ─────────────────────────────── */
.fab {
  position: fixed;
  bottom: 28px; right: 28px;
  width: 52px; height: 52px;
  background: #1d4ed8;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(29,78,216,0.38);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
}
.fab:hover {
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 12px 28px rgba(29,78,216,0.48);
}
</style>