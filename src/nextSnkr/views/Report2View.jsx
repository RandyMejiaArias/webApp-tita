import { ReportLayout } from "../layout/ReportLayout"
import PowerBiReport from "../../ui/components/PowerBiReport";

export const Report2View = () => {
  return (
    <ReportLayout>
      <PowerBiReport url='https://app.powerbi.com/view?r=eyJrIjoiYTc1NDMwMWQtMDllNi00ZDA3LWE2N2MtZThkZWFhMWRhNjlmIiwidCI6IjU4NWE0ZDkyLWRiMWQtNGJiYi1iNWFjLWM1Mjk5ZTM4OTRlMyIsImMiOjR9&pageName=ReportSectionf28f3e33a548b5f80e50' />
    </ReportLayout>
  )
}