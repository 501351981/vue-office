<template>
    <div id="app">
        <div class="menu-area">
            <el-menu :default-active="defaultActive" @select="changeMenu">
                <el-menu-item
                    v-for="item in menus"
                    :index="item.index"
                    :key="item.index"
                >{{ item.label }}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
            menus: [
                {
                    label: 'docx预览（VueOfficeDocx）',
                    index: '/vue-office-docx'
                },
                {
                    label: 'excel预览（VueOfficeExcel）',
                    index: '/vue-office-excel'
                },
                {
                    label: 'pdf预览（VueOfficePdf）',
                    index: '/vue-office-pdf'
                },
                {
                    label: 'docx预览（纯js预览）',
                    index: '/js-preview-docx'
                },
                {
                    label: 'excel预览（纯js预览）',
                    index: '/js-preview-excel'
                },
                {
                    label: 'pdf预览（纯js预览）',
                    index: '/js-preview-pdf'
                }
            ],
            defaultActive: '/vue-office-docx'
        };
    },
    mounted() {
        let path = location.hash.match(/^#(\/.*?)(\?|$)/)[1];
        this.defaultActive = path === '/' ? '/vue-office-docx' : path;
    },
    methods: {
        changeMenu(index) {
            this.$router.push(index);
        }
    }
};
</script>

<style>
* {
    margin: 0;
}

#app {
    display: flex;

}

.menu-area{
    width: 230px;
    height: 100vh;
}

.main-content {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
}
</style>
