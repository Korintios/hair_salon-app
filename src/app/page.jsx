import Image from 'next/image'

export default function index() {
	return (
		<div className='flex align-items-center justify-content-center' style={{height: '90vh'}}>
			<Image src="/logo.png" width={500} height={480} alt='logo'/>
		</div>
	);
}
