import * as React from "react";
import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./DashboardOfUsers.css";
import GetAllUsers from "../../Api/UsersApi/GetAllUsers";
import columns from "../../Constants/TableColumns.js";

export default function DashboardOfUsers() {
	const [users, setUsers] = React.useState([]);
	async function callGetAllUsers() {
		const response = await GetAllUsers();
		setUsers(response.users);
	}
	React.useEffect(() => {
		callGetAllUsers();
	}, []);
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
				/>
			</Container>
		</Box>
	);
}
