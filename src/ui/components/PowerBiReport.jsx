import { PowerBIEmbed } from "powerbi-client-react";
import * as pbi from "powerbi-client";

import '../../App.css';

const PowerBiReport = ({url}) => {
  const models = pbi.models;

  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna and paginated report
        embedUrl: url, // [report embedUrl here]
        accessToken: undefined, // Keep as empty string, null or undefined
        tokenType: models.TokenType.Embed,
      }}
      cssClassName = { "reportClass" }
    />
  );
};
export default PowerBiReport;