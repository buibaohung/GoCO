package repository

import (
	"org_service/config/database"
	"org_service/config/grpc/client"
	"org_service/repository/event"
	"org_service/repository/facility"
	"org_service/repository/product"
	"org_service/repository/product_image"
	"org_service/repository/product_item"
	"org_service/repository/rating"
	"org_service/repository/system"
	"org_service/repository/user"
)

type Repository struct {
	User         user.UserRepository
	Facility     facility.FacilityRepository
	Product      product.ProductRepository
	ProductItem  product_item.ProductItemRepository
	Event        event.EventRepository
	ProductImage product_image.ProductImageRepository
	Rating       rating.RatingRepository
	System       system.SystemRepository
}

func New() Repository {
	db := database.GetDB()
	grpcClient := client.GetClient()
	return Repository{
		User:         user.NewPGUserRepository(db),
		Facility:     facility.NewEOSFacilityRepository(grpcClient.EOS),
		Product:      product.NewEOSProductRepository(grpcClient),
		ProductItem:  product_item.NewEOSProductItemRepository(grpcClient),
		Event:        event.NewEOSEventRepository(grpcClient),
		ProductImage: product_image.NewEOSProductImageRepository(grpcClient),
		Rating:       rating.NewPGRatingRepository(db),
		System:       system.NewPGSystemRepository(grpcClient),
	}
}
