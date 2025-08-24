
const RedirectByRole = (role, navigate) => {

	switch (role) {
		case "admin":
			navigate("/admin");
			break;
		case "user":
			navigate("/personal");
			break;

		default:
			navigate("/");
	}
};

export default RedirectByRole;
