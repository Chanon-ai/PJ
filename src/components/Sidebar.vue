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

                <router-link to="/profile" class="header-right-link">
                    <div class="header-right">
                        <span class="header-user">👤 นักวิจัย</span>
                    </div>
                </router-link>
            </header>

            <!-- 👇 สำคัญที่สุด -->
            <main class="content-area">
                <router-view />
            </main>

        </div>
    </div>
</template>

<script>
import logo from '@/assets/logo.svg'
export default {
    name: "AppLayout",

    data() {
        return {
            logo,
            sidebarCollapsed: false,
            activeNav: "dashboard",
            navItems: [
                { key: "dashboard", label: "Dashboard", icon: "📊", route: "Dashboard" },
                { key: "research", label: "งานวิจัย", icon: "📄", route: "Research" },
                { key: "report", label: "รายงาน", icon: "📑", route: "Report" },
            ],
        };
    },

    computed: {
        currentNavLabel() {
            const found = this.navItems.find(n => n.key === this.activeNav);
            return found ? found.label : "";
        },
    },

    methods: {
        handleNav(item) {
            this.activeNav = item.key;
            if (item.route) {
                this.$router.push({ name: item.route });
            }
        },

        onLogout() {
            this.$router.push({ name: "Login" });
        },
    },
};
</script>
<style>
.app-shell {
    display: flex;
    min-height: 100vh;
    background: #f0f4ff;
    font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
    position: relative;
}

.app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 210px;
    height: 100vh;
    background: linear-gradient(180deg, #7b0d0d 0%, #5a0909 100%);
    display: flex;
    flex-direction: column;
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
}

.app-sidebar.collapsed {
    transform: translateX(-100%);
}

.app-sidebar.collapsed .nav-item {
    animation: none;
}

.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    overflow: hidden;
    flex-shrink: 0;
}

.brand-logo {
    width: 55px;
    height: 55px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.brand-title {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
}

.brand-sub {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.03em;
}

.app-sidebar-nav {
    flex: 1;
    padding: 10px 0;
    overflow: hidden;
}

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
    color: rgba(255, 255, 255, 0.75);
    animation: navFadeIn 0.3s ease both;
}

.app-sidebar-nav .nav-item:nth-child(1) {
    animation-delay: 0.06s;
}

.app-sidebar-nav .nav-item:nth-child(2) {
    animation-delay: 0.12s;
}

.app-sidebar-nav .nav-item:nth-child(3) {
    animation-delay: 0.18s;
}

@keyframes navFadeIn {
    from {
        opacity: 0;
        transform: translateX(-16px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.10);
    color: #fff;
}

.nav-item.active {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    font-weight: 600;
}

.nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #fbbf24;
    border-radius: 0 3px 3px 0;
}

.nav-icon {
    font-size: 1.05rem;
    flex-shrink: 0;
    width: 22px;
    text-align: center;
}

.nav-label {
    font-size: 0.85rem;
}

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
    border-top: 1px solid rgba(255, 255, 255, 0.10);
    padding: 6px 0;
    overflow: hidden;
    flex-shrink: 0;
}

.logout-btn {
    color: rgba(255, 255, 255, 0.6);
}

.logout-btn:hover {
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.18) !important;
}

.main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-left: 210px;
    transition: margin-left 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-area.full-width {
    margin-left: 0;
}

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

.hamburger:hover {
    background: #f1f5f9;
}

.hb-line {
    display: block;
    width: 20px;
    height: 2px;
    background: #475569;
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

.header-title {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.92rem;
}

.header-right {
    margin-left: auto;
}

.header-right-link {
    margin-left: auto;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
}

.header-user {
    font-size: 0.82rem;
    color: #64748b;
}

.content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}
</style>