let restaurants; //to store a reference of the database

export default class RestaurantsDAO {
  static async injectDB(conn) {
    //to initially connect to the database. This method will be called as soon as the server starts
    if (restaurants) {
      //if already is a reference then just return
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `Unable to establish a conection handle in restaurantDAO: ${e}`
      );
    }
  }
  static async getRestaurants({    //return the list of restaurants
    filters = null,
    page = 0,                //default page 0
    restaurantsPerPage = 20,
  } = {}) {
    let query;               //check more queries on https://docs.mongodb.com/manual/reference/operator/
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }; //config on mgdb Atlas to specify that if someone does a text search which field will be search for that string
      } else if ("cuisine in filters") {
        query = { $cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor; //store the results
    try {
        cursor = await restaurants
        .find(query)
    } catch(e) {
        console.error(`unable to issue find command, ${e}`)
        return {restaurantsList: [], totalNumOfRestaurants: 0}
    }
    const displaycursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page);

    try {
        const restaurantsList = await displaycursor.toArray();
        const totalNumberOfRestaurants = await restaurants.countDocuments(query);
        return {restaurantsList, totalNumberOfRestaurants}
    } catch(e){
        console.error(`Unable to convert cursor to array or problem counting documents: ${e}`);
        return {restaurantsList: [], totalNumberOfRestaurants: 0}
    }
  }
  
}
