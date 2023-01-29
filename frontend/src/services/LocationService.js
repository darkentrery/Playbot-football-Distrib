import axios from "axios";


export const getLocations = (value) => {
	let url = `https://api.opencagedata.com/geocode/v1/json?query=${value}&key=${process.env.REACT_APP_OPENCAGEDATA_KEY}`;
    // let url = `https://geocode-maps.yandex.ru/1.x/?apikey=a9f0a35a-be0f-42f8-a5e3-e4eb50216aa5&format=json&geocode=${value}`
    return axios.get(url, {headers: {
			'Content-Type': 'application/json',
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

export const getLocationsByCoords = (coords) => {
	let url = `https://api.opencagedata.com/geocode/v1/json?query=${coords[0]}+${coords[1]}&key=${process.env.REACT_APP_OPENCAGEDATA_KEY}`;
    // let url = `https://geocode-maps.yandex.ru/1.x/?apikey=a9f0a35a-be0f-42f8-a5e3-e4eb50216aa5&format=json&geocode=${value}`
    return axios.get(url, {headers: {
			'Content-Type': 'application/json',
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

export const getLocationsGoogle = (value) => {
	let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
    return axios.get(url, {headers: {
			'Content-Type': 'application/json',
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

export const getLocationsByCoordsGoogle = (coords) => {
	let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
    return axios.get(url, {headers: {
			'Content-Type': 'application/json',
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

export const getLocationsArrayGoogle = (value) => {
	return getLocationsGoogle(value).then((response) => {
		if (response.status === 200) {
			let geoObjects = response.data.results;
			let array = [];
			geoObjects.map((item) => {
				let address = {
					country: '',
					region: '',
					city: '',
					street: '',
					house_number: '',
					lat: '',
					lng: '',
					formatted: '',
				}
				item.address_components.map((component) => {
					if (component.types.includes('country')) address.country = component.long_name;
					if (component.types.includes('administrative_area_level_1')) address.region = component.long_name;
					if (component.types.includes('administrative_area_level_2')) address.city = component.short_name.replace('г. ', '');
					if (component.types.includes('route')) address.street = component.short_name;
					if (component.types.includes('street_number')) address.house_number = component.long_name;
				})
				if (item.geometry && item.geometry.location) {
					address.lat = item.geometry.location.lat;
					address.lng = item.geometry.location.lng;
				}
				address.formatted = item.formatted_address;
				array.push(address);
			})

			return array;
		}
	})
}

export const getLocationsAddressByCoordsGoogle = (value) => {
	return getLocationsByCoordsGoogle(value).then((response) => {
		if (response.status === 200) {
			let geoObjects = response.data.results;
			let address = {
				country: '',
				region: '',
				city: '',
				street: '',
				house_number: '',
				lat: '',
				lng: '',
				formatted: '',
			}
			geoObjects[0].address_components.map((component) => {
				if (component.types.includes('country')) address.country = component.long_name;
				if (component.types.includes('administrative_area_level_1')) address.region = component.long_name;
				if (component.types.includes('administrative_area_level_2')) address.city = component.short_name.replace('г. ', '');
				if (component.types.includes('route')) address.street = component.short_name;
				if (component.types.includes('street_number')) address.house_number = component.long_name;
			})
			if (geoObjects[0].geometry && geoObjects[0].geometry.location) {
				address.lat = geoObjects[0].geometry.location.lat;
				address.lng = geoObjects[0].geometry.location.lng;
			}
			address.formatted = geoObjects[0].formatted_address;

			return address;
		}
	})
}