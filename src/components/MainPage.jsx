"use client"

import Image from 'next/image'

import { menuItems } from "@config/menuConfig";
import { ModalContextProvider } from "@context/modalContextProvider";

export default function MainPage({ children }) {

	return (
		<ModalContextProvider>
			<main>
				<div className="sidebar flex justify-content-between flex-column">
					<div className="sidebar-logo">
						<Image src="/newlogo.png" width={50} height={30} alt='logo'/>
					</div>
					<ul>
						{menuItems.map((e) => {
							return (
								<li key={e.tittle}>
									<a href={e.link}>
										<i className={e.icon}></i>
										<span className="links_name">{e.tittle}</span>
									</a>
									<span className="tooltip">{e.tittle}</span>
								</li>
							);
						})}
					</ul>
				</div>
					<section className="home-section">{children}</section>
			</main>
		</ModalContextProvider>
	);
}
