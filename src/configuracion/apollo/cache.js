import { InMemoryCache, makeVar } from '@apollo/client';

export const socket = makeVar(null);

export const pagination = makeVar([0, 25]);

export const snackbar = makeVar({
  isOpen: false,
  time: null,
  label: '',
  severity: 'success',
});

export const actionForm = makeVar({
  action: '',
  defaultData: {},
  callback: null,
});

export const deleteForm = makeVar({
	isOpen: false,
  params: {},
});

export const cart = makeVar({
	customer: null,
	newCustomer: null,
	commentary: '',
	SaleProductData: [],
	priceName: 'Estandar',
});

export const discountType = makeVar(localStorage.getItem('discountType') ? localStorage.getItem('discountType') : '%');

export const form = makeVar({});
export const item = makeVar({});

export const isMenuOpen = makeVar(false);
export const reloadSize = makeVar(false);
export const reloadVariation = makeVar(false);
export const filterForm = makeVar(false);
export const loadingSettingCompany = makeVar(false);
export const sessionCalendarForm = makeVar({ isOpen: false, Crms: [] });

export const searchField = makeVar('');

export const exportPdf = makeVar({ export: false });
export const exportXls = makeVar({ export: false });

export const filter = makeVar({});
export const count = makeVar(0);
export const actions = makeVar([]);

export const subTitle = makeVar('');
export const customerCalendarCheck = makeVar({ isOpen: false, dataId: null, type: '' });

export const isCalendarFormOpen = makeVar([false, {}]);

export const sort = makeVar({});
export const totals = makeVar(null);

export const focusRoom = makeVar({ isOpen: false, room: null, user: null });

export const step = makeVar(0);
export const module = makeVar(0);
export const clearForm = makeVar(false);
export const handleBack = makeVar(false);
export const handleContinue = makeVar(false);
export const handleContinueConfiguration = makeVar({});
export const steps = makeVar([]);

export const productType = makeVar(1);
export const unitBase = makeVar('PIEZA');
export const presentationProduct = makeVar(false);

export const isNewChatOpen = makeVar(false);
export const exportCustomXls = makeVar(false);
export const purchaseOrderId = makeVar(null);

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				socket: {
					read() {
						return socket();
					},
				},
				snackbar: {
					read() {
						return snackbar();
					},
				},
				actionForm: {
					read() {
						return actionForm();
					},
				},
				deleteForm: {
					read() {
						return deleteForm();
					},
				},
				cart: {
					read() {
						return cart();
					},
				},
				form: {
					read() {
						return form();
					},
				},
				pagination: {
					read() {
						return pagination();
					},
				},
				isMenuOpen: {
					read() {
						return isMenuOpen();
					},
				},
				searchField: {
					read() {
						return searchField();
					},
				},
				filterForm: {
					read() {
						return filterForm();
					},
				},
				subTitle: {
					read() {
						return subTitle();
					},
				},
				exportPdf: {
					read() {
						return exportPdf();
					},
				},
				exportXls: {
					read() {
						return exportXls();
					},
				},
				count: {
					read() {
						return count();
					},
				},
				actions: {
					read() {
						return actions();
					},
				},
				filter: {
					read() {
						return filter();
					},
				},
				loadingSettingCompany: {
					read() {
						return loadingSettingCompany();
					},
				},
				sessionCalendarForm: {
					read() {
						return sessionCalendarForm();
					},
				},
				customerCalendarCheck: {
					read() {
						return customerCalendarCheck();
					},
				},
				isCalendarFormOpen: {
					read() {
						return isCalendarFormOpen();
					},
				},
				sort: {
					read() {
						return sort();
					},
				},
				totals: {
					read() {
						return totals();
					},
				},
				focusRoom: {
					read() {
						return focusRoom();
					},
				},
				isNewChatOpen: {
					read() {
						return isNewChatOpen();
					},
				},
				reloadSize: {
					read() {
						return reloadSize();
					},
				},
				reloadVariation: {
					read() {
						return reloadVariation();
					},
				},
				exportCustomXls: {
					read() {
						return exportCustomXls();
					},
				},
			},
		},
	},
});
