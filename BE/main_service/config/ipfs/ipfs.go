package ipfs

import (
	"main_service/util"

	shell "github.com/ipfs/go-ipfs-api"
)

var IPFSBaseURL string
var ipfsShell *shell.Shell

// Init .
func Init() {
	ipfsIP := util.GetEnv("IPFS_IP", "localhost")
	ipfsPort := util.GetEnv("IPFS_PORT", "5001")
	IPFSBaseURL = util.GetEnv("IPFS_BASE_URL", "https://ipfs.goco.live/ipfs") //abc
	ipfsShell = shell.NewShell(ipfsIP + ":" + ipfsPort)
}

func GetIpfsShell() *shell.Shell {
	return ipfsShell
}
