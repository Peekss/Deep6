class NodeRepository {
  constructor(dao) {
    this.da0 = dao;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Node (
        id INTEGER PRIMARY KEY,
        name STRING,
        parentId STRING,
        CONSTRAINT parentId
          FOREIGN KEY (parentId)
          REFERENCES Node(id)
          ON DELETE CASCADE
      )
    `;
    return this.da0.run(sql);
  }

  getRoot() {
    return this.da0.get(
      'SELECT * FROM Node WHERE parentId = NULL',
      []
    )
  }

  create(name, parentId) {
    return this.da0.run(
      'INSERT INTO Node (name, parentId) VALUES (?, ?)',
      [name, parentId]
    );
  }

  update(name, id) {
    return this.da0.get(
      'UPDATE Node SET name = ? WHERE id = ?',
      [name, id]
    );
  }

  delete(id) {
    return this.da0.get(
      'DELETE FROM Node where id = ?',
      [id]
    );
  }

  getById(id) {
    return this.da0.get(
      'SELECT * FROM Node WHERE id = ?',
      [id]
    );
  }

  getChildNodes(parentId) {
    return this.da0.all(
      'SELECT * FROM Node WHERE parentId = ?',
      [parentId]
    )
  }

  getOrCreateRoot() {
    return this.da0.get(
      'SELECT * FROM Node where parentId IS NULL',
    )
    .then(result => {
      if (result === undefined) {
        this.create('amoeba', null).then(rt => rt);
      } else {
        return result;
      }
    })
    .catch(err => null);
  }

  getAll() {
    return this.da0.all('SELECT * FROM Node');
  }
}

module.exports = NodeRepository;