const ProfileRoutes = {
    get profileMyEvents () {return `/profile/:pk/my-events/`;},
	profileMyEventsLink (pk) {return `/profile/${pk}/my-events/`;},
    get profileFavorites () {return `/profile/:pk/favorites/`;},
	profileFavoritesLink (pk) {return `/profile/${pk}/favorites/`;},
    get profilePersonalData () {return `/profile/:pk/personal-data/`;},
	profilePersonalDataLink (pk) {return `/profile/${pk}/personal-data/`;},
}

export default ProfileRoutes;