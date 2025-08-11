import * as migration_20250221_081631 from './20250221_081631';
import * as migration_20250523_192603_create_home_section from './20250523_192603_create_home_section';
import * as migration_20250811_010118_add_component_blocks from './20250811_010118_add_component_blocks';

export const migrations = [
  {
    up: migration_20250221_081631.up,
    down: migration_20250221_081631.down,
    name: '20250221_081631',
  },
  {
    up: migration_20250523_192603_create_home_section.up,
    down: migration_20250523_192603_create_home_section.down,
    name: '20250523_192603_create_home_section',
  },
  {
    up: migration_20250811_010118_add_component_blocks.up,
    down: migration_20250811_010118_add_component_blocks.down,
    name: '20250811_010118_add_component_blocks'
  },
];
