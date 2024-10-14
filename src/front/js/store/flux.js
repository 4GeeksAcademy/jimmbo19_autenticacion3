const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false 
		},
		actions: {
			// Función de login
			login: (email, password) => {
				const requestOptions = {
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					redirect: "follow",
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then((response) => {
						if (!response.ok) {
							console.log("Error en el login:", response.status);
							throw new Error("Login failed");
						}
						return response.json();
					})
					.then((data) => {
						if (data.access_token) {
							localStorage.setItem("token", data.access_token);
							setStore({ auth: true });
							console.log("Login exitoso:", data);
						} else {
							console.error("No se recibió un token:", data);
						}
					})
					.catch((error) => {
						console.error("Error:", error);
						setStore({ auth: false }); 
					});
			},

			
			logout: () => {
				localStorage.removeItem("token"); 
				setStore({ auth: false }); 
				console.log("Logout exitoso");
			},

			
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					if (!resp.ok) throw new Error("Error al obtener el mensaje");
					
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error al cargar el mensaje del backend", error);
				}
			},

			
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
