package ch.bbw.pr.joke;
import com.mongodb.client.*;
import com.mongodb.client.model. Projections; import com.mongodb.client.result.DeleteResult;
import
        com.mongodb.client.result.UpdateResult;
import org.bson.BsonDateTime;
import org.bson.Document;
import org.bson.conversions. Bson;
import java.util.Date;
12 import java.util.function. Consumer;
import static com.mongodb.client.model.Filters.eq; import static com.mongodb.client.model.Updates.set;
/**
 *Try out mongoDB
 * @author Peter Rutschmann
 * @version 18.10.2022
 */
public class App
public static void main(String[] args)
System.out.println("Hello MongoDB World!" );
String connectionString = "mongodb://root:1234@localhost:27017"; try (MongoClient mongoClient = MongoClients.create(connectionString)) {

//list all databases
        System.out.println("List all databases: ");
mongoClient.listDatabases().forEach((Consumer<? super Document>) result -> System.out.println(result.toJson()));

//get database jokesdb and list all collections
MongoDatabase jokeDB = mongoClient.getDatabase(s: "jokesdb");
        System.out.println("List all collections from jokesdb");
jokeDB.listCollectionNames().forEach((Consumer<? super String>) result-> System.out.println(result));

//get jokes collection and list all documents
MongoCollection<Document> jokesCollection = jokeDB.getCollection( "jokes"); System.out.println("List all documents from jokes collection");
jokesCollection.find().forEach((Consumer<? super Document>) result -> System.out.print(result));

//get joke id=2 and print only the text
Bson projectionFields = Projections.fields(
        Projections.include(...fieldNames: "id", "text"), Projections.excludeId());
Document document = jokesCollection.find(eq(fieldName: "id", value: 2))
        .projection (projectionFields)
.first();
System.out.println(document.get("text"));

//Create a new joke
Document joke = new Document();
joke.append("id", 5);
joke.append("text", "Ein Witz mit Zeitsprung.. Er war nicht gut."); joke.append("rating", 2);
joke.append("date", new BsonDateTime (new Date().getTime())); jokesCollection.insertone (joke);
Document joke5 = jokesCollection.find(new Document("id", 5)).first(); System.out.println("joke 5: " + joke5.toJson());

//Update the joke
Bson filter = eq( fieldName: "id", value: 5);
Bson updateOperation = set("text", "Eine Kugel kippt um.");
UpdateResult updateResult = jokesCollection.updateOne(filter, updateOperation);
joke5 = jokesCollection. find (new Document("id", 5)).first(); System.out.println("joke 5: " + joke5.toJson());
//Delete the joke
filter = eq(fieldName: "id", value 5);
DeleteResult result = jokesCollection.delete0ne (filter); System.out.println(result);
joke5 = jokesCollection.find(new Document("id", 5)).first(); if(joke5 == null) {
        System.out.println("joke 5 not found, all ok");
}else{
        }
        System.out.println("joke 5 not deleted: " + joke5.toJson());package ch.bbw.pr.joke;
import com.mongodb.client.*;
        import com.mongodb.client.model. Projections; import com.mongodb.client.result.DeleteResult;
import
com.mongodb.client.result.UpdateResult;
import org.bson.BsonDateTime;
import org.bson.Document;
import org.bson.conversions. Bson;
import java.util.Date;
12 import java.util.function. Consumer;
import static com.mongodb.client.model.Filters.eq; import static com.mongodb.client.model.Updates.set;
/**
 *Try out mongoDB
 * @author Peter Rutschmann
 * @version 18.10.2022
 */
public class App
public static void main(String[] args)
System.out.println("Hello MongoDB World!" );
String connectionString = "mongodb://root:1234@localhost:27017"; try (MongoClient mongoClient = MongoClients.create(connectionString)) {

//list all databases
        System.out.println("List all databases: ");
mongoClient.listDatabases().forEach((Consumer<? super Document>) result -> System.out.println(result.toJson()));

//get database jokesdb and list all collections
MongoDatabase jokeDB = mongoClient.getDatabase(s: "jokesdb");
        System.out.println("List all collections from jokesdb");
jokeDB.listCollectionNames().forEach((Consumer<? super String>) result-> System.out.println(result));

//get jokes collection and list all documents
MongoCollection<Document> jokesCollection = jokeDB.getCollection( "jokes"); System.out.println("List all documents from jokes collection");
jokesCollection.find().forEach((Consumer<? super Document>) result -> System.out.print(result));

//get joke id=2 and print only the text
Bson projectionFields = Projections.fields(
        Projections.include(...fieldNames: "id", "text"), Projections.excludeId());
Document document = jokesCollection.find(eq(fieldName: "id", value: 2))
        .projection (projectionFields)
.first();
System.out.println(document.get("text"));

//Create a new joke
Document joke = new Document();
joke.append("id", 5);
joke.append("text", "Ein Witz mit Zeitsprung.. Er war nicht gut."); joke.append("rating", 2);
joke.append("date", new BsonDateTime (new Date().getTime())); jokesCollection.insertone (joke);
Document joke5 = jokesCollection.find(new Document("id", 5)).first(); System.out.println("joke 5: " + joke5.toJson());

//Update the joke
Bson filter = eq( fieldName: "id", value: 5);
Bson updateOperation = set("text", "Eine Kugel kippt um.");
UpdateResult updateResult = jokesCollection.updateOne(filter, updateOperation);
joke5 = jokesCollection. find (new Document("id", 5)).first(); System.out.println("joke 5: " + joke5.toJson());
//Delete the joke
filter = eq(fieldName: "id", value 5);
DeleteResult result = jokesCollection.delete0ne (filter); System.out.println(result);
joke5 = jokesCollection.find(new Document("id", 5)).first(); if(joke5 == null) {
        System.out.println("joke 5 not found, all ok");
}else{
        }
        System.out.println("joke 5 not deleted: " + joke5.toJson());