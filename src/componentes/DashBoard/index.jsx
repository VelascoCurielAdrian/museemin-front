const DashBoard = () => {
	return (
		<div>
			<div className='text-center'>
				<button
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
					type='button'
					data-drawer-target='drawer-example'
					data-drawer-show='drawer-example'
					aria-controls='drawer-example'
				>
					Show drawer
				</button>
			</div>

			<div
				id='drawer-example'
				className='fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 transform-none'
				tabindex='-1'
				aria-labelledby='drawer-label'
				aria-modal='true'
				role='dialog'
			>
				<h5
					id='drawer-label'
					className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
				>
					<svg
						className='w-5 h-5 mr-2'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
							clip-rule='evenodd'
						></path>
					</svg>
					Info
				</h5>
				<button
					type='button'
					data-drawer-dismiss='drawer-example'
					aria-controls='drawer-example'
					className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
				>
					<svg
						aria-hidden='true'
						className='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clip-rule='evenodd'
						></path>
					</svg>
					<span className='sr-only'>Close menu</span>
				</button>
				<p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
					Supercharge your hiring by taking advantage of our{' '}
					<a
						href='#'
						className='text-blue-600 underline dark:text-blue-500 hover:no-underline'
					>
						limited-time sale
					</a>{' '}
					for Flowbite Docs + Job Board. Unlimited access to over 190K
					top-ranked candidates and the #1 design job board.
				</p>
				<div className='grid grid-cols-2 gap-4'>
					<a
						href='#'
						className='px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
					>
						Learn more
					</a>
					<a
						href='#'
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
					>
						Get access{' '}
						<svg
							className='w-4 h-4 ml-2'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
								clip-rule='evenodd'
							></path>
						</svg>
					</a>
				</div>
			</div>
			<div className='mx-auto max-w-lg'>
				{' '}
				<div role='status' className='my-7 animate-pulse'>
					{' '}
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]'></div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
				<div role='status' className='mb-7 max-w-lg animate-pulse'>
					{' '}
					<div className='flex justify-center items-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700'>
						{' '}
						<svg
							className='w-12 h-12 text-gray-200'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 640 512'
						>
							<path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z'></path>
						</svg>{' '}
					</div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
				<div role='status' className='my-6 animate-pulse'>
					{' '}
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]'></div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
				<div role='status' className='my-6 animate-pulse'>
					{' '}
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5'></div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
				<div role='status' className='mt-7 mb-6 animate-pulse'>
					{' '}
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]'></div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
				<div role='status' className='my-6 animate-pulse'>
					{' '}
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
					<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5'></div>
					<span className='sr-only'>Loading...</span>{' '}
				</div>
			</div>
		</div>
	);
};

export default DashBoard;
