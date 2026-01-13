"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Divider,
  IconButton,
  Card,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7, CalendarMonth, BeachAccess } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import calcularFecha from "@/helpers/getDateFinalVacation";
import { useColorMode } from "@/theme/ThemeRegistry";

// Set locale to Spanish
dayjs.locale("es");

export default function Home() {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();
  
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [vacationDays, setVacationDays] = useState<number>(15);
  const [result, setResult] = useState<{ fecha: Dayjs; dias: number } | null>(null);

  useEffect(() => {
    if (startDate && vacationDays > 0) {
      const calculated = calcularFecha(startDate, vacationDays);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [startDate, vacationDays]);

  const handleDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVacationDays(isNaN(value) ? 0 : value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          background: theme.palette.background.paper,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Stack spacing={3}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <BeachAccess color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Calculadora de Vacaciones
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Calcula tu fecha de regreso considerando festivos de Colombia.
            </Typography>
          </Box>

          <Divider />

          <Stack spacing={3}>
            <DatePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  helperText: "Día en que comienzas tus vacaciones",
                },
              }}
            />

            <TextField
              label="Días de Vacaciones"
              type="number"
              value={vacationDays}
              onChange={handleDaysChange}
              inputProps={{ min: 1 }}
              helperText="Cantidad de días hábiles solicitados"
            />
          </Stack>

          {result && (
            <Card
              variant="outlined"
              sx={{
                mt: 4,
                bgcolor: mode === "light" ? "primary.light" : "primary.dark",
                color: mode === "light" ? "primary.contrastText" : "white",
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  FECHA FINAL DE VACACIONES
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  {result.fecha.format("dddd, D [de] MMMM [de] YYYY")}
                </Typography>
                <Divider sx={{ my: 1, opacity: 0.3 }} />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <CalendarMonth fontSize="small" />
                  <Typography variant="body2">
                    Regresas a trabajar el siguiente día hábil.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Paper>
      
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          &copy; {new Date().getFullYear()} Calculadora de Vacaciones - Hecho con Next.js & MUI
        </Typography>
      </Box>
    </Container>
  );
}
