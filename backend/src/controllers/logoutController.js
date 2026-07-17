const logoutController = {}

logoutController.logout = async (req, res) => {
    try {
        res.cookie("authCookie")
        return res.status(200).json({message : "Logout correctly"})
    } catch (error) {
        console.log ("error" + error)
        return res.status(500).json({message : "Internal server error"})
    }
}

export default logoutController;













