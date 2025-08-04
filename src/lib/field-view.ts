import { DataFieldDto } from "@open-dpp/api-client";

export type FieldView = {
  dataField: Omit<DataFieldDto, "layout">;
  value: unknown;
};
