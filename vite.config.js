import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

//? conf para acceder a la app desde cualquier dispositivo de la red
/*server: {
  host: '0.0.0.0'
}
*/