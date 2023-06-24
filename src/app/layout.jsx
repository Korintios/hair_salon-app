"use client"

import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import MainPage from "@src/components/MainPage";

export default function RootLayout({ children }) {

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
