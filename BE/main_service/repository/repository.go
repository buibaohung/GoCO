package repository

import (
	"main_service/config/database"
	"main_service/repository/event"
	"main_service/repository/facility"
	"main_service/repository/facility_registration"
	"main_service/repository/interaction"
	"main_service/repository/product"
	"main_service/repository/product_image"
	"main_service/repository/product_item"
	"main_service/repository/rating"
	"main_service/repository/system"
	"main_service/repository/user"
	"main_service/repository/vote_rating"
)

type Repository struct {
	System               system.SystemRepository
	User                 user.UserRepository
	Facility             facility.FacilityRepository
	FacilityRegistration facility_registration.FacilityRegistrationRepository
	Product              product.ProductRepository
	ProductItem          product_item.ProductItemRepository
	Event                event.EventRepository
	ProductImage         product_image.ProductImageRepository
	Rating               rating.RatingRepository
	VoteRating           vote_rating.VoteRatingRepository
	Interaction          interaction.InteractionRepository
}

func New() Repository {
	db := database.GetDB()
	return Repository{
		System:               system.NewPGSystemRepository(db),
		User:                 user.NewPGUserRepository(db),
		Facility:             facility.NewPGFacilityRepository(db),
		FacilityRegistration: facility_registration.NewPGFacilityRegistrationRepository(db),
		Product:              product.NewPGProductRepository(db),
		ProductItem:          product_item.NewPGProductItemRepository(db),
		Event:                event.NewPGEventRepository(db),
		ProductImage:         product_image.NewPGProductImageRepository(db),
		Rating:               rating.NewPGRatingRepository(db),
		VoteRating:           vote_rating.NewPGVoteRatingRepository(db),
		Interaction:          interaction.NewPGInteractionRepository(db),
	}
}
