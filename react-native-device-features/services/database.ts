import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";

const database = SQLite.openDatabase("places.db");

/**
 * This function initializes a database and creates a table for storing places with specific columns.
 * @returns The `initDatabase` function returns a promise that resolves with `void` if the SQL query to
 * create a table named "places" is executed successfully, or rejects with an error if there is an
 * error executing the query.
 */
export function initDatabase() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_transaction, error) => {
          reject(error);
          return !!error;
        }
      );
    });
  });

  return promise;
}

/**
 * This function inserts a new place into a SQLite database.
 * @param {Place} place - The `place` parameter is an object of type `Place` which contains information
 * about a location such as its title, address, image URI, and latitude/longitude coordinates. This
 * function inserts this information into a SQLite database table named `places`.
 * @returns The function `insertPlace` is returning a Promise that resolves to an instance of
 * `SQLite.SQLResultSet`.
 */
export function insertPlace(place: Place) {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, address, imageUri, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.address,
          place.imageUri,
          place.location.lat,
          place.location.lng,
        ],
        (_transaction, result) => {
          resolve(result);
        },
        (_transaction, error) => {
          reject(error);
          return !!error;
        }
      );
    });
  });

  return promise;
}

export function fetchPlace() {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_transaction, result) => {
          const places: Place[] = [];

          for (const data of result.rows._array) {
            places.push({
              id: data.id.toString(),
              title: data.title,
              address: data.address,
              imageUri: data.imageUri,
              location: {
                lat: data.lat,
                lng: data.lng,
              },
            });
          }
          resolve(places);
        },
        (_transaction, error) => {
          reject(error);
          return !!error;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetail(id: string) {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_transaction, result) => {
          const place = result.rows._array[0];

          const resultPlace = new Place(
            place.title,
            place.address,
            place.imageUri,
            { lat: place.lat, lng: place.lng },
            place.id
          );

          resolve(resultPlace);
        },
        (_transaction, error) => {
          reject(error);

          return !!error;
        }
      );
    });
  });
  return promise;
}
