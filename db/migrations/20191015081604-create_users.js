export async function up (queryInterface, Sequelize) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      login: { type: Sequelize.STRING, allowNull: false },
      github_token: { type: Sequelize.STRING, allowNull: true }
    }, { transaction })

    await queryInterface.addIndex('users', {
      name: 'users_email',
      unique: true,
      fields: [Sequelize.fn('lower', Sequelize.col('email'))],
      transaction
    })
    await queryInterface.addIndex('users', {
      name: 'users_login',
      unique: true,
      fields: [Sequelize.fn('lower', Sequelize.col('login'))],
      transaction
    })
    await queryInterface.addIndex('users', ['github_token'], { unique: true, transaction })
  })
}

export async function down (queryInterface) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.dropTable('users', { transaction })
  })
}
