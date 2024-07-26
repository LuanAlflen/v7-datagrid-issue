import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { deDE, frFR } from "@mui/x-data-grid/locales";

export const LocalizedDatagrid = ({
    rows,
    columns,
    language,
    localeText: LocaleTextProp,
    ...props
}) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            localeText={{
                ...(language === "DE"
                    ? deDE.components.MuiDataGrid.defaultProps.localeText
                    : language === "FR"
                      ? frFR.components.MuiDataGrid.defaultProps.localeText
                      : undefined),
                ...LocaleTextProp,
            }}
            {...props}
        />
    );
};
