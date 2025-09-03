<template>
    <v-app>
        <!-- Navigation Drawer (Sidebar) -->
        <v-navigation-drawer app v-model="drawer" :clipped="$vuetify.display.mdAndUp" color="blue-grey-lighten-5">
            <v-list>
                <v-list-item v-for="(item, index) in filteredNavItems" :key="index" :to="item.to" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- App Bar (Topbar) -->
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-toolbar-title>ระบบประเมินบุคลากร</v-toolbar-title>
            <v-spacer />
            <v-btn text class="text-white text-caption mr-3" v-if="userName">{{ userName }}</v-btn>
            <v-menu offset-y>
                <template #activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title class="text-caption">บทบาท: {{ userRole }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-title>ออกจากระบบ</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container class="py-4">
                <slot />
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-footer app color="grey-lighten-4">
            <v-col class="text-center text-caption">
                &copy; {{ new Date().getFullYear() }} วิทยาลัยเทคนิคชัยภูมิ | ระบบประเมินบุคลากร
            </v-col>
        </v-footer>
    </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const drawer = ref(true);
const router = useRouter();
const userName = ref('');
const userRole = ref('');

const navItems = [
    { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard', roles: ['admin', 'evaluator', 'user'] },
    { title: 'Profile', icon: 'mdi-account', to: '/profile', roles: ['admin', 'evaluator', 'user'] },
    { title: 'ประเมินผล', icon: 'mdi-file-document-edit-outline', to: '/evaluation', roles: ['evaluator'] },
    { title: 'รายการประเมิน', icon: 'mdi-format-list-bulleted', to: '/evaluations', roles: ['admin', 'evaluator'] },
    { title: 'จัดการผู้ใช้', icon: 'mdi-account-group', to: '/admin/users', roles: ['admin'] },
    { title: 'ตั้งค่า', icon: 'mdi-cog-outline', to: '/settings', roles: ['admin'] }
];

const filteredNavItems = computed(() => {
    return navItems.filter(item => item.roles.includes(userRole.value));
});

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
        return;
    }
    try {
        const res = await axios.get('http://localhost:3001/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        userName.value = res.data.user.name;
        userRole.value = res.data.user.role || 'user';
    } catch (err) {
        logout();
    }
});
</script>

<style scoped>
.v-application {
    background-color: #f4f6f8;
}
</style>
