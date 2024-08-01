const tableColumns = [
	{ field: "_id", headerName: "ID", width: 230 },
	{ field: "email", headerName: "Email", width: 200 },
	{ field: "username", headerName: "Username", width: 120 },

	{
		field: "accountVerified",
		headerName: "Account Verified",
		sortable: false,
		width: 90,
	},
	{
		field: "active",
		headerName: "Active",
		sortable: false,
		width: 90,
	},
	{
		field: "isAdmin",
		headerName: "Is Admin",
		sortable: false,
		width: 90,
	},
	{
		field: "bio",
		headerName: "Bio",
		flex: 1, // This will make the last column take up remaining space
	},
];

export default tableColumns;
