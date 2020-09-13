package system

import (
	pbSystem "main_service/config/grpc/proto/service/main/system"
	"main_service/endpoints/system"
)

type Service struct {
	pbSystem.UnimplementedSystemServer
	Endpoints system.Endpoints
}
