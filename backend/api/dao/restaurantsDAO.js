let restaurants //to store a reference of the database

export default class RestaurantsDAO {  
    static async injectDB(conn) { //to initially connect to the database. This method will be called as soon as the server starts
        if(restaurants) { //if already is a reference then just return
            return
        }
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } 
        catch (e) {
            console.error(`Unable to establish a conection handle in restaurantDAO: ${e}`,)
        }
    }

    
}