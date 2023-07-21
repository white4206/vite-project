<template>
    <!-- <CreateProject></CreateProject> -->
    <div class="created-box">
        <ProjectCard>
        </ProjectCard>

        <CreateProject>
        </CreateProject>
    </div>
</template>

<script setup>
import CreateProject from '../components/CreateProject.vue';
import ProjectCard from './ProjectCard.vue';
</script>

<style lang="scss" scoped>
.created-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
