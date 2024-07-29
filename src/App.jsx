import "./App.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import { theme } from "./assets/themes/Theme";
import { LocalizedDatagrid } from "./components/LocalizedDatagrid";
import i18next from "./i18n";

function App() {
    const { t } = useTranslation();
    const [language, setLanguage] = useState({ label: "english", code: "EN" });
    const languageOptions = [
        { label: "english", code: "EN" },
        { label: "german", code: "DE" },
        { label: "french", code: "FR" },
    ];

    const formatNumber = (value) => {
        if (language?.code === "DE") {
            return value.toLocaleString("de-DE");
        } else if (language?.code === "EN") {
            return value.toLocaleString("en-US");
        } else if (language?.code === "FR") {
            return value.toLocaleString("fr-FR");
        }
        return value;
    };

    const initialRows = [
        {
            id: 1,
            expense: "Light bill",
            price: 123.4,
        },
        {
            id: 2,
            expense: t("rent"),
            price: 222.1,
        },
        {
            id: 3,
            expense: t("car insurance"),
            price: 23.3,
        },
    ];

    const columns = [
        {
            field: "expense",
            headerName: t("expense"),
            width: 250,
            editable: true,
        },
        {
            field: "price",
            headerName: t("price"),
            width: 120,
            valueFormatter: (value) => {
                if (value == null) return "";
                return formatNumber(value);
            },
            renderEditCell: (params) => {
                const { id, field, value, api } = params;
                const initialValue = formatNumber(value);

                const handleChange = (event) => {
                    api.setEditCellValue({
                        id,
                        field,
                        value: event.target.value,
                    });
                };

                return (
                    <TextField
                        value={initialValue}
                        onChange={handleChange}
                        inputProps={{
                            style: { textAlign: "right" },
                            inputMode: "decimal",
                            pattern: "[0-9.,]*",
                        }}
                    />
                );
            },
            editable: true,
        },
    ];

    function setGlobalLanguage(language) {
        switch (language) {
            case "DE":
                i18next.changeLanguage("de");
                break;
            case "FR":
                i18next.changeLanguage("fr");
                break;
            default:
                i18next.changeLanguage("en");
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Stack width="600px" spacing={2}>
                <Autocomplete
                    value={language}
                    options={languageOptions}
                    getOptionLabel={(o) => t(o?.label)}
                    onChange={(e, newValue) => {
                        setLanguage(newValue);
                        setGlobalLanguage(newValue?.code);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={t("language")} />
                    )}
                    isOptionEqualToValue={(o, v) => o?.code === v?.code}
                />
                <Box
                    sx={{
                        height: 300,
                        width: "100%",
                        "& .actions": {
                            color: "text.secondary",
                        },
                        "& .textPrimary": {
                            color: "text.primary",
                        },
                    }}
                >
                    <LocalizedDatagrid
                        columns={columns}
                        rows={initialRows}
                        doubleClickEdit
                        language={language?.code}
                    />
                </Box>
            </Stack>
        </ThemeProvider>
    );
}

export default App;
