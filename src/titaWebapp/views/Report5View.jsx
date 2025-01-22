import { ReportLayout } from "../layout/ReportLayout"
import PowerBiReport from "../../ui/components/PowerBiReport";

export const Report5View = () => {
  return (
    <ReportLayout>
      <PowerBiReport url='https://app.powerbi.com/view?r=eyJrIjoiZjVlMjkxYjAtOGNiYS00MDY5LWI3MGYtNWZhNjkyNjZkZWZhIiwidCI6IjU4NWE0ZDkyLWRiMWQtNGJiYi1iNWFjLWM1Mjk5ZTM4OTRlMyIsImMiOjR9&pageName=6598ac86cda48e780b5b' />
    </ReportLayout>
  )
}