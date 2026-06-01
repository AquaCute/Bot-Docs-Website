<!-- src/.vuepress/components/GameActivityGrid.vue -->
<template>
  <!-- 使用 VuePress 原生的提示容器 HTML 結構 -->
  <div class="hint-container note">
    <p class="hint-container-title">當前活動</p>
    
    <div class="table-grid">
      <!-- 左側：當前活動提示 -->
      <div class="table-item">
        <span class="activity-name">
          {{ currentActivity.name }}
        </span>
        <p class="activity-effect">
          <strong>效果：</strong>{{ currentActivity.effect }}
        </p>
        <p class="next-time">
          <em>（下一次輪替時間：{{ nextHour }}:00）</em>
        </p>
      </div>

      <!-- 右側：動態活動表格 -->
      <div class="table-item-dsize">
        <p class="table-title">所有活動輪替一覽表</p>
        <table class="dynamic-activity-table">
          <thead>
            <tr>
              <th style="text-align: left;">小時（24小時制）</th>
              <th style="text-align: left;">活動名稱</th>
              <th style="text-align: left;">活動效果</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(act, index) in activities" 
              :key="index"
              :class="{ 'current-row': index === currentIdx }"
            >
              <td>{{ formatHours(index) }}</td>
              <td class="row-act-name">{{ act.name }}</td>
              <td>{{ act.effect }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 所有的活動資料來源
const activities = [
  { name: '權能異常', effect: '附魔與權能附魔成功率 +5%' },
  { name: '豐收期', effect: '砍樹後 10% 額外珍稀原木 x1' },
  { name: '淘金熱', effect: '採礦後 10% 額外金礦 x1' },
  { name: '夢見潮流季', effect: '海釣後 10% 額外夢見鯉魚 x1' },
  { name: '奇蹟時刻', effect: '鍊金時 50% 免費追加 1 次結果' },
  { name: '打鐵要趁熱', effect: '精煉時 30% 產物額外 +1' }
]

const currentActivity = ref({ name: '載入中...', effect: '' })
const currentIdx = ref(-1)
const nextHour = ref('')

// 自動計算小時區間字串
const formatHours = (index) => {
  const hoursArray = [index, index + 6, index + 12, index + 18]
  return hoursArray.map(h => String(h).padStart(2, '0')).join(', ')
}

// 更新當前活動狀態
const updateActivity = () => {
  const now = new Date()
  const hours = now.getHours()
  
  const index = hours % 6
  currentIdx.value = index
  currentActivity.value = activities[index]
  
  nextHour.value = String((hours + 1) % 24).padStart(2, '0')
}

let timer
onMounted(() => {
  updateActivity()
  timer = setInterval(updateActivity, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 整合你先前設定的彈性網格與動態寬度佈局 */
.table-grid {
  display: flex;
  gap: 1.5rem; /* 區塊間距 */
  align-items: flex-start;
  margin: 1rem 0;
}

/* 左側：等寬且防止撐破 */
.table-item {
  flex: 1;
  min-width: 0;
}

/* 右側：使用動態寬度比例（設定比左側寬度大一些） */
.table-item-dsize {
  flex: 1.8;
  min-width: 0;
}

/* 手機板時自動改成上下堆疊 */
@media (max-width: 719px) {
  .table-grid {
    flex-direction: column;
  }
  .table-item-dsize {
    width: 100%;
  }
}

/* 左側活動文字樣式 */
.activity-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3eaf7c;
  display: block;
  margin-bottom: 0.5rem;
}
.activity-effect {
  margin: 0.5rem 0;
}
.next-time {
  margin: 0;
  font-size: 0.9rem;
  color: #6a8bad;
}

/* 右側表格與標題樣式 */
.table-title {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.dynamic-activity-table {
  width: 100%;
  display: table;
  margin: 0;
  border-collapse: collapse;
}

.row-act-name {
  font-weight: bold;
}

/* 當前活動行高亮 (淡淡的綠色透明背景) */
.current-row {
  background-color: rgba(62, 175, 124, 0.15) !important;
}
</style>