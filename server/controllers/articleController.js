const { Article, UserArticle } = require('../models')

class articleController {
    static async showArticle(request, response, next) {
        try {
            const data = await Article.findAll()
            response.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addArticle(request, response, next) {
        const newData = {
            title: request.body.title,
            body: request.body.body,
            publish_date: new Date()
        }
        try {
            const newArticle = await Article.create(newData)
            response.status(201).json({
                id: newArticle.id,
                title: newArticle.title,
                body: newArticle.body,
                publish_date: newArticle.publish_date,
                createdAt: newArticle.createdAt,
                updatedAt: newArticle.updatedAt
            });

            const newRelationData = {
                UserId: +request.loggedInUser.id,
                ArticleId: newArticle.id 
            }
            const newRelation = await UserArticle.create(newRelationData)
            console.log(newRelation);
        } catch (error) {
            console.log("Error adding new Article ", + error);
            next(error);
        }
    }

    static async editArticle(request, response, next) {
        try {
            const userId = request.loggedInUser.id
            const articleId = +request.params.id;
            const newData = {
                title: request.body.title,
                body: request.body.body
            }
            const editedArticle = await Article.update(newData, {
                where: { UserId: userId, id: articleId },
                returning: true
            })
            response.status(200).json(editedArticle[1][0]);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = articleController