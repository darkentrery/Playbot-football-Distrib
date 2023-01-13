const ProfileRoutes = {
    get profileMyEvents () {return `/profile/:pk/my-events/`;},
	profileMyEventsLink (pk) {return `/profile/${pk}/my-events/`;},
}

export default ProfileRoutes;