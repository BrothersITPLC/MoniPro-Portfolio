import { fetchZabbixData } from "@/services/zabbixService"
export const Zabbixtest = () => {
    fetchZabbixData()
    return (
        <div>
            <h1>Zabbix Monitoring</h1>
        </div>
    )
}