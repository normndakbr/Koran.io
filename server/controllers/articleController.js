const { Article } = require('../models')

class articleController {
    static async showArticle(request, response, next){
        try {
            const userId = request.loggedInUser.id;
            const data = await Article.findAll()

            response.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    
}

module.exports = articleController