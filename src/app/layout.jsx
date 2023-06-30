"use client"

import { addLocale, locale } from "primereact/api"

import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import MainPage from "@src/components/MainPage";

export default function RootLayout({ children }) {

	addLocale('es', {
		firstDayOfWeek: 1,
		dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
		dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
		dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
		monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
		monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
		dateIs: 'Igual',
		dateIsNot: 'Desigual',
		dateBefore: 'Antes',
		dateAfter: 'Despues',
		today: 'Hoy',
		clear: 'Limpiar',
		startsWith:	'Inicia con',
		contains:	'Contiene',
		notContains:	'No Contiene',
		endsWith:	'Termina con',
		equals:	'Igual',
		notEquals:	'Desigual',
		noFilter:	'Sin Filtro',
		filter:	'Filtro',
		matchAll: 'Coincidir con todos',
		matchAny: 'Coincidir con cualquiera',
		addRule: 'Agregar Regla',
		removeRule: 'Remover Regla',
		apply: 'Aplicar',
	});

	locale("es")

	return (
		<html>
			<body>
				<MainPage>
					{children}
				</MainPage>
			</body>
		</html>
	);
}
