import { ReportLayout } from "../layout/ReportLayout"
import PowerBiReport from "../../ui/components/PowerBiReport";

export const Report4View = () => {
  return (
    <ReportLayout>
      <PowerBiReport url='https://app.powerbi.com/view?r=eyJrIjoiZjVlMjkxYjAtOGNiYS00MDY5LWI3MGYtNWZhNjkyNjZkZWZhIiwidCI6IjU4NWE0ZDkyLWRiMWQtNGJiYi1iNWFjLWM1Mjk5ZTM4OTRlMyIsImMiOjR9&pageName=4f729305a47d9040c817' />
    </ReportLayout>
  )
}