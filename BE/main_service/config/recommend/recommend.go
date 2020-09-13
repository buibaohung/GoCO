package recommend

import (
	"fmt"
	"main_service/util"
)

var url string

func init() {
	host := util.GetEnv("SERV_RECOMMEND_HOST", "localhost")
	port := util.GetEnv("SERV_RECOMMEND_PORT", "8000")
	url = fmt.Sprintf("http://%s:%s/api", host, port)
}

func GetUrl() string {
	return url
}
