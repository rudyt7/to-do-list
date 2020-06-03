import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorModal, setErrorModal] = useState(false);
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);
			const httpAbortControl = new AbortController();
			activeHttpRequests.current.push(httpAbortControl);
			try {
				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: httpAbortControl.signal,
				});

				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortControl
				);

				const responseData = await response.json();
				setIsLoading(false);
				if (!response.ok) {
					throw new Error(responseData.message);
				}
				return responseData;
			} catch (error) {
				setIsLoading(false);
				setError(error.message);
				setErrorModal(true);
				throw error;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
		setErrorModal(false);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCont) => abortCont.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError, errorModal };
};

export default useHttpClient;
