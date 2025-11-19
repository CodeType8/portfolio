import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // preview server config
  preview: {
    port: 4174,        // 원하는 포트 번호
    strictPort: true   // true면 해당 포트가 이미 사용 중일 경우 실행 실패
  }
})
