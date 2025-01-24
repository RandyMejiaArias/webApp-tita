import { ReportLayout } from "../layout/ReportLayout"
import PowerBiReport from "../../ui/components/PowerBiReport";

export const Report7View = () => {
  return (
    <ReportLayout>
      <PowerBiReport url='https://app.powerbi.com/view?r=eyJrIjoiZTU0NDUzNjgtY2MzOS00NTFjLWI0MDItNzM5M2M5Y2FhNTdkIiwidCI6IjU4NWE0ZDkyLWRiMWQtNGJiYi1iNWFjLWM1Mjk5ZTM4OTRlMyIsImMiOjR9' />
    </ReportLayout>
  )
}

