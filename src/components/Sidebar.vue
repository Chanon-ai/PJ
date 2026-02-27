<template>
    <div class="app-shell">

        <!-- Sidebar -->
        <aside class="app-sidebar" :class="{ collapsed: sidebarCollapsed }">
            <!-- Brand -->
            <div class="sidebar-brand">
                <div class="brand-logo">
                    <img :src="logo" class="logo-img" />
                </div>
                <div class="brand-text" v-show="!sidebarCollapsed">
                    <div class="brand-title">MFU</div>
                    <div class="brand-sub">Research System</div>
                </div>
            </div>

            <!-- Nav -->
            <nav class="app-sidebar-nav">
                <div v-for="item in navItems" :key="item.key" class="nav-item"
                    :class="{ active: activeNav === item.key }" @click="handleNav(item)"
                    :title="sidebarCollapsed ? item.label : ''">
                    <span class="nav-icon">{{ item.icon }}</span>
                    <span class="nav-label" v-show="!sidebarCollapsed">{{ item.label }}</span>
                    <span v-if="item.badge && !sidebarCollapsed" class="nav-badge">{{ item.badge }}</span>
                    <span v-if="item.badge && sidebarCollapsed" class="nav-badge"
                        style="position: absolute; right: 12px; top: 8px;">{{ item.badge }}</span>
                </div>

                <!-- ✅ เพิ่ม: Notification ใน Sidebar -->
                <div class="nav-item" :class="{ active: activeNav === 'notifications' }"
                    @click="handleNav({ key: 'notifications', route: 'Notifications' })"
                    :title="sidebarCollapsed ? 'การแจ้งเตือน' : ''">
                    <span class="nav-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            style="width:18px;height:18px;vertical-align:middle;">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                    </span>
                    <span class="nav-label" v-show="!sidebarCollapsed">การแจ้งเตือน</span>
                    <span v-if="unreadCount > 0 && !sidebarCollapsed" class="nav-badge">
                        {{ unreadCount > 99 ? '99+' : unreadCount }}
                    </span>
                    <span v-if="unreadCount > 0 && sidebarCollapsed" class="nav-badge"
                        style="position: absolute; right: 12px; top: 8px;">
                        {{ unreadCount > 99 ? '99+' : unreadCount }}
                    </span>
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

        <!-- Main Area -->
        <div class="main-area" :class="{ 'full-width': sidebarCollapsed }">

            <!-- Top Header -->
            <header class="top-header">
                <button class="hamburger" :class="{ 'is-open': !sidebarCollapsed }"
                    @click="sidebarCollapsed = !sidebarCollapsed">
                    <span class="hb-line hb-line1"></span>
                    <span class="hb-line hb-line2"></span>
                    <span class="hb-line hb-line3"></span>
                </button>

                <span class="header-title">{{ currentNavLabel }}</span>

                <!-- ✅ เพิ่ม: Bell Icon บน Top Bar -->
                <div class="header-notif" ref="bellRef">
                    <button class="bell-btn" @click="toggleBell" :class="{ active: bellOpen }">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <span v-if="unreadCount > 0" class="bell-badge"
                            :class="{ pulse: hasNew }">
                            {{ unreadCount > 99 ? '99+' : unreadCount }}
                        </span>
                    </button>

                    <!-- Dropdown -->
                    <transition name="bell-drop">
                        <div v-if="bellOpen" class="bell-dropdown">
                            <div class="bell-drop-header">
                                <span>การแจ้งเตือน</span>
                                <button v-if="unreadCount > 0" @click="markAllRead">
                                    อ่านทั้งหมด
                                </button>
                            </div>

                            <div class="bell-drop-list" v-if="notifications.length > 0">
                                <div v-for="n in notifications.slice(0, 5)" :key="n.id"
                                    class="bell-drop-item" :class="{ unread: !n.read }"
                                    @click="handleNotifClick(n)">
                                    <span class="bell-drop-dot" :class="n.type"></span>
                                    <div class="bell-drop-body">
                                        <p>{{ n.message }}</p>
                                        <span>{{ formatTime(n.createdAt) }}</span>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="bell-drop-empty">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                </svg>
                                <p>ไม่มีการแจ้งเตือน</p>
                            </div>

                            <div class="bell-drop-footer"
                                @click="goToNotifications">
                                ดูการแจ้งเตือนทั้งหมด →
                            </div>
                        </div>
                    </transition>
                </div>

                <router-link to="/profile" class="header-right-link">
                    <div class="header-right">
                        <span class="header-user">👤 นักวิจัย</span>
                    </div>
                </router-link>
            </header>

            <main class="content-area">
                <router-view />
            </main>

        </div>
    </div>
</template>

<script>
import logo from '@/assets/logo.svg'
import { useNotificationStore } from '@/stores/notification'
import { mapState, mapActions } from 'pinia'

export default {
    name: "AppLayout",

    data() {
        return {
            logo,
            sidebarCollapsed: false,
            activeNav: "dashboard",
            bellOpen: false,
            navItems: [
                { key: "dashboard", label: "Dashboard", icon: "📊", route: "Dashboard" },
                // { key: "research",  label: "งานวิจัย",  icon: "📄", route: "Research" },
                // { key: "report",    label: "รายงาน",    icon: "📑", route: "Report" },
            ],
        };
    },

    computed: {
        // ✅ เพิ่ม: ดึงข้อมูลจาก store
        ...mapState(useNotificationStore, ['notifications', 'unreadCount', 'hasNew']),

        currentNavLabel() {
            if (this.activeNav === 'notifications') return 'การแจ้งเตือน'
            const found = this.navItems.find(n => n.key === this.activeNav);
            return found ? found.label : "";
        },
    },

    mounted() {
        // ✅ ปิด dropdown เมื่อคลิกข้างนอก
        document.addEventListener('click', this.onClickOutside)
    },

    beforeUnmount() {
        document.removeEventListener('click', this.onClickOutside)
    },

    methods: {
        // ✅ เพิ่ม: actions จาก store
        ...mapActions(useNotificationStore, ['markRead', 'markAllRead']),

        handleNav(item) {
            this.activeNav = item.key;
            if (item.route) {
                this.$router.push({ name: item.route });
            }
        },

        onLogout() {
            this.$router.push({ name: "Login" });
        },

        // ✅ เพิ่ม: Bell methods
        toggleBell() {
            this.bellOpen = !this.bellOpen
        },

        onClickOutside(e) {
            if (this.$refs.bellRef && !this.$refs.bellRef.contains(e.target)) {
                this.bellOpen = false
            }
        },

        handleNotifClick(n) {
            this.markRead(n.id)
            this.bellOpen = false
            if (n.link) this.$router.push(n.link)
        },

        goToNotifications() {
            this.bellOpen = false
            this.activeNav = 'notifications'
            this.$router.push({ name: 'Notifications' })
        },

        formatTime(date) {
            const diff = Math.floor((Date.now() - new Date(date)) / 1000)
            if (diff < 60)    return 'เมื่อกี้'
            if (diff < 3600)  return `${Math.floor(diff / 60)} นาทีที่แล้ว`
            if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`
            return `${Math.floor(diff / 86400)} วันที่แล้ว`
        },
    },
};
</script>

<style>
/* ── (โค้ด style เดิมทั้งหมดคงไว้) ── */

.app-shell {
    display: flex;
    min-height: 100vh;
    background: #f0f4ff;
    font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
    position: relative;
}

.app-sidebar {
    position: fixed;
    top: 0; left: 0;
    width: 210px;
    height: 100vh;
    background: linear-gradient(180deg, #7b0d0d 0%, #5a0909 100%);
    display: flex;
    flex-direction: column;
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
}
.app-sidebar.collapsed { transform: translateX(-100%); }
.app-sidebar.collapsed .nav-item { animation: none; }

.sidebar-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.10);
    overflow: hidden; flex-shrink: 0;
}
.brand-logo { width: 55px; height: 55px; background: transparent; display: flex; align-items: center; justify-content: center; }
.logo-img { max-width: 100%; max-height: 100%; object-fit: contain; }
.brand-title { font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.2; }
.brand-sub { font-size: 0.65rem; color: rgba(255,255,255,0.55); letter-spacing: 0.03em; }

.app-sidebar-nav { flex: 1; padding: 10px 0; overflow: hidden; }

.nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 11px 16px;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
    white-space: nowrap; overflow: hidden;
    color: rgba(255,255,255,0.75);
    animation: navFadeIn 0.3s ease both;
}
.app-sidebar-nav .nav-item:nth-child(1) { animation-delay: 0.06s; }
.app-sidebar-nav .nav-item:nth-child(2) { animation-delay: 0.12s; }
.app-sidebar-nav .nav-item:nth-child(3) { animation-delay: 0.18s; }
.app-sidebar-nav .nav-item:nth-child(4) { animation-delay: 0.24s; }

@keyframes navFadeIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
}

.nav-item:hover { background: rgba(255,255,255,0.10); color: #fff; }
.nav-item.active { background: rgba(255,255,255,0.18); color: #fff; font-weight: 600; }
.nav-item.active::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; background: #fbbf24; border-radius: 0 3px 3px 0;
}

.nav-icon { font-size: 1.05rem; flex-shrink: 0; width: 22px; text-align: center; display: flex; align-items: center; justify-content: center; }
.nav-label { font-size: 0.85rem; }
.nav-badge {
    margin-left: auto;
    background: #ef4444; color: #fff;
    font-size: 0.68rem; font-weight: 700;
    border-radius: 20px; padding: 1px 7px;
    min-width: 20px; text-align: center;
}

.sidebar-footer { border-top: 1px solid rgba(255,255,255,0.10); padding: 6px 0; overflow: hidden; flex-shrink: 0; }
.logout-btn { color: rgba(255,255,255,0.6); }
.logout-btn:hover { color: #fca5a5; background: rgba(239,68,68,0.18) !important; }

.main-area { flex: 1; display: flex; flex-direction: column; min-width: 0; margin-left: 210px; transition: margin-left 0.32s cubic-bezier(0.4,0,0.2,1); }
.main-area.full-width { margin-left: 0; }

.top-header {
    height: 52px;
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    flex-shrink: 0;

    /* ✅ เพิ่มสองบรรทัดนี้ */
    position: sticky;
    top: 0;
    z-index: 100;
}

.hamburger {
    background: none; border: none; cursor: pointer;
    padding: 6px; border-radius: 8px;
    display: flex; flex-direction: column; justify-content: center; gap: 5px;
    width: 36px; height: 36px;
    transition: background 0.15s; flex-shrink: 0;
}
.hamburger:hover { background: #f1f5f9; }
.hb-line { display: block; width: 20px; height: 2px; background: #475569; border-radius: 2px; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s, width 0.3s; transform-origin: center; }
.hamburger.is-open .hb-line1 { transform: translateY(7px) rotate(45deg); }
.hamburger.is-open .hb-line2 { opacity: 0; transform: scaleX(0); }
.hamburger.is-open .hb-line3 { transform: translateY(-7px) rotate(-45deg); }

.header-title { font-weight: 600; color: #1e293b; font-size: 0.92rem; }

/* ✅ เพิ่ม: Bell styles */
.header-notif { position: relative; margin-left: auto; }

.bell-btn {
    position: relative;
    width: 36px; height: 36px;
    border-radius: 9px; border: none;
    background: #f1f5f9; color: #475569;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
}
.bell-btn:hover,
.bell-btn.active { background: #7b0d0d; color: #fff; }
.bell-btn svg { width: 18px; height: 18px; }

.bell-badge {
    position: absolute; top: 3px; right: 3px;
    min-width: 16px; height: 16px; padding: 0 3px;
    background: #ef4444; color: #fff;
    font-size: 10px; font-weight: 700;
    border-radius: 999px;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid #fff;
}
.bell-badge.pulse { animation: badgePulse 1.8s ease-in-out infinite; }
@keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
    50%       { box-shadow: 0 0 0 5px rgba(239,68,68,0); }
}

.bell-dropdown {
    position: absolute; top: calc(100% + 8px); right: 0;
    width: 300px; background: #fff;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.14);
    overflow: hidden; z-index: 9999;
}

.bell-drop-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 700; font-size: 13.5px; color: #1a1a1a;
}
.bell-drop-header button {
    font-size: 12px; color: #6b7280;
    background: none; border: none; cursor: pointer;
    padding: 3px 7px; border-radius: 5px;
    transition: background 0.15s;
}
.bell-drop-header button:hover { background: #f3f4f6; }

.bell-drop-list { max-height: 260px; overflow-y: auto; }

.bell-drop-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 10px 14px; cursor: pointer;
    border-bottom: 1px solid #f9fafb;
    transition: background 0.15s;
}
.bell-drop-item:hover { background: #f9fafb; }
.bell-drop-item.unread { background: #fffbeb; }
.bell-drop-item.unread:hover { background: #fef3c7; }

.bell-drop-dot {
    width: 8px; height: 8px; border-radius: 50%;
    margin-top: 5px; flex-shrink: 0;
}
.bell-drop-dot.info    { background: #3b82f6; }
.bell-drop-dot.success { background: #22c55e; }
.bell-drop-dot.warning { background: #f59e0b; }
.bell-drop-dot.error   { background: #ef4444; }

.bell-drop-body p { font-size: 13px; color: #374151; margin: 0 0 3px; line-height: 1.45; }
.bell-drop-body span { font-size: 11px; color: #9ca3af; }

.bell-drop-empty { padding: 24px 14px; text-align: center; color: #9ca3af; }
.bell-drop-empty svg { width: 32px; height: 32px; margin: 0 auto 8px; display: block; opacity: 0.35; }
.bell-drop-empty p { font-size: 13px; }

.bell-drop-footer {
    padding: 10px 14px;
    border-top: 1px solid #f0f0f0;
    text-align: center;
    font-size: 13px; color: #7b0d0d; font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
}
.bell-drop-footer:hover { background: #fff5f5; }

/* Bell dropdown animation */
.bell-drop-enter-active { animation: dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.bell-drop-leave-active { animation: dropIn 0.15s ease reverse; }
@keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}

.header-right { display: flex; align-items: center; }
.header-right-link { text-decoration: none; color: inherit; display: flex; align-items: center; }
.header-user { font-size: 0.82rem; color: #64748b; white-space: nowrap; }

.content-area { flex: 1; padding: 20px; overflow-y: auto; }
</style>