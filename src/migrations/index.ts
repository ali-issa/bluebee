import * as migration_20250812_084315_initial_migration from './20250812_084315_initial_migration';

export const migrations = [
  {
    up: migration_20250812_084315_initial_migration.up,
    down: migration_20250812_084315_initial_migration.down,
    name: '20250812_084315_initial_migration'
  },
];
