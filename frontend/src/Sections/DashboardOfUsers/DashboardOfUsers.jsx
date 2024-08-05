import * as React from "react";
import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./DashboardOfUsers.css";
import GetAllUsers from "../../Api/UsersApi/GetAllUsers";
import columns from "../../Constants/TableColumns.js";
import DeleteUser from "../../Api/UsersApi/DeleteUser.js";

function EditToolbar(props) {
	const { selectedRowId, handleDelete, handleSelectRow } = props;

	return (
		<Box
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				p: 1,
				color: "secondary.main",
			}}
		>
			<Button
				onClick={handleDelete}
				disabled={!selectedRowId}
				variant="outlined"
				color="inherit"
				sx={{ ml: 1 }}
			>
				Delete
			</Button>
		</Box>
	);
}

export default function DashboardOfUsers() {
	const [users, setUsers] = React.useState([]);
	const [selectedRowId, setSelectedRowId] = React.useState(null);
	const [selectedRows, setSelectedRows] = React.useState([]);

	async function callGetAllUsers() {
		const response = await GetAllUsers();
		setUsers(response.users.filter((user) => user.active !== false));
	}

	async function callDeleteUser(id) {
		const response = await DeleteUser(id);
	}
	React.useEffect(() => {
		callGetAllUsers();
	}, []);

	const handleRowClick = React.useCallback((params) => {
		setSelectedRowId(params.id);
	}, []);

	const handleSelectRow = () => {
		setSelectedRows([selectedRowId]);
	};

	const handleDelete = () => {
		if (selectedRowId) {
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== selectedRowId)
			);
			callDeleteUser(selectedRowId);
			setSelectedRowId(null);
			setSelectedRows([]);
		}
	};

	return (
		<Box
			className="dashboard-users-box"
			sx={{ backgroundColor: "primary.main" }}
		>
			<Container sx={{ height: "calc(100vh - 160px)" }}>
				<DataGrid
					rows={users}
					columns={columns}
					getRowId={(user) => user._id}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					pageSizeOptions={[5, 10, 20]}
					checkboxSelection
					selectionModel={selectedRows}
					onRowClick={handleRowClick}
					slots={{
						toolbar: EditToolbar,
					}}
					slotProps={{
						toolbar: {
							selectedRowId,
							handleDelete,
							handleSelectRow,
						},
					}}
					sx={{
						"& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg":
							{
								backgroundColor: "secondary.main",
							},
					}}
				/>
			</Container>
		</Box>
	);
}
