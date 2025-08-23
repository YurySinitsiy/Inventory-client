
const RedirectByRole = (role, navigate) => {

	switch (role) {
		case "admin":
			navigate("/admin");
			break;
		case "creator":
		case "user":
		case 'authentificated':
			navigate("/personal");
			break;

		default:
			navigate("/");
	}
};

export default RedirectByRole;
