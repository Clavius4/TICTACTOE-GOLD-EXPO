import * as SQLite from 'expo-sqlite';

// Open or create a new SQLite database
const db = SQLite.openDatabase('tg.db');

// Create the table if it doesn't exist
db.transaction(tx => {
  tx.executeSql(
    `
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      games_played INTEGER,
      games_won INTEGER,
      games_lost INTEGER,
      games_tied INTEGER,
      win_percentage REAL,
      max_win_in_a_row INTEGER,
      min_victory_time INTEGER,
      time_played INTEGER
    )
  `,
    [],
    (tx, result) => {
      // Table created or already exists
    },
    (tx, error) => {
      console.error('Error creating table:', error);
    }
  );
});

// Insert new statistics
function insertStats(stats) {
  db.transaction(tx => {
    tx.executeSql(
      `
      INSERT INTO stats (games_played, games_won, games_lost, games_tied, win_percentage, max_win_in_a_row, min_victory_time, time_played)
      VALUES (0, 0, 0, 0, 0, 0, 0, 0)
    `,
      [
        stats.games_played,
        stats.games_won,
        stats.games_lost,
        stats.games_tied,
        stats.win_percentage,
        stats.max_win_in_a_row,
        stats.min_victory_time,
        stats.time_played,
      ],
      (tx, result) => {
        console.log('New stats added with ID:', result.insertId);
      },
      (tx, error) => {
        console.error('Error inserting stats:', error);
      }
    );
  });
}

// Retrieve stats by ID
function getStatsById(id, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM stats WHERE id = ?',
      [id],
      (tx, { rows }) => {
        if (rows.length > 0) {
          callback(rows.item(0));
        } else {
          callback(null);
        }
      },
      (tx, error) => {
        console.error('Error retrieving stats:', error);
        callback(null);
      }
    );
  });
}

// Update stats by ID
function updateStatsById(id, newStats) {
  db.transaction(tx => {
    tx.executeSql(
      `
      UPDATE stats
      SET games_played = ?,
          games_won = ?,
          games_lost = ?,
          games_tied = ?,
          win_percentage = ?,
          max_win_in_a_row = ?,
          min_victory_time = ?,
          time_played = ?
      WHERE id = ?
    `,
      [
        newStats.games_played,
        newStats.games_won,
        newStats.games_lost,
        newStats.games_tied,
        newStats.win_percentage,
        newStats.max_win_in_a_row,
        newStats.min_victory_time,
        newStats.time_played,
        id,
      ],
      (tx, result) => {
        console.log('Stats updated for ID:', id);
      },
      (tx, error) => {
        console.error('Error updating stats:', error);
      }
    );
  });
}

export { insertStats, getStatsById, updateStatsById };
