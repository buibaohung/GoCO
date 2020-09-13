package ipfs

import (
	"org_service/util"

	shell "github.com/ipfs/go-ipfs-api"
)

var IPFSBaseURL string
var ipfsShell *shell.Shell

// Init .
func Init() {
	ipfsIP := util.GetEnv("IPFS_IP", "34.67.61.172")
	ipfsPort := util.GetEnv("IPFS_PORT", "5001")
	IPFSBaseURL = util.GetEnv("IPFS_BASE_URL", "https://ipfs.fotra.tk/ipfs")
	ipfsShell = shell.NewShell(ipfsIP + ":" + ipfsPort)
}

func GetIpfsShell() *shell.Shell {
	return ipfsShell
}
