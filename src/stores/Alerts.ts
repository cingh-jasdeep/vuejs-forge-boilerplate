import { defineStore } from 'pinia'
interface AlertsState {
  alerts: Alert[]
}

interface Alert {
  text: string,
  type?: "success" | "none" | "error" | "warning" | "info" | undefined
}

export const useAlerts = defineStore('Alerts', {
  state: ():AlertsState => ({
    alerts:  [],
  }),
  // other options...
  actions:{
    success(text: string){
      this.alerts.push({
        text: text,
        type: "success"
      });
    },
    cancel(index: number){
      this.alerts.splice(index,1);
    },
  }
})