<template>
  <el-container>
    <el-header>
      <h2>Amplify Vue Workshop</h2>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <router-link class="routerLink" to="/chat">
            <el-menu-item>
              <el-icon>
                <ChatDotRound />
              </el-icon>
              <span>Chat</span>
            </el-menu-item>
          </router-link>
          <router-link class="routerLink" to="/ai">
            <el-menu-item >
              <el-icon>
                <View />
              </el-icon>
              <span>AI</span>
            </el-menu-item>
          </router-link>
          <router-link class="routerLink" to="/analytics">
            <el-menu-item>
              <el-icon>
                <DataAnalysis />
              </el-icon>
              <span>Analytics</span>
            </el-menu-item>
          </router-link>
          <router-link class="routerLink" to="/webpush">
            <el-menu-item>
              <el-icon>
                <Notification />
              </el-icon>
              <span>Web Push</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script setup>
  import {
    ChatDotRound,
    View,
    Notification,
    DataAnalysis
  }
  from '@element-plus/icons-vue'
</script>
<style src="./assets/style.css" ></style>
