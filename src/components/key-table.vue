<template>
    <div class="key-table-wrapper">
        <el-table
            :data="this.tempKey"
            border
            style="width: 100%"
            v-if="true"
        >
            <el-table-column
                prop="sid"
                label="sid"
                width="60"
            >
            </el-table-column>
            <el-table-column
                prop="country"
                label="country"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="siteid"
                label="siteid"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="abbreviation"
                label="abbreviation"
                width="130"
            >
            </el-table-column>
            <el-table-column
                prop="current"
                label="current"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="name"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="symbol"
                label="symbol"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="show"
                label="show"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="up_date"
                label="up_date"
                width="130"
            >
            </el-table-column>
            <el-table-column
                prop="vat"
                label="vat"
                width="100"
            >
            </el-table-column>
            </el-table-column>
            <el-table-column
                prop="time_zone"
                label="time_zone"
                width="100"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: "key-table",
    props: ['tempKey']
}
</script>
<style scoped>
</style>