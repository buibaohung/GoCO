package event

import (
	pbEvent "main_service/config/grpc/proto/service/main/event"
	"main_service/endpoints/auth/event"
)

type Service struct {
	pbEvent.UnimplementedEventServer
	Endpoints event.Endpoints
}
