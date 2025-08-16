const redirectByRole = (role, navigate) => {

	switch (role) {
		case "admin":
			navigate("/admin");
			break;
		case "creator":
			navigate("/creator");
			break;
		case "write":
			navigate("/workspace");
			break;
		case "user":
			navigate("/dashboard");
			break;
		default:
			navigate("/");
	}
};

export default redirectByRole;
