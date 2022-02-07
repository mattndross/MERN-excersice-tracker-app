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
  static getRestaurants({    //return the list of restaurants
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
  }
}
