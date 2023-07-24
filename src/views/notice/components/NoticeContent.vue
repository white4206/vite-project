<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="通知1" name="1">
                <div>
                    根据全国教育大会精神，全面振兴本科教育，提高本科教学质量， 切实提升大学生的计算机应用能力，激励大学生学习计算机知识、技术
                    、技能的兴趣和潜能，提高运用信息技术解决实际问题的综合实践能力，以赛促学、以赛促教、以赛促创。经中国大学生计算机设计大赛四川省级赛组织委员会，四川省高等院校计算机基础教育研究会研究，报中国大学生计算机设计大赛组织委员会批准，决定举办
                    2023 年华迪杯·中国大学生计算机设计大赛四川省级赛，由宜宾学院承办。

                    .....需要后端数据
                </div>
                <div>
                    根据全国教育大会精神，全面振兴本科教育，提高本科教学质量， 切实提升大学生的计算机应用能力，激励大学生学习计算机知识、技术
                    、技能的兴趣和潜能，提高运用信息技术解决实际问题的综合实践能力，以赛促学、以赛促教、以赛促创。经中国大学生计算机设计大赛四川省级赛组织委员会，四川省高等院校计算机基础教育研究会研究，报中国大学生计算机设计大赛组织委员会批准，决定举办
                    2023 年华迪杯·中国大学生计算机设计大赛四川省级赛，由宜宾学院承办。

                    .....需要后端数据
                </div>
                <div>
                    根据全国教育大会精神，全面振兴本科教育，提高本科教学质量， 切实提升大学生的计算机应用能力，激励大学生学习计算机知识、技术
                    、技能的兴趣和潜能，提高运用信息技术解决实际问题的综合实践能力，以赛促学、以赛促教、以赛促创。经中国大学生计算机设计大赛四川省级赛组织委员会，四川省高等院校计算机基础教育研究会研究，报中国大学生计算机设计大赛组织委员会批准，决定举办
                    2023 年华迪杯·中国大学生计算机设计大赛四川省级赛，由宜宾学院承办。

                    .....需要后端数据
                </div>
            </el-collapse-item>
            <el-collapse-item title="通知2" name="2">
                <div>
                    ...
                </div>
                <div>
                    ...
                </div>
            </el-collapse-item>
            <el-collapse-item title="通知3" name="3">
                <div>
                    ...
                </div>
                <div>
                    ...
                </div>
                <div>
                    ...
                </div>
            </el-collapse-item>
            <el-collapse-item title="通知4" name="4">
                <div>
                    ...
                </div>
                <div>
                    ...
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
}
</script>
  